import { useState } from "react";
import { motion } from "framer-motion";
import { useApp, type L } from "../i18n";
import { Section } from "../components/ui";

const points: { title: L; body: L }[] = [
  { title: { ar: "محرك ترحيل واحد لكل المستندات", en: "One posting engine for every document" }, body: { ar: "١٨ قاعدة ترحيل بتحوّل الفاتورة والسند والتسوية لقيد متوازن لحظة الحفظ. والتصحيح بقيد عكسي، مش بمسح التاريخ.", en: "18 posting rules turn invoices, vouchers and adjustments into a balanced entry on save. Corrections are reversals — history is never erased." } },
  { title: { ar: "تكلفة الصنف بالمتوسط المرجح لكل مخزن", en: "Weighted-average cost per warehouse" }, body: { ar: "المتوسط بيتحدّث مع كل حركة استلام، فتكلفة البضاعة المباعة ومجمل الربح صح من أول يوم — مش تقدير آخر السنة.", en: "The average updates with every receipt, so cost of goods sold and gross margin are right from day one — not a year-end estimate." } },
  { title: { ar: "إقفال الفترات ومنع التعديل بأثر رجعي", en: "Closed periods, no back-dated edits" }, body: { ar: "الشهر اللي اتقفل محدش يرحّل فيه. والإقفال السنوي بيرحّل النتيجة ويفتح السنة الجديدة بأرصدة نظيفة.", en: "Nobody posts into a closed month. Year-end close carries the result forward and opens the new year with clean balances." } },
  { title: { ar: "صلاحيات بالدور والفرع والموديول", en: "Permissions by role, branch and module" }, body: { ar: "أدوار مخصصة فوق أدوار النظام، ونطاق بيانات لكل موديول، وسجل مراجعة بيقولك مين عمل إيه وإمتى ومن أنهي فرع.", en: "Custom roles on top of system roles, a data scope per module, and an audit trail of who did what, when, from which branch." } },
  { title: { ar: "بوابة جودة قبل كل إصدار", en: "A quality gate before every release" }, body: { ar: "فحص الأنواع والبناء وحزم اختبارات المطابقة المحاسبية والأمان لازم تعدّي كلها قبل ما أي تحديث يوصلك.", en: "Type checks, the production build and accounting and security test suites all have to pass before an update reaches you." } },
  { title: { ar: "نسخة وقاعدة بيانات خاصة بشركتك", en: "Your own instance and database" }, body: { ar: "كل عميل له قاعدة بيانات مستقلة، وموديولات بتتفتح على قد شغله، ونسخ احتياطي من جوه النظام.", en: "Each client gets a separate database, modules switched on to fit the operation, and backups from inside the app." } },
  { title: { ar: "عربي من الأساس", en: "Arabic from the ground up" }, body: { ar: "واجهة من اليمين لليسار، رسائل تحقق بالعربي، وضع ليلي ونهاري، حجم خط بيتظبط، ومستندات جاهزة للطباعة.", en: "Right-to-left interface, Arabic validation messages, dark and light modes, adjustable type size and print-ready documents." } },
];

function DoubleSave() {
  const { t } = useApp();
  const [clicks, setClicks] = useState(0);
  return (
    <div className="grid border-b border-rule md:grid-cols-[1.2fr_1fr]">
      <div className="border-b border-rule px-5 py-8 sm:px-8 md:border-b-0 md:border-e">
        <h3 className="text-[22px] font-semibold leading-[1.3] text-ink">{t({ ar: "تدوس «حفظ» مرتين؟ بتطلع فاتورة واحدة.", en: "Press “Save” twice? You get one invoice." })}</h3>
        <p className="mt-3 max-w-[52ch] text-[15px] text-ink2">{t({ ar: "أشهر طريقة الدفاتر بتبوظ بيها في الأنظمة الأونلاين: النت يهنّج، الموظف يدوس تاني، والفاتورة تتسجل مرتين. في نكسورا كل عملية كتابة ليها مفتاح بيمنع تكرارها.", en: "The most common way online systems corrupt the books: the connection lags, someone presses again, and the invoice is saved twice. In NEXORA every write carries a key that stops it repeating." })}</p>
        <button type="button" onClick={() => setClicks((c) => c + 1)} className="mt-6 h-11 rounded bg-royal px-5 text-[15px] font-medium text-white active:scale-[0.98]">
          {t({ ar: "حفظ الفاتورة", en: "Save invoice" })}
        </button>
        {clicks > 1 && <button type="button" onClick={() => setClicks(0)} className="ms-4 text-[14px] text-ink2 underline-offset-2 hover:underline">{t({ ar: "ابدأ من الأول", en: "Start over" })}</button>}
      </div>
      <dl className="grid grid-rows-2">
        <div className="border-b border-rule px-5 py-6 sm:px-8">
          <dt className="text-[13px] text-muted">{t({ ar: "طلبات وصلت للسيرفر", en: "Requests received" })}</dt>
          <motion.dd key={clicks} initial={{ y: -6, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} className="num mt-1 text-[32px] font-medium text-ink">{clicks}</motion.dd>
        </div>
        <div className="px-5 py-6 sm:px-8">
          <dt className="text-[13px] text-muted">{t({ ar: "فواتير اتسجلت فعلًا", en: "Invoices actually created" })}</dt>
          <dd className="num mt-1 text-[32px] font-medium text-emerald">{clicks > 0 ? 1 : 0}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function Why() {
  const { t } = useApp();
  return (
    <Section
      id="engineering"
      index="04"
      tone="sheet"
      label={{ ar: "البنية الهندسية", en: "Engineering" }}
      title={{ ar: "اتبنى زي ما رئيس الحسابات بيفكر، واتختبر زي ما المبرمج بيقلق.", en: "Built the way a chief accountant thinks. Tested the way an engineer worries." }}
    >
      <DoubleSave />
      <dl>
        {points.map((p) => (
          <div key={p.title.en} className="grid gap-2 border-b border-rule px-5 py-6 last:border-b-0 sm:px-8 md:grid-cols-[2fr_3fr] md:gap-8">
            <dt className="text-[16px] font-medium text-ink">{t(p.title)}</dt>
            <dd className="text-[15px] text-ink2">{t(p.body)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
