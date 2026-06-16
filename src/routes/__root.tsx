import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { RESTAURANT } from "@/lib/restaurant";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold text-ink">404</h1>
        <h2 className="mt-4 font-display text-xl font-medium text-ink">Seite nicht gefunden</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Diese Seite gibt es nicht — der Holzofen schon.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-full bg-brick px-5 text-sm font-medium text-brick-foreground transition-colors hover:bg-brick/90"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Da ist etwas schiefgegangen
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Versuch es nochmal oder kehre zur Startseite zurück.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-11 items-center rounded-full bg-brick px-5 text-sm font-medium text-brick-foreground hover:bg-brick/90"
          >
            Nochmal versuchen
          </button>
          <a
            href="/"
            className="inline-flex h-11 items-center rounded-full border border-border bg-surface px-5 text-sm font-medium text-ink hover:bg-surface-alt"
          >
            Startseite
          </a>
        </div>
      </div>
    </div>
  );
}

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Restaurant", "LocalBusiness"],
      "@id": "/#restaurant",
      name: RESTAURANT.name,
      url: "/",
      telephone: RESTAURANT.phone,
      priceRange: RESTAURANT.priceRange,
      servesCuisine: RESTAURANT.cuisine,
      acceptsReservations: "True",
      address: {
        "@type": "PostalAddress",
        streetAddress: RESTAURANT.street,
        addressLocality: RESTAURANT.city,
        postalCode: RESTAURANT.postal,
        addressCountry: RESTAURANT.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: RESTAURANT.geo.lat,
        longitude: RESTAURANT.geo.lng,
      },
      openingHoursSpecification: RESTAURANT.schemaHours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.dow,
        opens: h.opens,
        closes: h.closes,
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: RESTAURANT.rating.value,
        reviewCount: RESTAURANT.rating.count,
      },
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#C0392B" },
      { name: "author", content: RESTAURANT.name },
      { property: "og:site_name", content: RESTAURANT.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_CH" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(siteJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de-CH">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
