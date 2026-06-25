import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { adminT } from "@/lib/admin-i18n";
import { seedMockData, clearMockData } from "@/lib/seed-mock";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});


type Stats = {
  resToday: number;
  resWeek: number;
  itemsTotal: number;
  itemsAvail: number;
  spinsTotal: number;
  spinsWins: number;
  recentRes: Array<{ id: string; reservation_date: string; reservation_time: string; name: string; guests: number; status: string }>;
  recentSpins: Array<{ id: string; name: string; email: string; prize_label: string; prize_code: string | null; is_win: boolean; created_at: string }>;
};

function Dashboard() {
  const { lang } = useI18n();
  const t = (k: string) => adminT(lang, k);
  const [s, setS] = useState<Stats | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [seedBusy, setSeedBusy] = useState<"seed" | "clear" | null>(null);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refresh = useCallback(() => setReloadKey((k) => k + 1), []);

  const handleSeed = async () => {
    setSeedBusy("seed");
    setSeedMsg(null);
    const r = await seedMockData();
    setSeedBusy(null);
    setSeedMsg(
      r.error
        ? `❌ ${r.error}`
        : `✓ ${r.reservations} ${t("admin.nav.reservations")}, ${r.spins} ${t("admin.nav.wheel")}`,
    );
    refresh();
  };

  const handleClear = async () => {
    if (!window.confirm(t("admin.menu.confirmDelete"))) return;
    setSeedBusy("clear");
    setSeedMsg(null);
    const r = await clearMockData();
    setSeedBusy(null);
    setSeedMsg(r.error ? `❌ ${r.error}` : `✓ ${t("admin.deleted")}`);
    refresh();
  };


  useEffect(() => {
    (async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
        const [
          { count: resToday },
          { count: resWeek },
          { count: itemsTotal },
          { count: itemsAvail },
          { count: spinsTotal },
          { count: spinsWins },
          { data: recentRes },
          { data: recentSpins },
        ] = await Promise.all([
          supabase.from("reservations").select("*", { count: "exact", head: true }).eq("reservation_date", today),
          supabase.from("reservations").select("*", { count: "exact", head: true }).gte("reservation_date", weekAgo),
          supabase.from("menu_items").select("*", { count: "exact", head: true }),
          supabase.from("menu_items").select("*", { count: "exact", head: true }).eq("available", true),
          supabase.from("wheel_spins").select("*", { count: "exact", head: true }),
          supabase.from("wheel_spins").select("*", { count: "exact", head: true }).eq("is_win", true),
          supabase
            .from("reservations")
            .select("id,reservation_date,reservation_time,name,guests,status")
            .order("created_at", { ascending: false })
            .limit(5),
          supabase
            .from("wheel_spins")
            .select("id,name,email,prize_label,prize_code,is_win,created_at")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);
        setS({
          resToday: resToday ?? 0,
          resWeek: resWeek ?? 0,
          itemsTotal: itemsTotal ?? 0,
          itemsAvail: itemsAvail ?? 0,
          spinsTotal: spinsTotal ?? 0,
          spinsWins: spinsWins ?? 0,
          recentRes: recentRes ?? [],
          recentSpins: recentSpins ?? [],
        });
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      }
    })();
  }, [reloadKey]);


  if (err) return <p className="text-sm text-brick">{err}</p>;
  if (!s) return <p className="text-sm text-ink-soft">…</p>;

  const cards = [
    { label: t("admin.dash.reservationsToday"), v: s.resToday, sub: `${t("admin.dash.reservationsWeek")}: ${s.resWeek}`, link: "/admin/reservations" },
    { label: t("admin.dash.menuItems"), v: s.itemsTotal, sub: `${t("admin.dash.activeItems")}: ${s.itemsAvail}`, link: "/admin/menu" },
    { label: t("admin.dash.spins"), v: s.spinsTotal, sub: `${t("admin.dash.wins")}: ${s.spinsWins}`, link: "/admin/wheel" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold text-ink">{t("admin.dash.title")}</h1>
        <div className="flex flex-wrap items-center gap-2">
          {seedMsg && <span className="text-xs text-ink-soft">{seedMsg}</span>}
          <button
            type="button"
            onClick={handleSeed}
            disabled={seedBusy !== null}
            className="inline-flex h-9 items-center rounded-full border border-brick/30 bg-brick/5 px-3 text-xs font-medium text-brick hover:bg-brick/10 disabled:opacity-50"
          >
            {seedBusy === "seed" ? "…" : "🎲 Mock-Daten einfügen"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={seedBusy !== null}
            className="inline-flex h-9 items-center rounded-full border border-border px-3 text-xs font-medium text-ink-soft hover:text-brick hover:border-brick disabled:opacity-50"
          >
            {seedBusy === "clear" ? "…" : "🧹 Mock-Daten löschen"}
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.link}
            className="rounded-xl bg-card p-5 shadow-card hover:shadow-elegant transition-shadow"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-ink-soft">{c.label}</div>
            <div className="mt-2 font-display text-4xl font-semibold text-ink">{c.v}</div>
            <div className="mt-1 text-xs text-ink-soft">{c.sub}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-card p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold text-ink">{t("admin.dash.recentRes")}</h2>
          <ul className="mt-3 divide-y divide-border">
            {s.recentRes.length === 0 && <li className="py-3 text-sm text-ink-soft">{t("admin.res.empty")}</li>}
            {s.recentRes.map((r) => (
              <li key={r.id} className="py-2.5 flex items-center justify-between text-sm">
                <span>
                  <strong>{r.name}</strong> · {r.guests}P
                </span>
                <span className="text-ink-soft text-xs">
                  {r.reservation_date} {r.reservation_time.slice(0, 5)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-card p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold text-ink">{t("admin.dash.recentSpins")}</h2>
          <ul className="mt-3 divide-y divide-border">
            {s.recentSpins.length === 0 && <li className="py-3 text-sm text-ink-soft">{t("admin.wheel.empty")}</li>}
            {s.recentSpins.map((sp) => (
              <li key={sp.id} className="py-2.5 flex items-center justify-between text-sm">
                <span>
                  <strong>{sp.name}</strong>{" "}
                  <span className="text-ink-soft">→ {sp.prize_label}</span>
                </span>
                <span className="text-ink-soft text-xs">{new Date(sp.created_at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
