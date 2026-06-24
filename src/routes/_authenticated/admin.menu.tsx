import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { adminT } from "@/lib/admin-i18n";

export const Route = createFileRoute("/_authenticated/admin/menu")({
  component: MenuAdmin,
});

type Category = { id: string; label: string; sort_order: number };
type Item = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  image_url: string | null;
  available: boolean;
  sort_order: number;
};

function MenuAdmin() {
  const { lang } = useI18n();
  const t = (k: string) => adminT(lang, k);
  const [cats, setCats] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<Item | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("");

  const load = async () => {
    setLoading(true);
    const [c, i] = await Promise.all([
      supabase.from("menu_categories").select("*").order("sort_order"),
      supabase.from("menu_items").select("*").order("sort_order"),
    ]);
    if (c.error) setErr(c.error.message);
    if (i.error) setErr(i.error.message);
    setCats(c.data ?? []);
    setItems((i.data ?? []) as Item[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onSave = async (it: Partial<Item>) => {
    setErr(null);
    if (it.id) {
      const { error } = await supabase.from("menu_items").update({
        category_id: it.category_id,
        name: it.name,
        description: it.description,
        price: it.price,
        tags: it.tags,
        image_url: it.image_url,
        available: it.available,
      }).eq("id", it.id);
      if (error) return setErr(error.message);
    } else {
      const { error } = await supabase.from("menu_items").insert({
        category_id: it.category_id!,
        name: it.name!,
        description: it.description ?? "",
        price: it.price ?? 0,
        tags: it.tags ?? [],
        image_url: it.image_url,
        available: it.available ?? true,
      });
      if (error) return setErr(error.message);
    }
    setEditing(null);
    load();
  };

  const onDelete = async (id: string) => {
    if (!confirm(t("admin.menu.confirmDelete"))) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) return setErr(error.message);
    load();
  };

  const filtered = items.filter(
    (i) =>
      (!filterCat || i.category_id === filterCat) &&
      (!search ||
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description.toLowerCase().includes(search.toLowerCase())),
  );

  const catLabel = (id: string) => cats.find((c) => c.id === id)?.label ?? id;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="font-display text-3xl font-semibold text-ink">{t("admin.menu.title")}</h1>
        <button
          onClick={() =>
            setEditing({
              id: "",
              category_id: cats[0]?.id ?? "",
              name: "",
              description: "",
              price: 0,
              tags: [],
              image_url: "",
              available: true,
              sort_order: 100,
            })
          }
          className="inline-flex items-center gap-2 rounded-full bg-brick px-4 h-10 text-sm font-medium text-brick-foreground hover:bg-brick/90"
        >
          <Plus className="h-4 w-4" /> {t("admin.menu.new")}
        </button>
      </div>

      {err && <p className="text-sm text-brick">{err}</p>}

      <div className="flex flex-wrap gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("admin.menu.search")}
          className="h-10 flex-1 min-w-[200px] rounded-md border border-input bg-card px-3 text-sm"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="h-10 rounded-md border border-input bg-card px-3 text-sm"
        >
          <option value="">{t("admin.menu.allCats")}</option>
          {cats.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-ink-soft">…</p>
      ) : (
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-alt text-xs uppercase tracking-wider text-ink-soft">
              <tr>
                <th className="px-4 py-3 text-left">{t("admin.menu.name")}</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">{t("admin.menu.category")}</th>
                <th className="px-4 py-3 text-right">{t("admin.menu.price")}</th>
                <th className="px-4 py-3 text-center">{t("admin.menu.available")}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((i) => (
                <tr key={i.id} className="hover:bg-surface-alt/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink">{i.name}</div>
                    <div className="text-xs text-ink-soft truncate max-w-md">{i.description}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-ink-soft">{catLabel(i.category_id)}</td>
                  <td className="px-4 py-3 text-right font-mono">{i.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block h-2 w-2 rounded-full ${i.available ? "bg-basilico" : "bg-ink-soft"}`} />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => setEditing(i)} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-surface-alt text-ink-soft">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(i.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-brick/10 text-brick">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-ink-soft">—</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <ItemEditor
          item={editing}
          cats={cats}
          onCancel={() => setEditing(null)}
          onSave={onSave}
        />
      )}
    </div>
  );
}

function ItemEditor({
  item,
  cats,
  onCancel,
  onSave,
}: {
  item: Item;
  cats: Category[];
  onCancel: () => void;
  onSave: (it: Partial<Item>) => void;
}) {
  const { lang } = useI18n();
  const t = (k: string) => adminT(lang, k);
  const [f, setF] = useState({
    id: item.id,
    category_id: item.category_id,
    name: item.name,
    description: item.description,
    price: String(item.price),
    tags: item.tags.join(", "),
    image_url: item.image_url ?? "",
    available: item.available,
  });
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("menu-photos").upload(path, file);
    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("menu-photos").getPublicUrl(path);
    setF({ ...f, image_url: data.publicUrl });
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-surface p-6 shadow-elegant max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">{item.id ? t("admin.menu.edit") : t("admin.menu.new")}</h2>
          <button onClick={onCancel} className="h-8 w-8 rounded-full hover:bg-surface-alt flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              id: f.id || undefined,
              category_id: f.category_id,
              name: f.name,
              description: f.description,
              price: parseFloat(f.price) || 0,
              tags: f.tags.split(",").map((s) => s.trim()).filter(Boolean),
              image_url: f.image_url || null,
              available: f.available,
            });
          }}
          className="mt-4 space-y-3"
        >
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-ink-soft">{t("admin.menu.category")}</span>
            <select
              required
              value={f.category_id}
              onChange={(e) => setF({ ...f, category_id: e.target.value })}
              className="mt-1 h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
            >
              {cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-ink-soft">{t("admin.menu.name")}</span>
            <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })}
              className="mt-1 h-11 w-full rounded-md border border-input bg-card px-3 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-ink-soft">{t("admin.menu.desc")}</span>
            <textarea value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} rows={3}
              className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-ink-soft">{t("admin.menu.price")}</span>
              <input required type="number" step="0.5" min="0" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })}
                className="mt-1 h-11 w-full rounded-md border border-input bg-card px-3 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-ink-soft">{t("admin.menu.tags")}</span>
              <input value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} placeholder="vegi, scharf"
                className="mt-1 h-11 w-full rounded-md border border-input bg-card px-3 text-sm" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-ink-soft">{t("admin.menu.image")}</span>
            <input value={f.image_url} onChange={(e) => setF({ ...f, image_url: e.target.value })}
              className="mt-1 h-11 w-full rounded-md border border-input bg-card px-3 text-sm" placeholder="https://…" />
            <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading}
              className="mt-2 text-xs text-ink-soft" />
            {f.image_url && (
              <img src={f.image_url} alt="" className="mt-2 h-24 w-24 object-cover rounded-md border border-border" />
            )}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={f.available} onChange={(e) => setF({ ...f, available: e.target.checked })} />
            {t("admin.menu.available")}
          </label>

          <div className="pt-3 flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="h-10 px-4 rounded-full border border-border text-sm">
              {t("admin.menu.cancel")}
            </button>
            <button type="submit" className="h-10 px-5 rounded-full bg-brick text-sm font-semibold text-brick-foreground">
              {t("admin.menu.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
