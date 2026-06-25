import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useI18n } from "@/lib/i18n";
import { adminT } from "@/lib/admin-i18n";
import { LangSwitcher } from "@/components/site/LangSwitcher";


export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin — Restaurant Büchel" },
      { name: "description", content: "Admin sign-in." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { lang } = useI18n();
  const t = (k: string) => adminT(lang, k);
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin", replace: true });
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setErr(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) {
      setErr(result.error instanceof Error ? result.error.message : String(result.error));
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="px-5 py-4">
        <Link to="/" className="text-sm text-ink-soft hover:text-brick">
          ← Restaurant Büchel
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-5 pb-16">
        <div className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-card">
          <h1 className="font-display text-3xl font-semibold text-ink">
            {t("admin.signInTitle")}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">{t("admin.signInSub")}</p>

          <button
            type="button"
            onClick={handleGoogle}
            className="mt-6 h-11 w-full rounded-full border border-border bg-surface text-sm font-medium text-ink hover:bg-surface-alt flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {t("admin.google")}
          </button>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-ink-soft">
            <div className="h-px flex-1 bg-border" />
            {t("admin.or")}
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleEmail} className="space-y-3">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("admin.email")}
              className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-brick focus:outline-none"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("admin.password")}
              minLength={6}
              className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-brick focus:outline-none"
            />
            {err && <p className="text-sm text-brick">{err}</p>}
            <button
              type="submit"
              disabled={busy}
              className="h-11 w-full rounded-full bg-brick text-sm font-semibold text-brick-foreground hover:bg-brick/90 disabled:opacity-50"
            >
              {mode === "signin" ? t("admin.signIn") : t("admin.signUp")}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-center text-xs text-ink-soft hover:text-brick"
          >
            {mode === "signin" ? t("admin.noAccount") : t("admin.haveAccount")}{" "}
            <span className="underline">
              {mode === "signin" ? t("admin.signUp") : t("admin.signIn")}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
