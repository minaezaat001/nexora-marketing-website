import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp, type L } from "../i18n";
import { PrimaryButton, Section, WhatsAppButton } from "../components/ui";
import type { DemoPreset } from "../i18n";

type Seg = DemoPreset["segment"] | "showroom";

type Segment = {
  id: Seg;
  tab: L;
  headline: L;
  pains: L[];
  flow: L[];
  watch: { k: L; v: L | string; tone: "ok" | "warn" | "info" }[];
  screen: { title: L; cols: L[]; rows: (string | L)[][] };
  roadmap?: L;
  modules: string[];
};

const segments: Segment[] = [
  {
    id: "showroom",
    tab: { ar: "المعارض والبيع بالتقسيط", en: "Showrooms & installments" },
    headline: { ar: "بيع بالتقسيط وإنت مطمّن: كل قسط له ميعاد، وكل عميل له حد، وكل شكوى لها متابعة.", en: "Sell on installments with peace of mind: every installment has a date, every customer a limit, every complaint a follow-up." },
    pains: [
      { ar: "جدول الأقساط في كشكول، والمتأخر بتعرفه بعد شهرين.", en: "The installment plan lives in a notebook, and you find out about late payers two months later." },
      { ar: "العميل بيشتري تاني وهو لسه عليه فلوس، ومحدش بيوقفه.", en: "Customers buy again while they still owe you, and nobody stops them." },
      { ar: "رصيد المعرض غير رصيد المخزن، والعميل بيستنى قطعة مش موجودة.", en: "Showroom stock doesn’t match the warehouse, and a customer waits for a piece you don’t have." },
      { ar: "شكاوى ما بعد البيع بتضيع بين المعرض والتوصيل.", en: "After-sales complaints get lost between the showroom and delivery." },
    ],
    flow: [{ ar: "عرض سعر للعميل", en: "Quotation to the customer" }, { ar: "فاتورة آجل في حدود ائتمانه", en: "Credit invoice within their limit" }, { ar: "جدول أقساط بمواعيده", en: "Installment schedule with dates" }, { ar: "تنبيه بالمتأخر وتحصيل", en: "Late-payment alert and collection" }, { ar: "متابعة وشكاوى ما بعد البيع", en: "After-sales follow-up and complaints" }],
    watch: [
      { k: { ar: "الأقساط المتأخرة", en: "Overdue installments" }, v: { ar: "تنبيه تلقائي", en: "automatic alert" }, tone: "warn" },
      { k: { ar: "حد ائتمان العميل", en: "Customer credit limit" }, v: { ar: "بيوقف البيع الآجل", en: "stops credit sales" }, tone: "ok" },
      { k: { ar: "رصيد المعرض والمخزن", en: "Showroom vs. warehouse" }, v: { ar: "كل مخزن برصيده", en: "each with its own stock" }, tone: "info" },
    ],
    screen: {
      title: { ar: "جدول أقساط — INV-2026-0162", en: "Installment schedule — INV-2026-0162" },
      cols: [{ ar: "القسط", en: "No." }, { ar: "الاستحقاق", en: "Due" }, { ar: "الحالة", en: "Status" }, { ar: "المبلغ", en: "Amount" }],
      rows: [
        ["1/4", "2026-09-30", { ar: "مسدد", en: "Paid" }, "4,560"],
        ["2/4", "2026-10-30", { ar: "مسدد جزئيًا — تنبيه", en: "Part-paid — alert" }, "4,560"],
        ["3/4", "2026-11-30", { ar: "قادم", en: "Upcoming" }, "4,560"],
      ],
    },
    modules: ["sales", "treasury", "customers"],
  },
  {
    id: "factory",
    tab: { ar: "المصانع والتشغيل", en: "Factories & production" },
    headline: { ar: "اعرف بتصرف كام على كل خامة في كل مخزن — وامسك الهالك قبل ما يبقى خسارة.", en: "Know what every raw material really costs in every warehouse — and catch waste before it becomes a loss." },
    pains: [
      { ar: "الخامات بتتصرف للخط من غير ما حد يعرف رصيدها الحقيقي.", en: "Materials go to the line without anyone knowing the real balance." },
      { ar: "التالف والهالك بيتشال من الدفاتر آخر السنة، بعد ما الخسارة حصلت.", en: "Scrap and waste are written off at year end, after the loss has happened." },
      { ar: "طلبات الشراء بتتبعت على واتساب، ومفيش أمر شراء معتمد وراها.", en: "Purchase requests travel over chat with no approved order behind them." },
      { ar: "مش عارف كل خط إنتاج بيصرف قد إيه.", en: "You can’t tell what each production line is spending." },
    ],
    flow: [{ ar: "طلب شراء خامة", en: "Material requisition" }, { ar: "أمر شراء معتمد", en: "Approved purchase order" }, { ar: "استلام بمخزن الخامات بالتكلفة", en: "Receipt into the materials store at cost" }, { ar: "تحويل لمخزن خط الإنتاج", en: "Transfer to the production-line store" }, { ar: "جرد وتسوية التالف والعجز", en: "Count and write off damage and shortages" }],
    watch: [
      { k: { ar: "تكلفة الخامة", en: "Material cost" }, v: { ar: "لكل صنف في كل مخزن", en: "per item, per warehouse" }, tone: "info" },
      { k: { ar: "التالف والعجز", en: "Damage & shortages" }, v: { ar: "بيتسجلوا بقيمتهم فورًا", en: "booked at value, immediately" }, tone: "ok" },
      { k: { ar: "مصروفات كل خط", en: "Spend per line" }, v: { ar: "على مركز تكلفته", en: "on its own cost center" }, tone: "info" },
    ],
    screen: {
      title: { ar: "تسويات المخزون — مخزن الخامات", en: "Stock adjustments — raw materials" },
      cols: [{ ar: "المرجع", en: "Ref" }, { ar: "الصنف", en: "Item" }, { ar: "النوع", en: "Type" }, { ar: "الكمية", en: "Qty" }],
      rows: [
        ["ADJ-0031", { ar: "ألواح خشب زان", en: "Beech panels" }, { ar: "تالف", en: "Damage" }, "−12"],
        ["ADJ-0032", { ar: "قماش تنجيد", en: "Upholstery fabric" }, { ar: "عجز جرد", en: "Count shortage" }, "−8"],
        ["TRF-0144", { ar: "إسفنج ضغط عالي", en: "High-density foam" }, { ar: "تحويل للخط 2", en: "Transfer to line 2" }, "40"],
      ],
    },
    roadmap: { ar: "أوامر الإنتاج وقوائم المواد (BOM) على خطة التطوير — كلّمنا عن خط إنتاجك.", en: "Production orders and bills of materials (BOM) are on the roadmap — tell us about your line." },
    modules: ["inventory", "purchasing", "ledger"],
  },
  {
    id: "company",
    tab: { ar: "الشركات وتعدد الفروع", en: "Multi-branch companies" },
    headline: { ar: "كل فروعك في تقرير واحد — والأرقام اللي اتقفلت محدش يقدر يلعب فيها.", en: "Every branch in one report — and closed numbers nobody can touch." },
    pains: [
      { ar: "كل فرع شغال على شيت، وتجميع آخر الشهر بياخد أسبوع.", en: "Each branch has its own sheet, and month-end consolidation takes a week." },
      { ar: "موظف الفرع شايف أرقام الشركة كلها.", en: "Branch staff can see the whole company’s numbers." },
      { ar: "حد بيعدّل في شهر اتقفل، والميزانية بتتغير بعد ما اتسلمت.", en: "Someone edits a closed month and the signed-off balance sheet changes." },
      { ar: "لما يحصل غلط، مفيش حد يقولك مين عمله.", en: "When something goes wrong, nobody can tell you who did it." },
    ],
    flow: [{ ar: "كل فرع يسجل شغله", en: "Each branch records its work" }, { ar: "القيود بتتعمل لوحدها بمركز التكلفة", en: "Entries post themselves with cost centers" }, { ar: "أرصدة موحدة للشركة", en: "Consolidated company balances" }, { ar: "قفل الشهر", en: "Close the month" }, { ar: "إقفال السنة", en: "Close the year" }],
    watch: [
      { k: { ar: "سجل الرقابة", en: "Control log" }, v: { ar: "مين عمل إيه وإمتى", en: "who did what, and when" }, tone: "ok" },
      { k: { ar: "الشهور المقفولة", en: "Closed months" }, v: { ar: "ممنوع التعديل", en: "no edits allowed" }, tone: "ok" },
      { k: { ar: "لوحة المدير", en: "Owner’s dashboard" }, v: { ar: "الشركة كلها لحظيًا", en: "the whole company, live" }, tone: "info" },
    ],
    screen: {
      title: { ar: "الأرصدة الموحدة حسب الفرع", en: "Consolidated balances by branch" },
      cols: [{ ar: "الحساب", en: "Account" }, { ar: "القاهرة", en: "Cairo" }, { ar: "الإسكندرية", en: "Alexandria" }, { ar: "الإجمالي", en: "Total" }],
      rows: [
        [{ ar: "الخزنة", en: "Cash" }, "42,180", "16,147", "58,327"],
        [{ ar: "العملاء", en: "Customers" }, "78,920", "32,794", "111,714"],
        [{ ar: "المبيعات", en: "Sales" }, "412,600", "235,330", "647,930"],
      ],
    },
    modules: ["ledger", "control", "hr"],
  },
  {
    id: "retail",
    tab: { ar: "المحلات والتجارة والتوزيع", en: "Retail, wholesale & distribution" },
    headline: { ar: "فاتورة في ثواني بالباركود — وتعرف رصيد خزنتك ومخزنك آخر كل يوم بالظبط.", en: "Barcode-fast invoices — and the exact cash and stock position at the end of every day." },
    pains: [
      { ar: "الكاشير بيكتب الصنف بإيده، والأسعار بتختلف من فرع لفرع.", en: "Cashiers type items by hand and prices drift between branches." },
      { ar: "عميل الآجل بيعدّي حده، وبتعرف لما الفلوس تقع.", en: "Credit customers go over their limit and you only find out when the money is gone." },
      { ar: "حسابات الموردين في دفتر، ومواعيد السداد بتفاجئك.", en: "Supplier accounts live in a ledger book and due dates take you by surprise." },
      { ar: "الخزنة آخر اليوم مش مطابقة، ومحدش عارف الفرق راح فين.", en: "The till doesn’t match at close and nobody knows where the gap went." },
    ],
    flow: [{ ar: "طباعة باركود للأصناف", en: "Print barcode labels" }, { ar: "فاتورة نقدي أو آجل", en: "Cash or credit invoice" }, { ar: "المخزن بينقص بالتكلفة", en: "Stock relieved at cost" }, { ar: "سند قبض للخزنة", en: "Receipt into the till" }, { ar: "رصيد الخزنة والمخزن آخر اليوم", en: "End-of-day cash and stock position" }],
    watch: [
      { k: { ar: "حد ائتمان العميل", en: "Customer credit limit" }, v: { ar: "بيتفحص مع كل فاتورة", en: "checked on every invoice" }, tone: "warn" },
      { k: { ar: "مستحقات الموردين", en: "Supplier payments" }, v: { ar: "تنبيه قبل الميعاد", en: "alert before due" }, tone: "ok" },
      { k: { ar: "النواقص", en: "Low stock" }, v: { ar: "تنبيه قبل ما الصنف يخلص", en: "alert before it runs out" }, tone: "ok" },
    ],
    screen: {
      title: { ar: "آخر الفواتير — فرع المعرض", en: "Latest invoices — showroom" },
      cols: [{ ar: "الفاتورة", en: "Invoice" }, { ar: "العميل", en: "Customer" }, { ar: "النوع", en: "Type" }, { ar: "الإجمالي", en: "Total" }],
      rows: [
        ["INV-2026-0161", { ar: "عميل نقدي", en: "Walk-in" }, { ar: "نقدي", en: "Cash" }, "4,788"],
        ["INV-2026-0162", { ar: "شركة النيل للمقاولات", en: "Nile Contracting Co." }, { ar: "آجل", en: "Credit" }, "18,240"],
        ["INV-2026-0163", { ar: "عميل نقدي", en: "Walk-in" }, { ar: "نقدي", en: "Cash" }, "969"],
      ],
    },
    roadmap: { ar: "شاشة كاشير (POS) مخصصة وبرامج ولاء العملاء على خطة التطوير.", en: "A dedicated POS cashier screen and loyalty programs are on the roadmap." },
    modules: ["sales", "inventory", "treasury"],
  },
];

export default function Industries() {
  const { t, openDemo, setTopic } = useApp();
  const [id, setId] = useState<Seg>("showroom");
  const s = segments.find((x) => x.id === id)!;
  const pick = (x: Segment) => { setId(x.id); setTopic(x.tab); };

  const list = (
    <ul className="border-t border-rule" role="tablist" aria-orientation="vertical">
      {segments.map((x) => (
        <li key={x.id}>
          <button type="button" role="tab" aria-selected={id === x.id} onClick={() => pick(x)}
            className={`relative w-full border-b border-rule py-3.5 text-start text-[15.5px] transition-colors ${id === x.id ? "font-medium text-ink" : "text-ink2 hover:text-ink"}`}>
            {id === x.id && <span className="absolute inset-y-2 -start-5 w-[2px] bg-royal sm:-start-8" />}
            {t(x.tab)}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <Section
      id="industries"
      index="03"
      label={{ ar: "القطاعات", en: "Industries" }}
      title={{ ar: "اختار نشاطك، وشوف إزاي بنقفل الثغرات اللي بتضيّع فلوسك.", en: "Pick your trade and see how we close the gaps that cost you money." }}
      lead={{ ar: "كل نشاط ليه وجعه. هنا هتلاقي اللي بيحصل النهارده، وإزاي بيمشي الشغل في نكسورا، والشاشة اللي هتفتحها كل يوم.", en: "Every trade has its own headaches. Here’s what happens today, how the work runs in NEXORA, and the screen you’ll open every day." }}
      aside={list}
    >
      <AnimatePresence mode="wait">
        <motion.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
          <div className="border-b border-rule px-5 py-8 sm:px-8 sm:py-10">
            <h3 className="max-w-[28ch] text-balance text-[24px] font-semibold leading-[1.3] text-ink sm:text-[28px]">{t(s.headline)}</h3>
          </div>

          <div className="grid border-b border-rule md:grid-cols-2">
            <div className="border-b border-rule px-5 py-7 sm:px-8 md:border-b-0 md:border-e">
              <p className="mb-4 text-[13px] text-muted">{t({ ar: "اللي بيحصل النهارده", en: "What happens today" })}</p>
              <ul className="space-y-3.5">
                {s.pains.map((p) => (
                  <li key={p.en} className="border-s-2 border-bad/50 ps-3 text-[15px] text-ink2">{t(p)}</li>
                ))}
              </ul>
            </div>
            <div className="px-5 py-7 sm:px-8">
              <p className="mb-4 text-[13px] text-muted">{t({ ar: "مع نكسورا", en: "With NEXORA" })}</p>
              <ol className="space-y-0">
                {s.flow.map((f, k) => (
                  <li key={f.en} className="flex items-baseline gap-3 border-b border-rule py-2.5 last:border-b-0">
                    <span className="num w-5 shrink-0 text-[12px] text-royal">{k + 1}</span>
                    <span className="text-[15px] text-ink">{t(f)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="border-b border-rule">
            <div className="flex items-baseline justify-between border-b border-rule bg-paper px-5 py-3 sm:px-8">
              <span className="text-[14px] font-medium text-ink">{t(s.screen.title)}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[460px] border-collapse text-[14px]">
                <thead>
                  <tr className="text-[12.5px] text-muted">
                    {s.screen.cols.map((c, k) => <th key={c.en} className={`px-5 py-2.5 font-normal sm:px-8 ${k === s.screen.cols.length - 1 ? "text-end" : "text-start"}`}>{t(c)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {s.screen.rows.map((r, ri) => (
                    <tr key={ri} className="border-t border-rule">
                      {r.map((c, k) => (
                        <td key={k} className={`px-5 py-3 sm:px-8 ${k === r.length - 1 ? "text-end text-ink" : "text-ink2"}`}>
                          {typeof c === "string" ? <span className="num">{c}</span> : t(c)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <dl className="grid grid-cols-1 border-b border-rule sm:grid-cols-3">
            {s.watch.map((w) => (
              <div key={w.k.en} className="border-b border-rule px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-e sm:px-8 sm:last:border-e-0">
                <dt className="text-[12.5px] text-muted">{t(w.k)}</dt>
                <dd className="mt-1 text-[14px] text-ink">{typeof w.v === "string" ? <span className="num">{w.v}</span> : t(w.v)}</dd>
              </div>
            ))}
          </dl>

          {s.roadmap && (
            <p className="border-b border-rule px-5 py-4 text-[14px] text-ink2 sm:px-8">
              <span className="me-1.5 font-medium text-warn">{t({ ar: "بصراحة:", en: "To be clear:" })}</span>{t(s.roadmap)}
            </p>
          )}

          <div className="flex flex-wrap gap-3 px-5 py-6 sm:px-8">
            <PrimaryButton onClick={() => openDemo({ segment: id === "showroom" ? "retail" : id, modules: s.modules })}>
              {t({ ar: "احجز عرض مجاني على نشاطك", en: "Book a free demo for your business" })}
            </PrimaryButton>
            <WhatsAppButton variant="line" topic={s.tab} />
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
