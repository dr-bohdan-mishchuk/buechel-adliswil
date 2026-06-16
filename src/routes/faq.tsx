import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const FAQS = [
  {
    q: "Wo gibt es das beste Cordon Bleu in Adliswil?",
    a: "Im Restaurant Büchel an der Albisstrasse. Schweizer Schweinerücken, Gruyère AOP, von Hand paniert — täglich frisch zubereitet. Mittagsmenü ab CHF 24, Classico am Abend CHF 38.",
  },
  {
    q: "Welche Restaurants in Adliswil liefern Pizza nach Hause?",
    a: "Wir liefern Pizza, Pasta und Salate innerhalb von rund 25 Minuten nach Adliswil, Langnau am Albis und Sood-Oberleimbach. Mindestbestellung CHF 30. Bestellung direkt über unsere Seite oder telefonisch.",
  },
  {
    q: "Hat das Restaurant Büchel heute geöffnet?",
    a: "Wir sind Dienstag bis Sonntag von 11:00 bis 14:00 und 17:30 bis 23:00 geöffnet (Sa/So bis 23:30). Montag Ruhetag. Reservation online in 30 Sekunden.",
  },
  {
    q: "Kann man im Büchel ohne Reservation kommen?",
    a: "Ja, Walk-ins sind jederzeit willkommen. Am Wochenende empfehlen wir aber eine Reservation, besonders zwischen 19:00 und 21:00 — dann sind wir oft voll.",
  },
  {
    q: "Gibt es vegetarische und glutenfreie Optionen?",
    a: "Über 12 vegetarische Gerichte stehen auf der Karte. Glutenfreie Pizza und Pasta gibt es auf Anfrage. Alle Allergene sind im digitalen Menü klar markiert.",
  },
  {
    q: "Wie viel kostet ein Mittagsmenü im Büchel?",
    a: "Unser Tagesmenü kostet CHF 22 (Hauptgang) oder CHF 26 (mit Suppe oder Salat). Wechselnd Montag bis Freitag, immer mit einer vegetarischen Option.",
  },
  {
    q: "Gibt es Parkplätze beim Restaurant?",
    a: "Gratis-Parkplätze direkt vor dem Haus. Die S-Bahn-Haltestelle Adliswil liegt 4 Minuten zu Fuss entfernt.",
  },
  {
    q: "Kann ich Geschenkgutscheine kaufen?",
    a: "Ja. Gutscheine in jedem Betrag, vor Ort oder per Telefon. Per Post oder zum selbst Ausdrucken — wie du es magst.",
  },
  {
    q: "Ist das Restaurant kinderfreundlich?",
    a: "Sehr. Kinderstühle stehen bereit, halbe Portionen sind selbstverständlich. Eine kleine Karte für die Kleinen gibt es auf Nachfrage.",
  },
  {
    q: "Kann ich für eine grosse Gruppe reservieren?",
    a: "Bis 8 Personen direkt online. Für grössere Gruppen oder private Anlässe ruf uns kurz an — wir richten gerne ein.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Häufige Fragen — Restaurant Büchel Adliswil" },
      {
        name: "description",
        content: "Antworten auf die häufigsten Fragen zu Öffnungszeiten, Reservation, Lieferung, Allergien und mehr.",
      },
      { property: "og:title", content: "FAQ — Restaurant Büchel" },
      { property: "og:description", content: "Alles was Gäste — und Google — uns fragen." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
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
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Nav />

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
          Häufige Fragen
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] text-ink md:text-7xl">
          Was Gäste — und manchmal auch Google — uns fragen.
        </h1>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                <h2 className="font-display text-lg font-medium text-ink md:text-xl">
                  {f.q}
                </h2>
                <span className="mt-1 font-mono text-2xl text-brick transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
