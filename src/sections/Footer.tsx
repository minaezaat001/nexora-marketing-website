import { useApp } from "../i18n";
import { site, whatsappIntro, whatsappLink } from "../config/site";
import { Logo, PrimaryButton, WhatsAppButton, WhatsAppGlyph } from "../components/ui";
import { modules } from "./Modules";

export function FinalCta() {
  const { t, openDemo } = useApp();
  return (
    <section className="relative overflow-hidden border-t border-line py-24">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <img src="/nexora-logo.jpg" alt="NEXORA — نكسورا" width={96} height={96} className="mx-auto mb-8 h-24 w-24 rounded-full ring-1 ring-line" />
        <h2 className="text-balance text-[32px] font-bold leading-tight text-ink sm:text-[44px]">
          {t({ ar: "خلّي الدفاتر تقفل نفسها، وركّز إنت في البيع.", en: "Let the books keep themselves. You focus on selling." })}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] text-ink2">
          {t({ ar: "كلّمنا النهارده ونحدد ميعاد ديمو على بيانات قريبة من شغلك.", en: "Talk to us today — we'll reply and schedule a demo on data that looks like yours." })}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PrimaryButton onClick={() => openDemo()}>{t({ ar: "احجز ديمو عملي", en: "Book a live demo" })}</PrimaryButton>
          <WhatsAppButton />
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const { t, lang, setLang } = useApp();
  const segs = [
    { ar: "مصانع وخطوط إنتاج", en: "Factories" },
    { ar: "شركات متوسطة", en: "Mid-size companies" },
    { ar: "محلات وتجارة جملة", en: "Retail & wholesale" },
    { ar: "معارض وبيع بالتقسيط", en: "Showrooms & installments" },
  ];
  return (
    <footer className="border-t border-line bg-side">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[14px] text-muted">{t({ ar: "نظام إدارة الأعمال المتكامل — عربي من الأساس.", en: "The integrated business management system — Arabic from the ground up." })}</p>
          <button type="button" onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="mt-5 h-9 rounded-sm border border-line px-3 text-[13px] text-ink2 hover:text-ink">
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-ink">{t({ ar: "الموديولات", en: "Modules" })}</h3>
          <ul className="mt-3 space-y-2">{modules.map((m) => <li key={m.id}><a href="#modules" className="text-[14px] text-muted hover:text-ink">{t(m.name)}</a></li>)}</ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-ink">{t({ ar: "الحلول", en: "Solutions" })}</h3>
          <ul className="mt-3 space-y-2">{segs.map((s) => <li key={s.en}><a href="#industries" className="text-[14px] text-muted hover:text-ink">{t(s)}</a></li>)}</ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-ink">{t({ ar: "تواصل", en: "Contact" })}</h3>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li><a href={whatsappLink(whatsappIntro(lang))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-[#1FAF5A]"><WhatsAppGlyph className="h-4 w-4" /><span className="num">{site.whatsappDisplay}</span></a></li>
            <li><a href={`mailto:${site.email}`} className="num text-muted hover:text-ink">{site.email}</a></li>
            <li><a href="#demo" className="text-muted hover:text-ink">{t({ ar: "احجز ديمو", en: "Book a demo" })}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-[12.5px] text-muted sm:px-6">
          <span className="num">© 2026 NEXORA ERP</span>
          <span>{t({ ar: "عربي من الأساس · RTL · وضع ليلي ونهاري", en: "Arabic-first · RTL · dark & light" })}</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  const { t, lang, topic } = useApp();
  return (
    <a
      href={whatsappLink(whatsappIntro(lang, topic ? t(topic) : undefined))}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 end-5 z-40 flex items-center gap-2 rounded-full bg-[#1FAF5A] py-3 pe-3 ps-3 text-white shadow-[0_10px_30px_-6px_rgb(31_175_90/0.55)] transition hover:pe-4"
      aria-label={t({ ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" })}
    >
      <WhatsAppGlyph className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-semibold transition-all duration-300 group-hover:max-w-[220px]">
        {topic ? t({ ar: "اسأل عن: ", en: "Ask about: " }) + t(topic) : t({ ar: "كلّمنا على واتساب", en: "Chat with us" })}
      </span>
    </a>
  );
}
