import { useApp } from "../i18n";
import { site, whatsappIntro, whatsappLink } from "../config/site";
import { Logo, PrimaryButton, WhatsAppButton, WhatsAppGlyph } from "../components/ui";
import { domains } from "../data/domains";

export function FinalCta() {
  const { t, openDemo } = useApp();
  return (
    <section className="border-t border-rule bg-ink text-paper">
      <div className="mx-auto grid max-w-frame gap-8 border-x border-white/10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
        <h2 className="text-balance text-[32px] font-semibold leading-[1.2] lg:col-span-7 lg:text-[44px]">
          {t({ ar: "كل يوم من غير نظام بيكلّفك فلوس مش شايفها. خلّينا نوريك فين.", en: "Every day without a system costs you money you can’t see. Let us show you where." })}
        </h2>
        <div className="lg:col-span-5">
          <p className="max-w-[46ch] text-[16px] text-paper/75">
            {t({ ar: "احجز عرض حي مجاني لمدة 20 دقيقة على بيانات نشاطك، أو كلّمنا على واتساب دلوقتي.", en: "Book a free 20-minute live demo on your own data, or message us on WhatsApp right now." })}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => openDemo()} className="!bg-paper !text-ink hover:!bg-paper/90">{t({ ar: "احجز عرض حي مجاني", en: "Book a free live demo" })}</PrimaryButton>
            <WhatsAppButton />
          </div>
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
    <footer className="border-t border-rule">
      <div className="mx-auto grid max-w-frame border-x border-rule md:grid-cols-2 lg:grid-cols-4">
        <div className="border-b border-rule px-5 py-10 sm:px-8 lg:border-b-0 lg:border-e">
          <Logo />
          <p className="mt-4 max-w-[30ch] text-[14px] text-muted">{t({ ar: "نظام إدارة أعمال متكامل، عربي من الأساس.", en: "An integrated business system, Arabic from the ground up." })}</p>
          <button type="button" onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="mt-5 text-[14px] text-ink2 underline-offset-4 hover:underline">
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>
        <div className="border-b border-rule px-5 py-10 sm:px-8 md:border-s lg:border-b-0 lg:border-s-0 lg:border-e">
          <h3 className="text-[13px] text-muted">{t({ ar: "الإدارات", en: "Departments" })}</h3>
          <ul className="mt-3 space-y-2">{domains.map((m) => <li key={m.id}><a href="#tour" className="text-[14px] text-ink2 hover:text-ink">{t(m.name)}</a></li>)}</ul>
        </div>
        <div className="border-b border-rule px-5 py-10 sm:px-8 md:border-b-0 lg:border-e">
          <h3 className="text-[13px] text-muted">{t({ ar: "القطاعات", en: "Industries" })}</h3>
          <ul className="mt-3 space-y-2">{segs.map((s) => <li key={s.en}><a href="#industries" className="text-[14px] text-ink2 hover:text-ink">{t(s)}</a></li>)}</ul>
        </div>
        <div className="px-5 py-10 sm:px-8 md:border-s lg:border-s-0">
          <h3 className="text-[13px] text-muted">{t({ ar: "تواصل", en: "Contact" })}</h3>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li><a href={whatsappLink(whatsappIntro(lang))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink2 hover:text-emerald"><WhatsAppGlyph className="h-4 w-4" /><span className="num">{site.whatsappDisplay}</span></a></li>
            <li><a href={`mailto:${site.email}`} className="num text-ink2 hover:text-ink">{site.email}</a></li>
            <li><a href="#demo" className="text-ink2 hover:text-ink">{t({ ar: "احجز عرض مجاني", en: "Book a free demo" })}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-frame flex-wrap justify-between gap-2 border-x border-rule px-5 py-4 text-[12.5px] text-muted sm:px-8">
          <span className="num">© 2026 NEXORA ERP</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  const { t, lang, topic } = useApp();
  const label = topic ? t({ ar: "اسأل عن ", en: "Ask about " }) + t(topic) : t({ ar: "كلّمنا على واتساب", en: "Message us" });
  return (
    <a href={whatsappLink(whatsappIntro(lang, topic ? t(topic) : undefined))} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
      className="fixed bottom-5 end-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-emerald text-white shadow-[0_8px_24px_-8px_rgb(5_150_105/0.6)] transition-transform hover:scale-105">
      <WhatsAppGlyph className="h-6 w-6" />
    </a>
  );
}
