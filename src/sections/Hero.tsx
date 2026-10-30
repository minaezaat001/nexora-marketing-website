import { motion } from "framer-motion";
import { useApp, type L } from "../i18n";
import ErpWindow from "../components/ErpWindow";
import { Check, PrimaryButton, WhatsAppButton } from "../components/ui";

const values: L[] = [
  { ar: "ضبط المخازن ومنع العجز والهالك", en: "Stock under control — no shortages, no silent waste" },
  { ar: "متابعة لحظية للشيكات والأقساط والمديونيات", en: "Cheques, installments and receivables tracked live" },
  { ar: "ميزانية وأرباح دقيقة من غير ما تستنى آخر الشهر", en: "Accurate profit and balance sheet without waiting for month end" },
];

const proof: { k: L; v: string }[] = [
  { k: { ar: "إدارات في نظام واحد", en: "Departments in one system" }, v: "8" },
  { k: { ar: "قيود يدوية لفواتير البيع والشراء والسندات", en: "Manual entries for sales, purchases and vouchers" }, v: "0" },
  { k: { ar: "تنبيهات تلقائية: شيكات، أقساط، نواقص، حدود ائتمان، موردين، مصروفات", en: "Automatic alerts: cheques, installments, low stock, credit limits, suppliers, expenses" }, v: "6" },
  { k: { ar: "مطابقة ميزان المراجعة في بيانات التجربة", en: "Trial balance match on the demo data" }, v: "100%" },
];

export default function Hero() {
  const { t, openDemo } = useApp();
  return (
    <section id="top" className="border-b border-rule">
      <div className="mx-auto max-w-frame border-x border-rule">
        <div className="grid lg:grid-cols-12">
          <div className="px-5 pb-12 pt-14 sm:px-8 sm:pt-20 lg:col-span-8 lg:border-e lg:border-rule lg:pb-16">
            <h1 className="text-balance text-[34px] font-semibold leading-[1.25] text-ink sm:text-[46px]">
              {t({ ar: "أدِر مبيعاتك ومخازنك وحساباتك من شاشة واحدة.. واعرف ربحك الحقيقي في كل لحظة.", en: "Run sales, stock and accounts from one screen — and know your real profit at any moment." })}
            </h1>
            <p className="mt-6 max-w-[60ch] text-pretty text-[18px] text-ink2">
              {t({
                ar: "وداعًا لتضارب أرصدة المخازن، وتأخير تقارير المحاسبين، وضياع مواعيد الأقساط والشيكات. نكسورا بيربط فروعك ومخازنك وخزينتك تلقائيًا، من أول فاتورة لحد الميزانية.",
                en: "No more stock counts that don't match, accountants' reports that arrive late, or installments and cheques that slip through. NEXORA links your branches, warehouses and treasury automatically, from the first invoice to the balance sheet.",
              })}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButton onClick={() => openDemo()}>{t({ ar: "احجز عرض حي على بيانات نشاطك (مجانًا)", en: "Book a free live demo on your data" })}</PrimaryButton>
              <WhatsAppButton variant="line" />
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {values.map((v) => (
                <li key={v.en} className="inline-flex items-center gap-1.5 rounded border border-rule bg-sheet px-3 py-1.5 text-[13.5px] text-ink2">
                  <Check className="h-3.5 w-3.5 text-emerald" />{t(v)}
                </li>
              ))}
            </ul>
          </div>
          <dl className="border-t border-rule lg:col-span-4 lg:border-t-0">
            {proof.map((r) => (
              <div key={r.k.en} className="flex items-baseline justify-between gap-4 border-b border-rule px-5 py-5 sm:px-8 lg:py-6">
                <dt className="text-[14px] text-ink2">{t(r.k)}</dt>
                <dd className="num text-[22px] font-medium text-ink">{r.v}</dd>
              </div>
            ))}
            <p className="px-5 py-5 text-[12.5px] leading-relaxed text-muted sm:px-8">
              {t({ ar: "الفواتير والسندات بتتقيد لوحدها لحظة الحفظ. ونسخة التجربة مطابقة لميزان المراجعة 162 قيد من 162.", en: "Invoices and vouchers post themselves on save. The demo data matches the trial balance on 162 of 162 entries." })}
            </p>
          </dl>
        </div>

        <div id="product" className="scroll-mt-16 border-t border-rule px-3 py-8 sm:px-8 sm:py-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.15 }}>
            <ErpWindow />
          </motion.div>
          <p className="mt-4 text-[13px] text-muted">
            {t({ ar: "نسخة تفاعلية من شاشة النظام — جرّب: غيّر الإدارة من القائمة، ابحث، فلتر، وبدّل الفرع.", en: "An interactive copy of the system’s screen — try it: switch departments from the sidebar, search, filter and change branch." })}
          </p>
        </div>
      </div>
    </section>
  );
}
