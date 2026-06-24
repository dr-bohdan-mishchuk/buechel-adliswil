import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { adminT } from "@/lib/admin-i18n";
import { Check, X, Phone, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/reservations")({
  component: ReservationsAdmin,
});

type Reservation = {
  id: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  name: string;
  phone: string;
  email: string | null;
  note: string | null;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "noshow";
  created_at: string;
};

const STATUS_CLR: Record<string, string> = {
  pending: "bg-ember/15 text-ember",
  confirmed: "bg-basilico/15 text-basilico",
  cancelled: "bg-ink-soft/15 text-ink-soft",
  completed: "bg-brick/15 text-brick",
  noshow: "bg-brick/30 text-brick",
};

function ReservationsAdmin() {
  const { lang } = useI18n();
  const t = (k: string) => adminT(lang, k);
  const [rows, setRows] = useState<Reservation[]>([]);
  const [tab, setTab] = useState<"upcoming" | "past" | "all">("upcoming");
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: false })
      .order("reservation_time", { ascending: false })
      .limit(500);
    if (error) setErr(error.message);
    setRows((data ?? []) as Reservation[]);
  };

  useEffect(() => {
    load();
    const ch = supabase
      .channel("admin-reservations")
      .on("postgres_changes", { event: "*", schema: "public", table: "reservations" }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const filtered = rows.filter((r) =>
    tab === "all"
      ? true
      : tab === "upcoming"
        ? r.reservation_date >= today && r.status !== "cancelled" && r.status !== "completed" && r.status !== "noshow"
        : r.reservation_date < today || r.status === "completed" || r.status === "noshow" || r.status === "cancelled",
  );

  const update = async (id: string, status: Reservation["status"]) => {
    const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
    if (error) setErr(error.message);
  };

  const del = async (id: string) => {
    if (!confirm("?")) return;
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) setErr(error.message);
  };

  return (
    <div className="space-y-5">
      <h1 className="font-display text-3xl font-semibold text-ink">{t("admin.res.title")}</h1>
      {err && <p className="text-sm text-brick">{err}</p>}

      <div className="inline-flex rounded-full bg-card p-1 shadow-card">
        {(["upcoming", "past", "all"] as const).map((x) => (
          <button
            key={x}
            onClick={() => setTab(x)}
            className={`px-4 h-9 rounded-full text-sm font-medium ${tab === x ? "bg-brick text-brick-foreground" : "text-ink-soft"}`}
          >
            {t(`admin.res.${x}`)}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-card shadow-card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-alt text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-3 py-3 text-left">{t("admin.res.date")}</th>
              <th className="px-3 py-3 text-left">{t("admin.res.time")}</th>
              <th className="px-3 py-3 text-center">{t("admin.res.guests")}</th>
              <th className="px-3 py-3 text-left">{t("admin.res.name")}</th>
              <th className="px-3 py-3 text-left">{t("admin.res.phone")}</th>
              <th className="px-3 py-3 text-left hidden lg:table-cell">{t("admin.res.note")}</th>
              <th className="px-3 py-3 text-left">{t("admin.res.status")}</th>
              <th className="px-3 py-3 text-right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-surface-alt/50">
                <td className="px-3 py-3 whitespace-nowrap">{r.reservation_date}</td>
                <td className="px-3 py-3 whitespace-nowrap font-mono">{r.reservation_time.slice(0, 5)}</td>
                <td className="px-3 py-3 text-center">{r.guests}</td>
                <td className="px-3 py-3 font-medium">{r.name}</td>
                <td className="px-3 py-3">
                  <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 text-brick hover:underline">
                    <Phone className="h-3 w-3" /> {r.phone}
                  </a>
                </td>
                <td className="px-3 py-3 text-ink-soft hidden lg:table-cell max-w-[200px] truncate">{r.note}</td>
                <td className="px-3 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${STATUS_CLR[r.status]}`}>
                    {t(`admin.status.${r.status}`)}
                  </span>
                </td>
                <td className="px-3 py-3 text-right whitespace-nowrap">
                  {r.status === "pending" && (
                    <button onClick={() => update(r.id, "confirmed")} title={t("admin.res.confirm")}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-basilico/15 text-basilico">
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  {(r.status === "pending" || r.status === "confirmed") && (
                    <>
                      <button onClick={() => update(r.id, "completed")} title={t("admin.res.complete")}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-brick/10 text-brick text-xs font-semibold">
                        ✓
                      </button>
                      <button onClick={() => update(r.id, "cancelled")} title={t("admin.res.cancel")}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-surface-alt text-ink-soft">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <button onClick={() => del(r.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-brick/10 text-brick">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-ink-soft">{t("admin.res.empty")}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
