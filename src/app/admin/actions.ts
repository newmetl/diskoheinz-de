"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession, isAuthenticated } from "@/lib/session";
import {
  createGig as dbCreate,
  deleteGig as dbDelete,
  getGig,
  setSetting,
  updateGig as dbUpdate,
  type GigInput,
} from "@/lib/db";
import { SETTING_YT_THUMBNAIL } from "@/lib/settings";
import { extractYoutubeVideoId } from "@/lib/youtube";
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
  const starts_at = str(fd.get("starts_at_date"));
  const status = str(fd.get("status")) as Gig["status"];

  if (!title) return { error: "Titel ist Pflicht." };
  if (!starts_at) return { error: "Eventdatum ist Pflicht." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(starts_at)) {
    return { error: "Eventdatum ist ungültig." };
  }
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
      stage: optStr(fd.get("stage")),
      lineup,
      description: optStr(fd.get("description")),
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

  dbUpdate(id, parsed.input);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateYoutubeThumbnailAction(
  _prev: { error?: string; ok?: boolean } | undefined,
  formData: FormData,
): Promise<{ error?: string; ok?: boolean }> {
  await requireAdmin();

  const raw = str(formData.get("youtube_thumbnail_input"));
  if (!raw) {
    setSetting(SETTING_YT_THUMBNAIL, null);
    revalidatePath("/");
    revalidatePath("/admin/media");
    return { ok: true };
  }

  const videoId = extractYoutubeVideoId(raw);
  if (!videoId) {
    return {
      error:
        "Ungültige Video-ID oder URL. Erwartet wird eine 11-stellige Video-ID oder eine YouTube-Link.",
    };
  }

  setSetting(SETTING_YT_THUMBNAIL, videoId);
  revalidatePath("/");
  revalidatePath("/admin/media");
  return { ok: true };
}

export async function deleteGigAction(id: string) {
  await requireAdmin();
  dbDelete(id);
  revalidatePath("/");
  revalidatePath("/admin");
}
