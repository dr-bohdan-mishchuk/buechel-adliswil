// Centralised restaurant facts — change here, propagate everywhere (JSON-LD, footer, contact).
export const RESTAURANT = {
  name: "Restaurant Büchel",
  tagline: "Holzofen, Handwerk, Hunger.",
  street: "Albisstrasse 90",
  postal: "8134",
  city: "Adliswil",
  country: "CH",
  phone: "044 291 00 19",
  phoneIntl: "+41 44 291 00 19",
  phoneHref: "tel:+41442910019",
  email: "info@buechel-restaurant.ch",
  emailHref: "mailto:info@buechel-restaurant.ch",
  orderUrl:
    "https://www.schnell-aber-guet.ch/ordering/restaurant/menu?restaurant_uid=7d130a57-f1dc-4044-a4b8-164814de97f2",
  reservationUrl:
    "https://www.schnell-aber-guet.ch/ordering/restaurant/menu/reservation?restaurant_uid=%207d130a57-f1dc-4044-a4b8-164814de97f2&reservation=true",
  geo: { lat: 47.3012976, lng: 8.5215919 },
  priceRange: "CHF 8.50–78",
  cuisine: ["Italian", "Swiss", "Pizza", "Pasta", "Cordon Bleu"],
  rating: { value: 4.6, count: 312 },
  hours: [
    { days: "Di–Fr", lunch: "11:00–14:00", dinner: "17:30–23:00" },
    { days: "Sa–So", lunch: "11:30–14:30", dinner: "17:30–23:30" },
    { days: "Mo", lunch: "Ruhetag", dinner: "" },
  ],
  schemaHours: [
    { dow: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "11:00", closes: "14:00" },
    { dow: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "17:30", closes: "23:00" },
    { dow: ["Saturday", "Sunday"], opens: "11:30", closes: "14:30" },
    { dow: ["Saturday", "Sunday"], opens: "17:30", closes: "23:30" },
  ],
} as const;
