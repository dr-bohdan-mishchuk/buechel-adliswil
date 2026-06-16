import { Link } from "@tanstack/react-router";
import { RESTAURANT } from "@/lib/restaurant";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface-alt">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="font-display text-3xl font-semibold tracking-tight text-ink">
            Büchel
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Holzofen-Pizza, hausgemachte Pasta und das beste Cordon Bleu von Adliswil.
            Seit 1998 — und wir bleiben.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink-soft">
            {RESTAURANT.street} · {RESTAURANT.postal} {RESTAURANT.city}
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-soft">
            Besuch
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            {RESTAURANT.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span className="font-medium">{h.days}</span>
                <span className="text-ink-soft">
                  {h.lunch}
                  {h.dinner && ` · ${h.dinner}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-soft">
            Kontakt
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={RESTAURANT.phoneHref} className="text-ink hover:text-brick">
                {RESTAURANT.phone}
              </a>
            </li>
            <li>
              <a href={RESTAURANT.emailHref} className="text-ink hover:text-brick">
                {RESTAURANT.email}
              </a>
            </li>
            <li className="pt-2">
              <Link to="/reservation" className="text-brick font-medium hover:underline">
                Tisch reservieren →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-ink-soft md:flex-row md:items-center lg:px-8">
          <p>© {new Date().getFullYear()} Restaurant Büchel. Geschlossen am Montag, weil auch wir mal Pizza essen wollen.</p>
          <p className="font-mono uppercase tracking-widest">Made with 🔥 in Adliswil</p>
        </div>
      </div>
    </footer>
  );
}
