import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";

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

const WHEEL_KEY = "buechel_wheel_v1";

function pickPrize() {
  const total = PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < PRIZES.length; i++) {
    r -= PRIZES[i].weight;
    if (r <= 0) return i;
  }
  return 0;
}

export function Wheel() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(WHEEL_KEY);
    if (seen) return;

    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct > 0.6) trigger();
    };
    const trigger = () => {
      window.localStorage.setItem(WHEEL_KEY, "1");
      window.removeEventListener("mouseleave", onExit);
      window.removeEventListener("scroll", onScroll);
      setOpen(true);
    };
    document.addEventListener("mouseleave", onExit);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseleave", onExit);
      window.removeEventListener("scroll", onScroll);
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
  };

  if (!open) return null;

  const r = 140;
  const cx = 160;
  const cy = 160;
  const segAngle = 360 / PRIZES.length;

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
            Glücksrad
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
            Eine Drehung. Etwas Süsses.
          </h3>
          <p className="mt-2 text-sm text-ink-soft">
            Mail eintragen, drehen — und beim nächsten Besuch einlösen.
          </p>
        </div>

        <div className="relative mx-auto my-4 h-[320px] w-[320px]">
          {/* Pointer */}
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
              placeholder="Dein Name"
              className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-brick focus:outline-none"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@mail.ch"
              className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-brick focus:outline-none"
            />
            <button
              type="submit"
              disabled={spinning}
              className="h-12 w-full rounded-full bg-brick text-sm font-semibold text-brick-foreground transition-all hover:bg-brick/90 disabled:opacity-50"
            >
              {spinning ? "Drehen …" : "Drehen 🎯"}
            </button>
            <p className="text-center text-[11px] text-ink-soft">
              Ein Gewinn pro Person. Gültig 7 Tage. Kein Spam, versprochen.
            </p>
          </form>
        ) : (
          <div className="space-y-3 p-6 pt-2 text-center">
            <div className="font-display text-2xl text-brick">
              {PRIZES[result].label}
            </div>
            {PRIZES[result].code ? (
              <>
                <p className="text-sm text-ink-soft">Dein Code:</p>
                <div className="mx-auto inline-block rounded-md border border-dashed border-brick bg-brick/5 px-4 py-2 font-mono text-lg font-semibold tracking-widest text-brick">
                  {PRIZES[result].code}
                </div>
                <p className="text-xs text-ink-soft">
                  Wir haben dir den Code an <strong>{email}</strong> geschickt.
                </p>
              </>
            ) : (
              <p className="text-sm text-ink-soft">
                Komm vorbei — wir freuen uns trotzdem auf dich.
              </p>
            )}
            <button
              onClick={() => setOpen(false)}
              className="mt-4 h-11 w-full rounded-full border border-border bg-surface text-sm font-medium text-ink hover:bg-surface-alt"
            >
              Bis bald.
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
