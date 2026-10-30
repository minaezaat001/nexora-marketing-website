import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../i18n";
import { Logo, PrimaryButton, WhatsAppGlyph } from "../components/ui";
import { whatsappIntro, whatsappLink } from "../config/site";

export const navLinks = [
  { id: "tour", label: { ar: "الإدارات", en: "Departments" } },
  { id: "trace", label: { ar: "إزاي بيشتغل", en: "How it works" } },
  { id: "industries", label: { ar: "القطاعات", en: "Industries" } },
  { id: "engineering", label: { ar: "ليه نكسورا", en: "Why NEXORA" } },
];

export default function Header() {
  const { t, lang, setLang, theme, toggleTheme, openDemo, topic } = useApp();
  const [menu, setMenu] = useState(false);
  const wa = whatsappLink(whatsappIntro(lang, topic ? t(topic) : undefined));

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-frame items-center gap-8 border-x border-rule px-5 sm:px-8">
        <a href="#top" aria-label="NEXORA"><Logo /></a>

        <nav className="hidden flex-1 items-center gap-6 lg:flex" aria-label={t({ ar: "التنقل الرئيسي", en: "Main" })}>
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-[14px] text-ink2 transition-colors hover:text-ink">{t(l.label)}</a>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <button type="button" onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="h-9 px-2 text-[13.5px] text-ink2 transition-colors hover:text-ink"
            aria-label={lang === "ar" ? "Switch to English" : "التحويل إلى العربية"}>
            {lang === "ar" ? "English" : "العربية"}
          </button>
          <button type="button" onClick={toggleTheme} aria-label={t({ ar: "تبديل المظهر", en: "Toggle theme" })}
            className="grid h-9 w-9 place-items-center rounded text-ink2 transition-colors hover:bg-ink/5 hover:text-ink">
            {theme === "light" ? (
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 12.5A6.5 6.5 0 0 1 7.5 4a6.5 6.5 0 1 0 8.5 8.5Z" strokeLinejoin="round" /></svg>
            ) : (
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="3.5" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" strokeLinecap="round" /></svg>
            )}
          </button>
          <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="hidden h-9 w-9 place-items-center rounded text-emerald transition-colors hover:bg-emerald/10 sm:grid">
            <WhatsAppGlyph className="h-[18px] w-[18px]" />
          </a>
          <PrimaryButton onClick={() => openDemo()} className="hidden !h-9 !px-4 !text-[14px] sm:inline-flex">
            {t({ ar: "احجز عرض مجاني", en: "Book a free demo" })}
          </PrimaryButton>
          <button type="button" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded border border-rule text-ink lg:hidden">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={menu ? "M5 5l10 10M15 5 5 15" : "M3 6h14M3 10h14M3 14h14"} strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-rule bg-paper lg:hidden">
            <div className="mx-auto grid max-w-frame">
              {navLinks.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={() => setMenu(false)} className="border-b border-rule px-5 py-3.5 text-ink2">{t(l.label)}</a>
              ))}
              <div className="p-5"><PrimaryButton onClick={() => { setMenu(false); openDemo(); }} className="w-full">{t({ ar: "احجز عرض حي مجاني", en: "Book a free live demo" })}</PrimaryButton></div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
