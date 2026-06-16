
# План реалізації — Restaurant Büchel

Будуємо в поточному проєкті (TanStack Start + Tailwind v4 + Lovable Cloud). Концепт із попереднього плану беремо як специфікацію.

## 1. Дизайн-система та фундамент

- `src/styles.css`: токени палітри «Trattoria Notturna» (cream `#F7F2EA`, espresso `#241E1A`, brick `#C0392B`, wood-fire `#E08A3C`, basilico `#3E5C4A`), радіуси, тіні, gradients.
- Шрифти: `Fraunces` (display, variable opsz) + `Inter Tight` (body) + `JetBrains Mono` (ціни) через Google Fonts у `__root.tsx`.
- shadcn-варіанти Button (`primary`, `outline`, `ghost`, `wood`), Card, Badge, Sheet/Drawer, Tabs.
- Темний film-grain overlay-компонент для Hero.
- `Motion` (motion для React) для анімацій.

## 2. Інтернаціоналізація (DE-CH default + EN + FR + IT + UK)

- Бібліотека: `i18next` + `react-i18next` + `i18next-browser-languagedetector`.
- Структура: `src/i18n/locales/{de,en,fr,it,uk}/common.json` (nav, hero, cta, microcopy), `menu.json`, `faq.json`, `legal.json`.
- URL-стратегія: префікс `/{lang}/...`, де `de` — дефолт без префіксу на корені (`/` = DE, `/en`, `/fr`, `/it`, `/uk`). Реалізація — pathless layout `src/routes/$lang.tsx` + redirect-логіка в `__root.tsx`.
- `hreflang` теги в кожному `head()` для всіх 5 мов.
- Перемикач мов у nav (компактний dropdown з нативними назвами: Deutsch · English · Français · Italiano · Українська).
- DE-тексти — фінальні з попереднього плану; EN/FR/IT/UK — перекладемо у тому ж сенсі (без машинного присмаку).

## 3. Контент: фото та меню

- Скрейпимо обидва URL через **Firecrawl** (connector): `schnellaberguet.ch/restaurantbuechel/` та сторінку меню `schnell-aber-guet.ch/ordering/.../menu?restaurant_uid=...`.
  - `firecrawl.scrape` з `formats: ['markdown','html','links']` → витягуємо назви страв, описи, ціни, категорії.
  - Збираємо URL фото зі сторінки меню → завантажуємо → конвертуємо в WebP/AVIF → завантажуємо через `lovable-assets create`.
- Якщо для якихось страв фото відсутні / низької якості — догенеровуємо `imagegen` (premium для Hero, fast для карток меню) у консистентному стилі (warm, top-down, dark wood).
- Меню зберігаємо в таблиці `menu_items` (див. §5), seed через migration.

## 4. Структура routes

```
src/routes/
  __root.tsx                  # шрифти, global JSON-LD (Restaurant+LocalBusiness), auth-listener, lang detector
  index.tsx                   # Landing (DE)
  menu.tsx                    # повне меню з фільтрами
  reservation.tsx             # 2-крокове бронювання
  lieferung.tsx               # доставка/самовивіз
  ueber-uns.tsx               # історія, команда
  kontakt.tsx                 # адреса, карта, форма
  faq.tsx                     # FAQPage schema
  matchmaker.tsx              # Stimmungs-Matchmaker (квіз)
  $lang.tsx                   # pathless layout для EN/FR/IT/UK з тими ж дочірніми
  api/public/
    reservation-webhook.ts    # (опц.) для майбутньої POS-інтеграції
```

Кожна leaf-route має власний `head()` з унікальним title/description/og:image/canonical + `hreflang` для 5 мов.

## 5. Lovable Cloud — схема БД

Активуємо Cloud. Таблиці (усі з `GRANT` + RLS):

- `menu_items` — id, slug, category, name_de/en/fr/it/uk, description_*, price_chf, image_url, tags[] (vegi, glutenfrei, spicy, signature), is_available, sort_order. Public SELECT для anon.
- `reservations` — id, name, phone, date, time, guests, note, created_at, status. INSERT для anon (rate-limited), SELECT/UPDATE тільки service_role.
- `wheel_leads` — id, email, name, prize_code, prize_label, won_at, redeemed_at, ip_hash. INSERT для anon (1 на email/добу), SELECT service_role.
- `matchmaker_responses` — id, mood, texture, diet, recommended_slug, session_id, created_at. INSERT anon (аналітика).
- `reviews_cache` — cached Google Places відгуки (оновлюються server fn щогодини).

## 6. Серверні функції (`createServerFn`)

- `getMenu({lang})` — публічна, server publishable client.
- `createReservation({data})` — валідація Zod, INSERT, повертає підтвердження. Опц. SMS через Twilio (якщо користувач підключить).
- `spinWheel({email, name, lang})` — server-side детермінує приз (зважена випадковість, anti-cheat), генерує unique `prize_code`, шле email через Resend (якщо connector), повертає `{ angle, prize }`.
- `submitMatchmaker({answers})` — алгоритм підбору, лог в БД.
- `getReviews()` — Google Places API (потрібен ключ; якщо не підключений — fallback на seed 5 відгуків).
- `getRestaurantStatus()` — повертає `{ isOpenNow, closesAt, nextOpen }` з opening_hours (для live-bar у Hero).

## 7. Гейміфікація

**Glücksrad (повна реалізація з MVP):**
- Тригер: exit-intent (desktop) + 70% scroll (mobile), показ 1 раз/тиждень (localStorage).
- UI: SVG-колесо 8 секторів, Motion `rotate` з `cubic-bezier(0.17, 0.67, 0.16, 1)`, ease-out 4s.
- Форма: email + ім'я → `spinWheel` server fn → детермінований кут → email з кодом.
- Призи: Tiramisu gratis, Aperol gratis, 10% Lieferung, Margherita gratis (при замовленні ≥ CHF 30), free Caffè, 5% rabatt, «Beim nächsten Mal mehr Glück» (×2 порожніх).

**Stimmungs-Matchmaker** — на окремій route `/matchmaker`, 3-крок swipe quiz, рекомендації з `menu_items`.

**Easter eggs** — Konami code (геменю шефа після 22:00), 7× клік на лого (історія 1998), сирна крапля на сторінці Cordon Bleu (canvas trail).

## 8. AEO / SEO

- `__root.tsx` — sitewide `Restaurant` + `LocalBusiness` JSON-LD.
- `/menu` — `Menu` JSON-LD з усіма стравами з БД.
- `/faq` — `FAQPage` JSON-LD.
- `/ueber-uns` — `AboutPage`.
- Breadcrumbs schema на всіх leaf-routes.
- `sitemap.xml` + `robots.txt` (5 мов × ~8 route).
- Семантичний HTML, alt-тексти на всіх фото DE+EN.
- Open Graph: для кожної route власне фото (страва = share-image).

## 9. Послідовність виконання (приблизно)

1. Enable Lovable Cloud → міграції (`menu_items`, `reservations`, `wheel_leads`, `matchmaker_responses`).
2. Дизайн-токени, шрифти, базові UI-компоненти.
3. Скрейп фото та меню через Firecrawl → завантажити assets → seed migration для `menu_items`.
4. Routes structure + i18n + перемикач мов.
5. Hero, Nav, Footer, live-status.
6. `/menu` з фільтрами та bottom-sheet деталями.
7. `/reservation` 2-step flow + server fn.
8. FAQ + усі JSON-LD + sitemap.
9. Glücksrad (UI + server fn + email).
10. Matchmaker quiz.
11. Easter eggs + поліровка анімацій.
12. SEO-аудит, Lighthouse, accessibility-pass.

## 10. Що потребує підключення / уточнення

- **Firecrawl connector** — для скрейпу меню та фото з існуючого сайту. Підключу на початку.
- **Resend** (або інший email connector) — для відправки коду виграшу Glücksrad. Опц. на початку: можна показувати код одразу в UI без email. **Чи підключаємо одразу?**
- **Google Places API** — для live-відгуків. Якщо не хочеш — використаю 5 seed-відгуків (можна редагувати). **Підключаємо?**
- **Twilio** — для SMS-підтвердження бронювання. **Чи треба, чи достатньо email + on-screen confirmation?**
- **Контактні дані**: поточний сайт показує Albisstrasse, але точна адреса/телефон/email/години потребують підтвердження від тебе або витягнемо з сайту під час скрейпу. **Підтвердиш фінальні значення після скрейпу?**
- **EN/FR/IT/UK тексти** — згенерую сам у відповідному стилі, але ти зможеш ревʼювнути в UI після білда.

---

Підтвердь або скоригуй пункти з §10, і переходжу в build mode.
