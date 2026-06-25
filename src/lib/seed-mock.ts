import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ReservationInsert = Database["public"]["Tables"]["reservations"]["Insert"];
type SpinInsert = Database["public"]["Tables"]["wheel_spins"]["Insert"];


const FIRST_NAMES = [
  "Anna", "Marco", "Elena", "Lukas", "Sofia", "Jonas", "Mia", "Noah",
  "Lena", "David", "Julia", "Tobias", "Laura", "Felix", "Sara", "Andrea",
  "Christoph", "Nina", "Patrick", "Vera",
];
const LAST_NAMES = [
  "Müller", "Meier", "Schmid", "Keller", "Weber", "Huber", "Brunner",
  "Frei", "Bianchi", "Rossi", "Romano", "Marti", "Steiner", "Koller",
];
const NOTES = [
  "Fensterplatz bitte",
  "Kindersitz benötigt",
  "Allergie: Nüsse",
  "Geburtstag — kleine Überraschung möglich?",
  "Vegetarisch",
  null,
  null,
  null,
];
const PRIZES = [
  { label: "10% Rabatt", code: "BUECHEL10", win: true },
  { label: "Tiramisù gratis", code: "TIRAMISU", win: true },
  { label: "Gratis Getränk", code: "DRINK1", win: true },
  { label: "Pizza-Upgrade", code: "UPGRADE", win: true },
  { label: "Kein Glück", code: null, win: false },
  { label: "Kein Glück", code: null, win: false },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function dateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export type SeedResult = {
  reservations: number;
  spins: number;
  error?: string;
};

export async function seedMockData(): Promise<SeedResult> {
  try {
    // --- Reservations: 8 past, 12 upcoming ---
    const reservations: ReservationInsert[] = [];
    const statusesPast = ["completed", "completed", "completed", "noshow", "cancelled"] as const;
    const statusesFuture = ["pending", "confirmed", "confirmed", "confirmed", "pending"] as const;

    for (let i = 0; i < 8; i++) {
      const first = pick(FIRST_NAMES);
      const last = pick(LAST_NAMES);
      reservations.push({
        name: `${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@example.ch`,
        phone: `+4179${Math.floor(1000000 + Math.random() * 8999999)}`,
        guests: 2 + Math.floor(Math.random() * 6),
        reservation_date: dateOffset(-Math.floor(1 + Math.random() * 20)),
        reservation_time: `${pad(17 + Math.floor(Math.random() * 5))}:${pick(["00", "15", "30", "45"])}:00`,
        note: pick(NOTES),
        status: pick([...statusesPast]) as ReservationInsert["status"],
      });
    }
    for (let i = 0; i < 12; i++) {
      const first = pick(FIRST_NAMES);
      const last = pick(LAST_NAMES);
      reservations.push({
        name: `${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@example.ch`,
        phone: `+4179${Math.floor(1000000 + Math.random() * 8999999)}`,
        guests: 2 + Math.floor(Math.random() * 6),
        reservation_date: dateOffset(Math.floor(Math.random() * 21)),
        reservation_time: `${pad(17 + Math.floor(Math.random() * 5))}:${pick(["00", "15", "30", "45"])}:00`,
        note: pick(NOTES),
        status: pick([...statusesFuture]) as ReservationInsert["status"],
      });
    }

    const { error: resErr } = await supabase.from("reservations").insert(reservations);
    if (resErr) throw resErr;

    // --- Wheel spins: 30 entries ---
    const spins: SpinInsert[] = [];
    for (let i = 0; i < 30; i++) {
      const first = pick(FIRST_NAMES);
      const last = pick(LAST_NAMES);
      const prize = pick(PRIZES);
      const created = new Date();
      created.setDate(created.getDate() - Math.floor(Math.random() * 30));
      const expires = new Date(created);
      expires.setDate(expires.getDate() + 14);
      spins.push({
        name: `${first} ${last}`,
        email: `${first.toLowerCase()}${i}@example.ch`,
        prize_label: prize.label,
        prize_code: prize.code,
        is_win: prize.win,
        redeemed: prize.win && Math.random() < 0.3,
        redeemed_at: prize.win && Math.random() < 0.3 ? new Date().toISOString() : null,
        expires_at: expires.toISOString(),
        created_at: created.toISOString(),
      });
    }

    const { error: spinErr } = await supabase.from("wheel_spins").insert(spins);
    if (spinErr) throw spinErr;

    return { reservations: reservations.length, spins: spins.length };
  } catch (e) {
    return {
      reservations: 0,
      spins: 0,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export async function clearMockData(): Promise<{ ok: boolean; error?: string }> {
  try {
    // Delete entries whose email ends with @example.ch
    const { error: e1 } = await supabase
      .from("reservations")
      .delete()
      .like("email", "%@example.ch");
    if (e1) throw e1;
    const { error: e2 } = await supabase
      .from("wheel_spins")
      .delete()
      .like("email", "%@example.ch");
    if (e2) throw e2;
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
