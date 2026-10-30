import type { ReactNode, SVGProps } from "react";
import { useApp, type L } from "../i18n";
import { whatsappIntro, whatsappLink } from "../config/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <img src="/nexora-mark.png" alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-sm ring-1 ring-line" />
      {!compact && (
        <span className="leading-none">
          <span className="block text-[17px] font-bold tracking-[0.08em] text-ink" dir="ltr">NEXORA</span>
          <span className="mt-1 block text-[11px] text-muted">نكسورا · ERP</span>
        </span>
      )}
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

export function Arrow({ className = "" }: { className?: string }) {
  // Points "forward" in reading direction: right in LTR, left in RTL.
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className={`flip-x h-4 w-4 ${className}`} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
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
      className={`group inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-brand px-5 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.4)] transition hover:bg-[#2a5fd6] active:translate-y-px ${className}`}
    >
      {children}
    </button>
  );
}

export function WhatsAppButton({ topic, label, className = "", variant = "solid" }: { topic?: L; label?: L; className?: string; variant?: "solid" | "ghost" }) {
  const { lang, t } = useApp();
  const href = whatsappLink(whatsappIntro(lang, topic ? t(topic) : undefined));
  const base = "inline-flex h-11 items-center justify-center gap-2 rounded-sm px-5 text-[15px] font-semibold transition active:translate-y-px";
  const look = variant === "solid"
    ? "bg-[#1FAF5A] text-white hover:bg-[#1a9a4f] shadow-[inset_0_1px_0_rgb(255_255_255/0.18)]"
    : "border border-lineStrong text-ink hover:border-[#1FAF5A] hover:text-[#1FAF5A]";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${look} ${className}`}>
      <WhatsAppGlyph className="h-[18px] w-[18px]" />
      {t(label ?? { ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" })}
    </a>
  );
}

export function SectionHead({ eyebrow, title, lead, center = false }: { eyebrow: L; title: L; lead?: L; center?: boolean }) {
  const { t } = useApp();
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center [&_.accent-bar::before]:mx-auto" : ""}`}>
      <div className="accent-bar" />
      <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">{t(eyebrow)}</p>
      <h2 className="text-balance text-[30px] font-bold leading-[1.25] text-ink sm:text-[40px]">{t(title)}</h2>
      {lead && <p className="mt-4 text-pretty text-[17px] text-ink2">{t(lead)}</p>}
    </div>
  );
}

export function Pill({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "ok" | "warn" | "bad" | "neutral" }) {
  const tones = {
    info: "bg-accent/10 text-accent ring-accent/30",
    ok: "bg-ok/10 text-ok ring-ok/30",
    warn: "bg-warn/10 text-warn ring-warn/30",
    bad: "bg-bad/10 text-bad ring-bad/30",
    neutral: "bg-ink/5 text-muted ring-line",
  } as const;
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-medium ring-1 ${tones[tone]}`}>{children}</span>;
}
