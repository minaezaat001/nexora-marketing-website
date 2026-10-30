import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "./config/site";

export type L = { ar: string; en: string };
type Theme = "dark" | "light";

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  theme: Theme;
  setLang: (l: Lang) => void;
  toggleTheme: () => void;
  t: (s: L) => string;
  /** Topic the visitor is currently looking at — feeds the floating WhatsApp message. */
  topic: L | null;
  setTopic: (s: L | null) => void;
  demoOpen: boolean;
  openDemo: (preset?: Partial<DemoPreset>) => void;
  closeDemo: () => void;
  demoPreset: Partial<DemoPreset>;
};

export type DemoPreset = { segment: "factory" | "company" | "retail"; modules: string[] };

const AppCtx = createContext<Ctx | null>(null);

function read(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (read("nx-lang") === "en" ? "en" : "ar"));
  const [theme, setTheme] = useState<Theme>(() => (read("nx-theme") === "light" ? "light" : "dark"));
  const [topic, setTopic] = useState<L | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoPreset, setDemoPreset] = useState<Partial<DemoPreset>>({});
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = dir;
    document.title = lang === "ar" ? "نكسورا NEXORA ERP — نظام إدارة أعمال متكامل" : "NEXORA ERP — The integrated ERP built Arabic-first";
    write("nx-lang", lang);
  }, [lang, dir]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    write("nx-theme", theme);
  }, [theme]);

  const t = useCallback((s: L) => s[lang], [lang]);
  const value = useMemo<Ctx>(() => ({
    lang, dir, theme, t, topic, setTopic,
    setLang: setLangState,
    toggleTheme: () => setTheme((x) => (x === "dark" ? "light" : "dark")),
    demoOpen, demoPreset,
    openDemo: (preset = {}) => { setDemoPreset(preset); setDemoOpen(true); },
    closeDemo: () => setDemoOpen(false),
  }), [lang, dir, theme, t, topic, demoOpen, demoPreset]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const v = useContext(AppCtx);
  if (!v) throw new Error("useApp outside AppProvider");
  return v;
}

const nf = new Intl.NumberFormat("en-US");
/** The ERP shows Western digits, comma-grouped, in both languages. */
export const fmt = (n: number) => nf.format(Math.round(n));
