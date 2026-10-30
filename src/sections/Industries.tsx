import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp, type L } from "../i18n";
import { Check, Pill, PrimaryButton, SectionHead, WhatsAppButton } from "../components/ui";
import type { DemoPreset } from "../i18n";

type Seg = DemoPreset["segment"] | "showroom";

type Segment = {
  id: Seg;
  tab: L;
  headline: L;
  pains: L[];
  flow: L[];
  watch: { k: L; v: string; tone: "ok" | "warn" | "info" }[];
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
      { k: { ar: "متوسط تكلفة الخامة", en: "Avg. material cost" }, v: "per item × warehouse", tone: "info" },
      { k: { ar: "التالف والعجز", en: "Damage & shortage" }, v: "auto-posted", tone: "ok" },
      { k: { ar: "أصول وماكينات", en: "Plant & machinery" }, v: "monthly depreciation", tone: "info" },
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
    modules: ["inventory", "purchasing", "accounting"],
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
      { k: { ar: "نطاق البيانات", en: "Data scope" }, v: "BRANCH · COMPANY", tone: "info" },
      { k: { ar: "الفترات المقفلة", en: "Locked periods" }, v: "posting blocked", tone: "ok" },
      { k: { ar: "سجل المراجعة", en: "Audit log" }, v: "every write", tone: "ok" },
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
    modules: ["accounting", "control", "hr"],
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
      { k: { ar: "حد ائتمان العميل", en: "Customer credit limit" }, v: "checked on invoice", tone: "warn" },
      { k: { ar: "عميل نقدي", en: "Walk-in customer" }, v: "CUST-CASH", tone: "info" },
      { k: { ar: "تنبيهات الحد الأدنى", en: "Reorder alerts" }, v: "alerts centre", tone: "ok" },
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
      { k: { ar: "أقساط متأخرة", en: "Overdue installments" }, v: "alerts centre", tone: "warn" },
      { k: { ar: "مركز تكلفة التوصيل", en: "Delivery cost center" }, v: "CC-002", tone: "info" },
      { k: { ar: "الشكاوى", en: "Complaints" }, v: "tracked to close", tone: "ok" },
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
    modules: ["sales", "treasury", "crm"],
  },
];

export default function Industries() {
  const { t, openDemo, setTopic } = useApp();
  const [id, setId] = useState<Seg>("factory");
  const s = segments.find((x) => x.id === id)!;

  const pick = (x: Segment) => { setId(x.id); setTopic(x.tab); };

  return (
    <section id="industries" className="scroll-mt-20 border-t border-line bg-side/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow={{ ar: "الحلول حسب النشاط", en: "Solutions by industry" }}
          title={{ ar: "نفس النظام — بيتكلم لغة نشاطك.", en: "One system that speaks your industry's language." }}
          lead={{ ar: "اختار نشاطك وشوف المشكلة اللي بنحلها، مسار العمل، والشاشة اللي هتفتحها كل يوم.", en: "Pick your business to see the problem we solve, the workflow, and the screen you'll open every day." }}
        />

        <div className="no-scrollbar mt-10 flex gap-1 overflow-x-auto rounded-md border border-line bg-surface p-1" role="tablist">
          {segments.map((x) => (
            <button key={x.id} role="tab" aria-selected={id === x.id} type="button" onClick={() => pick(x)}
              className={`relative flex-1 shrink-0 whitespace-nowrap rounded-sm px-4 py-2.5 text-[14px] transition ${id === x.id ? "text-ink" : "text-muted hover:text-ink2"}`}>
              {id === x.id && <motion.span layoutId="seg-pill" className="absolute inset-0 rounded-sm bg-surface2 ring-1 ring-lineStrong" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{t(x.tab)}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="text-balance text-[26px] font-bold leading-snug text-ink">{t(s.headline)}</h3>
              <ul className="mt-6 space-y-3">
                {s.pains.map((p) => (
                  <li key={p.en} className="flex gap-3 text-[15px] text-ink2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bad" />
                    {t(p)}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {s.watch.map((w) => (
                  <div key={w.k.en} className="rounded-sm border border-line bg-surface p-3">
                    <div className="text-[12px] text-muted">{t(w.k)}</div>
                    <div className="mt-1.5"><Pill tone={w.tone}><span className="num">{w.v}</span></Pill></div>
                  </div>
                ))}
              </div>
              {s.roadmap && (
                <p className="mt-4 rounded-sm border border-dashed border-lineStrong px-3 py-2 text-[13px] text-muted">
                  <span className="me-1.5 font-semibold text-warn">{t({ ar: "بصراحة:", en: "Honestly:" })}</span>{t(s.roadmap)}
                </p>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                <PrimaryButton onClick={() => openDemo({ segment: id === "showroom" ? "retail" : id, modules: s.modules })}>
                  {t({ ar: "ديمو على نشاطي", en: "Demo for my business" })}
                </PrimaryButton>
                <WhatsAppButton topic={s.tab} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-md border border-line bg-surface p-5">
                <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">{t({ ar: "مسار العمل في نكسورا", en: "The NEXORA workflow" })}</p>
                <ol className="relative space-y-0">
                  {s.flow.map((f, k) => (
                    <motion.li key={f.en} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.06 }}
                      className="relative flex items-center gap-3 pb-3 last:pb-0">
                      {k < s.flow.length - 1 && <span className="absolute start-[13px] top-7 h-[calc(100%-16px)] w-px bg-lineStrong" />}
                      <span className="num relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-lineStrong bg-surface2 text-[11.5px] text-ink">{k + 1}</span>
                      <span className="text-[14px] text-ink">{t(f)}</span>
                      {k === s.flow.length - 1 && <Check className="ms-auto text-ok" />}
                    </motion.li>
                  ))}
                </ol>
              </div>
              <div className="overflow-hidden rounded-md border border-line bg-surface">
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                  <span className="text-[13px] font-semibold text-ink">{t(s.screen.title)}</span>
                  <span className="flex gap-1" dir="ltr"><i className="h-2 w-2 rounded-full bg-line" /><i className="h-2 w-2 rounded-full bg-line" /><i className="h-2 w-2 rounded-full bg-line" /></span>
                </div>
                <table className="w-full text-[12.5px]">
                  <thead className="bg-surface2/60 text-[11px] text-muted">
                    <tr>{s.screen.cols.map((c, k) => <th key={c.en} className={`px-4 py-2 font-medium ${k === s.screen.cols.length - 1 ? "text-end" : "text-start"}`}>{t(c)}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.screen.rows.map((r, ri) => (
                      <tr key={ri} className="border-t border-line">
                        {r.map((c, k) => (
                          <td key={k} className={`px-4 py-2.5 ${k === r.length - 1 ? "num text-end text-ink" : "text-ink2"} ${typeof c === "string" && k < r.length - 1 ? "num" : ""}`}>
                            {typeof c === "string" ? c : t(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
