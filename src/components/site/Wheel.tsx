import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

const PRIZES = [
  { label: "Tiramisù", code: "TIRAMISU", weight: 18, color: "var(--color-brick)" },
  { label: "10% Lieferung", code: "LIEFERN10", weight: 22, color: "var(--color-ember)" },
  { label: "Aperol gratis", code: "APEROL", weight: 14, color: "var(--color-brick)" },
  { label: "Margherita", code: "MARGHERITA", weight: 6, color: "var(--color-ember)" },
  { label: "Caffè gratis", code: "CAFFE", weight: 18, color: "var(--color-brick)" },
  { label: "5% Rabatt", code: "FIVE", weight: 14, color: "var(--color-ember)" },
  { label: "Nächstes Mal", code: "", weight: 4, color: "var(--color-brick)" },
  { label: "Nochmal!", code: "", weight: 4, color: "var(--color-ember)" },
];

export const WHEEL_SEEN_KEY = "buechel_wheel_v1";
export const WHEEL_PRIZE_KEY = "buechel_wheel_prize_v1";
const VALID_DAYS = 14;

type StoredPrize = {
  label: string;
  code: string;
  name: string;
  email: string;
  wonAt: string; // ISO
  expiresAt: string; // ISO
};

export function getStoredPrize(): StoredPrize | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(WHEEL_PRIZE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as StoredPrize;
    if (new Date(p.expiresAt).getTime() < Date.now()) return null;
    return p;
  } catch {
    return null;
  }
}

function pickPrize() {
  const total = PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < PRIZES.length; i++) {
    r -= PRIZES[i].weight;
    if (r <= 0) return i;
  }
  return 0;
}

function fmtDate(iso: string, lang: string = "de-CH") {
  const locales: Record<string, string> = {
    de: "de-CH",
    en: "en-GB",
    it: "it-CH",
    fr: "fr-CH",
    rm: "rm-CH",
    uk: "uk-UA",
  };
  try {
    return new Date(iso).toLocaleDateString(locales[lang] ?? "de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function Wheel() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [stored, setStored] = useState<StoredPrize | null>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    if (typeof window === "undefined") return;

    setStored(getStoredPrize());

    const openNow = () => {
      setStored(getStoredPrize());
      setOpen(true);
    };
    window.addEventListener("open-wheel", openNow);

    const seen = window.localStorage.getItem(WHEEL_SEEN_KEY);
    if (seen) {
      return () => window.removeEventListener("open-wheel", openNow);
    }

    const trigger = () => {
      window.localStorage.setItem(WHEEL_SEEN_KEY, "1");
      document.removeEventListener("mouseleave", onExit);
      window.removeEventListener("scroll", onScroll);
      setOpen(true);
    };
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct > 0.6) trigger();
    };
    document.addEventListener("mouseleave", onExit);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseleave", onExit);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("open-wheel", openNow);
    };
  }, []);

  const spin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSpinning(true);
    const idx = pickPrize();
    const segAngle = 360 / PRIZES.length;
    const target = 360 * 6 + (360 - idx * segAngle - segAngle / 2);
    await controls.start({
      rotate: target,
      transition: { duration: 4.2, ease: [0.17, 0.67, 0.16, 1] },
    });
    setResult(idx);
    setSpinning(false);

    const prize = PRIZES[idx];
    if (prize.code) {
      const now = new Date();
      const expires = new Date(now.getTime() + VALID_DAYS * 24 * 3600 * 1000);
      const payload: StoredPrize = {
        label: prize.label,
        code: prize.code,
        name,
        email,
        wonAt: now.toISOString(),
        expiresAt: expires.toISOString(),
      };
      window.localStorage.setItem(WHEEL_PRIZE_KEY, JSON.stringify(payload));
      window.localStorage.setItem(WHEEL_SEEN_KEY, "1");
      setStored(payload);
      window.dispatchEvent(new Event("wheel-prize-updated"));
    } else {
      window.localStorage.setItem(WHEEL_SEEN_KEY, "1");
      window.dispatchEvent(new Event("wheel-prize-updated"));
    }
  };

  if (!open) return null;

  const r = 140;
  const cx = 160;
  const cy = 160;
  const segAngle = 360 / PRIZES.length;

  // If user already has a stored prize and hasn't just spun again, show the "Mein Gewinn" view.
  if (stored && result === null) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-md rounded-2xl bg-surface shadow-elegant overflow-hidden"
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Schliessen"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-ink-soft hover:text-ink"
          >
            ✕
          </button>
          <div className="p-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brick">
              {t("prize.eyebrow")}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
              {stored.label}
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              {t("prize.wonOn")} {fmtDate(stored.wonAt, lang)} · {t("prize.validUntil")}{" "}
              <strong className="text-ink">{fmtDate(stored.expiresAt, lang)}</strong>
            </p>

            <div className="mt-5 rounded-xl border border-dashed border-brick bg-brick/5 px-4 py-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                {t("prize.yourCode")}
              </p>
              <div className="mt-2 font-mono text-2xl font-bold tracking-[0.2em] text-brick">
                {stored.code}
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-surface-alt p-4 text-left text-sm text-ink-soft">
              <p className="font-semibold text-ink mb-2">{t("prize.howTo")}</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>{t("prize.step1")}</li>
                <li>{t("prize.step2")}</li>
                <li>{t("prize.step3")}</li>
              </ol>
              <p className="mt-3 text-xs">
                {t("prize.onName")} <strong className="text-ink">{stored.name}</strong> ·{" "}
                {stored.email}
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-5 h-11 w-full rounded-full bg-brick text-sm font-semibold text-brick-foreground hover:bg-brick/90"
            >
              {t("wheel.bye")}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md rounded-2xl bg-surface shadow-elegant overflow-hidden"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Schliessen"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-ink-soft hover:text-ink"
        >
          ✕
        </button>

        <div className="p-6 pb-2 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brick">
            {t("wheel.eyebrow")}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
            {t("wheel.title")}
          </h3>
          <p className="mt-2 text-sm text-ink-soft">{t("wheel.subtitle")}</p>
        </div>

        <div className="relative mx-auto my-4 h-[320px] w-[320px]">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 h-0 w-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-brick" />

          <motion.svg
            viewBox="0 0 320 320"
            animate={controls}
            className="drop-shadow-lg"
            style={{ originX: 0.5, originY: 0.5 }}
          >
            {PRIZES.map((p, i) => {
              const a1 = (i * segAngle - 90) * (Math.PI / 180);
              const a2 = ((i + 1) * segAngle - 90) * (Math.PI / 180);
              const x1 = cx + r * Math.cos(a1);
              const y1 = cy + r * Math.sin(a1);
              const x2 = cx + r * Math.cos(a2);
              const y2 = cy + r * Math.sin(a2);
              const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;
              const rot = (i + 0.5) * segAngle - 90;
              return (
                <g key={i}>
                  <path d={path} fill={p.color} stroke="var(--color-surface)" strokeWidth="2" />
                  <g transform={`rotate(${rot} ${cx} ${cy})`}>
                    <text
                      x={cx + r * 0.58}
                      y={cy}
                      fill="white"
                      fontSize="13"
                      fontWeight="700"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.35)", strokeWidth: 2 }}
                      className="font-sans"
                    >
                      {p.label}
                    </text>
                  </g>
                </g>
              );
            })}
            <circle cx={cx} cy={cy} r="22" fill="var(--color-surface)" />
            <circle cx={cx} cy={cy} r="8" fill="var(--color-brick)" />
          </motion.svg>
        </div>

        {result === null ? (
          <form onSubmit={spin} className="space-y-3 p-6 pt-2">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("wheel.name")}
              className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-brick focus:outline-none"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("wheel.email")}
              className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-brick focus:outline-none"
            />
            <button
              type="submit"
              disabled={spinning}
              className="h-12 w-full rounded-full bg-brick text-sm font-semibold text-brick-foreground transition-all hover:bg-brick/90 disabled:opacity-50"
            >
              {spinning ? t("wheel.spinning") : t("wheel.spin")}
            </button>
            <p className="text-center text-[11px] text-ink-soft">{t("wheel.terms")}</p>
          </form>
        ) : (
          <div className="space-y-3 p-6 pt-2 text-center">
            <div className="font-display text-2xl text-brick">
              {PRIZES[result].label}
            </div>
            {PRIZES[result].code ? (
              <>
                <p className="text-sm text-ink-soft">{t("wheel.codeLabel")}</p>
                <div className="mx-auto inline-block rounded-md border border-dashed border-brick bg-brick/5 px-4 py-2 font-mono text-lg font-semibold tracking-widest text-brick">
                  {PRIZES[result].code}
                </div>
                <p className="text-xs text-ink-soft">{t("wheel.redeemHint")}</p>
                <p className="text-xs text-ink-soft">
                  {t("wheel.copy")} <strong>{email}</strong>.
                </p>
              </>
            ) : (
              <p className="text-sm text-ink-soft">{t("wheel.noWin")}</p>
            )}
            <button
              onClick={() => setOpen(false)}
              className="mt-4 h-11 w-full rounded-full border border-border bg-surface text-sm font-medium text-ink hover:bg-surface-alt"
            >
              {t("wheel.bye")}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
