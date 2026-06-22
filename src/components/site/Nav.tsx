import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RESTAURANT } from "@/lib/restaurant";
import logoAsset from "@/assets/logo.png.asset.json";
const logoUrl = logoAsset.url;

const links = [
  { to: "/menu", label: "Menü" },
  { to: "/reservation", label: "Reservieren" },
  { to: "/faq", label: "FAQ" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-surface/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Restaurant Büchel Logo"
            width={44}
            height={44}
            className="h-10 w-auto md:h-11"
          />
          <span className="hidden text-[10px] uppercase tracking-[0.25em] text-ink-soft sm:inline">
            Adliswil · seit 1998
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brick"
              activeProps={{ className: "text-brick" }}
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              window.localStorage.removeItem("buechel_wheel_v1");
              window.dispatchEvent(new Event("open-wheel"));
            }}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-brick/30 bg-brick/5 px-3 text-sm font-medium text-brick transition-colors hover:bg-brick/10"
          >
            🎁 Glücksrad
          </button>
          <a
            href={RESTAURANT.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-full border border-ink/15 px-4 text-sm font-medium text-ink transition-colors hover:border-brick hover:text-brick"
          >
            Essen bestellen
          </a>
          <Link
            to="/reservation"
            className="inline-flex h-10 items-center rounded-full bg-brick px-5 text-sm font-medium text-brick-foreground shadow-sm transition-all hover:bg-brick/90 hover:shadow"
          >
            Tisch sichern
          </Link>
        </nav>

        <button
          aria-label="Menü öffnen"
          onClick={() => setOpen(!open)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-4 bg-ink transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-4 bg-ink transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-surface">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-ink hover:bg-surface-alt"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={RESTAURANT.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full border border-ink/15 px-5 text-sm font-medium text-ink"
            >
              Essen bestellen
            </a>
            <Link
              to="/reservation"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-brick px-5 text-sm font-medium text-brick-foreground"
            >
              Tisch sichern
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
