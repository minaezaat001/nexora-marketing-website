import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fmt, useApp } from "../i18n";
import { domains } from "../data/domains";
import { Check, Section, WhatsAppButton } from "../components/ui";

export default function Tour() {
  const { t, setTopic } = useApp();
  const [id, setId] = useState(domains[0].id);
  const [opt, setOpt] = useState(0);
  const d = domains.find((x) => x.id === id)!;
  const o = d.doc.options[opt];
  const dr = o.impact.reduce((s, r) => s + (r.dr ?? 0), 0);
  const cr = o.impact.reduce((s, r) => s + (r.cr ?? 0), 0);

  const pick = (nid: string) => { setId(nid); setOpt(0); setTopic(domains.find((x) => x.id === nid)!.name); };

  const list = (
    <ul className="border-t border-rule" role="tablist" aria-orientation="vertical">
      {domains.map((x) => (
        <li key={x.id}>
          <button type="button" role="tab" aria-selected={id === x.id} onClick={() => pick(x.id)}
            className={`relative flex w-full items-baseline border-b border-rule py-3.5 text-start transition-colors ${id === x.id ? "text-ink" : "text-ink2 hover:text-ink"}`}>
            {id === x.id && <span className="absolute inset-y-2 -start-5 w-[2px] bg-royal sm:-start-8" />}
            <span className={`text-[15.5px] ${id === x.id ? "font-medium" : ""}`}>{t(x.name)}</span>
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <Section
      id="tour"
      index="01"
      label={{ ar: "الإدارات", en: "Departments" }}
      title={{ ar: "نظام واحد يغطي 8 إدارات — بدل برامج منفصلة وشيتات إكسيل متفرقة.", en: "One system for eight departments — instead of separate programs and scattered Excel sheets." }}
      lead={{ ar: "اختار الإدارة، وجرّب بنفسك: غيّر الاختيار في المستند وشوف الحسابات بتتظبط لوحدها قدامك.", en: "Pick a department and try it yourself: change the option on the document and watch the books update in front of you." }}
      aside={list}
    >
      <AnimatePresence mode="wait">
        <motion.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
          <p className="border-b border-rule px-5 py-6 text-[19px] font-medium leading-[1.5] text-ink sm:px-8 sm:text-[21px]">{t(d.pitch)}</p>
          {/* document sheet */}
          <div className="border-b border-rule bg-sheet">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule px-5 py-5 sm:px-8">
              <h3 className="text-[20px] font-semibold text-ink">{t(d.doc.title)}</h3>
              <span className="num text-[14px] text-ink2">{d.doc.no}</span>
            </div>
            <dl className="grid grid-cols-2 border-b border-rule sm:grid-cols-4">
              {d.doc.fields.map((f, i) => (
                <div key={f.k.en} className={`px-5 py-4 sm:px-8 ${i % 2 === 0 ? "border-e" : "sm:border-e"} border-rule ${i < 2 ? "border-b sm:border-b-0" : ""} last:border-e-0`}>
                  <dt className="text-[12px] text-muted">{t(f.k)}</dt>
                  <dd className={`mt-1 text-[14px] text-ink ${typeof f.v === "string" ? "num text-start" : ""}`}>{typeof f.v === "string" ? f.v : t(f.v)}</dd>
                </div>
              ))}
            </dl>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-rule bg-paper">
                    {d.doc.lines.cols.map((c, i) => <th key={c.en} className={`px-5 py-2.5 text-[12.5px] font-medium text-muted sm:px-8 ${i === 0 ? "text-start" : "text-end"}`}>{t(c)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {d.doc.lines.rows.map((r, ri) => (
                    <tr key={ri} className="border-b border-rule last:border-b-0">
                      {r.map((c, ci) => (
                        <td key={ci} className={`px-5 py-3 sm:px-8 ${ci === 0 ? "text-ink" : "num text-end text-ink2"}`}>{typeof c === "string" ? c : t(c)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* option switch */}
          <div className="flex flex-wrap items-center gap-3 border-b border-rule px-5 py-4 sm:px-8">
            <span className="text-[13.5px] text-ink2">{t(d.doc.switchLabel)}</span>
            <div className="flex divide-x divide-rule overflow-hidden rounded border border-ruleStrong rtl:divide-x-reverse" role="radiogroup">
              {d.doc.options.map((x, i) => (
                <button key={x.l.en} type="button" role="radio" aria-checked={opt === i} onClick={() => setOpt(i)}
                  className={`px-3.5 py-1.5 text-[13.5px] transition-colors ${opt === i ? "bg-ink text-paper" : "bg-sheet text-ink2 hover:text-ink"}`}>
                  {t(x.l)}
                </button>
              ))}
            </div>
          </div>

          {/* accounting impact */}
          <div className="grid border-b border-rule md:grid-cols-[1.4fr_1fr]">
            <div className="border-b border-rule md:border-b-0 md:border-e">
              <div className="flex items-baseline justify-between px-5 pb-2 pt-5 sm:px-8">
                <span className="text-[14px] font-medium text-ink">{t({ ar: "اللي حصل في حساباتك", en: "What happened in your books" })}</span>
                {o.impact.length > 0 && <span className={`text-[12.5px] ${dr === cr ? "text-emerald" : "text-bad"}`}>{dr === cr ? t({ ar: "متوازن", en: "Balanced" }) : t({ ar: "غير متوازن", en: "Unbalanced" })}</span>}
              </div>
              {o.impact.length > 0 ? (
                <table className="w-full border-collapse text-[13.5px]">
                  <thead><tr className="text-[12px] text-muted"><th className="px-5 py-2 text-start font-normal sm:px-8">{t({ ar: "الحساب", en: "Account" })}</th><th className="px-3 py-2 text-end font-normal">{t({ ar: "مدين", en: "Dr" })}</th><th className="px-5 py-2 text-end font-normal sm:px-8">{t({ ar: "دائن", en: "Cr" })}</th></tr></thead>
                  <tbody>
                    {o.impact.map((r) => (
                      <tr key={r.acc + (r.dr ?? 0)} className="border-t border-rule">
                        <td className="px-5 py-2.5 sm:px-8"><span className="me-2 inline-block"><span className="num text-muted">{r.acc}</span></span><span className="text-ink">{t(r.name)}</span></td>
                        <td className="num px-3 py-2.5 text-end text-ink">{r.dr ? fmt(r.dr) : ""}</td>
                        <td className="num px-5 py-2.5 text-end text-ink sm:px-8">{r.cr ? fmt(r.cr) : ""}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-ink/80 font-medium">
                      <td className="px-5 py-2.5 text-ink sm:px-8">{t({ ar: "الإجمالي", en: "Total" })}</td>
                      <td className="num px-3 py-2.5 text-end text-ink">{fmt(dr)}</td>
                      <td className="num px-5 py-2.5 text-end text-ink sm:px-8">{fmt(cr)}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className={`mx-5 mb-5 mt-2 border-s-2 ps-3 text-[14px] sm:mx-8 ${o.blocked ? "border-bad text-bad" : "border-ruleStrong text-ink2"}`}>{t(o.note)}</p>
              )}
              {o.impact.length > 0 && <p className="px-5 pb-5 pt-3 text-[13px] text-muted sm:px-8">{t(o.note)}</p>}
            </div>
            <div className="px-5 py-5 sm:px-8">
              <ul className="space-y-2.5">
                {d.capabilities.map((c) => (
                  <li key={c.en} className="flex gap-2.5 text-[14px] text-ink2"><Check className="mt-1 shrink-0 text-emerald" />{t(c)}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 px-5 py-5 sm:px-8">
            <p className="flex-1 text-[14px] text-ink2">{t({ ar: "عايز تشوف الإدارة دي على أرقام شركتك؟", en: "Want to see this department with your own numbers?" })}</p>
            <WhatsAppButton variant="line" topic={d.name} label={{ ar: "اسألنا عنها على واتساب", en: "Ask us on WhatsApp" }} />
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
