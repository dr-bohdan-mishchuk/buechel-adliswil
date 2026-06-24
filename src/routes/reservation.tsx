import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Tisch reservieren — Restaurant Büchel Adliswil" },
      {
        name: "description",
        content: "Reservation in zwei Klicks. Keine App, kein Login. Bestätigung sofort per SMS.",
      },
      { property: "og:title", content: "Tisch reservieren — Büchel" },
      { property: "og:description", content: "Zwei Klicks. Tisch steht." },
      { property: "og:url", content: "/reservation" },
    ],
    links: [{ rel: "canonical", href: "/reservation" }],
  }),
  component: ReservationPage,
});

const TIMES = ["11:30", "12:00", "12:30", "13:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

function dateOpts() {
  const out: { value: string; label: string }[] = [];
  const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  for (let i = 0; i < 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const v = d.toISOString().slice(0, 10);
    const l = i === 0 ? "Heute" : i === 1 ? "Morgen" : `${days[d.getDay()]} ${d.getDate()}. ${months[d.getMonth()]}`;
    out.push({ value: v, label: l });
  }
  return out;
}

function ReservationPage() {
  const dates = dateOpts();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState(dates[0].value);
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const goStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const { error } = await supabase.from("reservations").insert({
      reservation_date: date,
      reservation_time: time,
      guests,
      name,
      phone,
      note: note || null,
    });
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setStep(3);
  };

  const selectedDateLabel = dates.find((d) => d.value === date)?.label;

  return (
    <div className="min-h-screen bg-surface">
      <Nav />

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-32 lg:px-8">
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
            Reservation
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
            Zwei Klicks. Tisch steht.
          </h1>
          <p className="mt-4 text-base text-ink-soft md:text-lg">
            Keine App, kein Login, kein Anruf nötig.
          </p>
        </div>

        {/* Stepper */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {[1, 2].map((n) => (
            <div key={n} className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm font-semibold transition-colors ${
                  step >= n ? "bg-brick text-brick-foreground" : "bg-surface-alt text-ink-soft"
                }`}
              >
                {n}
              </div>
              {n === 1 && <div className="h-px w-12 bg-border" />}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-card p-6 shadow-card md:p-10">
          {step === 1 && (
            <motion.form
              key="s1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={goStep2}
              className="space-y-6"
            >
              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  Datum
                </label>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                  {dates.slice(0, 8).map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setDate(d.value)}
                      className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                        date === d.value
                          ? "border-brick bg-brick text-brick-foreground"
                          : "border-border bg-surface text-ink hover:border-ink-soft"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  Uhrzeit
                </label>
                <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                        time === t
                          ? "border-brick bg-brick text-brick-foreground"
                          : "border-border bg-surface text-ink hover:border-ink-soft"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  Personen
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setGuests(n)}
                      className={`h-11 w-11 rounded-full border text-sm font-medium transition-colors ${
                        guests === n
                          ? "border-brick bg-brick text-brick-foreground"
                          : "border-border bg-surface text-ink hover:border-ink-soft"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-full bg-brick text-sm font-semibold text-brick-foreground transition-all hover:bg-ember"
              >
                Weiter →
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              key="s2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={submit}
              className="space-y-5"
            >
              <div className="rounded-lg bg-surface-alt p-4 text-sm text-ink">
                <strong className="font-display">{selectedDateLabel}</strong> · {time} ·{" "}
                {guests} {guests === 1 ? "Person" : "Personen"}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="ml-3 text-xs text-brick underline-offset-2 hover:underline"
                >
                  ändern
                </button>
              </div>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dein Name"
                maxLength={80}
                className="h-12 w-full rounded-md border border-input bg-card px-4 text-sm focus:border-brick focus:outline-none"
              />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefonnummer"
                maxLength={30}
                className="h-12 w-full rounded-md border border-input bg-card px-4 text-sm focus:border-brick focus:outline-none"
              />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Allergien, Geburtstag, Kinderstuhl … (optional)"
                maxLength={500}
                rows={3}
                className="w-full rounded-md border border-input bg-card px-4 py-3 text-sm focus:border-brick focus:outline-none"
              />
              {err && <p className="text-sm text-brick">{err}</p>}
              <button
                type="submit"
                disabled={busy}
                className="h-12 w-full rounded-full bg-brick text-sm font-semibold text-brick-foreground transition-all hover:bg-ember disabled:opacity-50"
              >
                {busy ? "…" : "Tisch bestätigen"}
              </button>
              <p className="text-center text-[11px] text-ink-soft">
                Mit dem Klick stimmst du unserer Reservationsregelung zu.
              </p>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-basilico/15 text-3xl">
                ✓
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold text-ink">
                Tisch reserviert.
              </h2>
              <p className="mt-3 text-base text-ink-soft">
                Sehen uns <strong className="text-ink">{selectedDateLabel}</strong> um{" "}
                <strong className="text-ink">{time}</strong>. Wir freuen uns, <strong className="text-ink">{name}</strong>.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Bestätigung kommt per SMS an {phone}.
              </p>
              <Link
                to="/"
                className="mt-8 inline-flex h-11 items-center rounded-full border border-border bg-surface px-6 text-sm font-medium text-ink hover:bg-surface-alt"
              >
                Zurück zur Startseite
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
