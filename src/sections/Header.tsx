import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../i18n";
import { Logo, PrimaryButton, WhatsAppGlyph } from "../components/ui";
import { whatsappIntro, whatsappLink } from "../config/site";

export const navLinks = [
  { id: "product", label: { ar: "المنتج", en: "Product" } },
  { id: "modules", label: { ar: "الموديولات", en: "Modules" } },
  { id: "industries", label: { ar: "الحلول", en: "Solutions" } },
  { id: "why", label: { ar: "لماذا نكسورا", en: "Why NEXORA" } },
  { id: "roi", label: { ar: "احسب التوفير", en: "ROI" } },
];

export default function Header() {
  const { t, lang, setLang, theme, toggleTheme, openDemo, topic } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const wa = whatsappLink(whatsappIntro(lang, topic ? t(topic) : undefined));

  return (
    <header className={`sticky top-0 z-40 transition-colors ${scrolled ? "border-b border-line bg-canvas/75 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <a href="#top" aria-label="NEXORA"><Logo /></a>

        <nav className="hidden flex-1 items-center gap-1 lg:flex" aria-label={t({ ar: "التنقل الرئيسي", en: "Main" })}>
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="rounded-sm px-3 py-2 text-[14px] text-ink2 transition hover:bg-ink/5 hover:text-ink">
              {t(l.label)}
            </a>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-1.5 lg:ms-0">
          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="h-9 rounded-sm border border-line px-3 text-[13px] font-medium text-ink2 transition hover:border-lineStrong hover:text-ink"
            aria-label={lang === "ar" ? "Switch to English" : "التحويل إلى العربية"}
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-sm border border-line text-ink2 transition hover:border-lineStrong hover:text-ink"
            aria-label={t({ ar: "تبديل المظهر", en: "Toggle theme" })}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10" cy="10" r="3.5" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" strokeLinecap="round" /></svg>
            ) : (
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M16 12.5A6.5 6.5 0 0 1 7.5 4a6.5 6.5 0 1 0 8.5 8.5Z" strokeLinejoin="round" /></svg>
            )}
          </button>
          <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="hidden h-9 w-9 place-items-center rounded-sm border border-line text-[#1FAF5A] transition hover:border-[#1FAF5A] sm:grid">
            <WhatsAppGlyph className="h-[18px] w-[18px]" />
          </a>
          <PrimaryButton onClick={() => openDemo()} className="hidden !h-9 !px-4 !text-[14px] sm:inline-flex">
            {t({ ar: "احجز ديمو", en: "Book a demo" })}
          </PrimaryButton>
          <button type="button" onClick={() => setMenu((m) => !m)} className="grid h-9 w-9 place-items-center rounded-sm border border-line text-ink lg:hidden" aria-expanded={menu} aria-label="Menu">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={menu ? "M5 5l10 10M15 5 5 15" : "M3 6h14M3 10h14M3 14h14"} strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
              {navLinks.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={() => setMenu(false)} className="rounded-sm px-3 py-2.5 text-ink2 hover:bg-ink/5">{t(l.label)}</a>
              ))}
              <PrimaryButton onClick={() => { setMenu(false); openDemo(); }} className="mt-2">{t({ ar: "احجز ديمو عملي", en: "Book a live demo" })}</PrimaryButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
