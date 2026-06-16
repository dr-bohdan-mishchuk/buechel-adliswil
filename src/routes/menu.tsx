import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DISHES, CATEGORIES, TAG_LABEL, type DishTag } from "@/lib/menu-data";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menü — Restaurant Büchel Adliswil" },
      {
        name: "description",
        content:
          "Vollständiges Menü: Pizza vom Holzofen, hausgemachte Pasta, Cordon Bleu, Steaks vom Grill. Mit Preisen und Allergeninformationen.",
      },
      { property: "og:title", content: "Menü — Restaurant Büchel" },
      { property: "og:description", content: "Pizza, Pasta, Cordon Bleu, Steaks — alle Gerichte mit Preisen." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          name: "Speisekarte Restaurant Büchel",
          hasMenuSection: CATEGORIES.map((c) => ({
            "@type": "MenuSection",
            name: c.label,
            hasMenuItem: DISHES.filter((d) => d.category === c.id).map((d) => ({
              "@type": "MenuItem",
              name: d.name,
              description: d.desc,
              offers: { "@type": "Offer", price: d.price.toFixed(2), priceCurrency: "CHF" },
            })),
          })),
        }),
      },
    ],
  }),
  component: MenuPage,
});

const FILTERS: DishTag[] = ["vegi", "scharf", "signature"];

function MenuPage() {
  const [active, setActive] = useState<Set<DishTag>>(new Set());

  const toggle = (t: DishTag) => {
    const next = new Set(active);
    next.has(t) ? next.delete(t) : next.add(t);
    setActive(next);
  };

  const filtered = useMemo(() => {
    if (active.size === 0) return DISHES;
    return DISHES.filter((d) => [...active].every((t) => d.tags.includes(t)));
  }, [active]);

  return (
    <div className="min-h-screen bg-surface">
      <Nav />

      <header className="border-b border-border bg-surface-alt pb-12 pt-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brick">
            Speisekarte
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-ink md:text-7xl">
            Sechs Pizzen, die wir nicht ändern werden.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            Drei, die jede Woche neu sind. Und ein Cordon Bleu, das man nicht erklärt —
            man bestellt es.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map((t) => {
              const on = active.has(t);
              return (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  className={`h-9 rounded-full border px-4 text-xs font-medium transition-all ${
                    on
                      ? "border-brick bg-brick text-brick-foreground"
                      : "border-border bg-surface text-ink hover:border-ink-soft"
                  }`}
                >
                  {TAG_LABEL[t]}
                </button>
              );
            })}
            {active.size > 0 && (
              <button
                onClick={() => setActive(new Set())}
                className="h-9 rounded-full px-3 text-xs font-medium text-ink-soft underline-offset-2 hover:underline"
              >
                Alle anzeigen
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="space-y-20">
          {CATEGORIES.map((cat) => {
            const items = filtered.filter((d) => d.category === cat.id);
            if (items.length === 0) return null;
            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
                    {cat.label}
                  </h2>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                    {items.length} Gerichte
                  </span>
                </div>
                <ul className="mt-6 divide-y divide-border">
                  {items.map((d) => (
                    <li key={d.slug} className="flex items-start justify-between gap-6 py-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-3">
                          <h3 className="font-display text-lg font-medium text-ink">{d.name}</h3>
                          {d.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] uppercase tracking-widest text-ink-soft"
                            >
                              {TAG_LABEL[t]}
                            </span>
                          ))}
                        </div>
                        <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-ink-soft">
                          {d.desc}
                        </p>
                      </div>
                      <div className="shrink-0 font-mono text-base font-semibold text-brick">
                        {d.price.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
