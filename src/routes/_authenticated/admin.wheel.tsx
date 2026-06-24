import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { adminT } from "@/lib/admin-i18n";

export const Route = createFileRoute("/_authenticated/admin/wheel")({
  component: WheelAdmin,
});

type Spin = {
  id: string;
  name: string;
  email: string;
  prize_label: string;
  prize_code: string | null;
  is_win: boolean;
  redeemed: boolean;
  redeemed_at: string | null;
  expires_at: string;
  created_at: string;
};

function WheelAdmin() {
  const { lang } = useI18n();
  const t = (k: string) => adminT(lang, k);
  const [rows, setRows] = useState<Spin[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("wheel_spins")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) setErr(error.message);
    setRows((data ?? []) as Spin[]);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (s: Spin) => {
    const next = !s.redeemed;
    const { error } = await supabase
      .from("wheel_spins")
      .update({ redeemed: next, redeemed_at: next ? new Date().toISOString() : null })
      .eq("id", s.id);
    if (error) return setErr(error.message);
    load();
  };

  return (
    <div className="space-y-5">
      <h1 className="font-display text-3xl font-semibold text-ink">{t("admin.wheel.title")}</h1>
      {err && <p className="text-sm text-brick">{err}</p>}

      <div className="rounded-xl bg-card shadow-card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-alt text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-3 py-3 text-left">{t("admin.res.date")}</th>
              <th className="px-3 py-3 text-left">{t("admin.res.name")}</th>
              <th className="px-3 py-3 text-left">{t("admin.email")}</th>
              <th className="px-3 py-3 text-left">{t("admin.wheel.prize")}</th>
              <th className="px-3 py-3 text-left">{t("admin.wheel.code")}</th>
              <th className="px-3 py-3 text-left">{t("admin.wheel.expires")}</th>
              <th className="px-3 py-3 text-center">{t("admin.wheel.redeemed")}</th>
              <th className="px-3 py-3 text-right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((s) => {
              const expired = new Date(s.expires_at) < new Date();
              return (
                <tr key={s.id} className={`hover:bg-surface-alt/50 ${expired ? "opacity-60" : ""}`}>
                  <td className="px-3 py-3 whitespace-nowrap text-ink-soft">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3 font-medium">{s.name}</td>
                  <td className="px-3 py-3 text-ink-soft">{s.email}</td>
                  <td className="px-3 py-3">
                    <span className={s.is_win ? "" : "text-ink-soft"}>{s.prize_label}</span>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs">{s.prize_code ?? "—"}</td>
                  <td className="px-3 py-3 text-ink-soft text-xs">
                    {new Date(s.expires_at).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {s.redeemed ? (
                      <span className="inline-block rounded-full bg-basilico/20 text-basilico px-2 py-0.5 text-xs">✓</span>
                    ) : (
                      <span className="text-ink-soft">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-right">
                    {s.is_win && s.prize_code && (
                      <button
                        onClick={() => toggle(s)}
                        className="inline-flex items-center rounded-full border border-border px-3 h-8 text-xs hover:bg-surface-alt"
                      >
                        {s.redeemed ? t("admin.wheel.unredeem") : t("admin.wheel.markRedeemed")}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-ink-soft">{t("admin.wheel.empty")}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
