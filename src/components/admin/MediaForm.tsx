"use client";

import { useActionState } from "react";

type ActionFn = (
  prev: { error?: string; ok?: boolean } | undefined,
  fd: FormData,
) => Promise<{ error?: string; ok?: boolean }>;

export default function MediaForm({
  action,
  currentVideoId,
}: {
  action: ActionFn;
  currentVideoId?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {
    error: undefined as string | undefined,
    ok: false,
  });

  const input =
    "w-full px-4 py-2 bg-surface-container border border-outline-variant text-white focus:outline-none focus:border-secondary";
  const label =
    "block text-xs uppercase tracking-widest text-on-surface-variant mb-2";

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="youtube_thumbnail_input" className={label}>
          YouTube Video-ID oder URL
        </label>
        <input
          id="youtube_thumbnail_input"
          name="youtube_thumbnail_input"
          type="text"
          defaultValue={currentVideoId ?? ""}
          placeholder="z. B. dQw4w9WgXcQ oder https://www.youtube.com/watch?v=…"
          className={input}
        />
        <p className="text-xs text-on-surface-variant/70 mt-2">
          Akzeptiert wird eine 11-stellige Video-ID oder eine komplette YouTube-URL
          (youtube.com/watch?v=…, youtu.be/…, youtube.com/shorts/…, …). Leer lassen,
          um auf die Standard-Vorschau zurückzugehen.
        </p>
      </div>

      {currentVideoId && (
        <div>
          <p className={label}>Aktuelle Vorschau</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${currentVideoId}/hqdefault.jpg`}
            alt=""
            className="w-64 aspect-video object-cover border border-outline-variant"
          />
        </div>
      )}

      {state?.error && <p className="text-sm text-error">{state.error}</p>}
      {state?.ok && !state.error && (
        <p className="text-sm text-tertiary-fixed-dim">Gespeichert.</p>
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-3 bg-secondary text-on-secondary text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {pending ? "…" : "Speichern"}
        </button>
      </div>
    </form>
  );
}
