import type { L } from "../i18n";

export type Tone = "ok" | "warn" | "bad" | "info" | "neutral";
export type Cell = string | L | { tag: L; tone: Tone };
export type Row = { cells: Cell[]; key: string; branch?: "cai" | "alx"; total?: number };
export type View = {
  id: string;
  nav: L;
  crumb: L[];
  title: L;
  action: L;
  cols: { h: L; num?: boolean }[];
  /** Filter chips match against the row's `key` field. */
  filters: { label: L; key: string }[];
  rows: Row[];
  totalLabel?: L;
};

const s = (tag: L, tone: Tone): Cell => ({ tag, tone });
const credit = { ar: "آجل", en: "Credit" }, cash = { ar: "نقدي", en: "Cash" };
const posted = s({ ar: "مرحّل", en: "Posted" }, "ok");

export const views: View[] = [
  {
    id: "sales",
    nav: { ar: "المبيعات", en: "Sales" },
    crumb: [{ ar: "المبيعات", en: "Sales" }, { ar: "فواتير المبيعات", en: "Sales invoices" }],
    title: { ar: "فواتير المبيعات", en: "Sales invoices" },
    action: { ar: "فاتورة جديدة", en: "New invoice" },
    cols: [{ h: { ar: "رقم الفاتورة", en: "Invoice" } }, { h: { ar: "التاريخ", en: "Date" } }, { h: { ar: "العميل", en: "Customer" } }, { h: { ar: "الدفع", en: "Payment" } }, { h: { ar: "الإجمالي", en: "Total" }, num: true }, { h: { ar: "القيد", en: "Entry" } }],
    filters: [{ label: { ar: "الكل", en: "All" }, key: "" }, { label: credit, key: "credit" }, { label: cash, key: "cash" }],
    totalLabel: { ar: "إجمالي المعروض", en: "Shown total" },
    rows: [
      { key: "credit", branch: "cai", total: 18240, cells: ["INV-2026-0162", "2026-10-29", { ar: "شركة النيل للمقاولات", en: "Nile Contracting Co." }, credit, "18,240.00", "JV-2026-0891"] },
      { key: "cash", branch: "cai", total: 4788, cells: ["INV-2026-0161", "2026-10-29", { ar: "عميل نقدي", en: "Walk-in customer" }, cash, "4,788.00", "JV-2026-0890"] },
      { key: "credit", branch: "alx", total: 31350, cells: ["INV-2026-0160", "2026-10-28", { ar: "فندق سان ستيفانو", en: "San Stefano Hotel" }, credit, "31,350.00", "JV-2026-0887"] },
      { key: "cash", branch: "alx", total: 969, cells: ["INV-2026-0159", "2026-10-28", { ar: "عميل نقدي", en: "Walk-in customer" }, cash, "969.00", "JV-2026-0886"] },
      { key: "credit", branch: "cai", total: 59280, cells: ["INV-2026-0158", "2026-10-27", { ar: "مكاتب الدلتا للاستشارات", en: "Delta Consulting Offices" }, credit, "59,280.00", "JV-2026-0884"] },
      { key: "cash", branch: "cai", total: 2394, cells: ["INV-2026-0157", "2026-10-27", { ar: "عميل نقدي", en: "Walk-in customer" }, cash, "2,394.00", "JV-2026-0882"] },
      { key: "credit", branch: "alx", total: 14820, cells: ["INV-2026-0156", "2026-10-26", { ar: "مستشفى السلام الدولي", en: "As-Salam Intl. Hospital" }, credit, "14,820.00", "JV-2026-0879"] },
    ],
  },
  {
    id: "purchases",
    nav: { ar: "المشتريات", en: "Purchasing" },
    crumb: [{ ar: "المشتريات", en: "Purchasing" }, { ar: "أوامر الشراء", en: "Purchase orders" }],
    title: { ar: "أوامر الشراء", en: "Purchase orders" },
    action: { ar: "أمر شراء جديد", en: "New PO" },
    cols: [{ h: { ar: "رقم الأمر", en: "PO" } }, { h: { ar: "طلب الشراء", en: "Requisition" } }, { h: { ar: "المورد", en: "Supplier" } }, { h: { ar: "التاريخ", en: "Date" } }, { h: { ar: "القيمة", en: "Value" }, num: true }, { h: { ar: "الحالة", en: "Status" } }],
    filters: [{ label: { ar: "الكل", en: "All" }, key: "" }, { label: { ar: "بانتظار الاعتماد", en: "Awaiting approval" }, key: "wait" }, { label: { ar: "معتمد", en: "Approved" }, key: "ok" }],
    totalLabel: { ar: "قيمة الأوامر", en: "Orders value" },
    rows: [
      { key: "wait", branch: "cai", total: 84000, cells: ["PO-2026-0048", "PR-2026-0061", { ar: "مصنع الأمل للأخشاب", en: "Al-Amal Timber Works" }, "2026-10-29", "84,000.00", s({ ar: "بانتظار الاعتماد", en: "Awaiting approval" }, "warn")] },
      { key: "ok", branch: "cai", total: 26800, cells: ["PO-2026-0047", "PR-2026-0059", { ar: "النساجون الشرقيون", en: "Oriental Weavers" }, "2026-10-27", "26,800.00", s({ ar: "مستلم جزئيًا", en: "Partly received" }, "info")] },
      { key: "ok", branch: "alx", total: 15600, cells: ["PO-2026-0046", "PR-2026-0057", { ar: "إضاءة المستقبل", en: "Future Lighting" }, "2026-10-24", "15,600.00", s({ ar: "مستلم بالكامل", en: "Fully received" }, "ok")] },
      { key: "ok", branch: "cai", total: 41200, cells: ["PO-2026-0045", "PR-2026-0055", { ar: "الشركة العربية للرخام", en: "Arab Marble Co." }, "2026-10-21", "41,200.00", s({ ar: "مستلم بالكامل", en: "Fully received" }, "ok")] },
      { key: "wait", branch: "alx", total: 9850, cells: ["PO-2026-0044", "PR-2026-0054", { ar: "مؤسسة الإسفنج الحديث", en: "Modern Foam Est." }, "2026-10-20", "9,850.00", s({ ar: "بانتظار الاعتماد", en: "Awaiting approval" }, "warn")] },
    ],
  },
  {
    id: "inventory",
    nav: { ar: "المخازن", en: "Inventory" },
    crumb: [{ ar: "المخازن", en: "Inventory" }, { ar: "أرصدة الأصناف", en: "Item balances" }],
    title: { ar: "أرصدة الأصناف بالتكلفة", en: "Item balances at cost" },
    action: { ar: "تحويل بين المخازن", en: "Transfer stock" },
    cols: [{ h: { ar: "الكود", en: "Code" } }, { h: { ar: "الصنف", en: "Item" } }, { h: { ar: "الكمية", en: "Qty" }, num: true }, { h: { ar: "حد الطلب", en: "Reorder" }, num: true }, { h: { ar: "متوسط التكلفة", en: "Avg. cost" }, num: true }, { h: { ar: "القيمة", en: "Value" }, num: true }],
    filters: [{ label: { ar: "الكل", en: "All" }, key: "" }, { label: { ar: "تحت حد الطلب", en: "Below reorder" }, key: "low" }],
    totalLabel: { ar: "قيمة المخزون", en: "Stock value" },
    rows: [
      { key: "", branch: "cai", total: 42000, cells: ["ITM-001", { ar: "طقم غرفة نوم خشب زان", en: "Beech bedroom set" }, "14", "5", "3,000.00", "42,000.00"] },
      { key: "low", branch: "cai", total: 14700, cells: ["ITM-003", { ar: "طقم صالون كلاسيك ٧ مقاعد", en: "Classic 7-seat salon set" }, s({ ar: "3", en: "3" }, "bad"), "4", "4,900.00", "14,700.00"] },
      { key: "", branch: "alx", total: 19800, cells: ["ITM-004", { ar: "كنبة زاوية قماش", en: "Fabric corner sofa" }, "9", "4", "2,200.00", "19,800.00"] },
      { key: "", branch: "cai", total: 25760, cells: ["ITM-007", { ar: "كرسي مكتب جلد طبي", en: "Ergonomic office chair" }, "46", "20", "560.00", "25,760.00"] },
      { key: "low", branch: "cai", total: 3120, cells: ["ITM-009", { ar: "ثريا كريستال معلقة", en: "Crystal chandelier" }, s({ ar: "4", en: "4" }, "bad"), "8", "780.00", "3,120.00"] },
      { key: "low", branch: "alx", total: 3120, cells: ["ITM-010", { ar: "ستارة بلاك أوت ٣م", en: "Blackout curtain 3m" }, s({ ar: "12", en: "12" }, "bad"), "25", "260.00", "3,120.00"] },
      { key: "", branch: "alx", total: 20580, cells: ["ITM-013", { ar: "مرتبة طبية ١٨٠×٢٠٠", en: "Orthopedic mattress 180×200" }, "21", "10", "980.00", "20,580.00"] },
    ],
  },
  {
    id: "treasury",
    nav: { ar: "الخزينة والشيكات", en: "Treasury & cheques" },
    crumb: [{ ar: "الخزينة والشيكات", en: "Treasury & cheques" }, { ar: "حافظة الشيكات", en: "Cheque portfolio" }],
    title: { ar: "حافظة الشيكات", en: "Cheque portfolio" },
    action: { ar: "تسجيل شيك", en: "Record cheque" },
    cols: [{ h: { ar: "رقم الشيك", en: "Cheque" } }, { h: { ar: "الطرف", en: "Party" } }, { h: { ar: "البنك", en: "Bank" } }, { h: { ar: "الاستحقاق", en: "Due" } }, { h: { ar: "المبلغ", en: "Amount" }, num: true }, { h: { ar: "الحالة", en: "Status" } }],
    filters: [{ label: { ar: "الكل", en: "All" }, key: "" }, { label: { ar: "تحت التحصيل", en: "Pending" }, key: "pend" }, { label: { ar: "تم التحصيل", en: "Collected" }, key: "done" }, { label: { ar: "مرتد", en: "Bounced" }, key: "bad" }],
    totalLabel: { ar: "إجمالي الحافظة", en: "Portfolio total" },
    rows: [
      { key: "pend", branch: "cai", total: 25000, cells: ["CHQ-00418", { ar: "شركة النيل للمقاولات", en: "Nile Contracting Co." }, { ar: "البنك الأهلي", en: "National Bank of Egypt" }, "2026-11-15", "25,000.00", s({ ar: "تحت التحصيل", en: "Pending collection" }, "warn")] },
      { key: "pend", branch: "alx", total: 12500, cells: ["CHQ-00417", { ar: "فندق سان ستيفانو", en: "San Stefano Hotel" }, { ar: "بنك مصر", en: "Banque Misr" }, "2026-11-05", "12,500.00", s({ ar: "تحت التحصيل", en: "Pending collection" }, "warn")] },
      { key: "done", branch: "cai", total: 40000, cells: ["CHQ-00412", { ar: "مكاتب الدلتا للاستشارات", en: "Delta Consulting Offices" }, { ar: "البنك التجاري الدولي", en: "CIB" }, "2026-10-25", "40,000.00", s({ ar: "تم التحصيل", en: "Collected" }, "ok")] },
      { key: "bad", branch: "cai", total: 8000, cells: ["CHQ-00409", { ar: "معرض الفيروز", en: "Fayrouz Showroom" }, { ar: "بنك القاهرة", en: "Banque du Caire" }, "2026-10-20", "8,000.00", s({ ar: "مرتد", en: "Bounced" }, "bad")] },
      { key: "done", branch: "alx", total: 18000, cells: ["CHQ-00405", { ar: "مستشفى السلام الدولي", en: "As-Salam Intl. Hospital" }, { ar: "البنك الأهلي", en: "National Bank of Egypt" }, "2026-10-15", "18,000.00", s({ ar: "تم التحصيل", en: "Collected" }, "ok")] },
    ],
  },
  {
    id: "accounts",
    nav: { ar: "الحسابات العامة", en: "General ledger" },
    crumb: [{ ar: "الحسابات العامة", en: "General ledger" }, { ar: "اليومية العامة", en: "General journal" }],
    title: { ar: "اليومية العامة", en: "General journal" },
    action: { ar: "قيد يدوي", en: "Manual entry" },
    cols: [{ h: { ar: "رقم القيد", en: "Entry" } }, { h: { ar: "التاريخ", en: "Date" } }, { h: { ar: "البيان", en: "Description" } }, { h: { ar: "مدين", en: "Debit" }, num: true }, { h: { ar: "دائن", en: "Credit" }, num: true }, { h: { ar: "الحالة", en: "Status" } }],
    filters: [{ label: { ar: "الكل", en: "All" }, key: "" }, { label: { ar: "تلقائي", en: "Automatic" }, key: "auto" }, { label: { ar: "يدوي", en: "Manual" }, key: "man" }],
    totalLabel: { ar: "إجمالي المدين", en: "Total debit" },
    rows: [
      { key: "auto", branch: "cai", total: 18240, cells: ["JV-2026-0891", "2026-10-29", { ar: "فاتورة مبيعات INV-2026-0162", en: "Sales invoice INV-2026-0162" }, "18,240.00", "18,240.00", posted] },
      { key: "auto", branch: "cai", total: 4788, cells: ["JV-2026-0890", "2026-10-29", { ar: "فاتورة مبيعات INV-2026-0161", en: "Sales invoice INV-2026-0161" }, "4,788.00", "4,788.00", posted] },
      { key: "auto", branch: "cai", total: 9500, cells: ["JV-2026-0889", "2026-10-29", { ar: "سند قبض RV-2026-0207", en: "Receipt RV-2026-0207" }, "9,500.00", "9,500.00", posted] },
      { key: "man", branch: "cai", total: 3125, cells: ["JV-2026-0888", "2026-10-28", { ar: "إهلاك الأصول الثابتة — أكتوبر", en: "Fixed-asset depreciation — October" }, "3,125.00", "3,125.00", posted] },
      { key: "auto", branch: "alx", total: 31350, cells: ["JV-2026-0887", "2026-10-28", { ar: "فاتورة مبيعات INV-2026-0160", en: "Sales invoice INV-2026-0160" }, "31,350.00", "31,350.00", posted] },
      { key: "auto", branch: "cai", total: 26800, cells: ["JV-2026-0885", "2026-10-27", { ar: "فاتورة مشتريات PI-2026-0133", en: "Purchase invoice PI-2026-0133" }, "26,800.00", "26,800.00", posted] },
    ],
  },
  {
    id: "customers",
    nav: { ar: "العملاء والموردين", en: "Customers & suppliers" },
    crumb: [{ ar: "العملاء والموردين", en: "Customers & suppliers" }, { ar: "أرصدة العملاء", en: "Customer balances" }],
    title: { ar: "أرصدة العملاء وحدود الائتمان", en: "Customer balances & credit limits" },
    action: { ar: "عميل جديد", en: "New customer" },
    cols: [{ h: { ar: "الكود", en: "Code" } }, { h: { ar: "العميل", en: "Customer" } }, { h: { ar: "حد الائتمان", en: "Credit limit" }, num: true }, { h: { ar: "الرصيد", en: "Balance" }, num: true }, { h: { ar: "آخر حركة", en: "Last activity" } }, { h: { ar: "الوضع", en: "Status" } }],
    filters: [{ label: { ar: "الكل", en: "All" }, key: "" }, { label: { ar: "تجاوز الحد", en: "Over limit" }, key: "over" }],
    totalLabel: { ar: "إجمالي المديونية", en: "Total receivables" },
    rows: [
      { key: "", branch: "cai", total: 38240, cells: ["CUST-014", { ar: "شركة النيل للمقاولات", en: "Nile Contracting Co." }, "60,000.00", "38,240.00", "2026-10-29", s({ ar: "ضمن الحد", en: "Within limit" }, "ok")] },
      { key: "over", branch: "alx", total: 46850, cells: ["CUST-022", { ar: "فندق سان ستيفانو", en: "San Stefano Hotel" }, "40,000.00", "46,850.00", "2026-10-28", s({ ar: "تجاوز الحد", en: "Over limit" }, "bad")] },
      { key: "", branch: "cai", total: 19280, cells: ["CUST-031", { ar: "مكاتب الدلتا للاستشارات", en: "Delta Consulting Offices" }, "75,000.00", "19,280.00", "2026-10-27", s({ ar: "ضمن الحد", en: "Within limit" }, "ok")] },
      { key: "", branch: "alx", total: 7344, cells: ["CUST-037", { ar: "مستشفى السلام الدولي", en: "As-Salam Intl. Hospital" }, "50,000.00", "7,344.00", "2026-10-26", s({ ar: "ضمن الحد", en: "Within limit" }, "ok")] },
    ],
  },
  {
    id: "hr",
    nav: { ar: "الموارد البشرية", en: "HR & payroll" },
    crumb: [{ ar: "الموارد البشرية", en: "HR & payroll" }, { ar: "مسير رواتب أكتوبر", en: "October payroll" }],
    title: { ar: "مسير رواتب أكتوبر 2026", en: "October 2026 payroll" },
    action: { ar: "اعتماد المسير", en: "Approve payroll" },
    cols: [{ h: { ar: "الكود", en: "Code" } }, { h: { ar: "الموظف", en: "Employee" } }, { h: { ar: "الأساسي", en: "Basic" }, num: true }, { h: { ar: "إضافي", en: "Overtime" }, num: true }, { h: { ar: "خصومات", en: "Deductions" }, num: true }, { h: { ar: "الصافي", en: "Net" }, num: true }],
    filters: [{ label: { ar: "الكل", en: "All" }, key: "" }, { label: { ar: "عليه خصومات", en: "With deductions" }, key: "ded" }],
    totalLabel: { ar: "صافي المسير", en: "Net payroll" },
    rows: [
      { key: "", branch: "cai", total: 15100, cells: ["EMP-001", { ar: "أحمد سمير — محاسب", en: "Ahmed Samir — Accountant" }, "14,500.00", "600.00", "0.00", "15,100.00"] },
      { key: "ded", branch: "cai", total: 9423, cells: ["EMP-002", { ar: "منى عادل — أمينة مخزن", en: "Mona Adel — Storekeeper" }, "9,800.00", "0.00", "377.00", "9,423.00"] },
      { key: "", branch: "alx", total: 12100, cells: ["EMP-003", { ar: "كريم حسن — مبيعات", en: "Karim Hassan — Sales" }, "11,200.00", "900.00", "0.00", "12,100.00"] },
      { key: "ded", branch: "alx", total: 8269, cells: ["EMP-004", { ar: "سارة يوسف — كاشير", en: "Sara Youssef — Cashier" }, "8,600.00", "0.00", "331.00", "8,269.00"] },
    ],
  },
  {
    id: "settings",
    nav: { ar: "الإعدادات والصلاحيات", en: "Settings & permissions" },
    crumb: [{ ar: "الإعدادات والصلاحيات", en: "Settings & permissions" }, { ar: "الأدوار", en: "Roles" }],
    title: { ar: "الأدوار ونطاق البيانات", en: "Roles & data scope" },
    action: { ar: "دور جديد", en: "New role" },
    cols: [{ h: { ar: "الدور", en: "Role" } }, { h: { ar: "المبيعات", en: "Sales" } }, { h: { ar: "المشتريات", en: "Purchasing" } }, { h: { ar: "الحسابات", en: "Ledger" } }, { h: { ar: "النطاق", en: "Scope" } }, { h: { ar: "المستخدمون", en: "Users" }, num: true }],
    filters: [{ label: { ar: "الكل", en: "All" }, key: "" }, { label: { ar: "أدوار النظام", en: "System roles" }, key: "sys" }],
    rows: [
      { key: "sys", cells: [{ ar: "مدير النظام", en: "Administrator" }, s({ ar: "كامل", en: "Full" }, "ok"), s({ ar: "كامل", en: "Full" }, "ok"), s({ ar: "كامل", en: "Full" }, "ok"), { ar: "الشركة", en: "Company" }, "2"] },
      { key: "", cells: [{ ar: "رئيس الحسابات", en: "Chief accountant" }, s({ ar: "عرض", en: "View" }, "info"), s({ ar: "عرض", en: "View" }, "info"), s({ ar: "كامل", en: "Full" }, "ok"), { ar: "الشركة", en: "Company" }, "1"] },
      { key: "", cells: [{ ar: "مدير فرع", en: "Branch manager" }, s({ ar: "إنشاء وتعديل", en: "Create & edit" }, "ok"), s({ ar: "طلب فقط", en: "Request only" }, "warn"), s({ ar: "عرض", en: "View" }, "info"), { ar: "فرعه", en: "Own branch" }, "3"] },
      { key: "sys", cells: [{ ar: "موظف", en: "Employee" }, s({ ar: "إنشاء", en: "Create" }, "info"), s({ ar: "—", en: "—" }, "neutral"), s({ ar: "—", en: "—" }, "neutral"), { ar: "فرعه", en: "Own branch" }, "9"] },
      { key: "sys", cells: [{ ar: "عرض فقط", en: "View only" }, s({ ar: "عرض", en: "View" }, "info"), s({ ar: "عرض", en: "View" }, "info"), s({ ar: "عرض", en: "View" }, "info"), { ar: "فرعه", en: "Own branch" }, "2"] },
    ],
  },
];
