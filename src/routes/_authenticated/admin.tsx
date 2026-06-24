import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarClock,
  Gift,
  LogOut,
  Home,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { adminT } from "@/lib/admin-i18n";
import { LangSwitcher } from "@/components/site/LangSwitcher";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Restaurant Büchel" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { lang } = useI18n();
  const t = (k: string) => adminT(lang, k);
  const { user, roles, loading, isStaff } = useAuth();
  const navigate = useNavigate();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-ink-soft text-sm">
        …
      </div>
    );
  }

  if (!isStaff) {
    return <NoAccess email={user?.email ?? ""} />;
  }

  const links: Array<{ to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
    { to: "/admin", label: t("admin.nav.dashboard"), icon: LayoutDashboard, exact: true },
    { to: "/admin/menu", label: t("admin.nav.menu"), icon: UtensilsCrossed },
    { to: "/admin/reservations", label: t("admin.nav.reservations"), icon: CalendarClock },
    { to: "/admin/wheel", label: t("admin.nav.wheel"), icon: Gift },
  ];

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? currentPath === to : currentPath === to || currentPath.startsWith(to + "/");

  return (
    <div className="min-h-screen bg-surface-alt flex">
      <aside className="hidden md:flex md:w-64 md:flex-col bg-surface border-r border-border">
        <div className="h-16 px-5 flex items-center border-b border-border">
          <Link to="/" className="font-display text-lg font-semibold text-ink">
            Büchel <span className="text-brick">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive(l.to, l.exact)
                  ? "bg-brick/10 text-brick font-medium"
                  : "text-ink-soft hover:bg-surface-alt hover:text-ink"
              }`}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border space-y-2">
          <div className="px-3 py-2 text-xs text-ink-soft">
            <div className="truncate">{user?.email}</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-brick">
              {roles.includes("admin")
                ? t("admin.role.admin")
                : roles.includes("staff")
                  ? t("admin.role.staff")
                  : t("admin.role.none")}
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-surface-alt"
          >
            <Home className="h-4 w-4" /> {t("admin.nav.toSite")}
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-surface-alt"
          >
            <LogOut className="h-4 w-4" /> {t("admin.signOut")}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 md:px-6">
          <div className="md:hidden flex gap-1 overflow-x-auto">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`shrink-0 rounded-md px-2 py-1 text-xs ${
                  isActive(l.to, l.exact) ? "bg-brick text-brick-foreground" : "text-ink-soft"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <LangSwitcher />
            <button
              onClick={signOut}
              className="md:hidden inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-ink-soft"
            >
              <LogOut className="h-3 w-3" /> {t("admin.signOut")}
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NoAccess({ email }: { email: string }) {
  const { lang } = useI18n();
  const t = (k: string) => adminT(lang, k);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const claim = async () => {
    setBusy(true);
    setMsg(null);
    const { data, error } = await supabase.rpc("claim_first_admin");
    setBusy(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    if (data === true) {
      navigate({ to: "/admin", replace: true });
      window.location.reload();
    } else {
      setMsg("Admin already exists.");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-surface flex items-center justify-center px-5">
      <div className="max-w-md w-full rounded-2xl bg-card p-8 shadow-card">
        <h1 className="font-display text-2xl font-semibold text-ink">
          {t("admin.noAccess")}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          {t("admin.youAre")} <strong>{email}</strong>
        </p>
        <p className="mt-4 text-sm text-ink-soft">{t("admin.noAccessHint")}</p>
        <button
          onClick={claim}
          disabled={busy}
          className="mt-5 h-11 w-full rounded-full bg-brick text-sm font-semibold text-brick-foreground hover:bg-brick/90 disabled:opacity-50"
        >
          {t("admin.claimAdmin")}
        </button>
        <p className="mt-2 text-[11px] text-ink-soft">{t("admin.claimAdminHint")}</p>
        {msg && <p className="mt-3 text-sm text-brick">{msg}</p>}
        <button
          onClick={signOut}
          className="mt-6 w-full text-center text-xs text-ink-soft hover:text-brick"
        >
          {t("admin.signOut")}
        </button>
      </div>
    </div>
  );
}

// local hook import — keep at bottom to avoid hoisting noise
import { useState } from "react";
