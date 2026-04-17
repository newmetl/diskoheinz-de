// Gig dates are stored as "YYYY-MM-DD". Helpers treat them as local
// calendar dates to avoid UTC-shift surprises.

export function isPastGig(date: string, now: Date = new Date()): boolean {
  const end = new Date(`${date.slice(0, 10)}T23:59:59`);
  return end.getTime() < now.getTime();
}
