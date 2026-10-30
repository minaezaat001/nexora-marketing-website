import { useState } from "react";
import { motion } from "framer-motion";
import { useApp, type L } from "../i18n";
import { Section } from "../components/ui";

const points: { title: L; body: L }[] = [
  { title: { ar: "ولا قيد يدوي للفواتير والسندات", en: "No manual entries for invoices and vouchers" }, body: { ar: "كل فاتورة وسند بيتقيد لوحده لحظة الحفظ. ولو في غلطة بتتصلّح بقيد عكسي، فتاريخك المالي عمره ما يتمسح أو يتلعب فيه.", en: "Every invoice and voucher books itself on save. Mistakes are fixed with a reversing entry, so your financial history is never erased or tampered with." } },
  { title: { ar: "ربحك الحقيقي، مش تقدير", en: "Your real profit, not an estimate" }, body: { ar: "تكلفة كل صنف بتتحدّث مع كل شحنة بتدخل، فمجمل ربح كل فاتورة صح من أول يوم — مش رقم بتعرفه آخر السنة.", en: "Each item’s cost updates with every delivery, so the gross profit on every invoice is right from day one — not a figure you discover at year end." } },
  { title: { ar: "الأرقام اللي اتقفلت محدش يلمسها", en: "Closed numbers stay closed" }, body: { ar: "أول ما تقفل الشهر، محدش يقدر يعدّل فيه بأثر رجعي. والميزانية اللي سلّمتها للبنك أو الضرايب هي هي.", en: "Once you close a month, nobody can edit it after the fact. The balance sheet you handed to the bank or the tax office stays exactly as it was." } },
  { title: { ar: "كل موظف في حدوده", en: "Everyone within their limits" }, body: { ar: "صلاحيات على مقاس كل وظيفة وكل فرع، وسجل رقابة بيقولك مين عمل إيه وإمتى ومن أنهي فرع.", en: "Permissions cut to each job and branch, and a control log that tells you who did what, when, and from which branch." } },
  { title: { ar: "بياناتك في نسخة خاصة بشركتك", en: "Your data in your own instance" }, body: { ar: "قاعدة بيانات مستقلة لكل شركة، ونسخ احتياطي من جوه النظام، وبتشغّل الإدارات اللي محتاجها بس.", en: "A separate database for each company, backups from inside the system, and only the departments you need switched on." } },
  { title: { ar: "تحديثات مختبرة قبل ما توصلك", en: "Updates tested before they reach you" }, body: { ar: "أي تحديث لازم يعدّي اختبارات مطابقة الحسابات والأمان كلها الأول، علشان التحديث ما يلخبطش أرقامك.", en: "Every update must pass the full accounting-accuracy and security tests first, so an update never scrambles your numbers." } },
  { title: { ar: "عربي من الأساس", en: "Arabic from the ground up" }, body: { ar: "واجهة عربي كاملة، رسائل واضحة بالعربي، وضع ليلي ونهاري، حجم خط يريّح عينك، ومستندات جاهزة للطباعة.", en: "A fully Arabic interface, clear Arabic messages, dark and light modes, comfortable type sizes and print-ready documents." } },
];

function DoubleSave() {
  const { t } = useApp();
  const [clicks, setClicks] = useState(0);
  return (
    <div className="grid border-b border-rule md:grid-cols-[1.2fr_1fr]">
      <div className="border-b border-rule px-5 py-8 sm:px-8 md:border-b-0 md:border-e">
        <h3 className="text-[22px] font-semibold leading-[1.35] text-ink">{t({ ar: "أمان مالي كامل ضد الأخطاء البشرية.", en: "Complete financial protection against human error." })}</h3>
        <p className="mt-3 max-w-[52ch] text-[15px] text-ink2">{t({ ar: "مستحيل فاتورة أو سند قبض يتسجل مرتين، حتى لو الموظف داس «حفظ» أكتر من مرة أو النت قطع في النص. جرّب بنفسك:", en: "An invoice or receipt can never be recorded twice — even if someone presses “Save” over and over or the connection drops halfway. Try it:" })}</p>
        <button type="button" onClick={() => setClicks((c) => c + 1)} className="mt-6 h-11 rounded bg-royal px-5 text-[15px] font-medium text-white active:scale-[0.98]">
          {t({ ar: "حفظ الفاتورة", en: "Save invoice" })}
        </button>
        {clicks > 1 && <button type="button" onClick={() => setClicks(0)} className="ms-4 text-[14px] text-ink2 underline-offset-2 hover:underline">{t({ ar: "ابدأ من الأول", en: "Start over" })}</button>}
      </div>
      <dl className="grid grid-rows-2">
        <div className="border-b border-rule px-5 py-6 sm:px-8">
          <dt className="text-[13px] text-muted">{t({ ar: "مرات الضغط على «حفظ»", en: "Times “Save” was pressed" })}</dt>
          <motion.dd key={clicks} initial={{ y: -6, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} className="num mt-1 text-[32px] font-medium text-ink">{clicks}</motion.dd>
        </div>
        <div className="px-5 py-6 sm:px-8">
          <dt className="text-[13px] text-muted">{t({ ar: "فواتير اتسجلت فعلًا", en: "Invoices actually recorded" })}</dt>
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
      label={{ ar: "ليه نكسورا", en: "Why NEXORA" }}
      title={{ ar: "أرقام تقدر تثق فيها، وحماية من غلطات البشر.", en: "Numbers you can trust, and protection from human error." }}
      lead={{ ar: "اتعمل زي ما رئيس الحسابات بيفكر، واتختبر علشان صاحب الشركة ينام مرتاح.", en: "Designed the way a chief accountant thinks, and tested so the owner can sleep at night." }}
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
