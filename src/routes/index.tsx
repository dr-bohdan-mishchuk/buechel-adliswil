import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Wheel } from "@/components/site/Wheel";
import { DISHES, CATEGORIES, TAG_LABEL } from "@/lib/menu-data";
import { RESTAURANT } from "@/lib/restaurant";
import heroAsset from "@/assets/hero-cordon-bleu.png.asset.json";
import pizzaAsset from "@/assets/dish-pizza.jpg.asset.json";
import pastaAsset from "@/assets/dish-pasta.webp.asset.json";
import steakAsset from "@/assets/dish-steak.jpg.asset.json";
import cordonAsset from "@/assets/dish-cordon.png.asset.json";
const heroImg = heroAsset.url;
const pizzaImg = pizzaAsset.url;
const pastaImg = pastaAsset.url;
const steakImg = steakAsset.url;
const cordonImg = cordonAsset.url;

const HOMEPAGE_CATEGORIES = [
  { id: "pizza32" as const, label: "Pizza vom Holzofen", img: pizzaImg },
  { id: "pasta" as const, label: "Pasta & Gnocchi", img: pastaImg },
  { id: "cordon" as const, label: "Cordon Bleu Parade", img: cordonImg },
  { id: "fleisch" as const, label: "Fleischparade", img: steakImg },
  { id: "fisch" as const, label: "Fischgerichte", img: heroImg },
  { id: "dessert" as const, label: "Dolci", img: pastaImg },
];

function imgForCategory(cat: string): string {
  if (cat.startsWith("pizza")) return pizzaImg;
  if (cat.startsWith("pasta") || cat === "risotto") return pastaImg;
  if (cat === "cordon") return cordonImg;
  if (cat === "fleisch" || cat === "fisch") return steakImg;
  return heroImg;
}

const FAQS = [
  {
    q: "Wo gibt es das beste Cordon Bleu in Adliswil?",
    a: "Im Restaurant Büchel an der Albisstrasse. Schweizer Schweinerücken, Gruyère AOP, von Hand paniert — täglich frisch. Mittagsmenü ab CHF 24.",
  },
  {
    q: "Welche Restaurants in Adliswil liefern Pizza nach Hause?",
    a: "Wir liefern Pizza, Pasta und Salate in rund 25 Minuten nach Adliswil, Langnau am Albis und Sood-Oberleimbach. Bestellung direkt über die Seite oder telefonisch.",
  },
  {
    q: "Hat das Restaurant Büchel heute geöffnet?",
    a: "Di–So von 11:00 bis 14:00 und 17:30 bis 23:00. Montag ist Ruhetag. Reservation online in 30 Sekunden.",
  },
  {
    q: "Kann man ohne Reservation kommen?",
    a: "Ja, Walk-ins sind willkommen. Am Wochenende empfehlen wir eine Reservation, besonders zwischen 19:00 und 21:00.",
  },
  {
    q: "Gibt es vegetarische und glutenfreie Optionen?",
    a: "Über 12 vegetarische Gerichte, glutenfreie Pizza und Pasta auf Anfrage. Allergene sind im Menü klar markiert.",
  },
  {
    q: "Wie viel kostet ein Mittagsmenü?",
    a: "Tagesmenü CHF 22 (Hauptgang) oder CHF 26 (mit Suppe oder Salat). Wechselnd Montag bis Freitag.",
  },
];

const REVIEWS = [
  { name: "Lena M.", text: "Das beste Cordon Bleu, das ich je gegessen habe. Der Käse läuft heraus wie versprochen.", rating: 5 },
  { name: "Marco R.", text: "Holzofen-Pizza wie in Neapel, mitten in Adliswil. Der Teig — Wahnsinn.", rating: 5 },
  { name: "Sara B.", text: "Reserviert in zwei Klicks, perfekt empfangen. Wir kommen wieder.", rating: 5 },
  { name: "Tobias K.", text: "Lieferung war pünktlich, Pizza noch heiss. Selten so gut.", rating: 5 },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Restaurant Büchel — Pizza, Pasta & Cordon Bleu in Adliswil" },
      {
        name: "description",
        content:
          "Holzofen-Pizza, hausgemachte Pasta und legendäres Cordon Bleu in Adliswil. Seit 1998. Reservation in 2 Klicks · Lieferung in 25 Min.",
      },
      { property: "og:title", content: "Restaurant Büchel — Adliswil" },
      {
        property: "og:description",
        content: "Holzofen, Handwerk, Hunger. Pizza, Pasta, Cordon Bleu — seit 1998.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const signatures = DISHES.filter((d) => d.tags.includes("signature")).slice(0, 6);

  return (
    <div className="min-h-screen bg-surface">
      <Nav />

      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-surface">
        <img
          src={heroImg}
          alt="Cordon Bleu mit fliessendem Gruyère"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="grain absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember"
          >
            Adliswil · seit 1998
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-surface"
          >
            Holzofen,
            <br />
            Handwerk,
            <span className="block text-ember">Hunger.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-surface/85 md:text-lg"
          >
            Pizza aus dem 380-Grad-Ofen, Cordon Bleu wie früher — nur besser.
            Mitten in Adliswil.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={RESTAURANT.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-brick px-6 text-sm font-semibold text-brick-foreground shadow-elegant transition-all hover:bg-ember"
            >
              Essen bestellen
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <Link
              to="/reservation"
              className="inline-flex h-12 items-center rounded-full border border-surface/30 bg-surface/10 px-6 text-sm font-semibold text-surface backdrop-blur-sm hover:bg-surface/20"
            >
              Tisch sichern
            </Link>
            <Link
              to="/menu"
              className="inline-flex h-12 items-center rounded-full border border-surface/20 px-6 text-sm font-semibold text-surface/90 hover:bg-surface/10"
            >
              Menü öffnen
            </Link>
          </motion.div>

          {/* Live status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-surface/70"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-basilico opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-basilico" />
              </span>
              Heute offen bis 23:00
            </span>
            <span>12 Plätze frei</span>
            <span>Lieferung ~25 Min.</span>
          </motion.div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border bg-surface-alt">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-6 text-xs uppercase tracking-widest text-ink-soft lg:px-8">
          <span className="flex items-center gap-2 font-mono">
            <span className="text-ember">★★★★★</span>
            {RESTAURANT.rating.value} · {RESTAURANT.rating.count} Google
          </span>
          <span className="font-mono">GaultMillau erwähnt</span>
          <span className="font-mono">25 Jahre Adliswil</span>
          <span className="font-mono">Lieferung in 25 Min.</span>
        </div>
      </section>

      {/* SIGNATURES */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
              Vom Ofen
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              Sechs Klassiker, die wir nicht ändern werden.
            </h2>
          </div>
          <Link
            to="/menu"
            className="hidden shrink-0 text-sm font-medium text-brick hover:underline md:inline-block"
          >
            Ganzes Menü →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signatures.map((d, i) => {
            const img = imgForCategory(d.category);
            return (
              <motion.article
                key={d.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-xl bg-card shadow-card transition-shadow hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-alt">
                  <img
                    src={img}
                    alt={d.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {d.tags.includes("signature") && (
                    <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-surface backdrop-blur-sm">
                      Signature
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {d.name}
                    </h3>
                    <span className="font-mono text-base font-semibold text-brick">
                      {d.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.desc}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="bg-ink py-24 text-surface lg:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
            Reservation
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">
            Zwei Klicks. Tisch steht.
          </h2>
          <p className="mt-5 text-base text-surface/75 md:text-lg">
            Keine App, kein Login, kein Anruf nötig.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/reservation"
              className="inline-flex h-12 items-center rounded-full bg-brick px-7 text-sm font-semibold text-brick-foreground hover:bg-ember"
            >
              Tisch reservieren
            </Link>
            <a
              href={RESTAURANT.phoneHref}
              className="inline-flex h-12 items-center rounded-full border border-surface/30 px-7 text-sm font-semibold text-surface hover:bg-surface/10"
            >
              Lieber anrufen
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
          Was wir kochen
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
          Sechs Kategorien. Ein Versprechen.
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const count = DISHES.filter((d) => d.category === c.id).length;
            return (
              <Link
                key={c.id}
                to="/menu"
                hash={c.id}
                className="group flex items-baseline justify-between gap-4 bg-card p-6 transition-colors hover:bg-surface-alt"
              >
                <div>
                  <div className="font-display text-xl font-medium text-ink">{c.label}</div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-widest text-ink-soft">
                    {count} Gerichte
                  </div>
                </div>
                <span className="font-mono text-2xl text-brick transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-surface-alt py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
                Was Gäste sagen
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
                {RESTAURANT.rating.value} ★ aus {RESTAURANT.rating.count} Bewertungen
              </h2>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={r.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl bg-card p-6 shadow-card"
              >
                <div className="font-mono text-sm text-ember">★★★★★</div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink">
                  „{r.text}"
                </blockquote>
                <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-soft">
                  — {r.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center lg:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
          Über uns
        </p>
        <p className="mt-6 font-display text-2xl leading-relaxed text-ink md:text-3xl">
          Bei uns wird der Teig 48 Stunden geführt, das Fleisch kommt vom Metzger nebenan,
          und der Espresso ist so, wie er sein muss.
          <br />
          <span className="text-ink-soft">
            Kein Schnickschnack. Nur gutes Essen, ehrliche Preise und ein Team, das bleibt.
          </span>
        </p>
      </section>

      {/* FAQ teaser */}
      <section className="border-t border-border bg-surface py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
            Häufige Fragen
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Was Gäste — und manchmal auch Google — uns fragen.
          </h2>
          <div className="mt-10 divide-y divide-border">
            {FAQS.slice(0, 4).map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                  <h3 className="font-display text-lg font-medium text-ink">{f.q}</h3>
                  <span className="mt-1 font-mono text-brick transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/faq" className="text-sm font-medium text-brick hover:underline">
              Alle Fragen ansehen →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Wheel />
    </div>
  );
}

// Suppress unused import warning while keeping the export available for tag styling later.
void TAG_LABEL;
