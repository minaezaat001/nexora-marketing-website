// Single place for contact details.
export const site = {
  name: "NEXORA ERP",
  nameAr: "نكسورا",
  // International format, digits only (country code + number, no "+" or leading zeros).
  whatsappNumber: "201041554942",
  whatsappDisplay: "+20 10 41554942",
  email: "sales@nexora-erp.com",
};

export type Lang = "ar" | "en";

export function whatsappLink(text: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Context-aware opening line, e.g. the module or industry the visitor is looking at. */
export function whatsappIntro(lang: Lang, topic?: string): string {
  if (lang === "ar") {
    return topic
      ? `أهلاً فريق نكسورا 👋\nمهتم أعرف أكتر عن: ${topic}.\nممكن نحدد ميعاد ديمو؟`
      : "أهلاً فريق نكسورا 👋\nعايز أعرف أكتر عن نظام NEXORA ERP وأحجز ديمو عملي.";
  }
  return topic
    ? `Hi NEXORA team 👋\nI'd like to learn more about: ${topic}.\nCan we schedule a demo?`
    : "Hi NEXORA team 👋\nI'd like to learn more about NEXORA ERP and book a live demo.";
}
