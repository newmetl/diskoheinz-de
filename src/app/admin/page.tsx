import Link from "next/link";
import Image from "next/image";
import { listGigs } from "@/lib/db";
import { deleteGigAction } from "./actions";
import { DeleteGigButton } from "@/components/admin/DeleteGigButton";
import { isPastGig } from "@/lib/gig-time";
import type { Gig } from "@/data/types";

function formatDate(date: string) {
  const d = new Date(`${date.slice(0, 10)}T12:00:00`);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function GigRow({ gig, isPast }: { gig: Gig; isPast: boolean }) {
  const deleteWithId = deleteGigAction.bind(null, gig.id);
  return (
    <div
      className={`flex items-center gap-4 p-4 border-b border-white/5 ${
        isPast ? "opacity-60" : ""
      }`}
    >
      <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
        <Image
          src="/images/disco-sm.png"
          alt=""
          width={48}
          height={48}
          aria-hidden="true"
          className="w-full h-full object-contain opacity-80"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold truncate">{gig.title}</span>
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">
            {gig.status}
          </span>
          {gig.is_headliner && (
            <span className="text-[10px] text-tertiary-fixed-dim">★ headliner</span>
          )}
          {gig.is_private && (
            <span className="text-[10px] text-on-surface-variant">private</span>
          )}
        </div>
        <div className="text-xs text-on-surface-variant mt-1">
          {formatDate(gig.starts_at)} · {gig.venue || "–"} · {gig.city || "–"}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/admin/gigs/${gig.id}`}
          className="px-4 py-2 border border-outline-variant text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-surface transition-all"
        >
          Edit
        </Link>
        <DeleteGigButton action={deleteWithId} gigTitle={gig.title} />
      </div>
    </div>
  );
}

export default async function AdminHome() {
  const gigs = listGigs();
  const upcoming = gigs
    .filter((g) => !isPastGig(g.starts_at))
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
  const past = gigs
    .filter((g) => isPastGig(g.starts_at))
    .sort((a, b) => b.starts_at.localeCompare(a.starts_at));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-headline font-black uppercase tracking-tighter text-white">
          Gigs
        </h1>
        <Link
          href="/admin/gigs/new"
          className="px-6 py-3 bg-secondary text-on-secondary text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          New gig
        </Link>
      </div>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">
          Upcoming ({upcoming.length})
        </h2>
        <div className="bg-surface-container-low">
          {upcoming.length === 0 ? (
            <p className="p-6 text-on-surface-variant text-sm">No upcoming gigs.</p>
          ) : (
            upcoming.map((g) => <GigRow key={g.id} gig={g} isPast={false} />)
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">
            Past ({past.length})
          </h2>
          <div className="bg-surface-container-low">
            {past.map((g) => (
              <GigRow key={g.id} gig={g} isPast={true} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
