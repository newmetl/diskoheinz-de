"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ChevronDown, Lock, Star, Disc3 } from "lucide-react";
import type { Gig } from "@/data/types";
import gigsData from "@/data/gigs.json";

function formatDateParts(iso: string) {
  const date = new Date(iso);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date
    .toLocaleString("en", { month: "short" })
    .toUpperCase();
  const year = date.getFullYear().toString();
  return { day, month, year };
}

function formatTimeRange(startsAt: string, endsAt?: string) {
  const start = new Date(startsAt);
  const startStr = start.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (!endsAt) return startStr;
  const end = new Date(endsAt);
  const endStr = end.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${startStr}–${endStr}`;
}

function StatusBadge({ status }: { status: Gig["status"] }) {
  if (status === "sold_out") {
    return (
      <span className="px-6 py-2 bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
        Sold Out
      </span>
    );
  }
  if (status === "cancelled") {
    return (
      <span className="px-6 py-2 bg-error/20 text-error border border-error/40 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
        Cancelled
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="px-6 py-2 border border-outline-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
        TBA
      </span>
    );
  }
  return null;
}

function GigRow({ gig, variant }: { gig: Gig; variant: "upcoming" | "past" }) {
  const { day, month } = formatDateParts(gig.starts_at);
  const isPast = variant === "past";
  const isCancelled = gig.status === "cancelled";
  const ticketHref = gig.ticket_url || gig.event_url;
  const showTicketButton =
    !isPast &&
    !gig.is_private &&
    gig.status !== "sold_out" &&
    gig.status !== "cancelled" &&
    ticketHref;

  const displayTitle = gig.is_private ? "Private Event" : gig.title;
  const displayVenue = gig.is_private ? null : gig.venue;

  return (
    <div
      className={`group flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-surface-container-high transition-all border-b border-white/5 ${
        isPast ? "opacity-50 hover:opacity-80" : ""
      } ${isCancelled ? "opacity-60" : ""} ${
        gig.is_headliner && !isPast
          ? "border-l-2 border-l-tertiary-fixed-dim"
          : ""
      }`}
    >
      <div className="flex items-center gap-6 mb-4 md:mb-0 min-w-0">
        <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-surface-container-highest">
          {gig.flyer_url ? (
            <Image
              src={gig.flyer_url}
              alt={`${gig.title} flyer`}
              fill
              sizes="64px"
              className={`object-cover ${isCancelled ? "grayscale" : ""}`}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <Disc3
                size={28}
                className="text-on-surface-variant/30"
                strokeWidth={1.5}
              />
            </div>
          )}
        </div>

        <div className="text-center w-14 shrink-0">
          <div
            className={`text-2xl font-headline font-black text-white ${
              isCancelled ? "line-through decoration-error/60" : ""
            }`}
          >
            {day}
          </div>
          <div className="text-[10px] uppercase font-bold text-secondary">
            {month}
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {gig.is_headliner && !isPast && (
              <Star
                size={12}
                className="text-tertiary-fixed-dim shrink-0 fill-tertiary-fixed-dim"
              />
            )}
            {gig.is_private && (
              <Lock size={12} className="text-on-surface-variant shrink-0" />
            )}
            <h4
              className={`text-xl font-headline font-bold text-white group-hover:text-tertiary-fixed-dim transition-colors uppercase truncate ${
                isCancelled ? "line-through decoration-error/60" : ""
              }`}
            >
              {displayTitle}
            </h4>
          </div>

          <p className="text-sm text-on-surface-variant mt-0.5">
            {displayVenue && <>{displayVenue} &middot; </>}
            {gig.city}
            {gig.country && gig.country !== "DE" && (
              <>, {gig.country}</>
            )}
          </p>

          {gig.lineup && gig.lineup.length > 0 && !gig.is_private && (
            <p className="text-xs text-on-surface-variant/70 mt-1 truncate">
              w/ {gig.lineup.filter((a) => a !== "Diskoheinz").join(" · ")}
            </p>
          )}

          {gig.description && !gig.is_private && (
            <p className="text-xs text-on-surface-variant/70 mt-2 max-w-2xl line-clamp-2">
              {gig.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
        {(gig.stage || gig.starts_at) && (
          <div className="hidden lg:block text-right">
            {gig.stage && (
              <div className="text-xs font-bold text-white uppercase tracking-widest">
                {gig.stage}
              </div>
            )}
            <div className="text-[10px] text-on-surface-variant">
              {formatTimeRange(gig.starts_at, gig.ends_at)}
            </div>
          </div>
        )}

        <StatusBadge status={gig.status} />

        {showTicketButton && (
          <a
            href={ticketHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2 border border-outline-variant text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-surface transition-all whitespace-nowrap"
          >
            Tickets
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function GigsSection() {
  const [showPast, setShowPast] = useState(false);
  const now = new Date().toISOString();

  const gigs = gigsData as Gig[];
  const upcoming = gigs
    .filter((g) => g.starts_at >= now)
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
  const past = gigs
    .filter((g) => g.starts_at < now)
    .sort((a, b) => b.starts_at.localeCompare(a.starts_at));

  return (
    <section className="bg-surface-container-low py-24" id="gigs">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tighter uppercase mb-2">
              <span className="text-secondary">Gigs</span>
            </h2>
            <div className="h-1 w-24 bg-secondary" />
          </div>
        </motion.div>

        {/* Upcoming Gigs */}
        <div className="space-y-0">
          {upcoming.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-on-surface-variant text-lg font-headline">
                No upcoming gigs &mdash; stay tuned!
              </p>
            </div>
          ) : (
            upcoming.map((gig, i) => (
              <motion.div
                key={gig.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <GigRow gig={gig} variant="upcoming" />
              </motion.div>
            ))
          )}
        </div>

        {/* Past Gigs */}
        {past.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setShowPast(!showPast)}
              className="flex items-center gap-2 text-sm font-headline font-bold uppercase tracking-tighter text-on-surface-variant hover:text-white transition-colors py-3"
            >
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  showPast ? "rotate-180" : ""
                }`}
              />
              Past Gigs ({past.length})
            </button>

            {showPast && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="space-y-0 overflow-hidden"
              >
                {past.map((gig) => (
                  <GigRow key={gig.id} gig={gig} variant="past" />
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
