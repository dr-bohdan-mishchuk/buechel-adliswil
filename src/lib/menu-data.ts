export type DishTag = "vegi" | "glutenfrei" | "scharf" | "signature";

export interface Dish {
  slug: string;
  name: string;
  desc: string;
  price: number;
  tags: DishTag[];
  category: "pizza" | "pasta" | "cordon" | "steak" | "vorspeise" | "dessert";
}

export const CATEGORIES: { id: Dish["category"]; label: string }[] = [
  { id: "pizza", label: "Pizza vom Holzofen" },
  { id: "pasta", label: "Pasta" },
  { id: "cordon", label: "Cordon Bleu" },
  { id: "steak", label: "Steaks vom Grill" },
  { id: "vorspeise", label: "Vorspeisen" },
  { id: "dessert", label: "Dolci" },
];

export const DISHES: Dish[] = [
  // Pizza
  { slug: "margherita", name: "Margherita DOP", desc: "San-Marzano-Tomate, Fior di Latte, Basilikum, Olivenöl", price: 18.5, tags: ["vegi", "signature"], category: "pizza" },
  { slug: "diavola", name: "Diavola", desc: "Spianata piccante, Mozzarella, Chili, Honig aus Adliswil", price: 23, tags: ["scharf"], category: "pizza" },
  { slug: "tartufo", name: "Tartufo Bianco", desc: "Crème fraîche, Mozzarella, Champignons, Trüffelöl", price: 26.5, tags: ["vegi", "signature"], category: "pizza" },
  { slug: "prosciutto", name: "Prosciutto e Rucola", desc: "Tomate, Mozzarella, Parmaschinken 18 Monate, Rucola", price: 24, tags: [], category: "pizza" },
  { slug: "quattro", name: "Quattro Formaggi", desc: "Mozzarella, Gorgonzola, Gruyère AOP, Pecorino", price: 24, tags: ["vegi"], category: "pizza" },

  // Pasta
  { slug: "tagliatelle-funghi", name: "Tagliatelle Funghi", desc: "Hausgemachte Tagliatelle, Steinpilze, Sahne, Parmesan", price: 26, tags: ["vegi", "signature"], category: "pasta" },
  { slug: "spaghetti-carbonara", name: "Spaghetti alla Carbonara", desc: "Guanciale, Pecorino, Eigelb, Pfeffer — wie in Rom", price: 24, tags: [], category: "pasta" },
  { slug: "penne-arrabbiata", name: "Penne all'Arrabbiata", desc: "Tomate, Knoblauch, Chili, Petersilie", price: 21, tags: ["vegi", "scharf"], category: "pasta" },
  { slug: "ravioli-spinat", name: "Ravioli Spinat-Ricotta", desc: "Salbeibutter, Pinienkerne, Grana Padano", price: 25, tags: ["vegi"], category: "pasta" },

  // Cordon Bleu
  { slug: "cordon-classico", name: "Cordon Bleu Classico", desc: "Schweizer Schweinerücken, Gruyère AOP, Pommes Allumettes", price: 38, tags: ["signature"], category: "cordon" },
  { slug: "cordon-trufa", name: "Cordon Bleu al Tartufo", desc: "Kalbsrücken, Brie, Trüffelpaste, Pommes & Salat", price: 46, tags: ["signature"], category: "cordon" },
  { slug: "cordon-piccante", name: "Cordon Bleu Diavolo", desc: "Schwein, Mozzarella, Salami piccante, scharfer Honig", price: 39, tags: ["scharf"], category: "cordon" },

  // Steaks
  { slug: "ribeye", name: "Ribeye Swiss Black Angus 300g", desc: "Café-de-Paris-Butter, Rosmarinkartoffeln", price: 52, tags: ["signature"], category: "steak" },
  { slug: "entrecote", name: "Entrecôte Double 500g", desc: "Aus dem Holzkohlegrill, Pommes, Marktgemüse", price: 58, tags: [], category: "steak" },
  { slug: "filet", name: "Rinderfilet 200g", desc: "Pfeffer-Cognac-Sauce, Kartoffelgratin", price: 49, tags: [], category: "steak" },

  // Vorspeisen
  { slug: "burrata", name: "Burrata Pugliese", desc: "Heirloom-Tomaten, Basilikumöl, Focaccia", price: 18, tags: ["vegi"], category: "vorspeise" },
  { slug: "vitello", name: "Vitello Tonnato", desc: "Hauchdünnes Kalb, Thunfischcreme, Kapern", price: 22, tags: [], category: "vorspeise" },
  { slug: "carpaccio", name: "Rinder-Carpaccio", desc: "Rucola, Parmesan, Zitrone, Trüffelöl", price: 21, tags: [], category: "vorspeise" },

  // Dolci
  { slug: "tiramisu", name: "Tiramisù della Casa", desc: "Mascarpone, Espresso, Savoiardi, Kakao", price: 11, tags: ["vegi", "signature"], category: "dessert" },
  { slug: "panna", name: "Panna Cotta", desc: "Vanille aus Madagaskar, Waldbeerenkompott", price: 10, tags: ["vegi"], category: "dessert" },
  { slug: "affogato", name: "Affogato al Caffè", desc: "Vanilleeis, ertränkt in heissem Espresso", price: 9, tags: ["vegi"], category: "dessert" },
];

export const TAG_LABEL: Record<DishTag, string> = {
  vegi: "🌱 Vegi",
  glutenfrei: "🌾 Glutenfrei",
  scharf: "🔥 Scharf",
  signature: "⭐ Signature",
};
