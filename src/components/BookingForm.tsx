"use client";

import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle } from "lucide-react";

export default function BookingForm() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "abcdefg";
  const [state, handleSubmit] = useForm(formspreeId);

  if (state.succeeded) {
    return (
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto" id="booking">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-container p-12 rounded-xl text-center"
        >
          <CheckCircle
            size={48}
            className="text-tertiary-fixed-dim mx-auto mb-6"
          />
          <h3 className="text-3xl font-headline font-bold text-white mb-4">
            Danke für deine Anfrage!
          </h3>
          <p className="text-on-surface-variant">
            Diskoheinz meldet sich bei dir.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto" id="booking">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tighter uppercase mb-4">
          <span className="text-tertiary-fixed-dim">Booking</span>
        </h2>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          For availability, festival inquiries, and club bookings. We&apos;ll get
          back to you asap.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-surface-container p-8 md:p-12 rounded-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-32 -mt-32" />

        <form
          onSubmit={handleSubmit}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                Name / Organisation
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Name oder Organisation"
                className="w-full bg-surface-container-lowest border-none text-white focus:ring-1 focus:ring-secondary rounded-md p-4 placeholder:text-surface-container-highest"
              />
              <ValidationError
                field="name"
                errors={state.errors}
                className="text-error text-xs mt-1"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="deine@email.de"
                className="w-full bg-surface-container-lowest border-none text-white focus:ring-1 focus:ring-secondary rounded-md p-4 placeholder:text-surface-container-highest"
              />
              <ValidationError
                field="email"
                errors={state.errors}
                className="text-error text-xs mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  name="event_date"
                  className="w-full bg-surface-container-lowest border-none text-white focus:ring-1 focus:ring-secondary rounded-md p-4"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full bg-surface-container-lowest border-none text-white focus:ring-1 focus:ring-secondary rounded-md p-4 placeholder:text-surface-container-highest"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                Venue
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location / Venue"
                className="w-full bg-surface-container-lowest border-none text-white focus:ring-1 focus:ring-secondary rounded-md p-4 placeholder:text-surface-container-highest"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                Event Type
              </label>
              <select
                name="event_type"
                defaultValue=""
                className="w-full bg-surface-container-lowest border-none text-white focus:ring-1 focus:ring-secondary rounded-md p-4"
              >
                <option value="" disabled>
                  Art des Events
                </option>
                <option value="club">Club Night</option>
                <option value="festival">Festival</option>
                <option value="private">Private Event</option>
                <option value="corporate">Corporate Event</option>
                <option value="other">Sonstiges</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                Message / Details
              </label>
              <textarea
                name="message"
                rows={7}
                placeholder="Tell us about the event vibe, expected attendance, and equipment..."
                className="w-full bg-surface-container-lowest border-none text-white focus:ring-1 focus:ring-secondary rounded-md p-4 placeholder:text-surface-container-highest resize-none"
              />
            </div>
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="_gotcha"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-headline font-black uppercase tracking-[0.2em] py-5 rounded-md hover:shadow-[0_0_20px_rgba(223,21,114,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Wird gesendet..." : "Send Inquiry"}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
