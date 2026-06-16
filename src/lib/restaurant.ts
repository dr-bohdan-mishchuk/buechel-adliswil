// Centralised restaurant facts — change here, propagate everywhere (JSON-LD, footer, contact).
export const RESTAURANT = {
  name: "Restaurant Büchel",
  tagline: "Holzofen, Handwerk, Hunger.",
  street: "Albisstrasse 1",
  postal: "8134",
  city: "Adliswil",
  country: "CH",
  phone: "+41 44 710 00 00",
  phoneHref: "tel:+41447100000",
  email: "hallo@buechel.ch",
  emailHref: "mailto:hallo@buechel.ch",
  geo: { lat: 47.3098, lng: 8.526 },
  priceRange: "CHF 18–58",
  cuisine: ["Italian", "Swiss", "Pizza", "Pasta", "Steak"],
  rating: { value: 4.6, count: 312 },
  hours: [
    { days: "Di–Fr", lunch: "11:00–14:00", dinner: "17:30–23:00" },
    { days: "Sa–So", lunch: "11:30–14:30", dinner: "17:30–23:30" },
    { days: "Mo", lunch: "Ruhetag", dinner: "" },
  ],
  schemaHours: [
    {
      dow: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:00",
      closes: "14:00",
    },
    {
      dow: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "17:30",
      closes: "23:00",
    },
    {
      dow: ["Saturday", "Sunday"],
      opens: "11:30",
      closes: "14:30",
    },
    {
      dow: ["Saturday", "Sunday"],
      opens: "17:30",
      closes: "23:30",
    },
  ],
} as const;
