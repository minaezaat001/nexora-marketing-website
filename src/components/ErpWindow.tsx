import { useMemo, useState } from "react";
import { fmt, useApp, type L } from "../i18n";
import { views, type Cell } from "../data/erpViews";
import { Tag } from "./ui";

const branches: { id: "all" | "cai" | "alx"; l: L }[] = [
  { id: "cai", l: { ar: "الفرع الرئيسي — القاهرة", en: "Head branch — Cairo" } },
  { id: "alx", l: { ar: "فرع الإسكندرية", en: "Alexandria branch" } },
  { id: "all", l: { ar: "كل الفروع", en: "All branches" } },
];

function text(c: Cell, t: (s: L) => string) {
  if (typeof c === "string") return c;
  if ("tag" in c) return t(c.tag);
  return t(c);
}

export default function ErpWindow() {
  const { t } = useApp();
  const [viewId, setViewId] = useState("sales");
  const [filter, setFilter] = useState("");
  const [q, setQ] = useState("");
  const [branch, setBranch] = useState<"all" | "cai" | "alx">("cai");
  const [sel, setSel] = useState<number | null>(0);
  const [toast, setToast] = useState(false);
  const v = views.find((x) => x.id === viewId)!;

  const rows = useMemo(() => v.rows.filter((r) =>
    (!filter || r.key === filter) &&
    (branch === "all" || !r.branch || r.branch === branch) &&
    (!q || r.cells.some((c) => text(c, t).toLowerCase().includes(q.toLowerCase())))
  ), [v, filter, branch, q, t]);
  const total = rows.reduce((s, r) => s + (r.total ?? 0), 0);

  const open = (id: string) => { setViewId(id); setFilter(""); setQ(""); setSel(0); };
  const act = () => { setToast(true); window.setTimeout(() => setToast(false), 2200); };

  return (
    <div className="relative overflow-hidden rounded-md bg-erp-bg text-erp-ink shadow-[0_1px_0_rgb(255_255_255/0.06)_inset,0_40px_80px_-30px_rgb(11_17_32/0.55),0_0_0_1px_rgb(11_17_32/0.9)]">
      {/* title bar */}
      <div className="flex h-9 items-center gap-3 border-b border-erp-line bg-erp-side px-3">
        <span className="flex gap-1.5" dir="ltr"><i className="h-2.5 w-2.5 rounded-full bg-[#3a4560]" /><i className="h-2.5 w-2.5 rounded-full bg-[#3a4560]" /><i className="h-2.5 w-2.5 rounded-full bg-[#3a4560]" /></span>
        <span className="num mx-auto truncate text-[11px] text-erp-muted">erp.nexora.app/{v.id}</span>
      </div>

      <div className="flex" style={{ minHeight: 470 }}>
        {/* sidebar — sits on the right, as in the ERP */}
        <aside className="hidden w-[200px] shrink-0 flex-col border-e border-erp-line bg-erp-side md:flex">
          <div className="flex items-center gap-2 border-b border-erp-line px-3 py-3">
            <img src="/nexora-mark.png" alt="" className="h-7 w-7 rounded" />
            <div className="leading-tight">
              <div className="text-[13px] font-semibold">NEXORA</div>
              <div className="num text-[10px] text-erp-muted">V1.1</div>
            </div>
          </div>
          <nav className="flex-1 px-2 py-2">
            <div className="px-2 pb-1 pt-1 text-[10.5px] text-erp-muted">{t({ ar: "التشغيل", en: "Operations" })}</div>
            {views.map((x, i) => (
              <div key={x.id}>
                {i === 4 && <div className="px-2 pb-1 pt-3 text-[10.5px] text-erp-muted">{t({ ar: "المالية والإدارة", en: "Finance & admin" })}</div>}
                <button type="button" onClick={() => open(x.id)}
                  className={`relative flex w-full items-center rounded px-2.5 py-[7px] text-start text-[12.5px] transition-colors ${viewId === x.id ? "bg-erp-blue/15 font-medium text-erp-ink" : "text-erp-ink2 hover:bg-white/[0.04]"}`}>
                  {viewId === x.id && <span className="absolute inset-y-1.5 start-0 w-[2px] rounded-full bg-erp-blue" />}
                  {t(x.nav)}
                </button>
              </div>
            ))}
          </nav>
          <div className="border-t border-erp-line px-3 py-2.5 text-[11px] text-erp-muted">
            <div className="text-erp-ink2">{t({ ar: "أحمد سمير", en: "Ahmed Samir" })}</div>
            {t({ ar: "رئيس الحسابات", en: "Chief accountant" })}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* header bar: breadcrumb, branch, period */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-erp-line px-4 py-2.5 text-[12px]">
            <nav className="flex items-center gap-1.5 text-erp-muted" aria-label="breadcrumb">
              <span>{t({ ar: "الرئيسية", en: "Home" })}</span>
              {v.crumb.map((c, i) => (
                <span key={c.en} className="flex items-center gap-1.5">
                  <span className="text-erp-lineStrong">/</span>
                  <span className={i === v.crumb.length - 1 ? "text-erp-ink" : ""}>{t(c)}</span>
                </span>
              ))}
            </nav>
            <span className="ms-auto" />
            <select aria-label={t({ ar: "الفرع", en: "Branch" })} value={branch} onChange={(e) => setBranch(e.target.value as typeof branch)}
              className="h-7 rounded border border-erp-line bg-erp-surface px-2 text-[11.5px] text-erp-ink2">
              {branches.map((b) => <option key={b.id} value={b.id}>{t(b.l)}</option>)}
            </select>
            <span className="inline-flex h-7 items-center gap-1.5 rounded border border-erp-ok/30 bg-erp-ok/10 px-2 text-[11.5px] text-erp-ok">
              <i className="h-1.5 w-1.5 rounded-full bg-erp-ok" />{t({ ar: "الفترة المالية 2026 مفتوحة", en: "Fiscal period 2026 open" })}
            </span>
          </div>

          {/* mobile module switcher */}
          <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-erp-line px-3 py-2 md:hidden">
            {views.map((x) => (
              <button key={x.id} type="button" onClick={() => open(x.id)} className={`shrink-0 rounded px-2.5 py-1 text-[12px] ${viewId === x.id ? "bg-erp-blue/20 text-erp-ink" : "text-erp-muted"}`}>{t(x.nav)}</button>
            ))}
          </div>

          {/* page head + toolbar */}
          <div className="flex flex-wrap items-center gap-3 px-4 pb-3 pt-4">
            <h3 className="text-[16px] font-semibold">{t(v.title)}</h3>
            <span className="num text-[11px] text-erp-muted">{rows.length}/{v.rows.length}</span>
            <button type="button" onClick={act} className="ms-auto h-8 rounded bg-erp-btn px-3 text-[12px] font-medium text-white hover:bg-[#2a5fd6]">+ {t(v.action)}</button>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-b border-erp-line px-4 pb-3">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ ar: "بحث بالرقم أو الاسم…", en: "Search by number or name…" })} aria-label={t({ ar: "بحث", en: "Search" })}
              className="h-8 w-full rounded border border-erp-line bg-erp-surface px-2.5 text-[12px] text-erp-ink placeholder:text-erp-muted focus:border-erp-blue focus:outline-none sm:w-56" />
            <div className="flex gap-1">
              {v.filters.map((f) => (
                <button key={f.key} type="button" onClick={() => setFilter(f.key)}
                  className={`h-8 rounded border px-2.5 text-[11.5px] transition-colors ${filter === f.key ? "border-erp-blue/60 bg-erp-blue/15 text-erp-ink" : "border-erp-line text-erp-muted hover:text-erp-ink2"}`}>
                  {t(f.label)}
                </button>
              ))}
            </div>
          </div>

          {/* dense table, styled after the ERP's .nx-table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-[12.5px]">
              <thead>
                <tr className="bg-erp-surface2/70">
                  {v.cols.map((c) => <th key={c.h.en} className={`whitespace-nowrap border-b border-erp-line px-3.5 py-2 text-[11.5px] font-semibold text-erp-ink2 ${c.num ? "text-end" : "text-start"}`}>{t(c.h)}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={ri} onClick={() => setSel(ri)} className={`cursor-default border-b border-erp-line/70 transition-colors ${sel === ri ? "bg-erp-blue/[0.12]" : "hover:bg-white/[0.025]"}`}>
                    {r.cells.map((c, ci) => {
                      const isNum = v.cols[ci]?.num;
                      const isCode = typeof c === "string" && /^[A-Z]{2,4}-|^\d{4}-\d{2}-\d{2}$|^[\d,.]+$/.test(c);
                      return (
                        <td key={ci} className={`whitespace-nowrap px-3.5 py-[9px] ${isNum ? "text-end" : ""} ${ci === 0 ? "text-erp-ink" : "text-erp-ink2"}`}>
                          {typeof c === "object" && "tag" in c ? <Tag tone={c.tone}>{t(c.tag)}</Tag>
                            : <span className={isCode || isNum ? "num" : ""}>{text(c, t)}</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={v.cols.length} className="px-4 py-10 text-center text-erp-muted">{t({ ar: "مفيش نتائج — غيّر البحث أو الفلتر أو الفرع.", en: "No results — change the search, filter or branch." })}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* status bar */}
          <div className="flex items-center gap-4 border-t border-erp-line bg-erp-side px-4 py-2 text-[11px] text-erp-muted">
            <span>{t({ ar: "بيئة تجريبية", en: "Demo environment" })}</span>
            {v.totalLabel && <span className="ms-auto">{t(v.totalLabel)}: <b className="num font-medium text-erp-ink">{fmt(total)}</b></span>}
          </div>
        </div>
      </div>

      <div aria-live="polite" className={`pointer-events-none absolute bottom-6 start-1/2 -translate-x-1/2 rounded border border-erp-line bg-erp-surface px-3 py-2 text-[12px] text-erp-ink shadow-lg transition-opacity ${toast ? "opacity-100" : "opacity-0"}`}>
        {t({ ar: "دي نسخة عرض — الإدخال الحقيقي في الديمو العملي.", en: "This is a preview — real data entry happens in the live demo." })}
      </div>
    </div>
  );
}
