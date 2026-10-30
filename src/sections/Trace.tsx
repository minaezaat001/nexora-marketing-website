import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp, type L } from "../i18n";
import { Section } from "../components/ui";

const f2 = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n: number) => f2.format(n);

type Acc = "1120" | "1130" | "2100" | "2300" | "4101" | "5000" | "3100";
const accounts: { code: Acc; name: L; side: "dr" | "cr" }[] = [
  { code: "1120", name: { ar: "العملاء", en: "Customers" }, side: "dr" },
  { code: "1130", name: { ar: "المخزون", en: "Inventory" }, side: "dr" },
  { code: "2100", name: { ar: "الموردون", en: "Suppliers" }, side: "cr" },
  { code: "2300", name: { ar: "ضرائب مستحقة", en: "Accrued taxes" }, side: "cr" },
  { code: "4101", name: { ar: "مبيعات — آجل", en: "Sales — credit" }, side: "cr" },
  { code: "5000", name: { ar: "تكلفة البضاعة المباعة", en: "Cost of goods sold" }, side: "dr" },
];

/** Balances as signed numbers: debit positive, credit negative. */
type Bal = Record<Acc, number>;
const opening: Bal = { "1120": 0, "1130": 11400, "2100": 0, "2300": 0, "4101": 0, "5000": 0, "3100": -11400 };
const cogs = 8871.43;

type Step = {
  short: L;
  doc: string;
  title: L;
  what: L;
  entry: { acc: Acc; dr?: number; cr?: number }[];
  wac?: boolean;
};

const steps: Step[] = [
  {
    short: { ar: "طلب شراء", en: "Requisition" }, doc: "PR-2026-0061",
    title: { ar: "طلب شراء من المعرض: ١٠ أطقم غرفة نوم", en: "Showroom requisition: 10 bedroom sets" },
    what: { ar: "الطلب بيفتح دورة الاعتماد بس. مفيش أثر محاسبي ومفيش حركة مخزن — ودي الصح.", en: "The request only opens the approval cycle. No accounting impact and no stock movement — as it should be." },
    entry: [],
  },
  {
    short: { ar: "فاتورة مشتريات", en: "Purchase invoice" }, doc: "PI-2026-0134",
    title: { ar: "فاتورة المورد على أمر الشراء PO-2026-0048", en: "Supplier invoice against PO-2026-0048" },
    what: { ar: "١٠ × ٣٬٠٠٠ + ضريبة ١٤٪. القيد اترحّل لحظة الحفظ على حساب المورد.", en: "10 × 3,000 plus 14% VAT. Posted on save, on account with the supplier." },
    entry: [{ acc: "1130", dr: 30000 }, { acc: "2300", dr: 4200 }, { acc: "2100", cr: 34200 }],
  },
  {
    short: { ar: "استلام بالمتوسط المرجح", en: "Receipt at WAC" }, doc: "STK-2026-0412",
    title: { ar: "حركة استلام في المخزن الرئيسي", en: "Receipt movement into the main warehouse" },
    what: { ar: "الكمية دخلت، ومتوسط تكلفة الصنف في المخزن ده اتحسب من جديد. ده الرقم اللي هيتسحب بيه عند البيع.", en: "Stock is in, and the item's average cost in this warehouse is recalculated. That's the cost used when it sells." },
    entry: [], wac: true,
  },
  {
    short: { ar: "فاتورة مبيعات", en: "Sales invoice" }, doc: "INV-2026-0162",
    title: { ar: "بيع ٣ أطقم آجل لشركة النيل للمقاولات", en: "3 sets sold on credit to Nile Contracting Co." },
    what: { ar: "٣ × ٤٬٢٠٠ + ضريبة. وفي نفس القيد، التكلفة اتسحبت من المخزون بالمتوسط ٢٬٩٥٧٫١٤.", en: "3 × 4,200 plus VAT. In the same entry, cost leaves inventory at the 2,957.14 average." },
    entry: [{ acc: "1120", dr: 14364 }, { acc: "4101", cr: 12600 }, { acc: "2300", cr: 1764 }, { acc: "5000", dr: cogs }, { acc: "1130", cr: cogs }],
  },
  {
    short: { ar: "اليومية والميزان", en: "Journal & trial balance" }, doc: "TB-2026-10",
    title: { ar: "ميزان المراجعة بعد الدورة", en: "Trial balance after the cycle" },
    what: { ar: "ولا قيد اتكتب بإيد المحاسب، والميزان متوازن.", en: "Not one entry typed by an accountant, and the trial balance agrees." },
    entry: [],
  },
];

function balancesAt(i: number): Bal {
  const b = { ...opening };
  for (let k = 0; k <= i; k++) for (const l of steps[k].entry) b[l.acc] += (l.dr ?? 0) - (l.cr ?? 0);
  return b;
}

const name = (code: Acc) => accounts.find((a) => a.code === code)?.name ?? { ar: "رأس المال", en: "Capital" };

export default function Trace() {
  const { t } = useApp();
  const [i, setI] = useState(0);
  const s = steps[i];
  const now = balancesAt(i);
  const before = i > 0 ? balancesAt(i - 1) : opening;

  return (
    <Section
      id="trace"
      index="02"
      tone="sheet"
      label={{ ar: "دورة المستند المحاسبي", en: "Document-to-ledger trace" }}
      title={{ ar: "من طلب الشراء لميزان المراجعة، من غير قيد يدوي واحد.", en: "From requisition to trial balance without a single manual entry." }}
      lead={{ ar: "اضغط على كل خطوة بالترتيب. هتشوف المستند، القيد اللي اترحّل منه، والحسابات اللي اتحركت — بنفس أكواد دليل الحسابات في النظام.", en: "Step through the cycle. You'll see the document, the entry it posted, and the accounts that moved — using the system's own chart-of-accounts codes." }}
    >
      {/* the sequence */}
      <ol className="grid grid-cols-5 border-b border-rule">
        {steps.map((x, k) => (
          <li key={x.doc} className="border-e border-rule last:border-e-0">
            <button type="button" onClick={() => setI(k)} aria-current={i === k ? "step" : undefined}
              className={`relative flex h-full w-full min-w-0 flex-col items-start gap-1.5 px-2 py-4 text-start [overflow-wrap:anywhere] transition-colors sm:px-5 ${i === k ? "bg-paper" : "hover:bg-paper/60"}`}>
              {i === k && <motion.span layoutId="trace-bar" className="absolute inset-x-0 top-0 h-[2px] bg-royal" />}
              <span className={`num text-[12px] ${k <= i ? "text-royal" : "text-muted"}`}>{k + 1}</span>
              <span className={`text-[12.5px] leading-snug sm:text-[14px] ${i === k ? "font-medium text-ink" : "text-ink2"}`}>{t(x.short)}</span>
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
          <div className="border-b border-rule px-5 py-6 sm:px-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[19px] font-semibold text-ink">{t(s.title)}</h3>
              <span className="num text-[13.5px] text-ink2">{s.doc}</span>
            </div>
            <p className="mt-2 max-w-[64ch] text-[15px] text-ink2">{t(s.what)}</p>
          </div>

          {/* posted entry / WAC card / trial balance */}
          {s.entry.length > 0 && (
            <table className="w-full border-collapse border-b border-rule text-[14px]">
              <thead><tr className="bg-paper text-[12.5px] text-muted"><th className="px-5 py-2.5 text-start font-normal sm:px-8">{t({ ar: "القيد المرحّل", en: "Posted entry" })}</th><th className="px-3 py-2.5 text-end font-normal">{t({ ar: "مدين", en: "Dr" })}</th><th className="px-5 py-2.5 text-end font-normal sm:px-8">{t({ ar: "دائن", en: "Cr" })}</th></tr></thead>
              <tbody>
                {s.entry.map((l) => (
                  <tr key={l.acc + (l.dr ?? l.cr)} className="border-t border-rule">
                    <td className="px-5 py-2.5 sm:px-8"><span className="me-2 inline-block"><span className="num text-muted">{l.acc}</span></span>{t(name(l.acc))}</td>
                    <td className="num px-3 py-2.5 text-end">{l.dr ? money(l.dr) : ""}</td>
                    <td className="num px-5 py-2.5 text-end sm:px-8">{l.cr ? money(l.cr) : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {s.wac && (
            <div className="grid grid-cols-2 border-b border-rule sm:grid-cols-4">
              {[
                { k: { ar: "قبل: الكمية", en: "Before: qty" }, v: "4" },
                { k: { ar: "قبل: المتوسط", en: "Before: avg." }, v: "2,850.00" },
                { k: { ar: "بعد: الكمية", en: "After: qty" }, v: "14" },
                { k: { ar: "بعد: المتوسط", en: "After: avg." }, v: "2,957.14", hi: true },
              ].map((c, k) => (
                <div key={c.k.en} className={`border-rule px-5 py-4 sm:px-8 ${k % 2 === 0 ? "border-e" : "sm:border-e"} ${k < 2 ? "border-b sm:border-b-0" : ""} last:border-e-0`}>
                  <div className="text-[12px] text-muted">{t(c.k)}</div>
                  <div className={`num mt-1 text-[18px] ${c.hi ? "font-semibold text-royal" : "text-ink"}`}>{c.v}</div>
                </div>
              ))}
              <p className="col-span-full border-t border-rule px-5 py-3 text-[12.5px] text-muted sm:px-8" dir="ltr" style={{ textAlign: "start" }}>
                <span className="num">(4 × 2,850 + 10 × 3,000) ÷ 14 = 2,957.14</span>
              </p>
            </div>
          )}
          {i === steps.length - 1 && (
            <table className="w-full border-collapse border-b border-rule text-[14px]">
              <thead><tr className="bg-paper text-[12.5px] text-muted"><th className="px-5 py-2.5 text-start font-normal sm:px-8">{t({ ar: "الحساب", en: "Account" })}</th><th className="px-3 py-2.5 text-end font-normal">{t({ ar: "مدين", en: "Debit" })}</th><th className="px-5 py-2.5 text-end font-normal sm:px-8">{t({ ar: "دائن", en: "Credit" })}</th></tr></thead>
              <tbody>
                {(Object.keys(now) as Acc[]).filter((a) => now[a] !== 0).sort().map((a) => (
                  <tr key={a} className="border-t border-rule">
                    <td className="px-5 py-2.5 sm:px-8"><span className="me-2 inline-block"><span className="num text-muted">{a}</span></span>{t(name(a))}</td>
                    <td className="num px-3 py-2.5 text-end">{now[a] > 0 ? money(now[a]) : ""}</td>
                    <td className="num px-5 py-2.5 text-end sm:px-8">{now[a] < 0 ? money(-now[a]) : ""}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-ink/80 font-medium">
                  <td className="px-5 py-2.5 sm:px-8">{t({ ar: "الإجمالي — متوازن", en: "Total — balanced" })}</td>
                  <td className="num px-3 py-2.5 text-end">{money(58200)}</td>
                  <td className="num px-5 py-2.5 text-end sm:px-8">{money(58200)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </motion.div>
      </AnimatePresence>

      {/* the accounts, as a ledger strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3">
        {accounts.map((a, k) => {
          const bal = now[a.code];
          const delta = (a.side === "dr" ? 1 : -1) * (now[a.code] - before[a.code]);
          const moved = Math.abs(delta) > 0.001;
          return (
            <div key={a.code} className={`border-b border-e border-rule px-5 py-5 sm:px-8 ${k % 2 === 1 ? "max-sm:border-e-0" : ""} ${k % 3 === 2 ? "sm:border-e-0" : ""} ${moved ? "bg-royal/[0.05]" : ""}`}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="num text-[12.5px] text-muted">{a.code}</span>
                {bal !== 0 && <span className="text-[11.5px] text-muted">{bal > 0 ? t({ ar: "رصيد مدين", en: "Dr balance" }) : t({ ar: "رصيد دائن", en: "Cr balance" })}</span>}
              </div>
              <div className="mt-1 text-[14px] text-ink2">{t(a.name)}</div>
              <motion.div key={`${a.code}-${i}`} initial={moved ? { y: -6, opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} className="num mt-2 text-[18px] font-medium text-ink">{money(Math.abs(bal))}</motion.div>
              <div className="mt-0.5 h-4 text-[12px] text-royal">{moved ? <>{now[a.code] - before[a.code] > 0 ? t({ ar: "مدين", en: "Dr" }) : t({ ar: "دائن", en: "Cr" })} <span className="num">{money(Math.abs(delta))}</span></> : ""}</div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className="text-[14px] text-ink2 hover:text-ink disabled:opacity-30">{t({ ar: "الخطوة السابقة", en: "Previous step" })}</button>
        <button type="button" disabled={i === steps.length - 1} onClick={() => setI(i + 1)} className="h-10 rounded bg-ink px-4 text-[14px] text-paper disabled:opacity-30">{t({ ar: "الخطوة التالية", en: "Next step" })}</button>
      </div>
    </Section>
  );
}
