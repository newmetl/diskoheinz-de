"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession, isAuthenticated } from "@/lib/session";
import {
  createGig as dbCreate,
  deleteGig as dbDelete,
  getGig,
  updateGig as dbUpdate,
  type GigInput,
} from "@/lib/db";
import { deleteFlyerIfOwned, saveFlyer } from "@/lib/uploads";
import { combineDateTime } from "@/lib/gig-time";
import type { Gig } from "@/data/types";

async function requireAdmin() {
  if (!(await isAuthenticated())) {
    throw new Error("Nicht authentifiziert.");
  }
}

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "ADMIN_PASSWORD ist auf dem Server nicht gesetzt." };
  }
  if (!password || password !== expected) {
    return { error: "Falsches Passwort." };
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

function optStr(v: FormDataEntryValue | null): string | undefined {
  const s = str(v);
  return s ? s : undefined;
}

function parseFormToGig(fd: FormData): { input?: GigInput; error?: string } {
  const title = str(fd.get("title"));
  const starts_date = str(fd.get("starts_at_date"));
  const starts_time = str(fd.get("starts_at_time"));
  const ends_date = str(fd.get("ends_at_date"));
  const ends_time = str(fd.get("ends_at_time"));
  const status = str(fd.get("status")) as Gig["status"];

  if (!title) return { error: "Titel ist Pflicht." };
  if (!starts_date) return { error: "Startdatum ist Pflicht." };
  const starts_at = combineDateTime(starts_date, starts_time);
  if (!starts_at) return { error: "Startdatum/-zeit ist ungültig." };
  if (!ends_date && ends_time) {
    return { error: "Endzeit ohne Enddatum ist nicht zulässig." };
  }
  const ends_at = ends_date
    ? combineDateTime(ends_date, ends_time)
    : undefined;
  if (ends_date && !ends_at) return { error: "Enddatum/-zeit ist ungültig." };
  if (!["confirmed", "pending", "sold_out", "cancelled"].includes(status)) {
    return { error: "Ungültiger Status." };
  }

  const lineupRaw = str(fd.get("lineup"));
  const lineup = lineupRaw
    ? lineupRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;

  return {
    input: {
      title,
      venue: str(fd.get("venue")),
      city: str(fd.get("city")),
      country: optStr(fd.get("country")),
      starts_at,
      ends_at,
      stage: optStr(fd.get("stage")),
      lineup,
      description: optStr(fd.get("description")),
      flyer_url: optStr(fd.get("flyer_url")),
      event_url: optStr(fd.get("event_url")),
      ticket_url: optStr(fd.get("ticket_url")),
      status,
      is_headliner: fd.get("is_headliner") === "on",
      is_private: fd.get("is_private") === "on",
    },
  };
}

export async function createGigAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();

  const parsed = parseFormToGig(formData);
  if (parsed.error || !parsed.input) return { error: parsed.error };

  // Optional flyer upload
  const file = formData.get("flyer_file");
  if (file instanceof File && file.size > 0) {
    try {
      parsed.input.flyer_url = await saveFlyer(file);
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Upload fehlgeschlagen." };
    }
  }

  dbCreate(parsed.input);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateGigAction(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();

  const existing = getGig(id);
  if (!existing) return { error: "Gig nicht gefunden." };

  const parsed = parseFormToGig(formData);
  if (parsed.error || !parsed.input) return { error: parsed.error };

  const file = formData.get("flyer_file");
  if (file instanceof File && file.size > 0) {
    try {
      const newUrl = await saveFlyer(file);
      await deleteFlyerIfOwned(existing.flyer_url);
      parsed.input.flyer_url = newUrl;
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Upload fehlgeschlagen." };
    }
  } else if (formData.get("remove_flyer") === "on") {
    await deleteFlyerIfOwned(existing.flyer_url);
    parsed.input.flyer_url = undefined;
  }

  dbUpdate(id, parsed.input);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteGigAction(id: string) {
  await requireAdmin();
  const removed = dbDelete(id);
  if (removed) {
    await deleteFlyerIfOwned(removed.flyer_url);
  }
  revalidatePath("/");
  revalidatePath("/admin");
}
