import { useEffect, useRef, useState } from "react";
import { LANGS, useI18n, type Lang } from "@/lib/i18n";

export function LangSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (variant === "mobile") {
    return (
      <div className="mt-3 border-t border-border pt-3">
        <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
          {t("nav.lang")}
        </p>
        <div className="flex flex-wrap gap-2 px-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code as Lang)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                l.code === lang
                  ? "border-brick bg-brick/10 text-brick"
                  : "border-border bg-surface text-ink-soft hover:text-ink"
              }`}
            >
              <span aria-hidden>{l.flag}</span>
              {l.short}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.lang")}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 text-sm font-medium text-ink-soft transition-colors hover:text-brick"
      >
        <span aria-hidden>{current.flag}</span>
        <span className="font-mono text-xs">{current.short}</span>
        <span aria-hidden className="text-[10px] text-ink-soft">▾</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-12 z-50 min-w-[160px] overflow-hidden rounded-xl border border-border bg-surface shadow-elegant"
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                onClick={() => {
                  setLang(l.code as Lang);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  l.code === lang
                    ? "bg-brick/10 text-brick"
                    : "text-ink hover:bg-surface-alt"
                }`}
              >
                <span aria-hidden className="text-base">{l.flag}</span>
                <span className="font-medium">{l.label}</span>
                <span className="ml-auto font-mono text-[10px] text-ink-soft">
                  {l.short}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
