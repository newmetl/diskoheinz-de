"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import type { Gig } from "@/data/types";
import gigsData from "@/data/gigs.json";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date
    .toLocaleString("en", { month: "short" })
    .toUpperCase();
  return { day, month };
}

function GigRow({ gig, variant }: { gig: Gig; variant: "upcoming" | "past" }) {
  const { day, month } = formatDate(gig.date);
  const isPast = variant === "past";

  return (
    <div
      className={`group flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-surface-container-high transition-all border-b border-white/5 ${
        isPast ? "opacity-50 hover:opacity-80" : ""
      }`}
    >
      <div className="flex items-center gap-8 mb-4 md:mb-0">
        <div className="text-center w-16 shrink-0">
          <div className="text-2xl font-headline font-black text-white">
            {day}
          </div>
          <div className="text-[10px] uppercase font-bold text-secondary">
            {month}
          </div>
        </div>
        <div>
          <h4 className="text-xl font-headline font-bold text-white group-hover:text-tertiary-fixed-dim transition-colors uppercase">
            {gig.title}
          </h4>
          <p className="text-sm text-on-surface-variant">
            {gig.venue} &middot; {gig.city}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-8">
        {gig.stage && (
          <div className="hidden lg:block text-right">
            <div className="text-xs font-bold text-white uppercase tracking-widest">
              {gig.stage}
            </div>
            {gig.time && (
              <div className="text-[10px] text-on-surface-variant">
                {gig.time}
              </div>
            )}
          </div>
        )}

        {gig.status === "sold_out" ? (
          <span className="px-6 py-2 bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-widest">
            Sold Out
          </span>
        ) : gig.event_url && !isPast ? (
          <a
            href={gig.event_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2 border border-outline-variant text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-surface transition-all"
          >
            Tickets
            <ExternalLink size={12} />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function GigsSection() {
  const [showPast, setShowPast] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const gigs = gigsData as Gig[];
  const upcoming = gigs
    .filter((g) => g.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = gigs
    .filter((g) => g.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

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
              Tour <span className="text-secondary">Dates</span>
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
                className="space-y-0"
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
