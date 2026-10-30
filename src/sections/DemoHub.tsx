import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp, type DemoPreset, type L } from "../i18n";
import { domains as modules } from "../data/domains";
import { site, whatsappLink } from "../config/site";
import { Check, Section, WhatsAppGlyph } from "../components/ui";

const segments: { id: DemoPreset["segment"]; l: L; d: L }[] = [
  { id: "factory", l: { ar: "مصنع", en: "Factory" }, d: { ar: "خامات، مخازن، تكلفة، تالف", en: "Materials, stores, cost, waste" } },
  { id: "company", l: { ar: "شركة متوسطة", en: "Company" }, d: { ar: "فروع، محاسبة كاملة، رواتب", en: "Branches, full accounting, payroll" } },
  { id: "retail", l: { ar: "محل / تجارة / معرض", en: "Retail / showroom" }, d: { ar: "فواتير سريعة، باركود، أقساط", en: "Fast invoices, barcode, installments" } },
];
const sizes = ["1–10", "11–50", "51–200", "200+"];

type Form = { segment: DemoPreset["segment"] | null; size: string | null; mods: string[]; name: string; company: string; phone: string; city: string };

function DemoForm({ compact = false }: { compact?: boolean }) {
  const { t, lang, demoPreset, demoOpen } = useApp();
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>({ segment: null, size: null, mods: [], name: "", company: "", phone: "", city: "" });

  useEffect(() => {
    if (compact && demoOpen) {
      setStep(demoPreset.segment ? 1 : 0);
      setF((x) => ({ ...x, segment: demoPreset.segment ?? x.segment, mods: demoPreset.modules ?? x.mods }));
    }
  }, [compact, demoOpen, demoPreset]);

  const can = [!!f.segment, !!f.size && f.mods.length > 0, f.name.trim().length > 1 && f.phone.replace(/\D/g, "").length >= 8];
  const segL = segments.find((s) => s.id === f.segment)?.l;
  const modL = f.mods.map((m) => t(modules.find((x) => x.id === m)!.name));

  const message = lang === "ar"
    ? `طلب عرض حي — NEXORA ERP\n• النشاط: ${segL ? t(segL) : "-"}\n• حجم الفريق: ${f.size ?? "-"}\n• الإدارات: ${modL.join("، ") || "-"}\n• الاسم: ${f.name}\n• الشركة: ${f.company || "-"}\n• الموبايل: ${f.phone}\n• المدينة: ${f.city || "-"}`
    : `Demo request — NEXORA ERP\n• Business: ${segL ? t(segL) : "-"}\n• Team size: ${f.size ?? "-"}\n• Departments: ${modL.join(", ") || "-"}\n• Name: ${f.name}\n• Company: ${f.company || "-"}\n• Phone: ${f.phone}\n• City: ${f.city || "-"}`;

  const stepLabels: L[] = [{ ar: "النشاط", en: "Business" }, { ar: "الاحتياج", en: "Needs" }, { ar: "التواصل", en: "Contact" }];
  const input = "h-11 w-full rounded border border-ruleStrong bg-sheet px-3 text-[15px] text-ink placeholder:text-muted focus:border-royal focus:outline-none";

  return (
    <div>
      <ol className="mb-6 flex items-center gap-2">
        {stepLabels.map((s, k) => (
          <li key={s.en} className="flex flex-1 items-center gap-2">
            <span className={`num grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11.5px] ${k < step ? "bg-emerald text-white" : k === step ? "bg-royal text-white" : "border border-ruleStrong text-muted"}`}>{k < step ? <Check className="h-3 w-3" /> : k + 1}</span>
            <span className={`text-[13px] ${k === step ? "text-ink" : "text-muted"}`}>{t(s)}</span>
            {k < 2 && <span className="h-px flex-1 bg-rule" />}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
          {step === 0 && (
            <fieldset>
              <legend className="mb-3 text-[15px] font-medium text-ink">{t({ ar: "نشاطك إيه؟", en: "What kind of business?" })}</legend>
              <div className="grid overflow-hidden rounded border border-ruleStrong sm:grid-cols-3">
                {segments.map((s) => (
                  <button key={s.id} type="button" onClick={() => { setF({ ...f, segment: s.id }); setStep(1); }}
                    className={`border-b border-rule p-4 text-start transition-colors last:border-0 sm:border-b-0 sm:border-e ${f.segment === s.id ? "bg-royal/[0.07]" : "bg-sheet hover:bg-paper"}`}>
                    <div className="text-[15px] font-medium text-ink">{t(s.l)}</div>
                    <div className="mt-1 text-[12.5px] text-muted">{t(s.d)}</div>
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          {step === 1 && (
            <div className="space-y-5">
              <fieldset>
                <legend className="mb-2 text-[15px] font-medium text-ink">{t({ ar: "عدد المستخدمين", en: "Team size" })}</legend>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button key={s} type="button" onClick={() => setF({ ...f, size: s })} className={`num h-10 rounded border px-4 text-[14px] ${f.size === s ? "border-royal bg-royal/[0.07] text-ink" : "border-ruleStrong bg-sheet text-ink2 hover:border-ink2"}`}>{s}</button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-[15px] font-medium text-ink">{t({ ar: "الإدارات اللي تهمك", en: "Departments you care about" })}</legend>
                <div className="flex flex-wrap gap-2">
                  {modules.map((m) => {
                    const on = f.mods.includes(m.id);
                    return (
                      <button key={m.id} type="button" aria-pressed={on} onClick={() => setF({ ...f, mods: on ? f.mods.filter((x) => x !== m.id) : [...f.mods, m.id] })}
                        className={`inline-flex h-9 items-center gap-1.5 rounded border px-3 text-[13.5px] transition-colors ${on ? "border-royal bg-royal/[0.07] text-ink" : "border-ruleStrong bg-sheet text-ink2 hover:border-ink2"}`}>
                        {on && <Check className="h-3.5 w-3.5 text-royal" />}{t(m.name)}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <input className={input} placeholder={t({ ar: "الاسم *", en: "Your name *" })} aria-label={t({ ar: "الاسم *", en: "Your name *" })} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" />
              <input className={input} placeholder={t({ ar: "اسم الشركة", en: "Company" })} aria-label={t({ ar: "اسم الشركة", en: "Company" })} value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} autoComplete="organization" />
              <input className={`${input} num text-start`} placeholder={t({ ar: "رقم الموبايل / واتساب *", en: "Mobile / WhatsApp *" })} aria-label={t({ ar: "رقم الموبايل / واتساب *", en: "Mobile / WhatsApp *" })} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} inputMode="tel" autoComplete="tel" />
              <input className={input} placeholder={t({ ar: "المدينة", en: "City" })} aria-label={t({ ar: "المدينة", en: "City" })} value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} autoComplete="address-level2" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="h-11 rounded px-4 text-[14px] text-ink2 hover:text-ink">{t({ ar: "رجوع", en: "Back" })}</button>
        )}
        {step < 2 ? (
          <button type="button" disabled={!can[step]} onClick={() => setStep(step + 1)}
            className="ms-auto inline-flex h-11 items-center gap-2 rounded bg-royal px-5 text-[15px] font-medium text-white transition-colors enabled:hover:bg-royal/90 disabled:opacity-40">
            {t({ ar: "التالي", en: "Next" })}
          </button>
        ) : (
          <div className="ms-auto flex flex-wrap gap-2">
            <a aria-disabled={!can[2]} href={can[2] ? `mailto:${site.email}?subject=${encodeURIComponent("NEXORA ERP — Demo")}&body=${encodeURIComponent(message)}` : undefined}
              className={`inline-flex h-11 items-center rounded border border-ruleStrong bg-sheet px-4 text-[14px] text-ink transition-colors hover:border-royal ${can[2] ? "" : "pointer-events-none opacity-40"}`}>
              {t({ ar: "أو ابعته بالإيميل", en: "Or send by email" })}
            </a>
            <a aria-disabled={!can[2]} href={can[2] ? whatsappLink(message) : undefined} target="_blank" rel="noopener noreferrer"
              className={`inline-flex h-11 items-center gap-2 rounded bg-emerald px-5 text-[15px] font-medium text-white transition-colors hover:bg-emerald/90 ${can[2] ? "" : "pointer-events-none opacity-40"}`}>
              <WhatsAppGlyph className="h-[18px] w-[18px]" />{t({ ar: "ابعت الطلب على واتساب", en: "Send request on WhatsApp" })}
            </a>
          </div>
        )}
      </div>
      {step === 2 && (
        <p className="mt-3 text-[12.5px] text-muted">{t({ ar: "مفيش بيانات بتتحفظ على الموقع — الطلب بيتبعت مباشرة من موبايلك أو إيميلك.", en: "Nothing is stored on this site — the request goes straight from your own WhatsApp or email." })}</p>
      )}
    </div>
  );
}

export function DemoModal() {
  const { demoOpen, closeDemo, t } = useApp();
  useEffect(() => {
    if (!demoOpen) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && closeDemo();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [demoOpen, closeDemo]);

  return (
    <AnimatePresence>
      {demoOpen && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-[#0B1120]/50" onClick={closeDemo} />
          <motion.div role="dialog" aria-modal="true" aria-labelledby="demo-title"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md border border-ruleStrong bg-paper p-6 shadow-[0_30px_60px_-20px_rgb(11_17_32/0.45)] sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="demo-title" className="text-[22px] font-semibold text-ink">{t({ ar: "احجز عرض حي مجاني", en: "Book a free live demo" })}</h2>
                <p className="mt-1 text-[14px] text-muted">{t({ ar: "20 دقيقة على دورة شغلك أنت — مجانًا وبدون التزام.", en: "20 minutes on your own workflow — free, no commitment." })}</p>
              </div>
              <button type="button" onClick={closeDemo} aria-label={t({ ar: "إغلاق", en: "Close" })} className="grid h-9 w-9 place-items-center rounded border border-ruleStrong text-ink2 hover:text-ink">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" /></svg>
              </button>
            </div>
            <DemoForm compact />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function DemoHub() {
  const { t } = useApp();
  const agenda: L[] = [
    { ar: "نسمع منك: إزاي الشغل ماشي النهارده، ومنين الفلوس بتضيع.", en: "We listen: how work runs today, and where money slips away." },
    { ar: "نشغّل دورة شغلك على نكسورا قدامك، ببيانات شبه بياناتك.", en: "We run your cycle in NEXORA in front of you, with data like yours." },
    { ar: "تخرج بخطة واضحة: الإدارات اللي تحتاجها، والصلاحيات، ونقل أرصدتك الحالية.", en: "You leave with a clear plan: the departments you need, permissions, and moving your current balances over." },
  ];
  return (
    <Section
      id="demo"
      index="05"
      label={{ ar: "عرض حي مجاني", en: "Free live demo" }}
      title={{ ar: "شوف شركتك شغالة على نكسورا قبل ما تقرر.", en: "See your own company running on NEXORA before you decide." }}
      lead={{ ar: "جرّب النظام بنفسك في جلسة مباشرة لمدة 20 دقيقة، نطبّق فيها دورة عمل شركتك بالكامل — مجانًا وبدون أي التزام.", en: "Try the system yourself in a live 20-minute session where we run your company’s full cycle — free, with no commitment." }}
      aside={
        <ol className="border-t border-rule">
          {agenda.map((a, k) => (
            <li key={a.en} className="flex gap-3 border-b border-rule py-3.5">
              <span className="num w-4 shrink-0 text-[12px] text-royal">{k + 1}</span>
              <span className="text-[15px] text-ink2">{t(a)}</span>
            </li>
          ))}
        </ol>
      }
    >
      <div className="px-5 py-10 sm:px-8 lg:py-14">
        <DemoForm />
      </div>
    </Section>
  );
}
