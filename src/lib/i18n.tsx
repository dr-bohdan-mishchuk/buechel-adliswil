import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "de" | "en" | "it" | "fr" | "rm" | "uk";

export const LANGS: { code: Lang; label: string; short: string; flag: string }[] = [
  { code: "de", label: "Deutsch", short: "DE", flag: "🇨🇭" },
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "it", label: "Italiano", short: "IT", flag: "🇮🇹" },
  { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
  { code: "rm", label: "Rumantsch", short: "RM", flag: "🏔️" },
  { code: "uk", label: "Українська", short: "UA", flag: "🇺🇦" },
];

type Dict = Record<string, string>;

const de: Dict = {
  "nav.menu": "Menü",
  "nav.reservation": "Reservieren",
  "nav.faq": "FAQ",
  "nav.contact": "Kontakt",
  "nav.order": "Essen bestellen",
  "nav.book": "Tisch sichern",
  "nav.openMenu": "Menü öffnen",
  "nav.closeMenu": "Menü schliessen",
  "nav.wheel": "🎁 Glücksrad",
  "nav.wheelLong": "🎁 Glücksrad drehen",
  "nav.prize": "🎟️ Mein Gewinn",
  "nav.prizeLong": "🎟️ Mein Gewinn ansehen",
  "nav.lang": "Sprache",
  "hero.eyebrow": "Adliswil · seit 1998",
  "hero.t1": "Holzofen,",
  "hero.t2": "Handwerk,",
  "hero.t3": "Hunger.",
  "hero.subtitle":
    "Pizza aus dem 380-Grad-Ofen, Cordon Bleu wie früher — nur besser. Mitten in Adliswil.",
  "hero.openUntil": "Heute offen bis 23:00",
  "hero.seatsFree": "12 Plätze frei",
  "hero.delivery": "Lieferung ~25 Min.",
  "cta.order": "Essen bestellen",
  "cta.book": "Tisch sichern",
  "cta.openMenu": "Menü öffnen",
  "cta.callInstead": "Lieber anrufen",
  "cta.mobileHint": "Auf dem Mobiltelefon öffnet ein Tap die Wähltastatur.",
  "wheel.eyebrow": "Glücksrad",
  "wheel.title": "Eine Drehung. Etwas Süsses.",
  "wheel.subtitle": "Mail eintragen, drehen — und bei deinem nächsten Besuch einlösen.",
  "wheel.name": "Dein Name",
  "wheel.email": "deine@mail.ch",
  "wheel.spin": "Drehen 🎯",
  "wheel.spinning": "Drehen …",
  "wheel.terms": "Ein Gewinn pro Person. Gültig 14 Tage. Kein Spam, versprochen.",
  "wheel.codeLabel": "Dein Code:",
  "wheel.redeemHint":
    "Code im Restaurant nennen oder bei Online-Bestellung im Feld Bemerkungen angeben. Gültig 14 Tage.",
  "wheel.copy": "Eine Kopie geht an",
  "wheel.bye": "Bis bald.",
  "wheel.noWin": "Komm vorbei — wir freuen uns trotzdem auf dich.",
  "prize.eyebrow": "Dein Gewinn",
  "prize.wonOn": "Gewonnen am",
  "prize.validUntil": "gültig bis",
  "prize.yourCode": "Dein Code",
  "prize.howTo": "So löst du ein:",
  "prize.step1": "Code im Restaurant bei der Bestellung nennen, oder",
  "prize.step2": "bei Online-Bestellung im Feld Bemerkungen angeben.",
  "prize.step3": "Ein Gewinn pro Person. Nicht mit anderen Aktionen kombinierbar.",
  "prize.onName": "Auf den Namen",
  "footer.about":
    "Holzofen-Pizza, hausgemachte Pasta und das beste Cordon Bleu von Adliswil. Seit 1998 — und wir bleiben.",
  "footer.visit": "Besuch",
  "footer.contact": "Kontakt",
  "footer.book": "Tisch reservieren →",
  "footer.legal":
    "Restaurant Büchel. Geschlossen am Montag, weil auch wir mal Pizza essen wollen.",
  "footer.made": "Made with 🔥 in Adliswil",
  "404.title": "Seite nicht gefunden",
  "404.subtitle": "Diese Seite gibt es nicht — der Holzofen schon.",
  "404.back": "Zurück zur Startseite",
};

const en: Dict = {
  "nav.menu": "Menu",
  "nav.reservation": "Reserve",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "nav.order": "Order food",
  "nav.book": "Book a table",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",
  "nav.wheel": "🎁 Lucky wheel",
  "nav.wheelLong": "🎁 Spin the wheel",
  "nav.prize": "🎟️ My prize",
  "nav.prizeLong": "🎟️ View my prize",
  "nav.lang": "Language",
  "hero.eyebrow": "Adliswil · since 1998",
  "hero.t1": "Wood fire,",
  "hero.t2": "craft,",
  "hero.t3": "hunger.",
  "hero.subtitle":
    "Pizza from a 380-degree oven, Cordon Bleu like it used to be — only better. Right in Adliswil.",
  "hero.openUntil": "Open today until 23:00",
  "hero.seatsFree": "12 seats free",
  "hero.delivery": "Delivery ~25 min.",
  "cta.order": "Order food",
  "cta.book": "Book a table",
  "cta.openMenu": "Open menu",
  "cta.callInstead": "Rather call",
  "cta.mobileHint": "On mobile a tap opens the dialer.",
  "wheel.eyebrow": "Lucky wheel",
  "wheel.title": "One spin. Something sweet.",
  "wheel.subtitle": "Enter your email, spin — and redeem on your next visit.",
  "wheel.name": "Your name",
  "wheel.email": "your@mail.com",
  "wheel.spin": "Spin 🎯",
  "wheel.spinning": "Spinning …",
  "wheel.terms": "One win per person. Valid 14 days. No spam, promise.",
  "wheel.codeLabel": "Your code:",
  "wheel.redeemHint":
    "Mention the code at the restaurant or add it in the Notes field when ordering online. Valid 14 days.",
  "wheel.copy": "A copy will be sent to",
  "wheel.bye": "See you soon.",
  "wheel.noWin": "Come by anyway — we’ll still be happy to see you.",
  "prize.eyebrow": "Your prize",
  "prize.wonOn": "Won on",
  "prize.validUntil": "valid until",
  "prize.yourCode": "Your code",
  "prize.howTo": "How to redeem:",
  "prize.step1": "Mention the code at the restaurant when ordering, or",
  "prize.step2": "add it in the Notes field for online orders.",
  "prize.step3": "One prize per person. Cannot be combined with other offers.",
  "prize.onName": "On the name",
  "footer.about":
    "Wood-fired pizza, homemade pasta and the best Cordon Bleu in Adliswil. Since 1998 — and we’re staying.",
  "footer.visit": "Visit",
  "footer.contact": "Contact",
  "footer.book": "Book a table →",
  "footer.legal":
    "Restaurant Büchel. Closed on Mondays — even we want to eat pizza sometimes.",
  "footer.made": "Made with 🔥 in Adliswil",
  "404.title": "Page not found",
  "404.subtitle": "This page doesn’t exist — but the wood-fired oven does.",
  "404.back": "Back to home",
};

const it: Dict = {
  "nav.menu": "Menù",
  "nav.reservation": "Prenota",
  "nav.faq": "FAQ",
  "nav.contact": "Contatti",
  "nav.order": "Ordina ora",
  "nav.book": "Riserva un tavolo",
  "nav.openMenu": "Apri menù",
  "nav.closeMenu": "Chiudi menù",
  "nav.wheel": "🎁 Ruota della fortuna",
  "nav.wheelLong": "🎁 Gira la ruota",
  "nav.prize": "🎟️ Il mio premio",
  "nav.prizeLong": "🎟️ Vedi il mio premio",
  "nav.lang": "Lingua",
  "hero.eyebrow": "Adliswil · dal 1998",
  "hero.t1": "Forno a legna,",
  "hero.t2": "artigianato,",
  "hero.t3": "fame.",
  "hero.subtitle":
    "Pizza dal forno a 380 gradi, Cordon Bleu come una volta — solo migliore. Nel cuore di Adliswil.",
  "hero.openUntil": "Aperto oggi fino alle 23:00",
  "hero.seatsFree": "12 posti liberi",
  "hero.delivery": "Consegna ~25 min.",
  "cta.order": "Ordina ora",
  "cta.book": "Riserva un tavolo",
  "cta.openMenu": "Apri il menù",
  "cta.callInstead": "Preferisco chiamare",
  "cta.mobileHint": "Da cellulare un tap apre la tastiera del telefono.",
  "wheel.eyebrow": "Ruota della fortuna",
  "wheel.title": "Un giro. Qualcosa di dolce.",
  "wheel.subtitle": "Inserisci la mail, gira — e usa il premio alla prossima visita.",
  "wheel.name": "Il tuo nome",
  "wheel.email": "tua@mail.it",
  "wheel.spin": "Gira 🎯",
  "wheel.spinning": "Gira …",
  "wheel.terms": "Una vincita a persona. Valido 14 giorni. Niente spam, promesso.",
  "wheel.codeLabel": "Il tuo codice:",
  "wheel.redeemHint":
    "Mostra il codice al ristorante o inseriscilo nel campo Note per gli ordini online. Valido 14 giorni.",
  "wheel.copy": "Una copia sarà inviata a",
  "wheel.bye": "A presto.",
  "wheel.noWin": "Vieni lo stesso — ti aspettiamo volentieri.",
  "prize.eyebrow": "Il tuo premio",
  "prize.wonOn": "Vinto il",
  "prize.validUntil": "valido fino al",
  "prize.yourCode": "Il tuo codice",
  "prize.howTo": "Come usarlo:",
  "prize.step1": "Indica il codice al ristorante al momento dell’ordine, oppure",
  "prize.step2": "inseriscilo nel campo Note per gli ordini online.",
  "prize.step3": "Un premio a persona. Non cumulabile con altre offerte.",
  "prize.onName": "A nome di",
  "footer.about":
    "Pizza al forno a legna, pasta fatta in casa e il miglior Cordon Bleu di Adliswil. Dal 1998 — e qui restiamo.",
  "footer.visit": "Visita",
  "footer.contact": "Contatti",
  "footer.book": "Riserva un tavolo →",
  "footer.legal":
    "Restaurant Büchel. Chiuso il lunedì — anche noi vogliamo mangiare la pizza ogni tanto.",
  "footer.made": "Fatto con 🔥 a Adliswil",
  "404.title": "Pagina non trovata",
  "404.subtitle": "Questa pagina non esiste — ma il forno a legna sì.",
  "404.back": "Torna alla home",
};

const fr: Dict = {
  "nav.menu": "Menu",
  "nav.reservation": "Réserver",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "nav.order": "Commander",
  "nav.book": "Réserver une table",
  "nav.openMenu": "Ouvrir le menu",
  "nav.closeMenu": "Fermer le menu",
  "nav.wheel": "🎁 Roue de la chance",
  "nav.wheelLong": "🎁 Tourner la roue",
  "nav.prize": "🎟️ Mon prix",
  "nav.prizeLong": "🎟️ Voir mon prix",
  "nav.lang": "Langue",
  "hero.eyebrow": "Adliswil · depuis 1998",
  "hero.t1": "Four à bois,",
  "hero.t2": "artisanat,",
  "hero.t3": "appétit.",
  "hero.subtitle":
    "Pizza au four à 380 degrés, Cordon Bleu comme avant — en mieux. En plein cœur d’Adliswil.",
  "hero.openUntil": "Ouvert aujourd’hui jusqu’à 23:00",
  "hero.seatsFree": "12 places libres",
  "hero.delivery": "Livraison ~25 min.",
  "cta.order": "Commander",
  "cta.book": "Réserver une table",
  "cta.openMenu": "Ouvrir le menu",
  "cta.callInstead": "Plutôt appeler",
  "cta.mobileHint": "Sur mobile, un tap ouvre le clavier d’appel.",
  "wheel.eyebrow": "Roue de la chance",
  "wheel.title": "Un tour. Une douceur.",
  "wheel.subtitle": "Entre ton mail, tourne — et utilise ton prix à la prochaine visite.",
  "wheel.name": "Ton prénom",
  "wheel.email": "ton@mail.ch",
  "wheel.spin": "Tourner 🎯",
  "wheel.spinning": "En cours …",
  "wheel.terms": "Un gain par personne. Valable 14 jours. Pas de spam, promis.",
  "wheel.codeLabel": "Ton code :",
  "wheel.redeemHint":
    "Indique le code au restaurant ou ajoute-le dans le champ Remarques pour les commandes en ligne. Valable 14 jours.",
  "wheel.copy": "Une copie sera envoyée à",
  "wheel.bye": "À bientôt.",
  "wheel.noWin": "Passe quand même — on sera ravis de te voir.",
  "prize.eyebrow": "Ton prix",
  "prize.wonOn": "Gagné le",
  "prize.validUntil": "valable jusqu’au",
  "prize.yourCode": "Ton code",
  "prize.howTo": "Comment l’utiliser :",
  "prize.step1": "Indique le code au restaurant lors de la commande, ou",
  "prize.step2": "ajoute-le dans le champ Remarques pour les commandes en ligne.",
  "prize.step3": "Un prix par personne. Non cumulable avec d’autres offres.",
  "prize.onName": "Au nom de",
  "footer.about":
    "Pizza au feu de bois, pâtes maison et le meilleur Cordon Bleu d’Adliswil. Depuis 1998 — et on reste.",
  "footer.visit": "Visite",
  "footer.contact": "Contact",
  "footer.book": "Réserver une table →",
  "footer.legal":
    "Restaurant Büchel. Fermé le lundi — nous aussi, on a envie d’une pizza parfois.",
  "footer.made": "Fait avec 🔥 à Adliswil",
  "404.title": "Page introuvable",
  "404.subtitle": "Cette page n’existe pas — mais le four à bois, oui.",
  "404.back": "Retour à l’accueil",
};

const rm: Dict = {
  "nav.menu": "Menu",
  "nav.reservation": "Reservar",
  "nav.faq": "Dumondas",
  "nav.contact": "Contact",
  "nav.order": "Empustar mangiar",
  "nav.book": "Reservar ina maisa",
  "nav.openMenu": "Avrir il menu",
  "nav.closeMenu": "Serrar il menu",
  "nav.wheel": "🎁 Rolada da fortuna",
  "nav.wheelLong": "🎁 Far rolar",
  "nav.prize": "🎟️ Mes gudogn",
  "nav.prizeLong": "🎟️ Guardar mes gudogn",
  "nav.lang": "Lingua",
  "hero.eyebrow": "Adliswil · dapi 1998",
  "hero.t1": "Fuorn da lain,",
  "hero.t2": "mastergn,",
  "hero.t3": "fom.",
  "hero.subtitle":
    "Pizza dal fuorn da 380 grads, Cordon Bleu sco pli baud — mo meglier. Amez Adliswil.",
  "hero.openUntil": "Oz avert fin las 23:00",
  "hero.seatsFree": "12 plazzas libras",
  "hero.delivery": "Furniziun ~25 min.",
  "cta.order": "Empustar mangiar",
  "cta.book": "Reservar ina maisa",
  "cta.openMenu": "Avrir il menu",
  "cta.callInstead": "Pli gugent telefonar",
  "cta.mobileHint": "Sin il mobil avra in tap il clavier da telefonar.",
  "wheel.eyebrow": "Rolada da fortuna",
  "wheel.title": "Ina rolada. Insatge dultsch.",
  "wheel.subtitle": "Endatescha tia mail, rola — e duvra il premi a la proxima visita.",
  "wheel.name": "Tes num",
  "wheel.email": "tia@mail.ch",
  "wheel.spin": "Rolar 🎯",
  "wheel.spinning": "Rolar …",
  "wheel.terms": "In gudogn per persuna. Valaivel 14 dis. Nagin spam, empermess.",
  "wheel.codeLabel": "Tes code:",
  "wheel.redeemHint":
    "Numna il code en il restaurant u agiunscha el en il champ Remartgas per empustaziuns online. Valaivel 14 dis.",
  "wheel.copy": "Ina copia vegn trametida a",
  "wheel.bye": "A bainbaud.",
  "wheel.noWin": "Vegn tuttina — nus ans legrain dad anflar tai.",
  "prize.eyebrow": "Tes gudogn",
  "prize.wonOn": "Gudagnà ils",
  "prize.validUntil": "valaivel fin",
  "prize.yourCode": "Tes code",
  "prize.howTo": "Co duvrar el:",
  "prize.step1": "Numna il code en il restaurant cur ch’i fas l’empustaziun, ubain",
  "prize.step2": "agiunscha el en il champ Remartgas per empustaziuns online.",
  "prize.step3": "In gudogn per persuna. Betg cumbinabel cun autras acziuns.",
  "prize.onName": "Sin il num",
  "footer.about":
    "Pizza dal fuorn da lain, pasta fatga a chasa ed il meglier Cordon Bleu d’Adliswil. Dapi 1998 — e nus restain.",
  "footer.visit": "Visita",
  "footer.contact": "Contact",
  "footer.book": "Reservar ina maisa →",
  "footer.legal":
    "Restaurant Büchel. Serrà la glindesdi — er nus vulain mangiar pizza mintgatant.",
  "footer.made": "Fatg cun 🔥 ad Adliswil",
  "404.title": "Pagina betg chattada",
  "404.subtitle": "Questa pagina n’exista betg — ma il fuorn da lain gea.",
  "404.back": "Turnar a la pagina principala",
};

const uk: Dict = {
  "nav.menu": "Меню",
  "nav.reservation": "Бронювання",
  "nav.faq": "Питання",
  "nav.contact": "Контакти",
  "nav.order": "Замовити їжу",
  "nav.book": "Забронювати стіл",
  "nav.openMenu": "Відкрити меню",
  "nav.closeMenu": "Закрити меню",
  "nav.wheel": "🎁 Колесо фортуни",
  "nav.wheelLong": "🎁 Крутити колесо",
  "nav.prize": "🎟️ Мій виграш",
  "nav.prizeLong": "🎟️ Переглянути виграш",
  "nav.lang": "Мова",
  "hero.eyebrow": "Адлісвіль · з 1998",
  "hero.t1": "Дровʼяна піч,",
  "hero.t2": "майстерність,",
  "hero.t3": "апетит.",
  "hero.subtitle":
    "Піца з печі на 380 градусів, Cordon Bleu як колись — тільки краще. У самому центрі Адлісвіля.",
  "hero.openUntil": "Сьогодні відкрито до 23:00",
  "hero.seatsFree": "12 вільних місць",
  "hero.delivery": "Доставка ~25 хв.",
  "cta.order": "Замовити їжу",
  "cta.book": "Забронювати стіл",
  "cta.openMenu": "Відкрити меню",
  "cta.callInstead": "Краще зателефонувати",
  "cta.mobileHint": "На мобільному дотик відкриває клавіатуру дзвінка.",
  "wheel.eyebrow": "Колесо фортуни",
  "wheel.title": "Один оберт. Щось солоденьке.",
  "wheel.subtitle":
    "Введіть пошту, крутіть — і скористайтеся виграшем під час наступного візиту.",
  "wheel.name": "Ваше імʼя",
  "wheel.email": "ваша@пошта.ua",
  "wheel.spin": "Крутити 🎯",
  "wheel.spinning": "Крутиться …",
  "wheel.terms": "Один виграш на особу. Дійсний 14 днів. Без спаму, обіцяємо.",
  "wheel.codeLabel": "Ваш код:",
  "wheel.redeemHint":
    "Назвіть код у ресторані або вкажіть його в полі «Коментарі» при онлайн-замовленні. Дійсний 14 днів.",
  "wheel.copy": "Копія буде надіслана на",
  "wheel.bye": "До зустрічі.",
  "wheel.noWin": "Завітайте все одно — будемо раді вас бачити.",
  "prize.eyebrow": "Ваш виграш",
  "prize.wonOn": "Виграно",
  "prize.validUntil": "дійсний до",
  "prize.yourCode": "Ваш код",
  "prize.howTo": "Як отримати:",
  "prize.step1": "Назвіть код у ресторані під час замовлення, або",
  "prize.step2": "вкажіть його в полі «Коментарі» при онлайн-замовленні.",
  "prize.step3": "Один виграш на особу. Не поєднується з іншими акціями.",
  "prize.onName": "На імʼя",
  "footer.about":
    "Піца з дровʼяної печі, домашня паста та найкраще Cordon Bleu в Адлісвілі. З 1998 — і ми залишаємось.",
  "footer.visit": "Візит",
  "footer.contact": "Контакти",
  "footer.book": "Забронювати стіл →",
  "footer.legal":
    "Restaurant Büchel. Зачинено в понеділок — ми теж іноді хочемо піцу.",
  "footer.made": "Зроблено з 🔥 в Адлісвілі",
  "404.title": "Сторінку не знайдено",
  "404.subtitle": "Цієї сторінки не існує — а дровʼяна піч існує.",
  "404.back": "Повернутись на головну",
};

const DICT: Record<Lang, Dict> = { de, en, it, fr, rm, uk };

const STORAGE_KEY = "buechel_lang_v1";

function detectLang(): Lang {
  if (typeof window === "undefined") return "de";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && DICT[saved]) return saved;
  } catch {
    /* noop */
  }
  const codes =
    (typeof navigator !== "undefined" &&
      (navigator.languages ?? [navigator.language])) ||
    [];
  for (const raw of codes) {
    const c = (raw || "").toLowerCase();
    if (c.startsWith("de")) return "de";
    if (c.startsWith("en")) return "en";
    if (c.startsWith("it")) return "it";
    if (c.startsWith("fr")) return "fr";
    if (c.startsWith("rm")) return "rm";
    if (c.startsWith("uk") || c.startsWith("ua")) return "uk";
  }
  return "de";
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const I18nCtx = createContext<Ctx>({ lang: "de", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: (l) => {
        try {
          window.localStorage.setItem(STORAGE_KEY, l);
        } catch {
          /* noop */
        }
        setLangState(l);
      },
      t: (key) => DICT[lang]?.[key] ?? de[key] ?? key,
    }),
    [lang],
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
