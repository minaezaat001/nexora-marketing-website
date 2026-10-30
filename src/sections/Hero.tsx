import { motion } from "framer-motion";
import { useApp, type L } from "../i18n";
import ErpWindow from "../components/ErpWindow";
import { PrimaryButton, WhatsAppButton } from "../components/ui";

const ledger: { k: L; v: string }[] = [
  { k: { ar: "قواعد الترحيل التلقائي", en: "Automatic posting rules" }, v: "18" },
  { k: { ar: "قيود الديمو المطابقة لميزان المراجعة", en: "Demo entries matching the trial balance" }, v: "162/162" },
  { k: { ar: "تكلفة الصنف", en: "Item costing" }, v: "WAC × WH" },
  { k: { ar: "جداول البيانات المترابطة", en: "Linked data models" }, v: "60" },
];

export default function Hero() {
  const { t, openDemo } = useApp();
  return (
    <section id="top" className="border-b border-rule">
      <div className="mx-auto max-w-frame border-x border-rule">
        <div className="grid lg:grid-cols-12">
          <div className="px-5 pb-12 pt-14 sm:px-8 sm:pt-20 lg:col-span-8 lg:border-e lg:border-rule lg:pb-16">
            <h1 className="max-w-[17ch] text-balance text-[40px] font-semibold leading-[1.2] text-ink sm:text-[60px]">
              {t({ ar: "الفاتورة بتعمل قيدها، والصنف عارف تكلفته.", en: "Invoices that post themselves. Items that know their cost." })}
            </h1>
            <p className="mt-6 max-w-[60ch] text-pretty text-[18px] text-ink2">
              {t({
                ar: "نكسورا نظام ERP عربي لإدارة المبيعات والمشتريات والمخازن والخزينة والحسابات العامة والموارد البشرية في مكان واحد. كل مستند بيترحّل لحظيًا في اليومية، وتكلفة الصنف محسوبة بالمتوسط المرجح لكل مخزن، والفترات المقفولة محدش يقدر يعدّل فيها بأثر رجعي.",
                en: "NEXORA is an Arabic-first ERP that runs sales, purchasing, inventory, treasury, the general ledger and HR in one place. Every document posts to the journal the moment it's saved, item cost is a weighted average per warehouse, and closed periods can't be edited after the fact.",
              })}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButton onClick={() => openDemo()}>{t({ ar: "احجز ديمو عملي", en: "Book a live demo" })}</PrimaryButton>
              <WhatsAppButton variant="line" />
            </div>
          </div>
          <dl className="border-t border-rule lg:col-span-4 lg:border-t-0">
            {ledger.map((r) => (
              <div key={r.v} className="flex items-baseline justify-between gap-4 border-b border-rule px-5 py-5 sm:px-8 lg:py-6">
                <dt className="text-[14px] text-ink2">{t(r.k)}</dt>
                <dd className="num text-[20px] font-medium text-ink">{r.v}</dd>
              </div>
            ))}
            <p className="px-5 py-5 text-[12.5px] leading-relaxed text-muted sm:px-8">
              {t({ ar: "أرقام من النسخة التجريبية للنظام واختبارات المطابقة المحاسبية فيه.", en: "Figures from the system's demo data and its accounting reconciliation tests." })}
            </p>
          </dl>
        </div>

        <div id="product" className="scroll-mt-16 border-t border-rule px-3 py-8 sm:px-8 sm:py-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.15 }}>
            <ErpWindow />
          </motion.div>
          <p className="mt-4 text-[13px] text-muted">
            {t({ ar: "نسخة عرض تفاعلية: غيّر الموديول من القائمة، ابحث، فلتر، وبدّل الفرع.", en: "Interactive preview: switch modules from the sidebar, search, filter and change branch." })}
          </p>
        </div>
      </div>
    </section>
  );
}
