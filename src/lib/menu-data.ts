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
  { id: "pizza-pickup", label: "Pizza Abholung 32 cm" },
  { id: "pizza32", label: "Pizza Ø 32 cm" },
  { id: "pizza40", label: "Pizza Ø 40 cm" },
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

export const TAG_LABEL: Record<DishTag, string> = {
  vegi: "Vegi",
  scharf: "Scharf",
  signature: "Signature",
  fisch: "Fisch",
  fleisch: "Fleisch",
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/ø/g, "o")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const d = (
  category: Dish["category"],
  name: string,
  desc: string,
  price: number,
  tags: DishTag[] = []
): Dish => ({ slug: `${category}-${slugify(name)}`, category, name, desc, price, tags });

export const DISHES: Dish[] = [
  // VORSPEISEN
  d("vorspeise", "Gebackene Champignons", "Tartar Sauce", 16.5, ["vegi"]),
  d("vorspeise", "Crevetten Cocktail", "Klassisch mit Cocktailsauce", 14.5, ["fisch"]),

  // SALATE
  d("salat", "Grüner Salat", "Mit Dressing nach Wahl", 8.5, ["vegi"]),
  d("salat", "Gemischter Salat", "Mit Dressing nach Wahl", 10.5, ["vegi"]),
  d("salat", "Nüsslisalat mit Ei", "Frisch, mit Dressing nach Wahl", 13.5, ["vegi"]),
  d("salat", "Nüsslisalat mit Steinpilzen", "Mit Dressing nach Wahl", 15.5, ["vegi"]),
  d("salat", "Caesar Salat", "Speck, Parmesanscheiben und Brotcroûtons", 13.5),
  d("salat", "Tomatensalat Caprese", "Tomaten, Mozzarella, Basilikum", 13.5, ["vegi"]),
  d("salat", "Kretasalat", "Feta, Oliven, Paprikaschoten und Gurken", 14.5, ["vegi"]),
  d("salat", "Grosser Salatteller Büchel", "Reichlicher Salatteller mit Pouletbruststreifen", 20.5),

  // PIZZA ABHOLUNG 32 cm
  d("pizza-pickup", "Pizza Napoli 32cm", "Tomatensauce, Mozzarella, Sardellen, Kapern, Oliven, Oregano", 17),
  d("pizza-pickup", "Pizza Prosciutto 32cm", "Tomatensauce, Mozzarella, Schinken, Oregano", 17),
  d("pizza-pickup", "Pizza al Tonno 32cm", "Tomatensauce, Mozzarella, Thon, Zwiebeln, Kapern, Oregano", 17),
  d("pizza-pickup", "Pizza Basilea 32cm", "Tomatensauce, Mozzarella, Auberginen, Peperoni, Zwiebeln, Knoblauch, Oregano", 17, ["vegi"]),
  d("pizza-pickup", "Pizza Calzone (zugedeckt)", "Tomatensauce, Mozzarella, Schinken, Pilze, Ei, Oregano", 17),
  d("pizza-pickup", "Pizza Hawaii 32cm", "Tomatensauce, Mozzarella, Schinken, Ananas, Oregano", 17),
  d("pizza-pickup", "Pizza Calabrese (scharf) 32cm", "Tomatensauce, Mozzarella, scharfe Salami, Oregano", 17, ["scharf"]),
  d("pizza-pickup", "Pizza Frutti di Mare 32cm", "Tomatensauce, Mozzarella, Meeresfrüchte, Knoblauch, Oregano", 17, ["fisch"]),
  d("pizza-pickup", "Pizza Quattro Stagioni 32cm", "Tomatensauce, Mozzarella, Schinken, Champignons, Peperoni, Artischocken, Oregano", 17),
  d("pizza-pickup", "Pizza Mamma Mia 32cm", "Tomatensauce, Mozzarella, Broccoli, Spinat, Champignons, Auberginen, Oregano", 17, ["vegi"]),
  d("pizza-pickup", "Pizza Buttafuoco (scharf) 32cm", "Tomatensauce, Mozzarella, Speck, scharfe Salami, Peperoncini, Zwiebeln, Knoblauch, Oregano", 17, ["scharf"]),
  d("pizza-pickup", "Pizza Diavolo 32cm", "Tomatensauce, Mozzarella, Champignons, Salami, Peperoni, Oregano", 17),
  d("pizza-pickup", "Pizza Padrone (scharf) 32cm", "Tomatensauce, Mozzarella, Kalbfleisch, Champignons, Peperoncini, Zwiebeln, Knoblauch, Oregano", 17, ["scharf"]),
  d("pizza-pickup", "Pizza Prosciutto crudo 32cm", "Tomatensauce, Mozzarella, Parmaschinken, Rucola, Oregano", 17),
  d("pizza-pickup", "Pizza Nonno (scharf) 32cm", "Tomatensauce, Mozzarella, Peperoncini, Crevetten, Oregano", 17, ["scharf", "fisch"]),
  d("pizza-pickup", "Pizza Pollo (scharf) 32cm", "Tomatensauce, Mozzarella, Poulet, Zwiebeln, Knoblauch, Peperoncini, Oregano", 17, ["scharf"]),

  // PIZZA Ø 32 cm
  d("pizza32", "Pizza Margherita Ø32", "Tomatensauce, Mozzarella, Oregano", 16.5, ["vegi", "signature"]),
  d("pizza32", "Pizza Napoli Ø32", "Tomatensauce, Mozzarella, Sardellen, Kapern, Oliven, Oregano", 18.5),
  d("pizza32", "Pizza Prosciutto Ø32", "Tomatensauce, Mozzarella, Schinken, Oregano", 18.5),
  d("pizza32", "Pizza al Tonno Ø32", "Tomatensauce, Mozzarella, Thon, Zwiebeln, Kapern, Oregano", 20.5),
  d("pizza32", "Pizza Basilea Ø32", "Tomatensauce, Mozzarella, Auberginen, Peperoni, Zwiebeln, Knoblauch, Oregano", 19.5, ["vegi"]),
  d("pizza32", "Pizza Calzone (zugedeckt) Ø32", "Tomatensauce, Mozzarella, Schinken, Pilze, Ei, Oregano", 20.5),
  d("pizza32", "Pizza Hawaii Ø32", "Tomatensauce, Mozzarella, Schinken, Ananas, Oregano", 19.5),
  d("pizza32", "Pizza Calabrese (scharf) Ø32", "Tomatensauce, Mozzarella, scharfe Salami, Oregano", 19.5, ["scharf"]),
  d("pizza32", "Pizza Frutti di Mare Ø32", "Tomatensauce, Mozzarella, Meeresfrüchte, Knoblauch, Oregano", 21.5, ["fisch"]),
  d("pizza32", "Pizza Quattro Stagioni Ø32", "Tomatensauce, Mozzarella, Schinken, Champignons, Peperoni, Artischocken, Oregano", 21.5),
  d("pizza32", "Pizza Mamma Mia Ø32", "Tomatensauce, Mozzarella, Broccoli, Spinat, Champignons, Auberginen, Oregano", 21.5, ["vegi"]),
  d("pizza32", "Pizza Buttafuoco (scharf) Ø32", "Tomatensauce, Mozzarella, Speck, scharfe Salami, Peperoncini, Zwiebeln, Knoblauch, Oregano", 20.5, ["scharf", "signature"]),
  d("pizza32", "Pizza Diavolo Ø32", "Tomatensauce, Mozzarella, Champignons, Salami, Peperoni, Oregano", 20.5),
  d("pizza32", "Pizza Padrone (scharf) Ø32", "Tomatensauce, Mozzarella, Kalbfleisch, Champignons, Peperoncini, Zwiebeln, Knoblauch, Oregano", 22.5, ["scharf"]),
  d("pizza32", "Pizza Prosciutto crudo Ø32", "Tomatensauce, Mozzarella, Parmaschinken, Rucola, Oregano", 22.5, ["signature"]),
  d("pizza32", "Pizza Nonno (scharf) Ø32", "Tomatensauce, Mozzarella, Peperoncini, Crevetten, Oregano", 23.5, ["scharf", "fisch"]),
  d("pizza32", "Pizza Pollo (scharf) Ø32", "Tomatensauce, Mozzarella, Poulet, Zwiebeln, Knoblauch, Peperoncini, Oregano", 20.5, ["scharf"]),

  // PIZZA Ø 40 cm
  d("pizza40", "Pizza Margherita Ø40", "Tomatensauce, Mozzarella, Oregano", 34.5, ["vegi"]),
  d("pizza40", "Pizza Napoli Ø40", "Tomatensauce, Mozzarella, Sardellen, Kapern, Oliven, Oregano", 35.5),
  d("pizza40", "Pizza Prosciutto Ø40", "Tomatensauce, Mozzarella, Schinken, Oregano", 35.5),
  d("pizza40", "Pizza al Tonno Ø40", "Tomatensauce, Mozzarella, Thon, Zwiebeln, Kapern, Oregano", 38.5),
  d("pizza40", "Pizza Basilea Ø40", "Tomatensauce, Mozzarella, Auberginen, Peperoni, Zwiebeln, Knoblauch, Oregano", 38.5, ["vegi"]),
  d("pizza40", "Pizza Hawaii Ø40", "Tomatensauce, Mozzarella, Schinken, Ananas, Oregano", 39.5),
  d("pizza40", "Pizza Calabrese (scharf) Ø40", "Tomatensauce, Mozzarella, scharfe Salami, Oregano", 38.5, ["scharf"]),
  d("pizza40", "Pizza Frutti di Mare Ø40", "Tomatensauce, Mozzarella, Meeresfrüchte, Knoblauch, Oregano", 38.5, ["fisch"]),
  d("pizza40", "Pizza Quattro Stagioni Ø40", "Tomatensauce, Mozzarella, Schinken, Champignons, Peperoni, Artischocken, Oregano", 39.5),
  d("pizza40", "Pizza Mamma Mia Ø40", "Tomatensauce, Mozzarella, Broccoli, Spinat, Champignons, Auberginen, Oregano", 40.5, ["vegi"]),
  d("pizza40", "Pizza Buttafuoco (scharf) Ø40", "Tomatensauce, Mozzarella, Speck, scharfe Salami, Peperoncini, Zwiebeln, Knoblauch, Oregano", 38.5, ["scharf"]),
  d("pizza40", "Pizza Diavolo Ø40", "Tomatensauce, Mozzarella, Champignons, Salami, Peperoni, Oregano", 39.5),
  d("pizza40", "Pizza Padrone (scharf) Ø40", "Tomatensauce, Mozzarella, Kalbfleisch, Champignons, Peperoncini, Zwiebeln, Knoblauch, Oregano", 42.5, ["scharf"]),
  d("pizza40", "Pizza Prosciutto crudo Ø40", "Tomatensauce, Mozzarella, Parmaschinken, Rucola, Oregano", 42.5),
  d("pizza40", "Pizza Nonno (scharf) Ø40", "Tomatensauce, Mozzarella, Peperoncini, Crevetten, Oregano", 44.5, ["scharf", "fisch"]),
  d("pizza40", "Pizza Pollo (scharf) Ø40", "Tomatensauce, Mozzarella, Poulet, Zwiebeln, Knoblauch, Peperoncini, Oregano", 39.5, ["scharf"]),

  // SPEZIALPIZZA DES HAUSES 32 cm
  d("pizza-spezial", "Pizza Vegi-Insel (zugedeckt) Ø32", "Pizzateig gefüllt mit Tomatensauce, Grillgemüse, Auberginen, Zucchetti, Peperoni, Champignons, überbacken mit Mozzarella, garniert mit Salat und Tzatziki", 23.5, ["vegi", "signature"]),
  d("pizza-spezial", "Pizza Farmer-Insel (zugedeckt) Ø32", "Pizzateig gefüllt mit Tomatensauce, Grillgemüse, gebratenen Pouletbruststreifen, überbacken mit Mozzarella, garniert mit Salat und Tzatziki", 27.5),
  d("pizza-spezial", "Pizza Alaz-Insel (zugedeckt) Ø32", "Pizzateig gefüllt mit Tomatensauce, Grillgemüse, gebratenen Kalbfleischstreifen, überbacken mit Mozzarella, garniert mit Salat und Tzatziki", 29.5, ["signature"]),

  // PASTA
  d("pasta", "Spaghetti Napoli", "Tomatensauce", 17.5, ["vegi"]),
  d("pasta", "Spaghetti Bolognese", "Klassische Bolognese-Sauce", 21.5),
  d("pasta", "Spaghetti Carbonara", "Rahm, Zwiebeln, Knoblauch, Parmesan, Speckstreifen und Petersilie", 21.5),
  d("pasta", "Spaghetti al Olio (scharf)", "Knoblauch, Peperoncini und Oliven", 19.5, ["vegi", "scharf"]),
  d("pasta", "Spaghetti Pesto", "Basilikum-Pesto und Parmesan", 19.5, ["vegi"]),
  d("pasta", "Spaghetti Büchel", "Tomaten, Rahmsauce, Kalbfleisch, Zwiebeln, Knoblauch und Peperoncini", 24.5, ["scharf", "signature"]),
  d("pasta", "Spaghetti Vegetariano", "Buntes Saisongemüse an leichter Rahmsauce", 20.5, ["vegi"]),
  d("pasta", "Penne al Forno aus dem Ofen", "Rahmsauce, Schinken, Zwiebeln, Knoblauch und gratiniert mit Käse", 21.5),
  d("pasta", "Gnocchi Gorgonzola", "Gorgonzola mit Rahmsauce", 21.5, ["vegi"]),
  d("pasta", "Gnocchi Santa Chiara", "Bolognese mit Rahmsauce", 21.5),
  d("pasta", "Tortellini Spinachi Pesto", "Spinatfüllung, Pestosauce und Parmesan", 21.5, ["vegi"]),
  d("pasta", "Ravioli Ricotta Spinachi all Panna", "Ravioli mit Spinatfüllung und Rahmsauce", 22.5, ["vegi"]),
  d("pasta", "Lasagne", "Klassische Lasagne al Forno", 21.5),

  // DIE LIEBLINGE PASTA
  d("pasta-lieblinge", "Penne nach Chef Art", "Zarte Rindsfiletwürfel in Olivenöl gebraten, Cherry Tomaten, Tallegio Käse, Zwiebeln, Knoblauch, Rahm und Rucola", 28.5, ["signature"]),
  d("pasta-lieblinge", "Tagliatelle „Thai Curry\"", "Gebratene Pouletbrustwürfel, Gemüse, Kokos-Sojasauce, grünes Thai Curry, Ingwer und Zitronengras", 26.5, ["scharf", "signature"]),
  d("pasta-lieblinge", "Tagliatelle Salmone", "Tomatenrahmsauce, Zwiebeln, Knoblauch, Basilikum und Lachsfilet", 25.5, ["fisch"]),

  // RISOTTO
  d("risotto", "Risotto Verdure", "Feingeschnittenes Gemüse, Tomaten, frischer Basilikum, Mascarpone und Weisswein", 20.5, ["vegi"]),
  d("risotto", "Risotto Fungi Porcini", "Mit Steinpilzen", 23.5, ["vegi", "signature"]),
  d("risotto", "Risotto Frutti di Mare", "Meeresfrüchte und Tomatensauce", 22.5, ["fisch"]),

  // FLEISCHPARADE (Beilage nach Wahl)
  d("fleisch", "Gegrilltes Schweinsrahmschnitzel", "Champignons und Rahmsauce, mit Beilage nach Wahl", 27.5, ["fleisch"]),
  d("fleisch", "Paniertes Schweinsschnitzel", "Mit Beilage nach Wahl", 27.5, ["fleisch"]),
  d("fleisch", "Paniertes Wienerschnitzel", "Dünn geklopftes, paniertes Kalbsschnitzel, garniert mit Zitrone", 36.5, ["fleisch"]),
  d("fleisch", "Zürcher Kalbsgeschnetzeltes", "Zartes Kalbfleisch mit Weisswein-Rahmsauce und frischen Champignons", 39.5, ["fleisch", "signature"]),
  d("fleisch", "Gegrillte Pouletbrust", "Mit Beilage nach Wahl", 28.5, ["fleisch"]),
  d("fleisch", "Panierte Pouletbrust", "Mit Beilage nach Wahl", 28.5, ["fleisch"]),
  d("fleisch", "Scaloppine al limone", "Mit Zitronen-Rahmsauce", 35.5, ["fleisch"]),
  d("fleisch", "Gegrilltes Rindsfilet", "Mit Beilage nach Wahl", 47.5, ["fleisch", "signature"]),
  d("fleisch", "Gegrilltes Rindsentrecôte", "Mit Beilage nach Wahl", 41.5, ["fleisch"]),
  d("fleisch", "Gegrilltes Pferdefilet", "Mit Beilage nach Wahl", 42.5, ["fleisch"]),
  d("fleisch", "Gegrilltes Kalbssteak", "Mit Beilage nach Wahl", 40.5, ["fleisch"]),
  d("fleisch", "Gegrilltes Schweinssteak", "Mit Beilage nach Wahl", 30.5, ["fleisch"]),

  // CORDON BLEU PARADE
  d("cordon", "Kalbs Cordon Bleu „Klassiker\"", "Gefüllt mit Schinken, Gruyère und eine Beilage nach Wahl", 39.5, ["fleisch", "signature"]),
  d("cordon", "Kalbs Cordon Bleu „Fiorentina\"", "Gefüllt mit Spinat, Mascarpone und eine Beilage nach Wahl", 39.5, ["fleisch"]),
  d("cordon", "Schweins Cordon Bleu „Der Klassiker\"", "Gefüllt mit Schinken, Gruyère und eine Beilage nach Wahl", 27.5, ["fleisch"]),
  d("cordon", "Schweins Cordon Bleu „Büchel\"", "Gefüllt mit Speck, Zwiebeln, Tomaten, Gruyère und eine Beilage nach Wahl", 29.5, ["fleisch", "signature"]),
  d("cordon", "Schweins Cordon Bleu „Adliswil\"", "Gefüllt mit Steinpilzen, Champignons, Raclettekäse und eine Beilage nach Wahl", 30.5, ["fleisch"]),
  d("cordon", "Schweins Cordon Bleu „Alaz\" (scharf)", "Gefüllt mit scharfer Salami, Gorgonzola und eine Beilage nach Wahl", 29.5, ["fleisch", "scharf"]),
  d("cordon", "Poulet Cordon Bleu „Der Klassiker\"", "Gefüllt mit Schinken, Gruyère und eine Beilage nach Wahl", 29.5, ["fleisch"]),
  d("cordon", "Poulet Cordon Bleu „Hawaii\"", "Gefüllt mit Schinken, Ananas, Gruyère und eine Beilage nach Wahl", 29.5, ["fleisch"]),

  // FISCH
  d("fisch", "Eglifilet", "Mandeln in Butter gebraten und eine Beilage nach Wahl", 34.5, ["fisch"]),
  d("fisch", "Zanderfilet", "Zitronensauce und eine Beilage nach Wahl", 32.5, ["fisch"]),
  d("fisch", "Black Tiger", "Riesencrevetten vom Grill und eine Beilage nach Wahl", 35.5, ["fisch", "signature"]),

  // SPEZIALITÄTEN
  d("spezial", "Arche Noah Fladen", "Gerolltes Fladenbrot mit Gemüsefüllung, garniert mit Salat und Tzatziki", 22.5, ["vegi"]),
  d("spezial", "Arche Noah Fladen Poulet", "Gerolltes Fladenbrot mit Gemüse, grillierte Pouletstreifen, garniert mit Salat und Tzatziki", 27.5),
  d("spezial", "Arche Noah Fladen Kalb", "Gerolltes Fladenbrot mit Gemüse, grillierte Kalbfleischstreifen, garniert mit Salat und Tzatziki", 28.5),

  // DESSERTS
  d("dessert", "Tiramisu", "Hausgemacht", 8.5, ["vegi"]),
  d("dessert", "Mousse au Chocolat", "Hausgemacht", 8.5, ["vegi"]),
  d("dessert", "Panna Cotta", "Hausgemacht", 9.5, ["vegi"]),

  // SOFTDRINKS
  d("softdrink", "Coca Cola", "3 dl", 5),
  d("softdrink", "Coca Cola Zero", "3 dl", 5),
  d("softdrink", "Fanta", "3 dl", 5),
  d("softdrink", "Sprite", "3 dl", 5),
  d("softdrink", "Ice Tea", "3 dl", 5),
  d("softdrink", "Rivella Rot", "3 dl", 5),
  d("softdrink", "Red Bull 0,25l", "Energy Drink", 6),

  // BIER (16+)
  d("bier", "Weizenbier (16+)", "Vom Fass", 6.5),
  d("bier", "Schützengarten (16+)", "Dose", 5),

  // WEINE (16+)
  d("wein", "Féchy (16+)", "Weisswein", 19.5),
  d("wein", "Donna Marzia Primitivo IGP Salento 0,75 (16+)", "Rotwein", 39),
  d("wein", "Figuero 4 DO Ribera del Duero, Garcia Figuero 0,75l (16+)", "Rotwein", 46),
  d("wein", "Merlot Due Amici DOC Ticino, Brivio 0,75 (16+)", "Rotwein", 59),
  d("wein", "Amarone Monte del Frà 0,75 (16+)", "Rotwein", 78),
  d("wein", "Pinot Noir Lucifer Adrian & Diego Mathier 0,75l (16+)", "Rotwein", 46.5),
  d("wein", "Pinot Grigio Borgo Magredo Torre Rosazza, Friuli 0,75l (16+)", "Weisswein", 30.5),
  d("wein", "Oeil de Perdrix du Valais 0,5l (16+)", "Roséwein", 20.5),
  d("wein", "Andrea di Pec Prosecco Extra Dry DOC 0,75l (16+)", "Schaumwein", 39.5),
];
