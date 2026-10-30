import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp, type L } from "../i18n";
import { SectionHead } from "../components/ui";

const points: { title: L; body: L; tag: string }[] = [
  { tag: "posting engine", title: { ar: "محرك ترحيل واحد لكل المستندات", en: "One posting engine for every document" }, body: { ar: "١٨ قاعدة ترحيل تحوّل الفاتورة والسند والتسوية لقيد متوازن. والتصحيح بقيد عكسي — مش بمسح التاريخ.", en: "18 posting rules turn invoices, vouchers and adjustments into balanced entries. Corrections are reversals — history is never erased." } },
  { tag: "R1 costing", title: { ar: "تكلفة حقيقية لكل صنف في كل مخزن", en: "True cost per item, per warehouse" }, body: { ar: "متوسط مرجّح متحرك يتحدّث مع كل حركة، فتكلفة البضاعة المباعة ومجمل الربح دقيقين من أول يوم.", en: "A moving weighted average updated on every movement, so COGS and gross margin are right from day one." } },
  { tag: "scope", title: { ar: "صلاحيات بالدور والفرع والموديول", en: "Permissions by role, branch and module" }, body: { ar: "أدوار مخصصة فوق أدوار النظام، ونطاق بيانات لكل موديول (فرع/شركة)، وسجل مراجعة لكل عملية كتابة: مين عمل إيه وإمتى.", en: "Custom roles on top of system roles, a data scope per module (branch/company), and an audit trail on every write: who did what, and when." } },
  { tag: "periods", title: { ar: "فترات تُقفل وإقفال سنوي", en: "Lockable periods and year-end close" }, body: { ar: "الشهر اللي اتقفل محدش يرحّل فيه. والإقفال السنوي بيرحّل الأرباح ويفتح سنة جديدة بأرصدة نظيفة.", en: "Nobody posts into a closed month. Year-end close rolls profit forward and opens the new year with clean balances." } },
  { tag: "arabic-first", title: { ar: "عربي من الأساس، مش ترجمة", en: "Arabic-first, not translated" }, body: { ar: "واجهة RTL كاملة، رسائل تحقق بالعربي، وضع ليلي ونهاري، حجم خط يناسبك، ومستندات جاهزة للطباعة.", en: "Full RTL interface, Arabic validation messages, dark and light themes, adjustable font size and print-ready documents." } },
  { tag: "release gate", title: { ar: "بوابة جودة قبل كل إصدار", en: "A quality gate before every release" }, body: { ar: "فحص أنواع وبناء وحزم اختبارات محاسبية وأمنية لازم تعدي كلها قبل ما أي تحديث يوصلك.", en: "Type checks, a production build and accounting and security test suites must all pass before an update reaches you." } },
];

function DoubleClickDemo() {
  const { t } = useApp();
  const [clicks, setClicks] = useState(0);
  const [saved, setSaved] = useState(false);
  const click = () => {
    setClicks((c) => c + 1);
    setSaved(true);
  };
  return (
    <div className="mt-6 rounded-md border border-line bg-canvas/50 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={click} className="h-10 rounded-sm bg-brand px-4 text-[14px] font-semibold text-white active:scale-[0.98]">
          {t({ ar: "حفظ الفاتورة", en: "Save invoice" })}
        </button>
        <span className="text-[13px] text-muted">{t({ ar: "اضغط بسرعة كذا مرة — زي ما بيحصل لما النت يهنّج.", en: "Click it several times fast — like on a laggy connection." })}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-[13px]">
        <div className="rounded-sm border border-line p-3">
          <div className="text-muted">{t({ ar: "طلبات وصلت للسيرفر", en: "Requests received" })}</div>
          <motion.div key={clicks} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="num mt-1 text-[22px] font-semibold text-ink">{clicks}</motion.div>
        </div>
        <div className="rounded-sm border border-ok/40 bg-ok/[0.06] p-3">
          <div className="text-muted">{t({ ar: "فواتير اتسجلت فعلًا", en: "Invoices actually created" })}</div>
          <div className="num mt-1 text-[22px] font-semibold text-ok">{saved ? 1 : 0}</div>
        </div>
      </div>
      <AnimatePresence>
        {clicks > 1 && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }} className="mt-3 text-[12.5px] text-ink2">
            {t({ ar: "مفتاح عدم التكرار (Idempotency key) بيضمن إن نفس العملية متتسجلش مرتين — ولا قيد مكرر في الدفاتر.", en: "An idempotency key guarantees the same operation is never recorded twice — no duplicate entries in your books." })}
            <button type="button" onClick={() => { setClicks(0); setSaved(false); }} className="ms-2 text-accent underline-offset-2 hover:underline">{t({ ar: "إعادة", en: "Reset" })}</button>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Why() {
  const { t } = useApp();
  return (
    <section id="why" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow={{ ar: "لماذا نكسورا", en: "Why NEXORA" }}
          title={{ ar: "اتبنى زي ما المحاسب بيفكر — واتختبر زي ما المبرمج بيخاف.", en: "Built the way accountants think. Tested the way engineers worry." }}
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-3">
          <div className="bg-surface p-7 lg:row-span-2">
            <span className="num text-[11px] uppercase tracking-[0.14em] text-accent">idempotency</span>
            <h3 className="mt-3 text-[22px] font-bold leading-snug text-ink">{t({ ar: "ضغطتين على «حفظ» = فاتورة واحدة.", en: "Two clicks on “Save” = one invoice." })}</h3>
            <p className="mt-3 text-[15px] text-ink2">{t({ ar: "أكتر خطأ بيبوّظ الدفاتر في الأنظمة الويب: نفس الفاتورة تتسجل مرتين. في نكسورا كل عملية كتابة محمية.", en: "The most common way web systems corrupt the books: the same invoice saved twice. In NEXORA every write is protected." })}</p>
            <DoubleClickDemo />
          </div>
          {points.map((p) => (
            <div key={p.tag} className="bg-surface p-6 transition hover:bg-surface2/60">
              <span className="num text-[11px] uppercase tracking-[0.14em] text-muted">{p.tag}</span>
              <h3 className="mt-2 text-[16.5px] font-semibold text-ink">{t(p.title)}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{t(p.body)}</p>
            </div>
          ))}
          <div className="bg-surface p-6">
            <span className="num text-[11px] uppercase tracking-[0.14em] text-muted">deployment</span>
            <h3 className="mt-2 text-[16.5px] font-semibold text-ink">{t({ ar: "نسخة خاصة بشركتك", en: "An instance of your own" })}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{t({ ar: "قاعدة بيانات مستقلة لكل عميل، وإعدادات وموديولات متفصّلة على شغلك، ونسخ احتياطي من داخل النظام.", en: "A separate database per client, settings and modules tailored to your operation, and backups from inside the app." })}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
