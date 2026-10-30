import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fmt, useApp, type L } from "../i18n";
import { Pill } from "./ui";

type Tab = "finance" | "inventory" | "sales" | "hr";

const tabs: { id: Tab; label: L }[] = [
  { id: "finance", label: { ar: "لوحة التحكم المالية", en: "Finance dashboard" } },
  { id: "inventory", label: { ar: "المخازن والتكلفة", en: "Inventory & cost" } },
  { id: "sales", label: { ar: "فاتورة مبيعات", en: "Sales invoice" } },
  { id: "hr", label: { ar: "الموارد البشرية", en: "HR & payroll" } },
];

// Sidebar groups copied from the ERP's Navigation.tsx
const sideGroups: { title: L; items: { label: L; tab?: Tab }[] }[] = [
  { title: { ar: "الرئيسية", en: "Home" }, items: [{ label: { ar: "لوحة التحكم", en: "Dashboard" }, tab: "finance" }, { label: { ar: "مركز التنبيهات", en: "Alerts centre" } }] },
  { title: { ar: "التشغيل", en: "Operations" }, items: [{ label: { ar: "المبيعات", en: "Sales" }, tab: "sales" }, { label: { ar: "المشتريات", en: "Purchases" } }, { label: { ar: "المخزون", en: "Inventory" }, tab: "inventory" }, { label: { ar: "الخزينة", en: "Treasury" } }] },
  { title: { ar: "المحاسبة والتقارير", en: "Accounting & reports" }, items: [{ label: { ar: "اليومية العامة", en: "General journal" } }, { label: { ar: "ميزان المراجعة", en: "Trial balance" } }] },
  { title: { ar: "الإدارة", en: "Administration" }, items: [{ label: { ar: "الموارد البشرية", en: "Human resources" }, tab: "hr" }, { label: { ar: "الأدوار والصلاحيات", en: "Roles & permissions" } }] },
];

export default function ProductMockup({ initial = "finance" as Tab }) {
  const { t } = useApp();
  const [tab, setTab] = useState<Tab>(initial);

  return (
    <div className="overflow-hidden rounded-lg border border-lineStrong bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-side px-4 py-2.5">
        <div className="flex gap-1.5" dir="ltr">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]/70" /><span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]/70" /><span className="h-2.5 w-2.5 rounded-full bg-[#34d399]/70" />
        </div>
        <div className="num mx-auto truncate rounded-full border border-line bg-canvas px-3 py-0.5 text-[11px] text-muted">erp.yourcompany.com/{tab}</div>
        <span className="hidden text-[11px] text-muted sm:inline">{t({ ar: "فرع القاهرة", en: "Cairo branch" })}</span>
      </div>

      <div className="flex min-h-[440px]">
        <aside className="hidden w-[188px] shrink-0 border-e border-line bg-side px-2.5 py-3 md:block">
          <div className="mb-3 flex items-center gap-2 px-1.5">
            <img src="/nexora-mark.png" alt="" className="h-7 w-7 rounded-[6px]" />
            <div className="leading-tight">
              <div className="text-[13px] font-bold text-ink">NEXORA</div>
              <div className="num rounded-full bg-accent/10 px-1.5 text-[9.5px] text-accent ring-1 ring-accent/30">V1.1</div>
            </div>
          </div>
          {sideGroups.map((g) => (
            <div key={g.title.en} className="mb-1">
              <div className="px-2 pb-1 pt-2.5 text-[10px] font-bold text-muted">{t(g.title)}</div>
              {g.items.map((it) => {
                const active = it.tab === tab && (it.tab !== "finance" || it.label.en === "Dashboard");
                return (
                  <button
                    key={it.label.en}
                    type="button"
                    disabled={!it.tab}
                    onClick={() => it.tab && setTab(it.tab)}
                    className={`relative flex w-full items-center rounded-[6px] px-2 py-1.5 text-start text-[12px] transition ${active ? "bg-accent/10 font-semibold text-ink" : "text-ink2 enabled:hover:bg-ink/5"} disabled:cursor-default disabled:opacity-60`}
                  >
                    {active && <span className="absolute inset-y-1.5 start-0 w-[3px] rounded-full bg-accent" />}
                    <span className="ps-1.5">{t(it.label)}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <div className="min-w-0 flex-1">
          <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-3 pt-2" role="tablist">
            {tabs.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={tab === x.id}
                type="button"
                onClick={() => setTab(x.id)}
                className={`relative shrink-0 px-3 pb-2.5 pt-1.5 text-[12.5px] transition ${tab === x.id ? "font-semibold text-ink" : "text-muted hover:text-ink2"}`}
              >
                {t(x.label)}
                {tab === x.id && <motion.span layoutId="mock-tab" className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-accent" />}
              </button>
            ))}
          </div>
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                {tab === "finance" && <Finance />}
                {tab === "inventory" && <Inventory />}
                {tab === "sales" && <Sales />}
                {tab === "hr" && <Hr />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Finance ---------------- */
const periods = {
  "7": { label: { ar: "٧ أيام", en: "7 days" }, bars: [42, 58, 37, 71, 64, 88, 76], sales: 186040, collected: 152300, cash: 58327, recv: 111714 },
  "30": { label: { ar: "٣٠ يوم", en: "30 days" }, bars: [55, 62, 48, 80, 70, 66, 91, 74, 60, 85, 77, 94], sales: 647930, collected: 534800, cash: 130385, recv: 111714 },
  "90": { label: { ar: "ربع سنة", en: "Quarter" }, bars: [61, 72, 69, 84, 90, 78, 95, 88, 99, 83, 92, 100], sales: 1846200, collected: 1590400, cash: 214920, recv: 128450 },
} as const;
type PKey = keyof typeof periods;

function Kpi({ label, value, delta, tone = "ok" }: { label: L; value: number; delta: string; tone?: "ok" | "warn" }) {
  const { t } = useApp();
  return (
    <div className="rounded-md border border-line bg-surface2/60 p-3">
      <div className="text-[11px] text-muted">{t(label)}</div>
      <motion.div key={value} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className="num mt-1 text-[17px] font-semibold text-ink">{fmt(value)}</motion.div>
      <div className={`num mt-0.5 text-[10.5px] ${tone === "ok" ? "text-ok" : "text-warn"}`}>{delta}</div>
    </div>
  );
}

function Finance() {
  const { t } = useApp();
  const [p, setP] = useState<PKey>("30");
  const d = periods[p];
  const max = Math.max(...d.bars);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-[14px] font-semibold text-ink">{t({ ar: "ملخص الأداء", en: "Performance summary" })}</div>
        <div className="flex rounded-sm border border-line p-0.5 text-[11.5px]">
          {(Object.keys(periods) as PKey[]).map((k) => (
            <button key={k} type="button" onClick={() => setP(k)} className={`rounded-[6px] px-2.5 py-1 transition ${p === k ? "bg-brand text-white" : "text-ink2 hover:text-ink"}`}>{t(periods[k].label)}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Kpi label={{ ar: "المبيعات", en: "Sales" }} value={d.sales} delta="+12.4%" />
        <Kpi label={{ ar: "التحصيلات", en: "Collections" }} value={d.collected} delta="+8.1%" />
        <Kpi label={{ ar: "رصيد الخزنة", en: "Cash on hand" }} value={d.cash} delta="+3.2%" />
        <Kpi label={{ ar: "مديونية العملاء", en: "Receivables" }} value={d.recv} delta="−4.6%" tone="warn" />
      </div>
      <div className="grid gap-2 lg:grid-cols-5">
        <div className="rounded-md border border-line p-3 lg:col-span-3">
          <div className="mb-2 flex items-center justify-between text-[11px] text-muted">
            <span>{t({ ar: "المبيعات مقابل التحصيل", en: "Sales vs. collections" })}</span>
            <span className="flex gap-3"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-[2px] bg-[#3E7BFA]" />{t({ ar: "مبيعات", en: "Sales" })}</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-[2px] bg-[#29B6FF]/50" />{t({ ar: "تحصيل", en: "Collected" })}</span></span>
          </div>
          <div className="flex h-[120px] items-end gap-[5px]" dir="ltr">
            {d.bars.map((b, i) => (
              <div key={`${p}-${i}`} className="flex h-full flex-1 items-end gap-[2px]">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(b / max) * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 20, delay: i * 0.02 }} className="flex-1 rounded-t-[3px] bg-[#3E7BFA]" />
                <motion.div initial={{ height: 0 }} animate={{ height: `${(b / max) * 82}%` }} transition={{ type: "spring", stiffness: 160, damping: 20, delay: i * 0.02 + 0.04 }} className="flex-1 rounded-t-[3px] bg-[#29B6FF]/50" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-line p-3 lg:col-span-2">
          <div className="mb-2 text-[11px] text-muted">{t({ ar: "آخر القيود المرحّلة تلقائيًا", en: "Latest auto-posted entries" })}</div>
          {[
            { ref: "JE-0162", d: { ar: "فاتورة مبيعات SI-0418", en: "Sales invoice SI-0418" }, v: 18240 },
            { ref: "JE-0161", d: { ar: "سند قبض RV-0207", en: "Receipt RV-0207" }, v: 9500 },
            { ref: "JE-0160", d: { ar: "فاتورة مشتريات PI-0133", en: "Purchase invoice PI-0133" }, v: 26800 },
            { ref: "JE-0159", d: { ar: "إهلاك أصول ثابتة", en: "Fixed-asset depreciation" }, v: 3125 },
          ].map((r) => (
            <div key={r.ref} className="flex items-center justify-between border-t border-line py-1.5 text-[11.5px] first:border-0">
              <span className="truncate text-ink2"><span className="num me-2 text-muted">{r.ref}</span>{t(r.d)}</span>
              <span className="num text-ink">{fmt(r.v)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Inventory ---------------- */
// Items, prices and codes are the ERP's own demo dataset (data/items.json)
const warehouses: { id: string; name: L }[] = [
  { id: "WH-001", name: { ar: "المخزن الرئيسي", en: "Main warehouse" } },
  { id: "WH-002", name: { ar: "مخزن الفرع", en: "Branch warehouse" } },
  { id: "WH-003", name: { ar: "مخزن الخامات", en: "Raw materials" } },
];
const stock: Record<string, { code: string; name: L; qty: number; min: number; cost: number }[]> = {
  "WH-001": [
    { code: "ITM-001", name: { ar: "طقم غرفة نوم خشب زان", en: "Beech bedroom set" }, qty: 14, min: 5, cost: 3000 },
    { code: "ITM-003", name: { ar: "طقم صالون كلاسيك ٧ مقاعد", en: "Classic 7-seat salon set" }, qty: 3, min: 4, cost: 4900 },
    { code: "ITM-007", name: { ar: "كرسي مكتب جلد طبي", en: "Ergonomic office chair" }, qty: 46, min: 20, cost: 560 },
    { code: "ITM-009", name: { ar: "ثريا كريستال معلقة", en: "Crystal chandelier" }, qty: 4, min: 8, cost: 780 },
  ],
  "WH-002": [
    { code: "ITM-004", name: { ar: "كنبة زاوية قماش", en: "Fabric corner sofa" }, qty: 9, min: 4, cost: 2200 },
    { code: "ITM-010", name: { ar: "ستارة بلاك أوت ٣م", en: "Blackout curtain 3m" }, qty: 12, min: 25, cost: 260 },
    { code: "ITM-013", name: { ar: "مرتبة طبية ١٨٠×٢٠٠", en: "Orthopedic mattress 180×200" }, qty: 21, min: 10, cost: 980 },
  ],
  "WH-003": [
    { code: "RM-0007", name: { ar: "ألواح خشب زان (م²)", en: "Beech panels (m²)" }, qty: 420, min: 300, cost: 185 },
    { code: "RM-0012", name: { ar: "قماش تنجيد (متر)", en: "Upholstery fabric (m)" }, qty: 160, min: 250, cost: 95 },
    { code: "RM-0019", name: { ar: "إسفنج ضغط عالي (لوح)", en: "High-density foam (sheet)" }, qty: 75, min: 40, cost: 210 },
  ],
};

function Inventory() {
  const { t } = useApp();
  const [wh, setWh] = useState("WH-001");
  const [moved, setMoved] = useState<Record<string, number>>({});
  const rows = stock[wh].map((r) => ({ ...r, qty: r.qty + (moved[`${wh}:${r.code}`] ?? 0) }));
  const total = rows.reduce((s, r) => s + r.qty * r.cost, 0);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-[14px] font-semibold text-ink">{t({ ar: "أرصدة الأصناف", en: "Item balances" })}</div>
        <select value={wh} onChange={(e) => setWh(e.target.value)} className="ms-auto h-8 rounded-sm border border-line bg-surface2 px-2 text-[12px] text-ink">
          {warehouses.map((w) => <option key={w.id} value={w.id}>{t(w.name)}</option>)}
        </select>
      </div>
      <div className="overflow-hidden rounded-md border border-line">
        <table className="w-full text-[12px]">
          <thead className="bg-surface2/70 text-[10.5px] text-muted">
            <tr>
              <th className="px-3 py-2 text-start font-medium">{t({ ar: "الصنف", en: "Item" })}</th>
              <th className="px-2 py-2 text-end font-medium">{t({ ar: "الكمية", en: "Qty" })}</th>
              <th className="hidden px-2 py-2 text-end font-medium sm:table-cell">{t({ ar: "متوسط التكلفة", en: "Avg. cost" })}</th>
              <th className="px-3 py-2 text-end font-medium">{t({ ar: "إجراء", en: "Action" })}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const low = r.qty < r.min;
              return (
                <tr key={r.code} className="border-t border-line hover:bg-accent/[0.04]">
                  <td className="px-3 py-2"><div className="text-ink">{t(r.name)}</div><div className="num text-[10px] text-muted">{r.code}</div></td>
                  <td className="px-2 py-2 text-end">
                    <span className="num text-ink">{fmt(r.qty)}</span>
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-line" dir="ltr"><motion.div animate={{ width: `${Math.min(100, (r.qty / (r.min * 3)) * 100)}%` }} className={`h-full ${low ? "bg-bad" : "bg-ok"}`} /></div>
                  </td>
                  <td className="num hidden px-2 py-2 text-end text-ink2 sm:table-cell">{fmt(r.cost)}</td>
                  <td className="px-3 py-2 text-end">
                    {low ? (
                      <button type="button" onClick={() => setMoved((m) => ({ ...m, [`${wh}:${r.code}`]: (m[`${wh}:${r.code}`] ?? 0) + r.min * 2 }))}
                        className="rounded-[6px] bg-brand px-2 py-1 text-[11px] font-medium text-white hover:bg-[#2a5fd6]">
                        {t({ ar: "طلب شراء", en: "Requisition" })}
                      </button>
                    ) : <Pill tone="ok">{t({ ar: "متاح", en: "In stock" })}</Pill>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11.5px]">
        <span className="text-muted">{t({ ar: "التقييم بالمتوسط المرجّح المتحرك — لكل صنف × مخزن", en: "Moving weighted-average valuation — per item × warehouse" })}</span>
        <span className="text-ink2">{t({ ar: "قيمة المخزن", en: "Warehouse value" })}: <b className="num text-ink">{fmt(total)}</b></span>
      </div>
    </div>
  );
}

/* ---------------- Sales invoice ---------------- */
const catalog = [
  { code: "ITM-001", name: { ar: "طقم غرفة نوم خشب زان", en: "Beech bedroom set" }, price: 4200, cost: 3000 },
  { code: "ITM-005", name: { ar: "طاولة سفرة ٨ كراسي رخام", en: "8-chair marble dining table" }, price: 5200, cost: 3700 },
  { code: "ITM-007", name: { ar: "كرسي مكتب جلد طبي", en: "Ergonomic office chair" }, price: 850, cost: 560 },
];

function Sales() {
  const { t } = useApp();
  const [lines, setLines] = useState([{ ...catalog[0], qty: 2 }, { ...catalog[1], qty: 1 }]);
  const [disc, setDisc] = useState(5);
  const [credit, setCredit] = useState(true);
  const calc = useMemo(() => {
    const gross = lines.reduce((s, l) => s + l.qty * l.price, 0);
    const discount = gross * (disc / 100);
    const net = gross - discount;
    const vat = net * 0.14;
    const cogs = lines.reduce((s, l) => s + l.qty * l.cost, 0);
    return { gross, discount, net, vat, total: net + vat, cogs };
  }, [lines, disc]);
  const addLine = () => {
    const next = catalog[lines.length % catalog.length];
    setLines((ls) => ls.some((l) => l.code === next.code) ? ls.map((l) => (l.code === next.code ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { ...next, qty: 1 }]);
  };
  const debit = credit ? { ar: "1120 العملاء", en: "1120 Customers" } : { ar: "1101 خزنة المعرض", en: "1101 Showroom till" };
  return (
    <div className="grid gap-3 lg:grid-cols-5">
      <div className="space-y-2 lg:col-span-3">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-semibold text-ink">{t({ ar: "فاتورة مبيعات", en: "Sales invoice" })} <span className="num text-[12px] text-muted">SI-0419</span></div>
          <div className="flex rounded-sm border border-line p-0.5 text-[11px]">
            <button type="button" onClick={() => setCredit(false)} className={`rounded-[6px] px-2 py-0.5 ${!credit ? "bg-brand text-white" : "text-ink2"}`}>{t({ ar: "نقدي", en: "Cash" })}</button>
            <button type="button" onClick={() => setCredit(true)} className={`rounded-[6px] px-2 py-0.5 ${credit ? "bg-brand text-white" : "text-ink2"}`}>{t({ ar: "آجل", en: "Credit" })}</button>
          </div>
        </div>
        <div className="rounded-md border border-line">
          {lines.map((l, i) => (
            <div key={l.code} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-t border-line px-3 py-2 text-[12px] first:border-0">
              <div><div className="text-ink">{t(l.name)}</div><div className="num text-[10px] text-muted">{l.code} · {fmt(l.price)}</div></div>
              <div className="flex items-center rounded-[6px] border border-line" dir="ltr">
                <button type="button" aria-label="−" onClick={() => setLines((ls) => ls.map((x, j) => (j === i ? { ...x, qty: Math.max(1, x.qty - 1) } : x)))} className="px-1.5 text-muted hover:text-ink">−</button>
                <span className="num w-6 text-center text-ink">{l.qty}</span>
                <button type="button" aria-label="+" onClick={() => setLines((ls) => ls.map((x, j) => (j === i ? { ...x, qty: x.qty + 1 } : x)))} className="px-1.5 text-muted hover:text-ink">+</button>
              </div>
              <div className="num w-16 text-end text-ink">{fmt(l.qty * l.price)}</div>
            </div>
          ))}
          <button type="button" onClick={addLine} className="w-full border-t border-dashed border-line py-1.5 text-[11.5px] text-accent hover:bg-accent/5">+ {t({ ar: "إضافة صنف (أو امسح الباركود)", en: "Add item (or scan barcode)" })}</button>
        </div>
        <label className="flex items-center gap-3 text-[11.5px] text-ink2">
          {t({ ar: "خصم على الفاتورة", en: "Invoice discount" })}
          <input type="range" min={0} max={15} value={disc} onChange={(e) => setDisc(+e.target.value)} className="flex-1 accent-[#2F6BEF]" />
          <span className="num w-8 text-ink">{disc}%</span>
        </label>
        <div className="grid grid-cols-3 gap-2 text-[11px]">
          <div className="rounded-sm bg-surface2/70 p-2"><div className="text-muted">{t({ ar: "الصافي", en: "Net" })}</div><div className="num text-ink">{fmt(calc.net)}</div></div>
          <div className="rounded-sm bg-surface2/70 p-2"><div className="text-muted">{t({ ar: "ضريبة ١٤٪", en: "VAT 14%" })}</div><div className="num text-ink">{fmt(calc.vat)}</div></div>
          <div className="rounded-sm bg-brand/15 p-2 ring-1 ring-brand/40"><div className="text-muted">{t({ ar: "الإجمالي", en: "Total" })}</div><div className="num font-semibold text-ink">{fmt(calc.total)}</div></div>
        </div>
      </div>
      <div className="rounded-md border border-line bg-surface2/40 p-3 lg:col-span-2">
        <div className="mb-1 flex items-center justify-between text-[11.5px]">
          <span className="font-semibold text-ink">{t({ ar: "القيد المحاسبي التلقائي", en: "Auto journal entry" })}</span>
          <Pill tone="ok">{t({ ar: "متوازن", en: "Balanced" })}</Pill>
        </div>
        <p className="mb-2 text-[10.5px] text-muted">{t({ ar: "يُنشأ لحظة الحفظ من قواعد الترحيل — بدون تدخل المحاسب.", en: "Created on save from posting rules — no accountant needed." })}</p>
        <table className="w-full text-[11px]">
          <thead className="text-[10px] text-muted"><tr><th className="py-1 text-start font-medium">{t({ ar: "الحساب", en: "Account" })}</th><th className="py-1 text-end font-medium">{t({ ar: "مدين", en: "Dr" })}</th><th className="py-1 text-end font-medium">{t({ ar: "دائن", en: "Cr" })}</th></tr></thead>
          <tbody className="text-ink2">
            {[
              [debit, calc.total, 0],
              [credit ? { ar: "4101 مبيعات آجل", en: "4101 Sales — credit" } : { ar: "4100 مبيعات نقدي", en: "4100 Sales — cash" }, 0, calc.net],
              [{ ar: "2300 ضرائب مستحقة", en: "2300 Accrued taxes" }, 0, calc.vat],
              [{ ar: "5000 تكلفة البضاعة المباعة", en: "5000 Cost of goods sold" }, calc.cogs, 0],
              [{ ar: "1130 المخزون", en: "1130 Inventory" }, 0, calc.cogs],
            ].map(([a, dr, cr]) => (
              <tr key={(a as L).en.slice(0, 4)} className="border-t border-line">
                <td className="py-1.5">{t(a as L)}</td>
                <td className="num py-1.5 text-end">{(dr as number) ? fmt(dr as number) : "—"}</td>
                <td className="num py-1.5 text-end">{(cr as number) ? fmt(cr as number) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- HR ---------------- */
type Att = "present" | "late" | "absent";
const staff: { code: string; name: L; role: L; salary: number }[] = [
  { code: "EMP-001", name: { ar: "أحمد سمير", en: "Ahmed Samir" }, role: { ar: "محاسب", en: "Accountant" }, salary: 14500 },
  { code: "EMP-002", name: { ar: "منى عادل", en: "Mona Adel" }, role: { ar: "أمينة مخزن", en: "Storekeeper" }, salary: 9800 },
  { code: "EMP-003", name: { ar: "كريم حسن", en: "Karim Hassan" }, role: { ar: "مندوب مبيعات", en: "Sales rep" }, salary: 11200 },
  { code: "EMP-004", name: { ar: "سارة يوسف", en: "Sara Youssef" }, role: { ar: "كاشير", en: "Cashier" }, salary: 8600 },
];

function Hr() {
  const { t } = useApp();
  const [att, setAtt] = useState<Record<string, Att>>({ "EMP-001": "present", "EMP-002": "late", "EMP-003": "present", "EMP-004": "absent" });
  const cycle = (c: string) => setAtt((a) => ({ ...a, [c]: a[c] === "present" ? "late" : a[c] === "late" ? "absent" : "present" }));
  const ded = (s: { salary: number; code: string }) => (att[s.code] === "absent" ? s.salary / 26 : att[s.code] === "late" ? s.salary / 26 / 4 : 0);
  const net = staff.reduce((sum, s) => sum + s.salary - ded(s), 0);
  const labels: Record<Att, { l: L; tone: "ok" | "warn" | "bad" }> = {
    present: { l: { ar: "حاضر", en: "Present" }, tone: "ok" },
    late: { l: { ar: "متأخر", en: "Late" }, tone: "warn" },
    absent: { l: { ar: "غائب", en: "Absent" }, tone: "bad" },
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-[14px] font-semibold text-ink">{t({ ar: "الحضور اليوم — وردية صباحية", en: "Today's attendance — morning shift" })}</div>
        <span className="text-[11px] text-muted">{t({ ar: "اضغط الحالة لتغييرها", en: "Click a status to change it" })}</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {staff.map((s) => (
          <div key={s.code} className="flex items-center gap-3 rounded-md border border-line p-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-accent/10 text-[12px] font-semibold text-accent">{t(s.name).charAt(0)}</div>
            <div className="min-w-0 flex-1"><div className="truncate text-[12.5px] text-ink">{t(s.name)}</div><div className="text-[10.5px] text-muted">{t(s.role)} · <span className="num">{s.code}</span></div></div>
            <button type="button" onClick={() => cycle(s.code)}><Pill tone={labels[att[s.code]].tone}>{t(labels[att[s.code]].l)}</Pill></button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-line bg-surface2/50 p-3 text-[12px]">
        <span className="text-ink2">{t({ ar: "صافي مسير الرواتب (تقديري)", en: "Net payroll run (estimate)" })}</span>
        <motion.span key={net} initial={{ scale: 0.96 }} animate={{ scale: 1 }} className="num text-[16px] font-semibold text-ink">{fmt(net)}</motion.span>
      </div>
    </div>
  );
}
