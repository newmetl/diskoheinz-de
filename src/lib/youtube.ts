const VIDEO_ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function extractYoutubeVideoId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (VIDEO_ID_RE.test(trimmed)) return trimmed;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id && VIDEO_ID_RE.test(id) ? id : null;
  }

  if (
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "music.youtube.com" ||
    host === "youtube-nocookie.com"
  ) {
    const v = url.searchParams.get("v");
    if (v && VIDEO_ID_RE.test(v)) return v;

    const parts = url.pathname.split("/").filter(Boolean);
    const prefixIdx = parts.findIndex((p) =>
      ["embed", "shorts", "live", "v"].includes(p),
    );
    if (prefixIdx >= 0 && parts[prefixIdx + 1]) {
      const id = parts[prefixIdx + 1];
      return VIDEO_ID_RE.test(id) ? id : null;
    }
  }

  return null;
}
