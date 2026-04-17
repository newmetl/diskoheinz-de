"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Gig } from "@/data/types";

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

  const startDate = gig?.starts_at ? gig.starts_at.slice(0, 10) : "";

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
            Event date *
          </label>
          <input
            id="starts_at_date"
            name="starts_at_date"
            type="date"
            required
            defaultValue={startDate}
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
