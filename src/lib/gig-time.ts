// Helpers for Gig start/end values that may be either a full ISO datetime
// ("2026-04-18T18:00:00.000Z") or a date-only string ("2026-04-18") when
// the exact time is not yet known.

export function hasTime(iso: string | undefined | null): boolean {
  return !!iso && iso.includes("T");
}

// For display: split an existing value into date + time pieces in the local TZ.
export function splitIsoLocal(iso?: string): { date: string; time: string } {
  if (!iso) return { date: "", time: "" };
  if (!iso.includes("T")) return { date: iso.slice(0, 10), time: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "", time: "" };
  const pad = (n: number) => n.toString().padStart(2, "0");
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

// For parsing: combine date + optional time.
// Returns ISO string (UTC) if time is present, or "YYYY-MM-DD" date-only otherwise.
export function combineDateTime(
  date: string,
  time: string,
): string | undefined {
  if (!date) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined;
  if (!time) return date;
  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(time)) return undefined;
  const d = new Date(`${date}T${time}`);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

// "Has this gig already happened?" — treats date-only starts as end-of-day.
export function isPastGig(
  starts_at: string,
  ends_at?: string,
  now: Date = new Date(),
): boolean {
  const reference = ends_at ?? starts_at;
  const end = hasTime(reference)
    ? new Date(reference)
    : new Date(`${reference.slice(0, 10)}T23:59:59`);
  return end.getTime() < now.getTime();
}
