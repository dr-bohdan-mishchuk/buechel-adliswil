import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { RESTAURANT } from "@/lib/restaurant";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Restaurant Büchel Adliswil" },
      {
        name: "description",
        content: `Restaurant Büchel · ${RESTAURANT.street}, ${RESTAURANT.postal} ${RESTAURANT.city}. Telefon, E-Mail und Öffnungszeiten.`,
      },
      { property: "og:title", content: "Kontakt — Restaurant Büchel" },
      { property: "og:description", content: "Adresse, Telefon, Öffnungszeiten." },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Nav />

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
          Kontakt
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] text-ink md:text-7xl">
          Komm vorbei.
          <br />
          <span className="text-ink-soft">Oder ruf kurz an.</span>
        </h1>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                Adresse
              </h2>
              <p className="mt-3 font-display text-2xl text-ink">
                {RESTAURANT.street}
                <br />
                {RESTAURANT.postal} {RESTAURANT.city}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${RESTAURANT.name} ${RESTAURANT.street} ${RESTAURANT.city}`)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-medium text-brick hover:underline"
              >
                Route in Google Maps →
              </a>
            </section>

            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                Direkt
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href={RESTAURANT.phoneHref} className="font-display text-2xl text-ink hover:text-brick">
                    {RESTAURANT.phone}
                  </a>
                </li>
                <li>
                  <a href={RESTAURANT.emailHref} className="font-display text-2xl text-ink hover:text-brick">
                    {RESTAURANT.email}
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                Öffnungszeiten
              </h2>
              <ul className="mt-3 space-y-2">
                {RESTAURANT.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-6 border-b border-border py-2 text-base">
                    <span className="font-display font-medium text-ink">{h.days}</span>
                    <span className="font-mono text-sm text-ink-soft">
                      {h.lunch}
                      {h.dinner && ` · ${h.dinner}`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Karte"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${RESTAURANT.geo.lng - 0.005},${RESTAURANT.geo.lat - 0.003},${RESTAURANT.geo.lng + 0.005},${RESTAURANT.geo.lat + 0.003}&layer=mapnik&marker=${RESTAURANT.geo.lat},${RESTAURANT.geo.lng}`}
              className="h-full min-h-[400px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
