import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

import { DISHES, TAG_LABEL } from "@/lib/menu-data";
import { RESTAURANT } from "@/lib/restaurant";
import { useI18n } from "@/lib/i18n";
import heroAsset from "@/assets/hero-cordon-bleu.png.asset.json";
import pizzaAsset from "@/assets/dish-pizza.jpg.asset.json";
import pastaAsset from "@/assets/dish-pasta.webp.asset.json";
import steakAsset from "@/assets/dish-steak.jpg.asset.json";
import cordonAsset from "@/assets/dish-cordon.png.asset.json";
import fischAsset from "@/assets/dish-fisch.jpg.asset.json";
import dessertAsset from "@/assets/dish-dessert.jpg.asset.json";
import salatAsset from "@/assets/dish-salat.jpg.asset.json";
import risottoAsset from "@/assets/dish-risotto.jpg.asset.json";
import margheritaAsset from "@/assets/dish-margherita.jpg.asset.json";
import buttafuocoAsset from "@/assets/dish-buttafuoco.jpg.asset.json";
import prosciuttoAsset from "@/assets/dish-prosciutto.jpg.asset.json";
import calzoneVegiAsset from "@/assets/dish-calzone-vegi.jpg.asset.json";
import calzoneVealAsset from "@/assets/dish-calzone-veal.jpg.asset.json";
import spaghettiBuechelAsset from "@/assets/dish-spaghetti-buechel.jpg.asset.json";

const heroImg = heroAsset.url;
const pizzaImg = pizzaAsset.url;
const pastaImg = pastaAsset.url;
const steakImg = steakAsset.url;
const cordonImg = cordonAsset.url;
const fischImg = fischAsset.url;
const dessertImg = dessertAsset.url;
const salatImg = salatAsset.url;
const risottoImg = risottoAsset.url;

const HOMEPAGE_CATEGORIES = [
  { id: "pizza32" as const, label: "Pizza vom Holzofen", img: pizzaImg },
  { id: "pasta" as const, label: "Pasta & Gnocchi", img: pastaImg },
  { id: "cordon" as const, label: "Cordon Bleu Parade", img: cordonImg },
  { id: "fleisch" as const, label: "Fleischparade", img: steakImg },
  { id: "fisch" as const, label: "Fischgerichte", img: fischImg },
  { id: "dessert" as const, label: "Dolci", img: dessertImg },
];

// Per-dish unique images — overrides category fallback so no two cards share a photo.
const DISH_IMG: Record<string, string> = {
  "pizza32-pizza-margherita-o32": margheritaAsset.url,
  "pizza32-pizza-buttafuoco-scharf-o32": buttafuocoAsset.url,
  "pizza32-pizza-prosciutto-crudo-o32": prosciuttoAsset.url,
  "pizza-spezial-pizza-vegi-insel-zugedeckt-o32": calzoneVegiAsset.url,
  "pizza-spezial-pizza-alaz-insel-zugedeckt-o32": calzoneVealAsset.url,
  "pasta-spaghetti-buechel": spaghettiBuechelAsset.url,
};

const CATEGORY_IMG: Record<string, string> = {
  vorspeise: salatImg,
  salat: salatImg,
  "pizza-pickup": pizzaImg,
  pizza32: pizzaImg,
  pizza40: pizzaImg,
  "pizza-spezial": pizzaImg,
  pasta: pastaImg,
  "pasta-lieblinge": pastaImg,
  risotto: risottoImg,
  fleisch: steakImg,
  cordon: cordonImg,
  fisch: fischImg,
  spezial: salatImg,
  dessert: dessertImg,
};

function imgForDish(slug: string, category: string): string {
  return DISH_IMG[slug] ?? CATEGORY_IMG[category] ?? heroImg;
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
  const { t } = useI18n();
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
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-surface"
          >
            {t("hero.t1")}
            <br />
            {t("hero.t2")}
            <span className="block text-ember">{t("hero.t3")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-surface/85 md:text-lg"
          >
            {t("hero.subtitle")}
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
              {t("cta.order")}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <Link
              to="/reservation"
              className="inline-flex h-12 items-center rounded-full border border-surface/30 bg-surface/10 px-6 text-sm font-semibold text-surface backdrop-blur-sm hover:bg-surface/20"
            >
              {t("cta.book")}
            </Link>
            <Link
              to="/menu"
              className="inline-flex h-12 items-center rounded-full border border-surface/20 px-6 text-sm font-semibold text-surface/90 hover:bg-surface/10"
            >
              {t("cta.openMenu")}
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
              {t("hero.openUntil")}
            </span>
            <span>{t("hero.seatsFree")}</span>
            <span>{t("hero.delivery")}</span>
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
            const img = imgForDish(d.slug, d.category);
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
              {t("nav.book")}
            </Link>
            <a
              href={RESTAURANT.phoneHref}
              className="inline-flex h-12 items-center gap-3 rounded-full border border-surface/30 px-7 text-sm font-semibold text-surface hover:bg-surface/10"
            >
              <span>{t("cta.callInstead")}</span>
              <span className="font-mono text-ember">{RESTAURANT.phone}</span>
            </a>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-surface/50">
            {t("cta.mobileHint")}
          </p>
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
          {HOMEPAGE_CATEGORIES.map((c) => {
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

      {/* MAP / FINDEN */}
      <section className="border-t border-border bg-surface-alt">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
              So findest Du uns
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              Albisstrasse 90, mitten in Adliswil.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              5 Gehminuten vom Bahnhof Adliswil. Parkplätze direkt vor dem Haus.
              Tap auf die Karte — Google Maps öffnet die Route.
            </p>
            <dl className="mt-8 grid gap-3 text-sm">
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  Adresse
                </dt>
                <dd className="text-ink">
                  {RESTAURANT.street}, {RESTAURANT.postal} {RESTAURANT.city}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  Telefon
                </dt>
                <dd>
                  <a href={RESTAURANT.phoneHref} className="text-brick hover:underline">
                    {RESTAURANT.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  ÖV
                </dt>
                <dd className="text-ink">S4 Adliswil · Bus 184 / 185</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT.geo.lat},${RESTAURANT.geo.lng}&destination_place_id=${encodeURIComponent(RESTAURANT.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-brick px-5 text-sm font-semibold text-brick-foreground hover:bg-ember"
              >
                Route planen →
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${RESTAURANT.geo.lat},${RESTAURANT.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full border border-border bg-card px-5 text-sm font-semibold text-ink hover:bg-surface"
              >
                In Google Maps öffnen
              </a>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT.geo.lat},${RESTAURANT.geo.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Route zu Restaurant Büchel in Google Maps öffnen"
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-card transition-shadow hover:shadow-elegant"
          >
            <iframe
              title="Karte — Restaurant Büchel, Albisstrasse 90, 8134 Adliswil"
              src={`https://www.google.com/maps?q=${RESTAURANT.geo.lat},${RESTAURANT.geo.lng}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none h-full w-full border-0"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent px-5 py-4 text-sm font-semibold text-surface">
              <span>Restaurant Büchel · Albisstrasse 90</span>
              <span className="rounded-full bg-brick px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-brick-foreground transition-transform group-hover:translate-x-0.5">
                Route →
              </span>
            </span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Suppress unused import warning while keeping the export available for tag styling later.
void TAG_LABEL;
