import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp, type DemoPreset, type L } from "../i18n";
import { modules } from "./Modules";
import { site, whatsappLink } from "../config/site";
import { Arrow, Check, SectionHead, WhatsAppGlyph } from "../components/ui";

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
    ? `طلب ديمو — NEXORA ERP\n• النشاط: ${segL ? t(segL) : "-"}\n• حجم الفريق: ${f.size ?? "-"}\n• الموديولات: ${modL.join("، ") || "-"}\n• الاسم: ${f.name}\n• الشركة: ${f.company || "-"}\n• الموبايل: ${f.phone}\n• المدينة: ${f.city || "-"}`
    : `Demo request — NEXORA ERP\n• Business: ${segL ? t(segL) : "-"}\n• Team size: ${f.size ?? "-"}\n• Modules: ${modL.join(", ") || "-"}\n• Name: ${f.name}\n• Company: ${f.company || "-"}\n• Phone: ${f.phone}\n• City: ${f.city || "-"}`;

  const stepLabels: L[] = [{ ar: "النشاط", en: "Business" }, { ar: "الاحتياج", en: "Needs" }, { ar: "التواصل", en: "Contact" }];
  const input = "h-11 w-full rounded-sm border border-line bg-surface2/60 px-3 text-[15px] text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none";

  return (
    <div>
      <ol className="mb-6 flex items-center gap-2">
        {stepLabels.map((s, k) => (
          <li key={s.en} className="flex flex-1 items-center gap-2">
            <span className={`num grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11.5px] ${k < step ? "bg-ok text-canvas" : k === step ? "bg-brand text-white" : "border border-lineStrong text-muted"}`}>{k < step ? <Check className="h-3 w-3" /> : k + 1}</span>
            <span className={`text-[13px] ${k === step ? "text-ink" : "text-muted"}`}>{t(s)}</span>
            {k < 2 && <span className="h-px flex-1 bg-line" />}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.16 }}>
          {step === 0 && (
            <fieldset>
              <legend className="mb-3 text-[15px] font-semibold text-ink">{t({ ar: "نشاطك إيه؟", en: "What kind of business?" })}</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {segments.map((s) => (
                  <button key={s.id} type="button" onClick={() => { setF({ ...f, segment: s.id }); setStep(1); }}
                    className={`rounded-sm border p-4 text-start transition ${f.segment === s.id ? "border-accent bg-accent/10" : "border-line hover:border-lineStrong"}`}>
                    <div className="text-[15px] font-semibold text-ink">{t(s.l)}</div>
                    <div className="mt-1 text-[12.5px] text-muted">{t(s.d)}</div>
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          {step === 1 && (
            <div className="space-y-5">
              <fieldset>
                <legend className="mb-2 text-[15px] font-semibold text-ink">{t({ ar: "عدد المستخدمين", en: "Team size" })}</legend>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button key={s} type="button" onClick={() => setF({ ...f, size: s })} className={`num h-10 rounded-sm border px-4 text-[14px] ${f.size === s ? "border-accent bg-accent/10 text-ink" : "border-line text-ink2 hover:border-lineStrong"}`}>{s}</button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-[15px] font-semibold text-ink">{t({ ar: "الموديولات اللي تهمك", en: "Modules you care about" })}</legend>
                <div className="flex flex-wrap gap-2">
                  {modules.map((m) => {
                    const on = f.mods.includes(m.id);
                    return (
                      <button key={m.id} type="button" aria-pressed={on} onClick={() => setF({ ...f, mods: on ? f.mods.filter((x) => x !== m.id) : [...f.mods, m.id] })}
                        className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-[13px] transition ${on ? "border-accent bg-accent/10 text-ink" : "border-line text-ink2 hover:border-lineStrong"}`}>
                        {on && <Check className="h-3.5 w-3.5 text-accent" />}{t(m.name)}
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
          <button type="button" onClick={() => setStep(step - 1)} className="h-11 rounded-sm px-4 text-[14px] text-ink2 hover:text-ink">{t({ ar: "رجوع", en: "Back" })}</button>
        )}
        {step < 2 ? (
          <button type="button" disabled={!can[step]} onClick={() => setStep(step + 1)}
            className="ms-auto inline-flex h-11 items-center gap-2 rounded-sm bg-brand px-5 text-[15px] font-semibold text-white transition enabled:hover:bg-[#2a5fd6] disabled:opacity-40">
            {t({ ar: "التالي", en: "Next" })} <Arrow />
          </button>
        ) : (
          <div className="ms-auto flex flex-wrap gap-2">
            <a aria-disabled={!can[2]} href={can[2] ? `mailto:${site.email}?subject=${encodeURIComponent("NEXORA ERP — Demo")}&body=${encodeURIComponent(message)}` : undefined}
              className={`inline-flex h-11 items-center rounded-sm border border-lineStrong px-4 text-[14px] text-ink transition hover:border-accent ${can[2] ? "" : "pointer-events-none opacity-40"}`}>
              {t({ ar: "إرسال بالإيميل", en: "Send by email" })}
            </a>
            <a aria-disabled={!can[2]} href={can[2] ? whatsappLink(message) : undefined} target="_blank" rel="noopener noreferrer"
              className={`inline-flex h-11 items-center gap-2 rounded-sm bg-[#1FAF5A] px-5 text-[15px] font-semibold text-white transition hover:bg-[#1a9a4f] ${can[2] ? "" : "pointer-events-none opacity-40"}`}>
              <WhatsAppGlyph className="h-[18px] w-[18px]" />{t({ ar: "احجز عبر واتساب", en: "Book via WhatsApp" })}
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
          <div className="absolute inset-0 bg-[#05070F]/70 backdrop-blur-sm" onClick={closeDemo} />
          <motion.div role="dialog" aria-modal="true" aria-labelledby="demo-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-lineStrong bg-surface p-6 shadow-[0_30px_80px_-10px_rgb(0_0_0/0.7)] sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="demo-title" className="text-[22px] font-bold text-ink">{t({ ar: "احجز ديمو عملي", en: "Book a live demo" })}</h2>
                <p className="mt-1 text-[14px] text-muted">{t({ ar: "على نشاطك أنت — مش عرض عام.", en: "Built around your business — not a generic tour." })}</p>
              </div>
              <button type="button" onClick={closeDemo} aria-label={t({ ar: "إغلاق", en: "Close" })} className="grid h-9 w-9 place-items-center rounded-sm border border-line text-ink2 hover:text-ink">
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
    { ar: "نشوف دورتك الحالية: من أول طلب الشراء لحد القيد.", en: "We map your current cycle: from purchase request to journal entry." },
    { ar: "نشغّل نفس الدورة على نكسورا ببيانات قريبة من بياناتك.", en: "We run the same cycle in NEXORA with data close to yours." },
    { ar: "نطلع بخطة تشغيل: موديولات، صلاحيات، وترحيل الأرصدة الافتتاحية.", en: "You leave with a rollout plan: modules, permissions and opening-balance migration." },
  ];
  return (
    <section id="demo" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHead
            eyebrow={{ ar: "احجز ديمو", en: "Book a demo" }}
            title={{ ar: "٣ خطوات، وميعاد على نشاطك أنت.", en: "Three steps to a demo built around your business." }}
          />
          <ul className="mt-8 space-y-4">
            {agenda.map((a, k) => (
              <li key={a.en} className="flex gap-3">
                <span className="num mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-lineStrong text-[11.5px] text-accent">{k + 1}</span>
                <span className="text-[15px] text-ink2">{t(a)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
          <DemoForm />
        </div>
      </div>
    </section>
  );
}
