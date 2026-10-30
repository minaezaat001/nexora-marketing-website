import type { L } from "../i18n";

export type Impact = { acc: string; name: L; dr?: number; cr?: number };
export type Domain = {
  id: string;
  name: L;
  capabilities: L[];
  /** Prisma models behind this area — 60 in total across all domains. */
  models: string[];
  doc: {
    title: L;
    no: string;
    fields: { k: L; v: L | string }[];
    lines: { cols: L[]; rows: (L | string)[][] };
    switchLabel: L;
    options: { l: L; impact: Impact[]; note: L; blocked?: boolean }[];
  };
};

const A = {
  cash: { ar: "خزنة المعرض الرئيسية", en: "Main showroom till" },
  bank: { ar: "البنك — حساب جاري 1", en: "Bank — current account 1" },
  cust: { ar: "العملاء", en: "Customers" },
  inv: { ar: "المخزون", en: "Inventory" },
  supp: { ar: "الموردون", en: "Suppliers" },
  tax: { ar: "ضرائب مستحقة", en: "Accrued taxes" },
  salesCash: { ar: "مبيعات — نقدي", en: "Sales — cash" },
  salesCredit: { ar: "مبيعات — آجل", en: "Sales — credit" },
  cogs: { ar: "تكلفة البضاعة المباعة", en: "Cost of goods sold" },
};

export const domains: Domain[] = [
  {
    id: "sales",
    name: { ar: "المبيعات والتحصيل", en: "Sales & collections" },
    capabilities: [
      { ar: "عرض سعر بيتحوّل لفاتورة بضغطة", en: "Quotations that convert to invoices in one step" },
      { ar: "خصم على السطر وعلى الفاتورة، وضريبة محسوبة", en: "Line and invoice discounts with tax calculated" },
      { ar: "فحص حد ائتمان العميل وقت الفاتورة", en: "Customer credit limit checked at invoicing" },
      { ar: "مرتجع مبيعات بيعكس المخزون والقيد", en: "Sales returns that reverse stock and the entry" },
    ],
    models: ["SaleInvoice", "SaleInvoiceLine", "Quotation", "QuotationLine", "Customer", "CustomerFollowUp", "CustomerComplaint"],
    doc: {
      title: { ar: "فاتورة مبيعات", en: "Sales invoice" },
      no: "INV-2026-0162",
      fields: [
        { k: { ar: "العميل", en: "Customer" }, v: { ar: "شركة النيل للمقاولات", en: "Nile Contracting Co." } },
        { k: { ar: "التاريخ", en: "Date" }, v: "2026-10-29" },
        { k: { ar: "المخزن", en: "Warehouse" }, v: { ar: "المخزن الرئيسي", en: "Main warehouse" } },
        { k: { ar: "مركز التكلفة", en: "Cost center" }, v: "CC-001" },
      ],
      lines: {
        cols: [{ ar: "الصنف", en: "Item" }, { ar: "الكمية", en: "Qty" }, { ar: "السعر", en: "Price" }, { ar: "القيمة", en: "Amount" }],
        rows: [
          [{ ar: "طقم غرفة نوم خشب زان", en: "Beech bedroom set" }, "2", "4,200.00", "8,400.00"],
          [{ ar: "طاولة سفرة ٨ كراسي رخام", en: "8-chair marble dining table" }, "1", "5,200.00", "5,200.00"],
          [{ ar: "كرسي مكتب جلد طبي", en: "Ergonomic office chair" }, "2", "850.00", "1,700.00"],
        ],
      },
      switchLabel: { ar: "طريقة الدفع", en: "Payment" },
      options: [
        {
          l: { ar: "آجل", en: "Credit" },
          note: { ar: "القيد اتعمل لحظة الحفظ، والتكلفة اتسحبت من المخزن بالمتوسط المرجح.", en: "Posted on save; cost relieved from stock at weighted average." },
          impact: [
            { acc: "1120", name: A.cust, dr: 17442 }, { acc: "4101", name: A.salesCredit, cr: 15300 }, { acc: "2300", name: A.tax, cr: 2142 },
            { acc: "5000", name: A.cogs, dr: 10820 }, { acc: "1130", name: A.inv, cr: 10820 },
          ],
        },
        {
          l: { ar: "نقدي", en: "Cash" },
          note: { ar: "الخزنة بتتحمّل بدل حساب العميل — نفس قاعدة الترحيل.", en: "The till is debited instead of the customer — same posting rule." },
          impact: [
            { acc: "1101", name: A.cash, dr: 17442 }, { acc: "4100", name: A.salesCash, cr: 15300 }, { acc: "2300", name: A.tax, cr: 2142 },
            { acc: "5000", name: A.cogs, dr: 10820 }, { acc: "1130", name: A.inv, cr: 10820 },
          ],
        },
      ],
    },
  },
  {
    id: "purchasing",
    name: { ar: "المشتريات والموردين", en: "Purchasing & suppliers" },
    capabilities: [
      { ar: "طلب شراء من القسم ← أمر شراء معتمد ← فاتورة مورد", en: "Department requisition → approved PO → supplier invoice" },
      { ar: "استلام جزئي ومتابعة المتبقي على أمر الشراء", en: "Partial receipts with the remainder tracked on the PO" },
      { ar: "كشف حساب مورد ومرتجع مشتريات", en: "Supplier statements and purchase returns" },
    ],
    models: ["PurchaseRequest", "PurchaseOrder", "PurchaseInvoice", "PurchaseInvoiceLine", "Supplier"],
    doc: {
      title: { ar: "فاتورة مشتريات", en: "Purchase invoice" },
      no: "PI-2026-0133",
      fields: [
        { k: { ar: "المورد", en: "Supplier" }, v: { ar: "النساجون الشرقيون", en: "Oriental Weavers" } },
        { k: { ar: "أمر الشراء", en: "Purchase order" }, v: "PO-2026-0047" },
        { k: { ar: "المخزن المستلم", en: "Receiving warehouse" }, v: { ar: "المخزن الرئيسي", en: "Main warehouse" } },
        { k: { ar: "التاريخ", en: "Date" }, v: "2026-10-27" },
      ],
      lines: {
        cols: [{ ar: "الصنف", en: "Item" }, { ar: "الكمية", en: "Qty" }, { ar: "التكلفة", en: "Cost" }, { ar: "القيمة", en: "Amount" }],
        rows: [
          [{ ar: "كنبة زاوية قماش", en: "Fabric corner sofa" }, "8", "2,200.00", "17,600.00"],
          [{ ar: "ستارة بلاك أوت ٣م", en: "Blackout curtain 3m" }, "20", "260.00", "5,200.00"],
        ],
      },
      switchLabel: { ar: "السداد", en: "Settlement" },
      options: [
        {
          l: { ar: "على حساب المورد", en: "On account" },
          note: { ar: "الكمية دخلت المخزن ومتوسط التكلفة اتحدّث فورًا.", en: "Stock received and the average cost updated immediately." },
          impact: [{ acc: "1130", name: A.inv, dr: 22800 }, { acc: "2300", name: A.tax, dr: 3192 }, { acc: "2100", name: A.supp, cr: 25992 }],
        },
        {
          l: { ar: "نقدًا من الخزنة", en: "Paid from till" },
          note: { ar: "نفس الاستلام، والخزنة بتتخصم بدل المورد.", en: "Same receipt; the till is credited instead of the supplier." },
          impact: [{ acc: "1130", name: A.inv, dr: 22800 }, { acc: "2300", name: A.tax, dr: 3192 }, { acc: "1101", name: A.cash, cr: 25992 }],
        },
      ],
    },
  },
  {
    id: "inventory",
    name: { ar: "المخازن والتكلفة", en: "Inventory & costing" },
    capabilities: [
      { ar: "حساب تكلفة الصنف بالمتوسط المرجح لكل مخزن", en: "Item cost as a weighted average per warehouse" },
      { ar: "تحويلات بين المخازن والفروع", en: "Transfers between warehouses and branches" },
      { ar: "جرد فعلي وتسويات التالف والعجز بقيد تلقائي", en: "Physical counts, damage and shortage write-offs posted automatically" },
      { ar: "ملصقات باركود للأصناف", en: "Barcode labels for items" },
    ],
    models: ["Item", "Unit", "Category", "Warehouse", "StockMovement", "InventoryBalance", "OpeningStock", "InventoryCount", "InventoryCountLine"],
    doc: {
      title: { ar: "تسوية مخزنية", en: "Stock adjustment" },
      no: "ADJ-2026-0031",
      fields: [
        { k: { ar: "المخزن", en: "Warehouse" }, v: { ar: "مخزن الخامات", en: "Raw materials" } },
        { k: { ar: "المرجع", en: "Reference" }, v: "CNT-2026-0009" },
        { k: { ar: "التاريخ", en: "Date" }, v: "2026-10-26" },
        { k: { ar: "المعتمد", en: "Approved by" }, v: { ar: "منى عادل", en: "Mona Adel" } },
      ],
      lines: {
        cols: [{ ar: "الصنف", en: "Item" }, { ar: "الدفتري", en: "Book" }, { ar: "الفعلي", en: "Counted" }, { ar: "الفرق", en: "Diff." }],
        rows: [
          [{ ar: "ألواح خشب زان (م²)", en: "Beech panels (m²)" }, "432", "420", "−12"],
          [{ ar: "قماش تنجيد (متر)", en: "Upholstery fabric (m)" }, "168", "160", "−8"],
        ],
      },
      switchLabel: { ar: "سبب التسوية", en: "Reason" },
      options: [
        {
          l: { ar: "تالف", en: "Damage" },
          note: { ar: "الهالك بيتسجل أول بأول بتكلفته الحقيقية، مش آخر السنة.", en: "Waste is recorded as it happens, at its true cost — not at year end." },
          impact: [{ acc: "6990", name: { ar: "مصروفات أخرى متنوعة — تالف", en: "Other expenses — damage" }, dr: 2980 }, { acc: "1130", name: A.inv, cr: 2980 }],
        },
        {
          l: { ar: "عجز جرد", en: "Count shortage" },
          note: { ar: "العجز بيظهر في حساب منفصل علشان تعرف تحاسب عليه.", en: "Shortages land in their own account so someone is accountable." },
          impact: [{ acc: "1140", name: { ar: "عهد الموظفين", en: "Employee custody" }, dr: 2980 }, { acc: "1130", name: A.inv, cr: 2980 }],
        },
      ],
    },
  },
  {
    id: "treasury",
    name: { ar: "الخزينة والشيكات والأقساط", en: "Treasury, cheques & installments" },
    capabilities: [
      { ar: "سندات قبض وصرف على الخزنة أو البنك", en: "Receipt and payment vouchers against till or bank" },
      { ar: "حافظة الشيكات: تحت التحصيل، تم التحصيل، مرتد", en: "Cheque portfolio: pending, collected, bounced" },
      { ar: "جدولة الأقساط وتخصيص كل دفعة على قسطها", en: "Installment schedules with every payment allocated" },
      { ar: "مصروفات دورية بتتسجل في ميعادها", en: "Recurring expenses recorded on schedule" },
    ],
    models: ["Voucher", "BankCheque", "InstallmentSchedule", "Installment", "InstallmentAllocation", "RecurringExpense", "ExpenseType"],
    doc: {
      title: { ar: "شيك وارد", en: "Incoming cheque" },
      no: "CHQ-00418",
      fields: [
        { k: { ar: "من", en: "From" }, v: { ar: "شركة النيل للمقاولات", en: "Nile Contracting Co." } },
        { k: { ar: "البنك", en: "Bank" }, v: { ar: "البنك الأهلي", en: "National Bank of Egypt" } },
        { k: { ar: "الاستحقاق", en: "Due" }, v: "2026-11-15" },
        { k: { ar: "المبلغ", en: "Amount" }, v: "25,000.00" },
      ],
      lines: {
        cols: [{ ar: "الحدث", en: "Event" }, { ar: "التاريخ", en: "Date" }, { ar: "بواسطة", en: "By" }, { ar: "السند", en: "Voucher" }],
        rows: [[{ ar: "استلام الشيك", en: "Cheque received" }, "2026-10-29", { ar: "كريم حسن", en: "Karim Hassan" }, "—"]],
      },
      switchLabel: { ar: "حالة الشيك", en: "Cheque status" },
      options: [
        {
          l: { ar: "تحت التحصيل", en: "Pending" },
          note: { ar: "مفيش قيد لسه — الترحيل بيحصل عند التحصيل بس.", en: "No entry yet — posting happens on collection only." },
          impact: [],
        },
        {
          l: { ar: "تم التحصيل", en: "Collected" },
          note: { ar: "اتعمل سند قبض بنكي تلقائي واترحّل.", en: "A bank receipt voucher was created and posted automatically." },
          impact: [{ acc: "1110", name: A.bank, dr: 25000 }, { acc: "1120", name: A.cust, cr: 25000 }],
        },
        {
          l: { ar: "مرتد", en: "Bounced" },
          note: { ar: "المديونية فاضلة على العميل، والشيك بيتعلّم مرتد للمتابعة.", en: "The customer still owes it; the cheque is flagged for follow-up." },
          impact: [],
        },
      ],
    },
  },
  {
    id: "ledger",
    name: { ar: "الحسابات العامة", en: "General ledger" },
    capabilities: [
      { ar: "الترحيل اللحظي لقيود اليومية من ١٨ قاعدة", en: "Instant journal posting from 18 rules" },
      { ar: "إقفال الفترات المالية ومنع التعديل بأثر رجعي", en: "Closing periods and blocking back-dated edits" },
      { ar: "ميزان مراجعة، قائمة دخل، ميزانية، تدفقات نقدية", en: "Trial balance, income statement, balance sheet, cash flow" },
      { ar: "أصول ثابتة بالإهلاك، ومراكز تكلفة، وإقفال سنوي", en: "Depreciating fixed assets, cost centers and year-end close" },
    ],
    models: ["Account", "PostingRule", "JournalEntry", "JournalLine", "AccountingPeriod", "YearCloseRun", "FixedAsset", "CostCenter", "TaxRate"],
    doc: {
      title: { ar: "قيد يدوي", en: "Manual entry" },
      no: "JV-2026-0892",
      fields: [
        { k: { ar: "التاريخ", en: "Date" }, v: "2026-09-30" },
        { k: { ar: "البيان", en: "Description" }, v: { ar: "تسوية مصروف كهرباء سبتمبر", en: "September electricity accrual" } },
        { k: { ar: "مركز التكلفة", en: "Cost center" }, v: "CC-003" },
        { k: { ar: "المحرر", en: "Prepared by" }, v: { ar: "أحمد سمير", en: "Ahmed Samir" } },
      ],
      lines: {
        cols: [{ ar: "الحساب", en: "Account" }, { ar: "مدين", en: "Debit" }, { ar: "دائن", en: "Credit" }, { ar: "مركز التكلفة", en: "Cost center" }],
        rows: [
          [{ ar: "6300 كهرباء ومياه وغاز", en: "6300 Electricity, water & gas" }, "4,350.00", "—", "CC-003"],
          [{ ar: "1101 خزنة المعرض الرئيسية", en: "1101 Main showroom till" }, "—", "4,350.00", "—"],
        ],
      },
      switchLabel: { ar: "فترة سبتمبر 2026", en: "September 2026 period" },
      options: [
        {
          l: { ar: "مفتوحة", en: "Open" },
          note: { ar: "القيد اترحّل في سبتمبر.", en: "The entry posted into September." },
          impact: [{ acc: "6300", name: { ar: "كهرباء ومياه وغاز", en: "Electricity, water & gas" }, dr: 4350 }, { acc: "1101", name: A.cash, cr: 4350 }],
        },
        {
          l: { ar: "مقفولة", en: "Closed" },
          blocked: true,
          note: { ar: "مرفوض: الفترة مقفولة. التعديل بأثر رجعي ممنوع — اعمل القيد في فترة مفتوحة أو اطلب فتح الفترة من المدير.", en: "Rejected: the period is closed. Back-dated edits are blocked — post into an open period or ask an admin to reopen it." },
          impact: [],
        },
      ],
    },
  },
  {
    id: "hr",
    name: { ar: "الموارد البشرية والرواتب", en: "HR & payroll" },
    capabilities: [
      { ar: "ورديات وحضور وانصراف وإجازات رسمية", en: "Shifts, attendance and public holidays" },
      { ar: "مسير رواتب بالإضافي والخصومات", en: "Payroll runs with overtime and deductions" },
      { ar: "تقييم أداء ومستندات الموظف في ملفه", en: "Performance reviews and employee documents on file" },
    ],
    models: ["Employee", "Shift", "AttendanceRecord", "PayrollEntry", "PerformanceReview", "EmployeeDocument", "PublicHoliday"],
    doc: {
      title: { ar: "مسير رواتب", en: "Payroll run" },
      no: "PAY-2026-10",
      fields: [
        { k: { ar: "الشهر", en: "Month" }, v: "2026-10" },
        { k: { ar: "الفرع", en: "Branch" }, v: { ar: "الفرع الرئيسي — القاهرة", en: "Head branch — Cairo" } },
        { k: { ar: "عدد الموظفين", en: "Employees" }, v: "4" },
        { k: { ar: "أيام العمل", en: "Working days" }, v: "26" },
      ],
      lines: {
        cols: [{ ar: "الموظف", en: "Employee" }, { ar: "الأساسي", en: "Basic" }, { ar: "خصومات", en: "Deductions" }, { ar: "الصافي", en: "Net" }],
        rows: [
          [{ ar: "أحمد سمير", en: "Ahmed Samir" }, "14,500.00", "0.00", "15,100.00"],
          [{ ar: "منى عادل", en: "Mona Adel" }, "9,800.00", "377.00", "9,423.00"],
          [{ ar: "كريم حسن", en: "Karim Hassan" }, "11,200.00", "0.00", "12,100.00"],
          [{ ar: "سارة يوسف", en: "Sara Youssef" }, "8,600.00", "331.00", "8,269.00"],
        ],
      },
      switchLabel: { ar: "حالة المسير", en: "Run status" },
      options: [
        { l: { ar: "مسودة", en: "Draft" }, note: { ar: "الحضور والتأخير بيتحسبوا، ولسه مفيش قيد.", en: "Attendance and lateness are calculated; nothing posted yet." }, impact: [] },
        {
          l: { ar: "معتمد", en: "Approved" },
          note: { ar: "المسير اعتُمد والرواتب اتصرفت من البنك.", en: "Run approved and salaries paid from the bank." },
          impact: [{ acc: "6200", name: { ar: "رواتب وأجور", en: "Salaries & wages" }, dr: 44892 }, { acc: "1110", name: A.bank, cr: 44892 }],
        },
      ],
    },
  },
  {
    id: "control",
    name: { ar: "الصلاحيات والفروع والرقابة", en: "Permissions, branches & control" },
    capabilities: [
      { ar: "أدوار مخصصة فوق أدوار النظام الثلاثة", en: "Custom roles on top of the three system roles" },
      { ar: "نطاق بيانات لكل موديول: فرع المستخدم أو الشركة كلها", en: "Data scope per module: the user's branch or the whole company" },
      { ar: "تشغيل وإيقاف الموديولات، وسجل مراجعة لكل عملية", en: "Modules on/off, and an audit trail for every write" },
      { ar: "منع تكرار العملية لو اتضغط «حفظ» مرتين", en: "Duplicate protection when “Save” is pressed twice" },
    ],
    models: ["User", "Session", "RoleRecord", "Permission", "Module", "UserModuleScope", "Branch", "UserBranch", "AuditLog", "IdempotencyKey", "ClientConfig", "CompanySettings", "Counter", "ReferenceList", "ReferenceListItem", "Transaction"],
    doc: {
      title: { ar: "صلاحيات مستخدم", en: "User permissions" },
      no: "USR-0014",
      fields: [
        { k: { ar: "المستخدم", en: "User" }, v: { ar: "كريم حسن", en: "Karim Hassan" } },
        { k: { ar: "الدور", en: "Role" }, v: { ar: "مدير فرع", en: "Branch manager" } },
        { k: { ar: "الفروع", en: "Branches" }, v: { ar: "الإسكندرية", en: "Alexandria" } },
        { k: { ar: "آخر دخول", en: "Last sign-in" }, v: "2026-10-29 09:14" },
      ],
      lines: {
        cols: [{ ar: "الموديول", en: "Module" }, { ar: "عرض", en: "View" }, { ar: "إنشاء", en: "Create" }, { ar: "تعديل", en: "Edit" }],
        rows: [
          [{ ar: "المبيعات", en: "Sales" }, "✓", "✓", "✓"],
          [{ ar: "المشتريات", en: "Purchasing" }, "✓", "✓", "—"],
          [{ ar: "الحسابات العامة", en: "General ledger" }, "✓", "—", "—"],
        ],
      },
      switchLabel: { ar: "نطاق بيانات المبيعات", en: "Sales data scope" },
      options: [
        { l: { ar: "فرعه فقط", en: "Own branch" }, note: { ar: "كريم شايف فواتير الإسكندرية بس — ٣ من ٧.", en: "Karim sees Alexandria invoices only — 3 of 7." }, impact: [] },
        { l: { ar: "الشركة كلها", en: "Company-wide" }, note: { ar: "كريم شايف فواتير كل الفروع — ٧ من ٧.", en: "Karim sees invoices from every branch — 7 of 7." }, impact: [] },
      ],
    },
  },
];
