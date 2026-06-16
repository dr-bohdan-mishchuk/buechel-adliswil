export type DishTag = "vegi" | "scharf" | "signature" | "fisch" | "fleisch";

export interface Dish {
  slug: string;
  name: string;
  desc: string;
  price: number;
  tags: DishTag[];
  category:
    | "vorspeise"
    | "salat"
    | "pizza32"
    | "pizza40"
    | "pizza-pickup"
    | "pizza-spezial"
    | "pasta"
    | "pasta-lieblinge"
    | "risotto"
    | "fleisch"
    | "cordon"
    | "fisch"
    | "spezial"
    | "dessert"
    | "softdrink"
    | "bier"
    | "wein";
}

export const CATEGORIES: { id: Dish["category"]; label: string }[] = [
  { id: "vorspeise", label: "Vorspeisen" },
  { id: "salat", label: "Salate" },
  { id: "pizza32", label: "Pizza Ø 32 cm" },
  { id: "pizza40", label: "Pizza Ø 40 cm" },
  { id: "pizza-pickup", label: "Pizza Abholung 32 cm" },
  { id: "pizza-spezial", label: "Spezialpizza des Hauses" },
  { id: "pasta", label: "Pasta" },
  { id: "pasta-lieblinge", label: "Die Lieblinge" },
  { id: "risotto", label: "Risotto" },
  { id: "fleisch", label: "Fleischparade" },
  { id: "cordon", label: "Cordon Bleu Parade" },
  { id: "fisch", label: "Fischgerichte" },
  { id: "spezial", label: "Spezialitäten" },
  { id: "dessert", label: "Desserts" },
  { id: "softdrink", label: "Softdrinks" },
  { id: "bier", label: "Bier" },
  { id: "wein", label: "Weine" },
];

const d = (
  slug: string,
  name: string,
  desc: string,
  price: number,
  category: Dish["category"],
  tags: DishTag[] = [],
): Dish => ({ slug, name, desc, price, category, tags });

export const DISHES: Dish[] = [
  // Vorspeisen
  d("gebackene-champignons", "Gebackene Champignons", "Tartar Sauce", 16.5, "vorspeise"),
  d("crevetten-cocktail", "Crevetten Cocktail", "", 14.5, "vorspeise"),

  // Salate
  d("gruener-salat", "Grüner Salat", "Dressing nach Wahl", 8.5, "salat", ["vegi"]),
  d("gemischter-salat", "Gemischter Salat", "Dressing nach Wahl", 10.5, "salat", ["vegi"]),
  d("nuessli-ei", "Nüsslisalat mit Ei", "", 13.5, "salat", ["vegi"]),
  d("nuessli-steinpilz", "Nüsslisalat mit Steinpilzen", "", 15.5, "salat", ["vegi"]),
  d("caesar", "Caesar Salat", "Speck, Parmesanscheiben und Brotcroûtons", 13.5, "salat"),
  d("caprese", "Tomatensalat Caprese", "", 13.5, "salat", ["vegi"]),
  d("kreta", "Kretasalat", "Feta, Oliven, Paprikaschoten und Gurken", 14.5, "salat", ["vegi"]),
  d("salatteller-buechel", "Grosser Salatteller Büchel", "Reichlicher Salatteller mit Pouletbruststreifen", 20.5, "salat", ["signature"]),

  // Pizza 32cm
  d("p32-margherita", "Pizza Margherita Ø32", "Tomatensauce, Mozzarella, Oregano", 16.5, "pizza32", ["vegi"]),
  d("p32-napoli", "Pizza Napoli Ø32", "Tomatensauce, Mozzarella, Sardellen, Kapern, Oliven, Oregano", 18.5, "pizza32"),
  d("p32-prosciutto", "Pizza Prosciutto Ø32", "Tomatensauce, Mozzarella, Schinken, Oregano", 18.5, "pizza32"),
  d("p32-tonno", "Pizza al Tonno Ø32", "Tomatensauce, Mozzarella, Thon, Zwiebeln, Kapern, Oregano", 20.5, "pizza32"),
  d("p32-basilea", "Pizza Basilea Ø32", "Tomatensauce, Mozzarella, Auberginen, Peperoni, Zwiebeln, Knoblauch, Oregano", 19.5, "pizza32", ["vegi"]),
  d("p32-calzone", "Pizza Calzone (zugedeckt) Ø32", "Tomatensauce, Mozzarella, Schinken, Pilze, Ei, Oregano", 20.5, "pizza32"),
  d("p32-hawaii", "Pizza Hawaii Ø32", "Tomatensauce, Mozzarella, Schinken, Ananas, Oregano", 19.5, "pizza32"),
  d("p32-calabrese", "Pizza Calabrese (scharf) Ø32", "Tomatensauce, Mozzarella, scharfe Salami, Oregano", 19.5, "pizza32", ["scharf"]),
  d("p32-frutti", "Pizza Frutti di Mare Ø32", "Tomatensauce, Mozzarella, Meeresfrüchte, Knoblauch, Oregano", 21.5, "pizza32"),
  d("p32-stagioni", "Pizza Quattro Stagioni Ø32", "Tomatensauce, Mozzarella, Schinken, Champignons, Peperoni, Artischocken, Oregano", 21.5, "pizza32"),
  d("p32-mamma", "Pizza Mamma Mia Ø32", "Tomatensauce, Mozzarella, Broccoli, Spinat, Champignons, Auberginen, Oregano", 21.5, "pizza32", ["vegi"]),
  d("p32-butta", "Pizza Buttafuoco (scharf) Ø32", "Tomatensauce, Mozzarella, Speck, scharfe Salami, Peperoncini, Zwiebeln, Knoblauch, Oregano", 20.5, "pizza32", ["scharf"]),
  d("p32-diavolo", "Pizza Diavolo Ø32", "Tomatensauce, Mozzarella, Champignons, Salami, Peperoni, Oregano", 20.5, "pizza32", ["signature"]),
  d("p32-padrone", "Pizza Padrone (scharf) Ø32", "Tomatensauce, Mozzarella, Kalbfleisch, Champignons, Peperoncini, Zwiebeln, Knoblauch, Oregano", 22.5, "pizza32", ["scharf"]),
  d("p32-crudo", "Pizza Prosciutto crudo Ø32", "Tomatensauce, Mozzarella, Parmaschinken, Rucola, Oregano", 22.5, "pizza32", ["signature"]),
  d("p32-nonno", "Pizza Nonno (scharf) Ø32", "Tomatensauce, Mozzarella, Peperoncini, Crevetten, Oregano", 23.5, "pizza32", ["scharf"]),
  d("p32-pollo", "Pizza Pollo (scharf) Ø32", "Tomatensauce, Mozzarella, Poulet, Zwiebeln, Knoblauch, Peperoncini, Oregano", 20.5, "pizza32", ["scharf"]),

  // Pizza 40cm
  d("p40-margherita", "Pizza Margherita Ø40", "Tomatensauce, Mozzarella, Oregano", 34.5, "pizza40", ["vegi"]),
  d("p40-napoli", "Pizza Napoli Ø40", "Tomatensauce, Mozzarella, Sardellen, Kapern, Oliven, Oregano", 35.5, "pizza40"),
  d("p40-prosciutto", "Pizza Prosciutto Ø40", "Tomatensauce, Mozzarella, Schinken, Oregano", 35.5, "pizza40"),
  d("p40-tonno", "Pizza al Tonno Ø40", "Tomatensauce, Mozzarella, Thon, Zwiebeln, Kapern, Oregano", 38.5, "pizza40"),
  d("p40-basilea", "Pizza Basilea Ø40", "Tomatensauce, Mozzarella, Auberginen, Peperoni, Zwiebeln, Knoblauch, Oregano", 38.5, "pizza40", ["vegi"]),
  d("p40-hawaii", "Pizza Hawaii Ø40", "Tomatensauce, Mozzarella, Schinken, Ananas, Oregano", 39.5, "pizza40"),
  d("p40-calabrese", "Pizza Calabrese (scharf) Ø40", "Tomatensauce, Mozzarella, scharfe Salami, Oregano", 38.5, "pizza40", ["scharf"]),
  d("p40-frutti", "Pizza Frutti di Mare Ø40", "Tomatensauce, Mozzarella, Meeresfrüchte, Knoblauch, Oregano", 38.5, "pizza40"),
  d("p40-stagioni", "Pizza Quattro Stagioni Ø40", "Tomatensauce, Mozzarella, Schinken, Champignons, Peperoni, Artischocken, Oregano", 39.5, "pizza40"),
  d("p40-mamma", "Pizza Mamma Mia Ø40", "Tomatensauce, Mozzarella, Broccoli, Spinat, Champignons, Auberginen, Oregano", 40.5, "pizza40", ["vegi"]),
  d("p40-butta", "Pizza Buttafuoco (scharf) Ø40", "Tomatensauce, Mozzarella, Speck, scharfe Salami, Peperoncini, Zwiebeln, Knoblauch, Oregano", 38.5, "pizza40", ["scharf"]),
  d("p40-diavolo", "Pizza Diavolo Ø40", "Tomatensauce, Mozzarella, Champignons, Salami, Peperoni, Oregano", 39.5, "pizza40"),
  d("p40-padrone", "Pizza Padrone (scharf) Ø40", "Tomatensauce, Mozzarella, Kalbfleisch, Champignons, Peperoncini, Zwiebeln, Knoblauch, Oregano", 42.5, "pizza40", ["scharf"]),
  d("p40-crudo", "Pizza Prosciutto crudo Ø40", "Tomatensauce, Mozzarella, Parmaschinken, Rucola, Oregano", 42.5, "pizza40"),
  d("p40-nonno", "Pizza Nonno (scharf) Ø40", "Tomatensauce, Mozzarella, Peperoncini, Crevetten, Oregano", 44.5, "pizza40", ["scharf"]),
  d("p40-pollo", "Pizza Pollo (scharf) Ø40", "Tomatensauce, Mozzarella, Poulet, Zwiebeln, Knoblauch, Peperoncini, Oregano", 39.5, "pizza40", ["scharf"]),

  // Pizza Abholung 32cm
  d("pp-napoli", "Pizza Napoli 32cm – Abholung", "Tomatensauce, Mozzarella, Sardellen, Kapern, Oliven, Oregano", 17, "pizza-pickup"),
  d("pp-prosciutto", "Pizza Prosciutto 32cm – Abholung", "Tomatensauce, Mozzarella, Schinken, Oregano", 17, "pizza-pickup"),
  d("pp-tonno", "Pizza al Tonno 32cm – Abholung", "Tomatensauce, Mozzarella, Thon, Zwiebeln, Kapern, Oregano", 17, "pizza-pickup"),
  d("pp-basilea", "Pizza Basilea 32cm – Abholung", "Tomatensauce, Mozzarella, Auberginen, Peperoni, Zwiebeln, Knoblauch, Oregano", 17, "pizza-pickup", ["vegi"]),
  d("pp-calzone", "Pizza Calzone 32cm – Abholung", "Tomatensauce, Mozzarella, Schinken, Pilze, Ei, Oregano", 17, "pizza-pickup"),
  d("pp-hawaii", "Pizza Hawaii 32cm – Abholung", "Tomatensauce, Mozzarella, Schinken, Ananas, Oregano", 17, "pizza-pickup"),
  d("pp-calabrese", "Pizza Calabrese (scharf) 32cm – Abholung", "Tomatensauce, Mozzarella, scharfe Salami, Oregano", 17, "pizza-pickup", ["scharf"]),
  d("pp-frutti", "Pizza Frutti di Mare 32cm – Abholung", "Tomatensauce, Mozzarella, Meeresfrüchte, Knoblauch, Oregano", 17, "pizza-pickup"),
  d("pp-stagioni", "Pizza Quattro Stagioni 32cm – Abholung", "Tomatensauce, Mozzarella, Schinken, Champignons, Peperoni, Artischocken, Oregano", 17, "pizza-pickup"),
  d("pp-mamma", "Pizza Mamma Mia 32cm – Abholung", "Tomatensauce, Mozzarella, Broccoli, Spinat, Champignons, Auberginen, Oregano", 17, "pizza-pickup", ["vegi"]),
  d("pp-butta", "Pizza Buttafuoco (scharf) 32cm – Abholung", "Tomatensauce, Mozzarella, Speck, scharfe Salami, Peperoncini, Zwiebeln, Knoblauch, Oregano", 17, "pizza-pickup", ["scharf"]),
  d("pp-diavolo", "Pizza Diavolo 32cm – Abholung", "Tomatensauce, Mozzarella, Champignons, Salami, Peperoni, Oregano", 17, "pizza-pickup"),
  d("pp-padrone", "Pizza Padrone (scharf) 32cm – Abholung", "Tomatensauce, Mozzarella, Kalbfleisch, Champignons, Peperoncini, Zwiebeln, Knoblauch, Oregano", 17, "pizza-pickup", ["scharf"]),
  d("pp-crudo", "Pizza Prosciutto crudo 32cm – Abholung", "Tomatensauce, Mozzarella, Parmaschinken, Rucola, Oregano", 17, "pizza-pickup"),
  d("pp-nonno", "Pizza Nonno (scharf) 32cm – Abholung", "Tomatensauce, Mozzarella, Peperoncini, Crevetten, Oregano", 17, "pizza-pickup", ["scharf"]),
  d("pp-pollo", "Pizza Pollo (scharf) 32cm – Abholung", "Tomatensauce, Mozzarella, Poulet, Zwiebeln, Knoblauch, Peperoncini, Oregano", 17, "pizza-pickup", ["scharf"]),

  // Spezialpizza
  d("ps-vegi", "Pizza Vegi-Insel (zugedeckt) Ø32", "Pizzateig gefüllt mit Tomatensauce, Grillgemüse, Auberginen, Zucchetti, Peperoni, Champignons, überbacken mit Mozzarella, garniert mit Salat und Tzatziki", 23.5, "pizza-spezial", ["vegi", "signature"]),
  d("ps-farmer", "Pizza Farmer-Insel (zugedeckt) Ø32", "Pizzateig gefüllt mit Tomatensauce, Grillgemüse, gebratenen Pouletbruststreifen, überbacken mit Mozzarella, garniert mit Salat und Tzatziki", 27.5, "pizza-spezial"),
  d("ps-alaz", "Pizza Alaz-Insel (zugedeckt) Ø32", "Pizzateig gefüllt mit Tomatensauce, Grillgemüse, gebratenen Kalbfleischstreifen, überbacken mit Mozzarella, garniert mit Salat und Tzatziki", 29.5, "pizza-spezial", ["signature"]),

  // Pasta
  d("sp-napoli", "Spaghetti Napoli", "Tomatensauce", 17.5, "pasta", ["vegi"]),
  d("sp-bolognese", "Spaghetti Bolognese", "", 21.5, "pasta"),
  d("sp-carbonara", "Spaghetti Carbonara", "Rahm, Zwiebeln, Knoblauch, Parmesan, Speckstreifen und Petersilie", 21.5, "pasta", ["signature"]),
  d("sp-olio", "Spaghetti al Olio (scharf)", "Knoblauch, Peperoncini und Oliven", 19.5, "pasta", ["vegi", "scharf"]),
  d("sp-pesto", "Spaghetti Pesto", "", 19.5, "pasta", ["vegi"]),
  d("sp-buechel", "Spaghetti Büchel", "Tomaten, Rahmsauce, Kalbfleisch, Zwiebeln, Knoblauch und Peperoncini", 24.5, "pasta", ["signature"]),
  d("sp-veg", "Spaghetti Vegetariano", "Buntes Saisongemüse an leichter Rahmsauce", 20.5, "pasta", ["vegi"]),
  d("penne-forno", "Penne al Forno aus dem Ofen", "Rahmsauce, Schinken, Zwiebeln, Knoblauch und gratiniert mit Käse", 21.5, "pasta"),
  d("gnocchi-gorgo", "Gnocchi Gorgonzola", "Gorgonzola mit Rahmsauce", 21.5, "pasta", ["vegi"]),
  d("gnocchi-chiara", "Gnocchi Santa Chiara", "Bolognese mit Rahmsauce", 21.5, "pasta"),
  d("tort-spinaci", "Tortellini Spinaci Pesto", "Spinatfüllung, Pestosauce und Parmesan", 21.5, "pasta", ["vegi"]),
  d("rav-ricotta", "Ravioli Ricotta Spinaci alla Panna", "Ravioli mit Spinatfüllung und Rahmsauce", 22.5, "pasta", ["vegi"]),
  d("lasagne", "Lasagne", "", 21.5, "pasta"),

  // Die Lieblinge
  d("penne-chef", "Penne nach Chef Art", "Zarte Rindsfiletwürfel in Olivenöl gebraten, Cherry Tomaten, Taleggio Käse, Zwiebeln, Knoblauch, Rahm und Rucola", 28.5, "pasta-lieblinge", ["signature"]),
  d("tagl-thai", "Tagliatelle „Thai Curry“", "Gebratene Pouletbrustwürfel, Gemüse, Kokos-Sojasauce, grünes Thai Curry, Ingwer und Zitronengras", 26.5, "pasta-lieblinge", ["scharf"]),
  d("tagl-salmone", "Tagliatelle Salmone", "Tomatenrahmsauce, Zwiebeln, Knoblauch, Basilikum und Lachsfilet", 25.5, "pasta-lieblinge", ["fisch"]),

  // Risotto
  d("ri-verdure", "Risotto Verdure", "Feingeschnittenes Gemüse, Tomaten, frischer Basilikum, Mascarpone und Weisswein", 20.5, "risotto", ["vegi"]),
  d("ri-porcini", "Risotto Fungi Porcini", "Steinpilze", 23.5, "risotto", ["vegi"]),
  d("ri-frutti", "Risotto Frutti di Mare", "Meeresfrüchte und Tomatensauce", 22.5, "risotto"),

  // Fleisch
  d("fl-rahmschnitzel", "Gegrilltes Schweinsrahmschnitzel", "Champignons und Rahmsauce", 27.5, "fleisch", ["fleisch"]),
  d("fl-schwein", "Paniertes Schweinsschnitzel", "Beilage nach Wahl", 27.5, "fleisch", ["fleisch"]),
  d("fl-wiener", "Paniertes Wienerschnitzel", "Dünn geklopftes, paniertes Kalbsschnitzel, garniert mit Zitrone", 36.5, "fleisch", ["fleisch", "signature"]),
  d("fl-zuercher", "Zürcher Kalbsgeschnetzeltes", "Zartes Kalbfleisch mit Weisswein-Rahmsauce und frischen Champignons", 39.5, "fleisch", ["fleisch", "signature"]),
  d("fl-poulet-grill", "Gegrillte Pouletbrust", "", 28.5, "fleisch", ["fleisch"]),
  d("fl-poulet-pan", "Panierte Pouletbrust", "", 28.5, "fleisch", ["fleisch"]),
  d("fl-scaloppine", "Scaloppine al limone", "mit Zitronen-Rahmsauce", 35.5, "fleisch", ["fleisch"]),
  d("fl-rindsfilet", "Gegrilltes Rindsfilet", "Beilage nach Wahl", 47.5, "fleisch", ["fleisch", "signature"]),
  d("fl-entrecote", "Gegrilltes Rindsentrecôte", "Beilage nach Wahl", 41.5, "fleisch", ["fleisch", "signature"]),
  d("fl-pferd", "Gegrilltes Pferdefilet", "Beilage nach Wahl", 42.5, "fleisch", ["fleisch"]),
  d("fl-kalbssteak", "Gegrilltes Kalbssteak", "Beilage nach Wahl", 40.5, "fleisch", ["fleisch"]),
  d("fl-schweinssteak", "Gegrilltes Schweinssteak", "Beilage nach Wahl", 30.5, "fleisch", ["fleisch"]),

  // Cordon Bleu
  d("cb-kalb-klassiker", "Kalbs Cordon Bleu „Klassiker“", "Gefüllt mit Schinken, Gruyère und eine Beilage nach Wahl", 39.5, "cordon", ["signature"]),
  d("cb-kalb-fiorentina", "Kalbs Cordon Bleu „Fiorentina“", "Gefüllt mit Spinat, Mascarpone und eine Beilage nach Wahl", 39.5, "cordon"),
  d("cb-schwein-klassiker", "Schweins Cordon Bleu „Der Klassiker“", "Gefüllt mit Schinken, Gruyère und eine Beilage nach Wahl", 27.5, "cordon", ["signature"]),
  d("cb-schwein-buechel", "Schweins Cordon Bleu „Büchel“", "Gefüllt mit Speck, Zwiebeln, Tomaten, Gruyère und eine Beilage nach Wahl", 29.5, "cordon", ["signature"]),
  d("cb-schwein-adliswil", "Schweins Cordon Bleu „Adliswil“", "Gefüllt mit Steinpilzen, Champignons, Raclettekäse und eine Beilage nach Wahl", 30.5, "cordon", ["signature"]),
  d("cb-schwein-alaz", "Schweins Cordon Bleu „Alaz“ (scharf)", "Gefüllt mit scharfer Salami, Gorgonzola und eine Beilage nach Wahl", 29.5, "cordon", ["scharf"]),
  d("cb-poulet-klassiker", "Poulet Cordon Bleu „Der Klassiker“", "Gefüllt mit Schinken, Gruyère und eine Beilage nach Wahl", 29.5, "cordon"),
  d("cb-poulet-hawaii", "Poulet Cordon Bleu „Hawaii“", "Gefüllt mit Schinken, Ananas, Gruyère und eine Beilage nach Wahl", 29.5, "cordon"),

  // Fisch
  d("fi-egli", "Eglifilet", "Mandeln in Butter gebraten und eine Beilage nach Wahl", 34.5, "fisch", ["fisch"]),
  d("fi-zander", "Zanderfilet", "Zitronensauce und eine Beilage nach Wahl", 32.5, "fisch", ["fisch"]),
  d("fi-blacktiger", "Black Tiger", "Riesencrevetten vom Grill und eine Beilage nach Wahl", 35.5, "fisch", ["fisch", "signature"]),

  // Spezialitäten
  d("sp-arche", "Arche Noah Fladen", "Gerolltes Fladenbrot mit Gemüsefüllung, garniert mit Salat und Tzatziki", 22.5, "spezial", ["vegi"]),
  d("sp-arche-poulet", "Arche Noah Fladen Poulet", "Gerolltes Fladenbrot mit Gemüse, grillierte Pouletstreifen, garniert mit Salat und Tzatziki", 27.5, "spezial"),
  d("sp-arche-kalb", "Arche Noah Fladen Kalb", "Gerolltes Fladenbrot mit Gemüse, grillierte Kalbfleischstreifen, garniert mit Salat und Tzatziki", 28.5, "spezial"),

  // Desserts
  d("de-tira", "Tiramisu", "", 8.5, "dessert", ["vegi"]),
  d("de-mousse", "Mousse au Chocolat", "", 8.5, "dessert", ["vegi"]),
  d("de-panna", "Panna Cotta", "", 9.5, "dessert", ["vegi"]),

  // Softdrinks
  d("sd-cola", "Coca Cola", "", 5, "softdrink"),
  d("sd-cola-zero", "Coca Cola Zero", "", 5, "softdrink"),
  d("sd-fanta", "Fanta", "", 5, "softdrink"),
  d("sd-sprite", "Sprite", "", 5, "softdrink"),
  d("sd-icetea", "Ice Tea", "", 5, "softdrink"),
  d("sd-rivella", "Rivella Rot", "", 5, "softdrink"),
  d("sd-redbull", "Red Bull 0,25 l", "", 6, "softdrink"),

  // Bier
  d("bier-weizen", "Weizenbier (16+)", "", 6.5, "bier"),
  d("bier-schuetzen", "Schützengarten (16+)", "Dose", 5, "bier"),

  // Weine
  d("w-fechy", "Féchy (16+)", "Weisswein", 19.5, "wein"),
  d("w-primitivo", "Donna Marzia Primitivo IGP Salento 0,75 (16+)", "Rotwein", 39, "wein"),
  d("w-figuero", "Figuero 4 DO Ribera del Duero 0,75 l (16+)", "Rotwein, Garcia Figuero", 46, "wein"),
  d("w-merlot", "Merlot Due Amici DOC Ticino, Brivio 0,75 (16+)", "Rotwein", 59, "wein"),
  d("w-amarone", "Amarone Monte del Frà 0,75 (16+)", "Rotwein", 78, "wein", ["signature"]),
  d("w-pinot-noir", "Pinot Noir Lucifer, Mathier 0,75 l (16+)", "Rotwein", 46.5, "wein"),
  d("w-pinot-grigio", "Pinot Grigio Borgo Magredo, Friuli 0,75 l (16+)", "Weisswein", 30.5, "wein"),
  d("w-oeil", "Œil de Perdrix du Valais 0,5 l (16+)", "Roséwein", 20.5, "wein"),
  d("w-prosecco", "Andrea di Pec Prosecco Extra Dry DOC 0,75 l (16+)", "Schaumwein", 39.5, "wein"),
];

export const TAG_LABEL: Record<DishTag, string> = {
  vegi: "🌱 Vegi",
  scharf: "🔥 Scharf",
  signature: "⭐ Signature",
  fisch: "🐟 Fisch",
  fleisch: "🥩 Fleisch",
};
