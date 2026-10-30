import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useApp } from "../i18n";
import ProductMockup from "../components/ProductMockup";
import { Arrow, PrimaryButton, WhatsAppButton } from "../components/ui";

const proof = [
  { n: "18", l: { ar: "قاعدة ترحيل تلقائي — كل مستند يعمل قيده", en: "posting rules — every document books its own entry" } },
  { n: "162/162", l: { ar: "قيد تجريبي مطابق لميزان المراجعة", en: "demo entries reconciled to the trial balance" } },
  { n: "60", l: { ar: "جدول بيانات مترابط في نظام واحد", en: "linked data models in one system" } },
];

export default function Hero() {
  const { t, openDemo } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.6], [12, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -30]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pb-20 pt-14 sm:pt-20">
      <div className="hairline-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 start-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#3E7BFA]/[0.10] blur-[120px] rtl:translate-x-1/2" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="mx-auto max-w-4xl text-center">
          <a href="#industries" className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1 pe-3 ps-1 text-[13px] text-ink2 backdrop-blur transition hover:border-lineStrong">
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11.5px] font-semibold text-accent">{t({ ar: "جديد V1.1", en: "New in V1.1" })}</span>
            {t({ ar: "إقفال سنوي، فترات محاسبية، وأصول ثابتة بالإهلاك", en: "Year-end close, period locks and depreciating fixed assets" })}
            <Arrow className="h-3.5 w-3.5" />
          </a>
          <h1 className="text-balance text-[38px] font-bold leading-[1.15] tracking-tight text-ink sm:text-[58px]">
            {t({ ar: "كل فاتورة بتعمل قيدها.", en: "Every invoice books itself." })}
            <br />
            <span className="bg-gradient-to-l from-[#29B6FF] via-[#3E7BFA] to-[#8B3FE8] bg-clip-text text-transparent ltr:bg-gradient-to-r">
              {t({ ar: "وكل صنف عارف تكلفته.", en: "Every item knows its true cost." })}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[18px] text-ink2">
            {t({
              ar: "نكسورا نظام ERP عربي متكامل للمصانع والشركات والمحلات: مبيعات ومشتريات، مخازن متعددة بتكلفة حقيقية، خزينة وشيكات وأقساط، محاسبة كاملة لحد الإقفال السنوي، وموارد بشرية ورواتب — بصلاحيات مضبوطة لكل فرع.",
              en: "NEXORA is an integrated, Arabic-first ERP for factories, growing companies and retailers: sales and purchasing, multi-warehouse stock at true cost, treasury, cheques and installments, full accounting through year-end close, and HR & payroll — with permissions scoped per branch.",
            })}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton onClick={() => openDemo()}>
              {t({ ar: "احجز ديمو عملي", en: "Book a live demo" })}
              <Arrow className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </PrimaryButton>
            <WhatsAppButton variant="ghost" />
          </div>
          <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
            {proof.map((p) => (
              <div key={p.n} className="px-4 py-4 text-center">
                <dt className="num text-[22px] font-semibold text-ink">{p.n}</dt>
                <dd className="mt-1 text-[13px] leading-snug text-muted">{t(p.l)}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <div id="product" className="relative mx-auto mt-16 max-w-6xl scroll-mt-24 [perspective:1600px]">
          <motion.div style={{ rotateX: rotate, y }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="origin-top">
            <ProductMockup />
          </motion.div>
          <p className="mt-4 text-center text-[13px] text-muted">
            {t({ ar: "واجهة تفاعلية — جرّب الفلاتر والأزرار. البيانات من النسخة التجريبية للنظام.", en: "Interactive preview — try the filters and buttons. Data comes from the system's own demo set." })}
          </p>
        </div>
      </div>
    </section>
  );
}
