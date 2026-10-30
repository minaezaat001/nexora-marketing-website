import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fmt, useApp, type L } from "../i18n";
import { Check, Pill, SectionHead, WhatsAppButton } from "../components/ui";

export type ModuleId = "sales" | "purchasing" | "inventory" | "treasury" | "accounting" | "crm" | "hr" | "control";

export const modules: { id: ModuleId; name: L; blurb: L; span: string; screens: L[]; flow: L[] }[] = [
  {
    id: "accounting", span: "lg:col-span-4",
    name: { ar: "المحاسبة العامة", en: "General accounting" },
    blurb: { ar: "دليل حسابات، قيود تلقائية من كل مستند، فترات تُقفل، وإقفال سنوي بضغطة.", en: "Chart of accounts, entries generated from every document, lockable periods and one-click year-end close." },
    screens: [{ ar: "دليل الحسابات", en: "Chart of accounts" }, { ar: "قواعد الترحيل", en: "Posting rules" }, { ar: "اليومية العامة", en: "General journal" }, { ar: "دفتر الأستاذ", en: "General ledger" }, { ar: "ميزان المراجعة", en: "Trial balance" }, { ar: "قائمة الدخل", en: "Income statement" }, { ar: "الميزانية", en: "Balance sheet" }, { ar: "التدفقات النقدية", en: "Cash flow" }, { ar: "عكس القيود", en: "Entry reversal" }, { ar: "الأصول الثابتة", en: "Fixed assets" }, { ar: "مراكز التكلفة", en: "Cost centers" }, { ar: "ملخص الضريبة", en: "Tax summary" }],
    flow: [{ ar: "مستند", en: "Document" }, { ar: "قاعدة ترحيل", en: "Posting rule" }, { ar: "قيد متوازن", en: "Balanced entry" }, { ar: "قوائم مالية", en: "Statements" }],
  },
  {
    id: "control", span: "lg:col-span-2",
    name: { ar: "الصلاحيات والفروع", en: "Permissions & branches" },
    blurb: { ar: "أدوار مخصصة، ونطاق بيانات لكل موديول: فرع المستخدم أو الشركة كلها.", en: "Custom roles plus a data scope per module: the user's branch, or the whole company." },
    screens: [{ ar: "المستخدمون", en: "Users" }, { ar: "الأدوار والصلاحيات", en: "Roles & permissions" }, { ar: "الفروع", en: "Branches" }, { ar: "الموديولات", en: "Modules on/off" }, { ar: "سجل المراجعة", en: "Audit log" }, { ar: "النسخ الاحتياطي", en: "Backup" }],
    flow: [{ ar: "مستخدم", en: "User" }, { ar: "دور", en: "Role" }, { ar: "نطاق فرع/شركة", en: "Branch/company scope" }, { ar: "سجل مراجعة", en: "Audit trail" }],
  },
  {
    id: "inventory", span: "lg:col-span-2",
    name: { ar: "المخازن والتكلفة", en: "Inventory & costing" },
    blurb: { ar: "مخازن متعددة، تحويلات، جرد فعلي، تسويات تالف وعجز، وتكلفة متوسط مرجّح لكل مخزن.", en: "Multiple warehouses, transfers, physical counts, damage & shortage adjustments, weighted-average cost per warehouse." },
    screens: [{ ar: "رصيد افتتاحي", en: "Opening stock" }, { ar: "تحويل بين المخازن", en: "Warehouse transfer" }, { ar: "الجرد الفعلي", en: "Physical count" }, { ar: "التسويات", en: "Adjustments" }, { ar: "مطابقة المخزون", en: "Stock reconciliation" }, { ar: "ملصقات الباركود", en: "Barcode labels" }],
    flow: [{ ar: "استلام", en: "Receipt" }, { ar: "تحويل", en: "Transfer" }, { ar: "جرد", en: "Count" }, { ar: "تسوية", en: "Adjust" }],
  },
  {
    id: "sales", span: "lg:col-span-2",
    name: { ar: "المبيعات", en: "Sales" },
    blurb: { ar: "عرض سعر يتحول لفاتورة، خصم سطر وفاتورة، ضريبة، مرتجعات، وأرشيف بحث.", en: "Quotes that convert to invoices, line & invoice discounts, tax, returns and a searchable archive." },
    screens: [{ ar: "عروض الأسعار", en: "Quotations" }, { ar: "فاتورة مبيعات", en: "Sales invoice" }, { ar: "مرتجع مبيعات", en: "Sales return" }, { ar: "بحث وأرشيف", en: "Search & archive" }, { ar: "كشف حساب عميل", en: "Customer statement" }],
    flow: [{ ar: "عرض سعر", en: "Quote" }, { ar: "فاتورة", en: "Invoice" }, { ar: "تحصيل", en: "Collection" }, { ar: "قيد", en: "Entry" }],
  },
  {
    id: "purchasing", span: "lg:col-span-2",
    name: { ar: "المشتريات", en: "Purchasing" },
    blurb: { ar: "طلب شراء ← أمر شراء ← فاتورة مورد، مع اعتماد ومتابعة لكل مرحلة.", en: "Requisition → purchase order → supplier invoice, with approval and status at every step." },
    screens: [{ ar: "طلبات الشراء", en: "Purchase requisitions" }, { ar: "أوامر الشراء", en: "Purchase orders" }, { ar: "فاتورة مشتريات", en: "Purchase invoice" }, { ar: "مرتجع مشتريات", en: "Purchase return" }, { ar: "كشف حساب مورد", en: "Supplier statement" }],
    flow: [{ ar: "طلب", en: "Request" }, { ar: "أمر", en: "Order" }, { ar: "استلام", en: "Receive" }, { ar: "فاتورة", en: "Invoice" }],
  },
  {
    id: "treasury", span: "lg:col-span-3",
    name: { ar: "الخزينة والشيكات والأقساط", en: "Treasury, cheques & installments" },
    blurb: { ar: "سندات قبض وصرف، دورة حياة الشيك كاملة، جداول أقساط وتخصيص الدفعات.", en: "Receipt & payment vouchers, the full cheque lifecycle, installment schedules and payment allocation." },
    screens: [{ ar: "لوحة الخزينة", en: "Treasury dashboard" }, { ar: "سند قبض / صرف", en: "Receipt / payment voucher" }, { ar: "الشيكات", en: "Cheques" }, { ar: "الأقساط", en: "Installments" }, { ar: "المصروفات الدورية", en: "Recurring expenses" }],
    flow: [{ ar: "استلام شيك", en: "Cheque received" }, { ar: "تحت التحصيل", en: "Pending collection" }, { ar: "تم التحصيل", en: "Collected" }, { ar: "قيد عند التحصيل", en: "Posted on collection" }],
  },
  {
    id: "hr", span: "lg:col-span-3",
    name: { ar: "الموارد البشرية والرواتب", en: "HR & payroll" },
    blurb: { ar: "ورديات، حضور وانصراف، إجازات رسمية، مسير رواتب، تقييم أداء، ومستندات الموظفين.", en: "Shifts, attendance, public holidays, payroll runs, performance reviews and employee documents." },
    screens: [{ ar: "الموظفون", en: "Employees" }, { ar: "الورديات", en: "Shifts" }, { ar: "الحضور والانصراف", en: "Attendance" }, { ar: "الرواتب", en: "Payroll" }, { ar: "تقييم الأداء", en: "Performance" }, { ar: "المستندات", en: "Documents" }],
    flow: [{ ar: "وردية", en: "Shift" }, { ar: "حضور", en: "Attendance" }, { ar: "مسير", en: "Payroll" }, { ar: "قيد", en: "Entry" }],
  },
  {
    id: "crm", span: "lg:col-span-6",
    name: { ar: "العملاء والموردين", en: "Customers & suppliers" },
    blurb: { ar: "حدود ائتمان، كشوف حساب، متابعات وشكاوى العملاء — كل التاريخ في ملف واحد.", en: "Credit limits, statements, customer follow-ups and complaints — the whole history in one file." },
    screens: [{ ar: "العملاء", en: "Customers" }, { ar: "الموردون", en: "Suppliers" }, { ar: "المتابعات", en: "Follow-ups" }, { ar: "الشكاوى", en: "Complaints" }, { ar: "مركز التنبيهات", en: "Alerts centre" }],
    flow: [{ ar: "عميل", en: "Customer" }, { ar: "حد ائتمان", en: "Credit limit" }, { ar: "متابعة", en: "Follow-up" }, { ar: "تحصيل", en: "Collection" }],
  },
];

/* ---------- live micro-components ---------- */

function MiniInvoice() {
  const { t } = useApp();
  const [q, setQ] = useState(2);
  return (
    <div className="flex items-center gap-3 rounded-sm border border-line bg-canvas/40 px-3 py-2 text-[12.5px]">
      <span className="flex-1 truncate text-ink2">{t({ ar: "طقم غرفة نوم خشب زان", en: "Beech bedroom set" })}</span>
      <span className="flex items-center rounded-[6px] border border-line" dir="ltr">
        <button type="button" onClick={(e) => { e.stopPropagation(); setQ(Math.max(1, q - 1)); }} className="px-2 text-muted hover:text-ink">−</button>
        <span className="num w-5 text-center">{q}</span>
        <button type="button" onClick={(e) => { e.stopPropagation(); setQ(q + 1); }} className="px-2 text-muted hover:text-ink">+</button>
      </span>
      <motion.span key={q} initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="num w-16 text-end font-medium text-ink">{fmt(q * 4200)}</motion.span>
    </div>
  );
}

function MiniStock() {
  const { t } = useApp();
  const [sold, setSold] = useState(6);
  const qty = 14 - sold;
  const low = qty < 5;
  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-ink2">ITM-001 · {t({ ar: "الرصيد", en: "on hand" })} <b className="num text-ink">{qty}</b></span>
        {low ? <Pill tone="bad">{t({ ar: "تحت حد الطلب", en: "Below reorder" })}</Pill> : <Pill tone="ok">{t({ ar: "آمن", en: "Healthy" })}</Pill>}
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-line" dir="ltr">
        <motion.div animate={{ width: `${(qty / 14) * 100}%` }} transition={{ type: "spring", stiffness: 200, damping: 24 }} className={`h-full ${low ? "bg-bad" : "bg-ok"}`} />
        <span className="absolute inset-y-0 w-px bg-warn" style={{ left: `${(5 / 14) * 100}%` }} />
      </div>
      <input aria-label={t({ ar: "الكمية المباعة", en: "Units sold" })} type="range" min={0} max={14} value={sold} onChange={(e) => setSold(+e.target.value)} className="w-full accent-[#2F6BEF]" />
    </div>
  );
}

function MiniPurchase() {
  const { t } = useApp();
  const steps = modules.find((m) => m.id === "purchasing")!.flow;
  const [i, setI] = useState(1);
  return (
    <div className="flex items-center gap-1.5" onClick={(e) => { e.stopPropagation(); setI((i + 1) % steps.length); }} role="button" tabIndex={0}>
      {steps.map((s, k) => (
        <div key={s.en} className="flex flex-1 flex-col items-center gap-1.5">
          <motion.div animate={{ backgroundColor: k <= i ? "#2F6BEF" : "rgba(0,0,0,0)" }} className="grid h-6 w-6 place-items-center rounded-full border border-lineStrong text-white">
            {k <= i && <Check className="h-3 w-3" />}
          </motion.div>
          <span className={`text-[11px] ${k <= i ? "text-ink" : "text-muted"}`}>{t(s)}</span>
        </div>
      ))}
    </div>
  );
}

function MiniCheque() {
  const { t } = useApp();
  const states: { l: L; tone: "info" | "warn" | "ok" | "bad" }[] = [
    { l: { ar: "تحت التحصيل", en: "Pending collection" }, tone: "warn" },
    { l: { ar: "تم التحصيل · سند قبض بنكي", en: "Collected · bank receipt posted" }, tone: "ok" },
    { l: { ar: "مرتد", en: "Bounced" }, tone: "bad" },
  ];
  const [s, setS] = useState(0);
  return (
    <div className="flex items-center justify-between gap-3 rounded-sm border border-line bg-canvas/40 px-3 py-2 text-[12.5px]">
      <div><div className="num text-ink">CHQ-00418 · {fmt(25000)}</div><div className="text-[11px] text-muted">{t({ ar: "استحقاق", en: "Due" })} <span className="num">2026-11-15</span></div></div>
      <button type="button" onClick={(e) => { e.stopPropagation(); setS((s + 1) % states.length); }}><Pill tone={states[s].tone}>{t(states[s].l)}</Pill></button>
    </div>
  );
}

function MiniPeriod() {
  const { t } = useApp();
  const months = ["07", "08", "09", "10", "11", "12"];
  const [locked, setLocked] = useState(3);
  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-6 gap-1.5" dir="ltr">
        {months.map((m, k) => (
          <button key={m} type="button" onClick={() => setLocked(k + 1)}
            className={`num rounded-[6px] border py-1.5 text-[11px] transition ${k < locked ? "border-purple/40 bg-purple/15 text-ink" : "border-line text-muted hover:text-ink"}`}>
            2026-{m}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between text-[11.5px]">
        <span className="text-muted">{t({ ar: "فترات مقفلة — ممنوع الترحيل فيها", en: "Locked periods — no posting allowed" })}</span>
        <span className="num text-ink">{locked}/6</span>
      </div>
    </div>
  );
}

function MiniPerms() {
  const { t } = useApp();
  const [perm, setPerm] = useState({ view: true, create: true, edit: false });
  const [scope, setScope] = useState<"BRANCH" | "COMPANY">("BRANCH");
  const rows: { k: keyof typeof perm; l: L }[] = [
    { k: "view", l: { ar: "عرض", en: "View" } },
    { k: "create", l: { ar: "إنشاء", en: "Create" } },
    { k: "edit", l: { ar: "تعديل", en: "Edit" } },
  ];
  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      {rows.map((r) => (
        <div key={r.k} className="flex items-center justify-between text-[12px] text-ink2">
          {t(r.l)} · {t({ ar: "المبيعات", en: "Sales" })}
          <button type="button" role="switch" aria-checked={perm[r.k]} aria-label={t(r.l)} onClick={() => setPerm({ ...perm, [r.k]: !perm[r.k] })}
            className={`relative h-5 w-9 rounded-full transition ${perm[r.k] ? "bg-brand" : "bg-line"}`}>
            <motion.span layout className={`absolute top-0.5 h-4 w-4 rounded-full bg-white ${perm[r.k] ? "end-0.5" : "start-0.5"}`} />
          </button>
        </div>
      ))}
      <div className="flex rounded-sm border border-line p-0.5 text-[11px]">
        {(["BRANCH", "COMPANY"] as const).map((s) => (
          <button key={s} type="button" onClick={() => setScope(s)} className={`flex-1 rounded-[6px] py-1 ${scope === s ? "bg-accent/15 font-semibold text-accent" : "text-muted"}`}>
            {s === "BRANCH" ? t({ ar: "فرعه فقط", en: "Own branch" }) : t({ ar: "الشركة كلها", en: "Company-wide" })}
          </button>
        ))}
      </div>
    </div>
  );
}

function MiniShift() {
  const { t } = useApp();
  const [late, setLate] = useState(false);
  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      <div className="relative h-7 rounded-[6px] bg-line/60" dir="ltr">
        <div className="absolute inset-y-0 rounded-[6px] bg-accent/20 ring-1 ring-accent/40" style={{ left: "12%", width: "60%" }} />
        <motion.div animate={{ left: late ? "20%" : "12%" }} className={`absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded-full ${late ? "bg-warn" : "bg-ok"}`} />
        <span className="num absolute start-1 top-1/2 -translate-y-1/2 text-[10px] text-muted">08:00</span>
        <span className="num absolute end-1 top-1/2 -translate-y-1/2 text-[10px] text-muted">17:00</span>
      </div>
      <button type="button" onClick={() => setLate(!late)} className="flex w-full items-center justify-between text-[12px] text-ink2">
        <span>{t({ ar: "تسجيل الحضور", en: "Check-in" })} <span className="num text-ink">{late ? "09:14" : "08:56"}</span></span>
        <Pill tone={late ? "warn" : "ok"}>{late ? t({ ar: "تأخير ٤٤ دقيقة", en: "44 min late" }) : t({ ar: "في الموعد", en: "On time" })}</Pill>
      </button>
    </div>
  );
}

function MiniCrm() {
  const { t } = useApp();
  const items: { c: string; l: L; due: string }[] = [
    { c: "CUST-014", l: { ar: "اتصال لتأكيد موعد التوصيل والتركيب", en: "Call to confirm delivery & installation" }, due: "2026-10-31" },
    { c: "CUST-022", l: { ar: "متابعة قسط نوفمبر المتأخر", en: "Chase overdue November installment" }, due: "2026-11-02" },
    { c: "CUST-031", l: { ar: "شكوى: تأخير قطعة غيار — قيد المعالجة", en: "Complaint: spare part delay — in progress" }, due: "2026-11-04" },
  ];
  const [done, setDone] = useState<Record<string, boolean>>({ "CUST-014": true });
  return (
    <div className="grid gap-2 md:grid-cols-3" onClick={(e) => e.stopPropagation()}>
      {items.map((it) => (
        <button key={it.c} type="button" onClick={() => setDone({ ...done, [it.c]: !done[it.c] })}
          className="flex items-start gap-2.5 rounded-sm border border-line bg-canvas/40 p-2.5 text-start text-[12px] transition hover:border-lineStrong">
          <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border ${done[it.c] ? "border-ok bg-ok text-canvas" : "border-lineStrong"}`}>{done[it.c] && <Check className="h-3 w-3" />}</span>
          <span className="min-w-0">
            <span className={`block ${done[it.c] ? "text-muted line-through" : "text-ink2"}`}>{t(it.l)}</span>
            <span className="num text-[10.5px] text-muted">{it.c} · {it.due}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

const micro: Record<ModuleId, () => ReactNode> = {
  sales: MiniInvoice, inventory: MiniStock, purchasing: MiniPurchase, treasury: MiniCheque,
  accounting: MiniPeriod, control: MiniPerms, hr: MiniShift, crm: MiniCrm,
};

export default function Modules() {
  const { t, setTopic } = useApp();
  const [sel, setSel] = useState<ModuleId>("accounting");
  const active = modules.find((m) => m.id === sel)!;

  const pick = (id: ModuleId) => {
    setSel(id);
    setTopic(modules.find((m) => m.id === id)!.name);
  };

  return (
    <section id="modules" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow={{ ar: "الموديولات", en: "Modules" }}
          title={{ ar: "ثمانية موديولات. قاعدة بيانات واحدة. ولا رقم بيتكتب مرتين.", en: "Eight modules. One database. No number typed twice." }}
          lead={{ ar: "جرّب كل كارت — الأزرار شغالة. اضغط على أي موديول لتشوف الشاشات الحقيقية ومسار العمل.", en: "Every card is live — the controls work. Pick a module to see its real screens and workflow." }}
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {modules.map((m, i) => {
            const Micro = micro[m.id];
            const on = sel === m.id;
            return (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 140, damping: 20, delay: i * 0.04 }}
                onClick={() => pick(m.id)}
                className={`group relative cursor-pointer rounded-md border bg-surface p-5 transition sm:col-span-1 ${m.span} ${m.id === "crm" ? "sm:col-span-2" : ""} ${on ? "border-accent/60 shadow-[0_0_0_1px_rgb(var(--accent)/0.35)]" : "border-line hover:border-lineStrong"}`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-[16.5px] font-semibold text-ink">{t(m.name)}</h3>
                  <span className={`num text-[11px] ${on ? "text-accent" : "text-muted"}`}>0{i + 1}</span>
                </div>
                <p className="mb-4 text-[13.5px] leading-relaxed text-muted">{t(m.blurb)}</p>
                <Micro />
              </motion.article>
            );
          })}
        </div>

        <div className="mt-3 overflow-hidden rounded-md border border-line bg-surface">
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="grid gap-6 p-6 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">{t({ ar: "مسار العمل", en: "Workflow" })} · {t(active.name)}</p>
                <ol className="mt-3 flex flex-wrap items-center gap-2">
                  {active.flow.map((f, k) => (
                    <li key={f.en} className="flex items-center gap-2">
                      <span className="rounded-sm border border-line bg-surface2 px-3 py-1.5 text-[13px] text-ink">{t(f)}</span>
                      {k < active.flow.length - 1 && <span className="text-muted">{t({ ar: "←", en: "→" })}</span>}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-[12px] text-muted">{t({ ar: "شاشات فعلية في النظام", en: "Actual screens in the product" })}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.screens.map((s) => <span key={s.en} className="rounded-full border border-line px-2.5 py-0.5 text-[12px] text-ink2">{t(s)}</span>)}
                </div>
              </div>
              <WhatsAppButton variant="ghost" topic={active.name} label={{ ar: "اسأل عن الموديول ده", en: "Ask about this module" }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
