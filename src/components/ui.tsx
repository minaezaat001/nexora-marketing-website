import type { ReactNode, SVGProps } from "react";
import { useApp, type L } from "../i18n";
import { whatsappIntro, whatsappLink } from "../config/site";

export function Logo() {
  const { t } = useApp();
  return (
    <span className="flex items-center gap-2.5">
      <img src="/nexora-mark.png" alt="" width={32} height={32} className="h-8 w-8 rounded" />
      <span className="leading-none">
        <span className="block text-[16px] font-semibold tracking-[0.06em] text-ink" dir="ltr">NEXORA</span>
        <span className="mt-1 block text-[11.5px] text-muted">{t({ ar: "نكسورا لإدارة الأعمال", en: "Business management" })}</span>
      </span>
    </span>
  );
}

export function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-4 w-4 ${className}`} aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type BtnProps = { children: ReactNode; onClick?: () => void; className?: string };

export function PrimaryButton({ children, onClick, className = "" }: BtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded bg-royal px-5 text-[15px] font-medium text-white transition-colors hover:bg-royal/90 active:translate-y-px ${className}`}
    >
      {children}
    </button>
  );
}

export function WhatsAppButton({ topic, label, className = "", variant = "solid" }: { topic?: L; label?: L; className?: string; variant?: "solid" | "line" }) {
  const { lang, t } = useApp();
  const href = whatsappLink(whatsappIntro(lang, topic ? t(topic) : undefined));
  const look = variant === "solid"
    ? "bg-emerald text-white hover:bg-emerald/90"
    : "border border-ruleStrong bg-sheet text-ink hover:border-emerald hover:text-emerald";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-flex h-11 items-center justify-center gap-2 rounded px-5 text-[15px] font-medium transition-colors active:translate-y-px ${look} ${className}`}>
      <WhatsAppGlyph className="h-[18px] w-[18px]" />
      {t(label ?? { ar: "تحدث معنا عبر واتساب الآن", en: "Chat with us on WhatsApp now" })}
    </a>
  );
}

/**
 * Section frame: an index cell in mono on the structural rule, then a 4/8 split —
 * a sticky narrative column on the reading-start side and the working surface beside it.
 */
export function Section({ id, index, label, title, lead, aside, children, tone = "paper" }: {
  id: string; index: string; label: L; title: L; lead?: L; aside?: ReactNode; children: ReactNode; tone?: "paper" | "sheet";
}) {
  const { t } = useApp();
  return (
    <section id={id} className={`scroll-mt-16 border-t border-rule ${tone === "sheet" ? "bg-sheet" : ""}`}>
      <div className="mx-auto max-w-frame border-x border-rule">
        <div className="flex items-center gap-4 border-b border-rule px-5 py-3 sm:px-8">
          <span className="num text-[12.5px] text-royal">{index}</span>
          <span className="h-3 w-px bg-ruleStrong" aria-hidden="true" />
          <span className="text-[13px] text-muted">{t(label)}</span>
        </div>
        <div className="grid lg:grid-cols-12">
          <div className="border-b border-rule px-5 py-10 sm:px-8 lg:col-span-4 lg:border-b-0 lg:border-e lg:py-14">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-balance text-[30px] font-semibold text-ink sm:text-[36px]">{t(title)}</h2>
              {lead && <p className="mt-5 max-w-[46ch] text-pretty text-[16px] text-ink2">{t(lead)}</p>}
              {aside && <div className="mt-8">{aside}</div>}
            </div>
          </div>
          <div className="min-w-0 lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "ok" | "warn" | "bad" | "info" | "neutral" }) {
  const tones = {
    ok: "text-erp-ok bg-erp-ok/10",
    warn: "text-erp-warn bg-erp-warn/10",
    bad: "text-erp-bad bg-erp-bad/10",
    info: "text-[#8FB3FF] bg-erp-blue/15",
    neutral: "text-erp-muted bg-white/5",
  } as const;
  return <span className={`inline-flex items-center whitespace-nowrap rounded-[3px] px-1.5 py-px text-[11px] font-medium ${tones[tone]}`}>{children}</span>;
}
