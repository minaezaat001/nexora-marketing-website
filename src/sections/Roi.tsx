import { useState } from "react";
import { motion } from "framer-motion";
import { fmt, useApp, type L } from "../i18n";
import { PrimaryButton, SectionHead } from "../components/ui";

function Slider({ label, value, set, min, max, step = 1, unit }: { label: L; value: number; set: (n: number) => void; min: number; max: number; step?: number; unit: L }) {
  const { t } = useApp();
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-[14px] text-ink2">
        {t(label)}
        <span><b className="num text-[17px] text-ink">{fmt(value)}</b> <span className="text-[12px] text-muted">{t(unit)}</span></span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} className="mt-2 w-full accent-[#2F6BEF]" />
    </label>
  );
}

export default function Roi() {
  const { t, openDemo } = useApp();
  const [docs, setDocs] = useState(600);
  const [mins, setMins] = useState(3);
  const [branches, setBranches] = useState(2);
  const [closeDays, setCloseDays] = useState(5);
  const [rate, setRate] = useState(120);

  // Manual: each document is re-keyed into stock card, journal and party ledger (3 extra entries).
  const rekeyHours = (docs * 3 * mins) / 60;
  // Consolidation: per-branch spreadsheet merge, assumed 4h per branch per month.
  const consolidateHours = branches * 4;
  // Month-end close: days of 6 working hours; with automatic posting assume 1 day remains for review.
  const closeHours = Math.max(0, closeDays - 1) * 6;
  const hours = rekeyHours + consolidateHours + closeHours;
  const money = hours * rate;

  const bars: { l: L; v: number }[] = [
    { l: { ar: "إعادة إدخال المستندات", en: "Re-keying documents" }, v: rekeyHours },
    { l: { ar: "تجميع الفروع", en: "Branch consolidation" }, v: consolidateHours },
    { l: { ar: "إقفال آخر الشهر", en: "Month-end close" }, v: closeHours },
  ];
  const max = Math.max(1, ...bars.map((b) => b.v));

  return (
    <section id="roi" className="scroll-mt-20 border-t border-line bg-side/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow={{ ar: "احسب التوفير", en: "Time-saved calculator" }}
          title={{ ar: "قبل نكسورا: المستند بيتكتب ٤ مرات. بعده: مرة واحدة.", en: "Before NEXORA, a document is typed four times. After, once." }}
          lead={{ ar: "فاتورة، كارت صنف، قيد يومية، وحساب العميل — النظام بيعمل التلاتة الأخيرين لوحده. حرّك الأرقام على واقع شركتك.", en: "Invoice, stock card, journal entry, customer ledger — the system does the last three on its own. Move the numbers to match your company." }}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6 rounded-md border border-line bg-surface p-6">
            <Slider label={{ ar: "مستندات في الشهر (فواتير، سندات، تسويات)", en: "Documents per month (invoices, vouchers, adjustments)" }} value={docs} set={setDocs} min={50} max={5000} step={50} unit={{ ar: "مستند", en: "docs" }} />
            <Slider label={{ ar: "دقائق لكل إدخال يدوي", en: "Minutes per manual entry" }} value={mins} set={setMins} min={1} max={10} unit={{ ar: "دقيقة", en: "min" }} />
            <Slider label={{ ar: "عدد الفروع", en: "Branches" }} value={branches} set={setBranches} min={1} max={15} unit={{ ar: "فرع", en: "branches" }} />
            <Slider label={{ ar: "أيام إقفال آخر الشهر حاليًا", en: "Days to close the month today" }} value={closeDays} set={setCloseDays} min={1} max={15} unit={{ ar: "يوم", en: "days" }} />
            <Slider label={{ ar: "تكلفة ساعة الموظف", en: "Staff cost per hour" }} value={rate} set={setRate} min={40} max={600} step={10} unit={{ ar: "ج.م", en: "EGP" }} />
          </div>

          <div className="flex flex-col rounded-md border border-line bg-surface p-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-sm border border-line bg-surface2/50 p-4">
                <div className="text-[13px] text-muted">{t({ ar: "ساعات بترجع لفريقك شهريًا", en: "Hours back to your team / month" })}</div>
                <motion.div key={Math.round(hours)} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="num mt-1 text-[34px] font-semibold text-ink">{fmt(hours)}</motion.div>
              </div>
              <div className="rounded-sm border border-brand/40 bg-brand/10 p-4">
                <div className="text-[13px] text-muted">{t({ ar: "قيمة الوقت شهريًا", en: "Value of that time / month" })}</div>
                <motion.div key={Math.round(money)} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="num mt-1 text-[34px] font-semibold text-ink">{fmt(money)}</motion.div>
                <div className="text-[12px] text-muted">{t({ ar: "جنيه مصري", en: "EGP" })}</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {bars.map((b) => (
                <div key={b.l.en}>
                  <div className="mb-1 flex justify-between text-[13px]"><span className="text-ink2">{t(b.l)}</span><span className="num text-ink">{fmt(b.v)} h</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-line">
                    <motion.div animate={{ width: `${(b.v / max) * 100}%` }} transition={{ type: "spring", stiffness: 140, damping: 22 }} className="h-full rounded-full bg-gradient-to-l from-[#29B6FF] to-[#3E7BFA] ltr:bg-gradient-to-r" />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[12.5px] leading-relaxed text-muted">
              {t({
                ar: "تقدير مبني على افتراضاتك: ٣ إدخالات إضافية لكل مستند، ٤ ساعات تجميع لكل فرع، ويوم مراجعة واحد يفضل في الإقفال. مش وعد — نراجعه معاك على بياناتك في الديمو.",
                en: "An estimate built on your inputs: 3 extra entries per document, 4 hours of consolidation per branch, and one review day left at close. Not a promise — we'll check it against your data in the demo.",
              })}
            </p>
            <PrimaryButton onClick={() => openDemo()} className="mt-5 self-start">{t({ ar: "راجع الأرقام دي معانا", en: "Review these numbers with us" })}</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
