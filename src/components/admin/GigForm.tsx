"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Gig } from "@/data/types";
import { splitIsoLocal } from "@/lib/gig-time";

type ActionFn = (
  prev: { error?: string } | undefined,
  fd: FormData,
) => Promise<{ error?: string }>;

export default function GigForm({
  gig,
  action,
  submitLabel,
}: {
  gig?: Gig;
  action: ActionFn;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {
    error: undefined as string | undefined,
  });

  const starts = splitIsoLocal(gig?.starts_at);
  const ends = splitIsoLocal(gig?.ends_at);

  const input =
    "w-full px-4 py-2 bg-surface-container border border-outline-variant text-white focus:outline-none focus:border-secondary";
  const label =
    "block text-xs uppercase tracking-widest text-on-surface-variant mb-2";

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className={label}>
            Title *
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={gig?.title ?? ""}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="status" className={label}>
            Status *
          </label>
          <select
            id="status"
            name="status"
            defaultValue={gig?.status ?? "confirmed"}
            className={input}
          >
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending / TBA</option>
            <option value="sold_out">Sold out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label htmlFor="venue" className={label}>
            Venue
          </label>
          <input
            id="venue"
            name="venue"
            defaultValue={gig?.venue ?? ""}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="city" className={label}>
            City
          </label>
          <input
            id="city"
            name="city"
            defaultValue={gig?.city ?? ""}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="country" className={label}>
            Country (ISO, e.g. DE)
          </label>
          <input
            id="country"
            name="country"
            defaultValue={gig?.country ?? ""}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="stage" className={label}>
            Stage
          </label>
          <input
            id="stage"
            name="stage"
            defaultValue={gig?.stage ?? ""}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="starts_at_date" className={label}>
            Start date *
          </label>
          <input
            id="starts_at_date"
            name="starts_at_date"
            type="date"
            required
            defaultValue={starts.date}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="starts_at_time" className={label}>
            Start time
          </label>
          <input
            id="starts_at_time"
            name="starts_at_time"
            type="time"
            defaultValue={starts.time}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="ends_at_date" className={label}>
            End date
          </label>
          <input
            id="ends_at_date"
            name="ends_at_date"
            type="date"
            defaultValue={ends.date}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="ends_at_time" className={label}>
            End time
          </label>
          <input
            id="ends_at_time"
            name="ends_at_time"
            type="time"
            defaultValue={ends.time}
            className={input}
          />
        </div>
      </div>

      <div>
        <label htmlFor="lineup" className={label}>
          Lineup (comma separated)
        </label>
        <input
          id="lineup"
          name="lineup"
          defaultValue={gig?.lineup?.join(", ") ?? ""}
          className={input}
        />
      </div>

      <div>
        <label htmlFor="description" className={label}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={gig?.description ?? ""}
          className={input}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="event_url" className={label}>
            Event URL
          </label>
          <input
            id="event_url"
            name="event_url"
            type="url"
            defaultValue={gig?.event_url ?? ""}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="ticket_url" className={label}>
            Ticket URL
          </label>
          <input
            id="ticket_url"
            name="ticket_url"
            type="url"
            defaultValue={gig?.ticket_url ?? ""}
            className={input}
          />
        </div>
      </div>

      <div>
        <label className={label}>Flyer</label>
        {gig?.flyer_url && (
          <div className="flex items-center gap-4 mb-3">
            <div className="relative w-20 h-20 bg-surface-container-highest overflow-hidden">
              <Image
                src={gig.flyer_url}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                unoptimized={gig.flyer_url.startsWith("/uploads/")}
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-on-surface-variant">
              <input type="checkbox" name="remove_flyer" />
              Remove current flyer
            </label>
          </div>
        )}
        <input
          type="file"
          name="flyer_file"
          accept="image/*"
          className="text-sm text-on-surface-variant"
        />
        <p className="text-xs text-on-surface-variant/70 mt-2">
          Upload wird automatisch auf 800×800 WebP konvertiert. Alternativ eine externe URL:
        </p>
        <input
          name="flyer_url"
          type="url"
          placeholder="https://…"
          defaultValue={
            gig?.flyer_url && !gig.flyer_url.startsWith("/uploads/")
              ? gig.flyer_url
              : ""
          }
          className={`${input} mt-2`}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            name="is_headliner"
            defaultChecked={gig?.is_headliner ?? false}
          />
          Headliner
        </label>
        <label className="flex items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            name="is_private"
            defaultChecked={gig?.is_private ?? false}
          />
          Private event (hides title & venue publicly)
        </label>
      </div>

      {state?.error && <p className="text-sm text-error">{state.error}</p>}

      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-3 bg-secondary text-on-secondary text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {pending ? "…" : submitLabel}
        </button>
        <Link
          href="/admin"
          className="px-6 py-3 border border-outline-variant text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-white transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
