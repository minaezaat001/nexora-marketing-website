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
    id: "factory",
    tab: { ar: "مصانع وخطوط إنتاج", en: "Factories" },
    headline: { ar: "اعرف تكلفة الخامة الحقيقية في كل مخزن — قبل ما تسعّر.", en: "Know the true cost of every raw material, per warehouse — before you price." },
    pains: [
      { ar: "الخامات بتتصرف من غير ما حد يعرف رصيدها الفعلي في مخزن المصنع.", en: "Materials get issued without anyone knowing the real balance at the plant store." },
      { ar: "التالف والهالك بيتشال من الدفاتر في آخر السنة بدل ما يتسجل أول بأول.", en: "Scrap and waste are written off at year end instead of as they happen." },
      { ar: "طلبات الشراء بتتبعت على واتساب ومفيش أمر شراء معتمد.", en: "Purchase requests travel over chat with no approved purchase order behind them." },
    ],
    flow: [{ ar: "طلب شراء خامة", en: "Material requisition" }, { ar: "أمر شراء معتمد", en: "Approved PO" }, { ar: "استلام بمخزن الخامات", en: "Receive to raw-materials store" }, { ar: "تحويل لخط الإنتاج", en: "Transfer to the line" }, { ar: "تسوية تالف / عجز", en: "Damage / shortage adjustment" }],
    watch: [
      { k: { ar: "متوسط تكلفة الخامة", en: "Avg. material cost" }, v: { ar: "لكل صنف × مخزن", en: "per item × warehouse" }, tone: "info" },
      { k: { ar: "التالف والعجز", en: "Damage & shortage" }, v: { ar: "بقيد تلقائي", en: "posted automatically" }, tone: "ok" },
      { k: { ar: "أصول وماكينات", en: "Plant & machinery" }, v: { ar: "إهلاك شهري", en: "monthly depreciation" }, tone: "info" },
    ],
    screen: {
      title: { ar: "تسويات المخزون — مخزن الخامات", en: "Stock adjustments — raw materials" },
      cols: [{ ar: "المرجع", en: "Ref" }, { ar: "الصنف", en: "Item" }, { ar: "النوع", en: "Type" }, { ar: "الكمية", en: "Qty" }],
      rows: [
        ["ADJ-0031", { ar: "ألواح خشب زان", en: "Beech panels" }, { ar: "تالف", en: "Damage" }, "−12"],
        ["ADJ-0032", { ar: "قماش تنجيد", en: "Upholstery fabric" }, { ar: "عجز جرد", en: "Count shortage" }, "−8"],
        ["TRF-0144", { ar: "إسفنج ضغط عالي", en: "High-density foam" }, { ar: "تحويل للخط ٢", en: "Transfer to line 2" }, "40"],
      ],
    },
    roadmap: { ar: "أوامر الإنتاج وقوائم المواد (BOM) على خارطة التطوير — كلّمنا عن خط إنتاجك.", en: "Production orders and bills of materials (BOM) are on the roadmap — tell us about your line." },
    modules: ["inventory", "purchasing", "ledger"],
  },
  {
    id: "company",
    tab: { ar: "شركات متوسطة", en: "Mid-size companies" },
    headline: { ar: "فروع كتير، دفاتر واحدة — وكل مدير شايف فرعه بس.", en: "Many branches, one set of books — and each manager sees only their branch." },
    pains: [
      { ar: "كل فرع شغال على شيت لوحده، والتجميع آخر الشهر بياخد أسبوع.", en: "Each branch runs its own spreadsheet; month-end consolidation takes a week." },
      { ar: "الموظف شايف أرقام الشركة كلها لأن الصلاحيات كلها أو لا شيء.", en: "Staff see company-wide numbers because permissions are all-or-nothing." },
      { ar: "حد بيعدّل قيد في شهر اتقفل، والميزانية بتتغير بعد ما اتسلمت.", en: "Someone edits an entry in a closed month and the signed-off balance sheet changes." },
    ],
    flow: [{ ar: "مستند في الفرع", en: "Branch document" }, { ar: "قيد تلقائي بمركز تكلفة", en: "Auto entry with cost center" }, { ar: "أرصدة موحدة", en: "Consolidated balances" }, { ar: "قفل الفترة", en: "Lock the period" }, { ar: "إقفال سنوي", en: "Year-end close" }],
    watch: [
      { k: { ar: "نطاق البيانات", en: "Data scope" }, v: { ar: "فرع أو شركة", en: "branch or company" }, tone: "info" },
      { k: { ar: "الفترات المقفلة", en: "Locked periods" }, v: { ar: "الترحيل ممنوع", en: "posting blocked" }, tone: "ok" },
      { k: { ar: "سجل المراجعة", en: "Audit log" }, v: { ar: "على كل عملية", en: "on every write" }, tone: "ok" },
    ],
    screen: {
      title: { ar: "الأرصدة الموحدة حسب الفرع", en: "Consolidated balances by branch" },
      cols: [{ ar: "الحساب", en: "Account" }, { ar: "القاهرة", en: "Cairo" }, { ar: "الإسكندرية", en: "Alexandria" }, { ar: "الإجمالي", en: "Total" }],
      rows: [
        [{ ar: "1101 الخزنة", en: "1101 Cash" }, "42,180", "16,147", "58,327"],
        [{ ar: "1120 العملاء", en: "1120 Customers" }, "78,920", "32,794", "111,714"],
        [{ ar: "4100 المبيعات", en: "4100 Sales" }, "412,600", "235,330", "647,930"],
      ],
    },
    modules: ["ledger", "control", "hr"],
  },
  {
    id: "retail",
    tab: { ar: "محلات وتجارة جملة", en: "Retail & wholesale" },
    headline: { ar: "فاتورة في ثواني بالباركود — والمخزن والخزنة بيتحدّثوا لوحدهم.", en: "Barcode-fast invoices — stock and cash update themselves." },
    pains: [
      { ar: "الكاشير بيكتب الصنف بإيده، والأسعار بتختلف من فرع لفرع.", en: "Cashiers type items by hand and prices drift between branches." },
      { ar: "مش عارف مين من العملاء عدّى حد الائتمان إلا لما الفلوس تقع.", en: "You learn a customer blew their credit limit only after the money is gone." },
      { ar: "شيكات الموردين في درج، ومحدش فاكر ميعاد استحقاقها.", en: "Supplier cheques live in a drawer and nobody remembers the due dates." },
    ],
    flow: [{ ar: "ملصق باركود", en: "Barcode label" }, { ar: "فاتورة نقدي / آجل", en: "Cash / credit invoice" }, { ar: "خصم المخزن بالتكلفة", en: "Stock relieved at cost" }, { ar: "سند قبض", en: "Receipt voucher" }, { ar: "لوحة الخزينة", en: "Treasury dashboard" }],
    watch: [
      { k: { ar: "حد ائتمان العميل", en: "Customer credit limit" }, v: { ar: "بيتفحص وقت الفاتورة", en: "checked at invoicing" }, tone: "warn" },
      { k: { ar: "عميل نقدي", en: "Walk-in customer" }, v: "CUST-CASH", tone: "info" },
      { k: { ar: "تنبيهات الحد الأدنى", en: "Reorder alerts" }, v: { ar: "مركز التنبيهات", en: "alerts centre" }, tone: "ok" },
    ],
    screen: {
      title: { ar: "آخر الفواتير — فرع المعرض", en: "Latest invoices — showroom" },
      cols: [{ ar: "الفاتورة", en: "Invoice" }, { ar: "العميل", en: "Customer" }, { ar: "النوع", en: "Type" }, { ar: "الإجمالي", en: "Total" }],
      rows: [
        ["SI-0417", { ar: "عميل نقدي", en: "Walk-in" }, { ar: "نقدي", en: "Cash" }, "1,938"],
        ["SI-0418", { ar: "شركة النيل للمقاولات", en: "Nile Contracting Co." }, { ar: "آجل", en: "Credit" }, "18,240"],
        ["SI-0419", { ar: "عميل نقدي", en: "Walk-in" }, { ar: "نقدي", en: "Cash" }, "969"],
      ],
    },
    roadmap: { ar: "شاشة كاشير POS مخصصة وبرامج ولاء العملاء على خارطة التطوير.", en: "A dedicated POS cashier screen and loyalty programs are on the roadmap." },
    modules: ["sales", "inventory", "treasury"],
  },
  {
    id: "showroom",
    tab: { ar: "معارض وبيع بالتقسيط", en: "Showrooms & installments" },
    headline: { ar: "بيع بالتقسيط من غير كشكول — كل قسط له ميعاد وتخصيص وقيد.", en: "Installment selling without the notebook — every payment has a date, an allocation and an entry." },
    pains: [
      { ar: "جدول الأقساط في كشكول، والتحصيل بيتسجل على الفاتورة الغلط.", en: "Installment plans live in a notebook and payments land on the wrong invoice." },
      { ar: "مواعيد التوصيل والتركيب بتضيع بين المعرض والمخزن.", en: "Delivery and installation appointments get lost between showroom and warehouse." },
      { ar: "شكاوى العملاء ملهاش متابعة ولا حد مسؤول عنها.", en: "Customer complaints have no owner and no follow-up." },
    ],
    flow: [{ ar: "عرض سعر", en: "Quotation" }, { ar: "فاتورة آجل", en: "Credit invoice" }, { ar: "جدول أقساط", en: "Installment schedule" }, { ar: "تحصيل وتخصيص", en: "Collect & allocate" }, { ar: "متابعة العميل", en: "Customer follow-up" }],
    watch: [
      { k: { ar: "أقساط متأخرة", en: "Overdue installments" }, v: { ar: "مركز التنبيهات", en: "alerts centre" }, tone: "warn" },
      { k: { ar: "مركز تكلفة التوصيل", en: "Delivery cost center" }, v: "CC-002", tone: "info" },
      { k: { ar: "الشكاوى", en: "Complaints" }, v: { ar: "متابعة لحد الإغلاق", en: "tracked to closure" }, tone: "ok" },
    ],
    screen: {
      title: { ar: "جدول أقساط — SI-0418", en: "Installment schedule — SI-0418" },
      cols: [{ ar: "القسط", en: "No." }, { ar: "الاستحقاق", en: "Due" }, { ar: "الحالة", en: "Status" }, { ar: "المبلغ", en: "Amount" }],
      rows: [
        ["1/4", "2026-09-30", { ar: "مسدد", en: "Paid" }, "4,560"],
        ["2/4", "2026-10-30", { ar: "مسدد جزئيًا", en: "Partly paid" }, "4,560"],
        ["3/4", "2026-11-30", { ar: "قادم", en: "Upcoming" }, "4,560"],
      ],
    },
    modules: ["sales", "treasury"],
  },
];

export default function Industries() {
  const { t, openDemo, setTopic } = useApp();
  const [id, setId] = useState<Seg>("factory");
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
      title={{ ar: "نفس النظام، بلغة نشاطك.", en: "One system, in the language of your trade." }}
      lead={{ ar: "اختار نشاطك: المشكلة اللي بنقفلها، مسار الشغل جوه النظام، والشاشة اللي هتفتحها كل يوم.", en: "Pick your trade: the problem we close, the workflow inside the system, and the screen you'll open every day." }}
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
              <p className="mb-4 text-[13px] text-muted">{t({ ar: "مسار الشغل في نكسورا", en: "The workflow in NEXORA" })}</p>
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
              {t({ ar: "ديمو على نشاطي", en: "Demo for my business" })}
            </PrimaryButton>
            <WhatsAppButton variant="line" topic={s.tab} />
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
