import type { L } from "../i18n";

export type Impact = { acc: string; name: L; dr?: number; cr?: number };
export type Domain = {
  id: string;
  name: L;
  /** The one-line business result this area delivers. */
  pitch: L;
  capabilities: L[];
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
    name: { ar: "المبيعات والتقسيط", en: "Sales & installments" },
    pitch: { ar: "بيع نقدي وآجل وتقسيط، مع سقف ائتمان ذكي يوقف البيع لعميل متعثر قبل ما الفاتورة تطلع.", en: "Sell for cash, on credit or in installments — with a smart credit limit that stops a sale to a struggling customer before the invoice goes out." },
    capabilities: [
      { ar: "عرض السعر يتحول لفاتورة بضغطة، من غير إعادة كتابة", en: "Turn a quotation into an invoice in one click — no retyping" },
      { ar: "خصومات على الصنف أو الفاتورة، والضريبة محسوبة لوحدها", en: "Discounts per line or per invoice, tax calculated for you" },
      { ar: "البيع الآجل فوق حد العميل بيقف إلا بموافقة المدير", en: "Credit sales over a customer’s limit stop unless a manager approves" },
      { ar: "المرتجع بيرجّع البضاعة للمخزن ويعدّل الحساب تلقائيًا", en: "Returns put stock back and correct the books automatically" },
    ],
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
          [{ ar: "طاولة سفرة 8 كراسي رخام", en: "8-chair marble dining table" }, "1", "5,200.00", "5,200.00"],
          [{ ar: "كرسي مكتب جلد طبي", en: "Ergonomic office chair" }, "2", "850.00", "1,700.00"],
        ],
      },
      switchLabel: { ar: "طريقة الدفع", en: "Payment" },
      options: [
        {
          l: { ar: "آجل", en: "Credit" },
          note: { ar: "اتسجل كله لحظة الحفظ: مديونية العميل، والضريبة، وتكلفة البضاعة اللي خرجت من المخزن.", en: "All recorded on save: the customer’s balance, the tax, and the cost of the goods that left the warehouse." },
          impact: [
            { acc: "1120", name: A.cust, dr: 17442 }, { acc: "4101", name: A.salesCredit, cr: 15300 }, { acc: "2300", name: A.tax, cr: 2142 },
            { acc: "5000", name: A.cogs, dr: 10820 }, { acc: "1130", name: A.inv, cr: 10820 },
          ],
        },
        {
          l: { ar: "نقدي", en: "Cash" },
          note: { ar: "الفلوس دخلت الخزنة على طول بدل ما تتسجل على العميل.", en: "The cash goes straight into the till instead of onto the customer’s account." },
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
    pitch: { ar: "مفيش شراء من غير طلب واعتماد؛ كل جنيه بيطلع للمورد معروف مين طلبه ومين وافق عليه.", en: "No purchase without a request and an approval — every pound paid to a supplier shows who asked and who signed off." },
    capabilities: [
      { ar: "طلب شراء ← أمر شراء معتمد ← فاتورة مورد، في مسار واحد", en: "Request → approved order → supplier invoice, in one path" },
      { ar: "استلام جزئي ومتابعة الباقي على أمر الشراء", en: "Partial deliveries with the balance tracked on the order" },
      { ar: "تنبيه بمواعيد سداد الموردين قبل ما تتأخر", en: "Alerts before supplier payments fall due" },
    ],
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
          [{ ar: "ستارة بلاك أوت 3م", en: "Blackout curtain 3m" }, "20", "260.00", "5,200.00"],
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
    pitch: { ar: "اعرف تكلفة كل صنف في كل مخزن بالقرش، واكشف العجز والهالك والنواقص قبل ما ياكلوا رأس مالك.", en: "Know the cost of every item in every warehouse to the piastre, and catch shortages, waste and low stock before they eat your capital." },
    capabilities: [
      { ar: "تكلفة حقيقية لكل صنف في كل مخزن — مش تقدير", en: "Real cost per item per warehouse — not an estimate" },
      { ar: "جرد فعلي يطلّعلك الفرق، والتالف والعجز بيتسجلوا بقيمتهم", en: "Physical counts show the gap; damage and shortages are booked at their value" },
      { ar: "تنبيه لما صنف يقرب يخلص", en: "An alert when an item is running low" },
      { ar: "تحويل بين المخازن والفروع، وطباعة باركود للأصناف", en: "Transfers between warehouses and branches, and barcode label printing" },
    ],
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
    pitch: { ar: "مفيش شيك هيفوت ميعاده ولا قسط هيتنسي — تنبيهات تلقائية بمواعيد التحصيل والسداد، وحركة الخزينة لحظة بلحظة.", en: "No cheque misses its date and no installment is forgotten — automatic alerts for collections and payments, and the till moving in real time." },
    capabilities: [
      { ar: "حافظة شيكات واضحة: تحت التحصيل، اتحصّل، مرتد", en: "A clear cheque portfolio: pending, collected, bounced" },
      { ar: "جدول أقساط لكل عميل، وكل دفعة بتتخصم من قسطها", en: "An installment plan per customer, every payment applied to its installment" },
      { ar: "تنبيه بالشيكات اللي قرّب ميعادها والأقساط المتأخرة", en: "Alerts for cheques coming due and overdue installments" },
      { ar: "المصروفات الثابتة بتتسجل في ميعادها من غير ما حد يفتكر", en: "Fixed expenses recorded on schedule without anyone remembering" },
    ],
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
    name: { ar: "الحسابات العامة", en: "Accounts & reports" },
    pitch: { ar: "مش محتاج تستنى آخر الشهر عشان تعرف كسبت كام؛ كل فاتورة أو إذن مخزن بيحدّث قائمة الدخل وميزان المراجعة في نفس الثانية.", en: "No waiting for month end to know what you made — every invoice and stock voucher updates the income statement and trial balance the same second." },
    capabilities: [
      { ar: "قائمة دخل، ميزانية، تدفقات نقدية، وميزان مراجعة جاهزين في أي وقت", en: "Income statement, balance sheet, cash flow and trial balance ready any time" },
      { ar: "الشهر اللي اتقفل محدش يقدر يغيّر أرقامه", en: "Once a month is closed, nobody can change its numbers" },
      { ar: "مراكز تكلفة تعرّفك كل فرع أو قسم بيصرف قد إيه", en: "Cost centers show what each branch or department spends" },
      { ar: "الأصول الثابتة بإهلاكها، وإقفال السنة من غير وجع دماغ", en: "Fixed assets with depreciation, and a painless year-end close" },
    ],
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
    id: "customers",
    name: { ar: "العملاء والموردين", en: "Customers & suppliers" },
    pitch: { ar: "ملف كامل لكل عميل ومورد: كشف حساب ومديونية ومتابعات وشكاوى — وتنبيه أول ما عميل يعدّي حده.", en: "A complete file on every customer and supplier: statement, balance, follow-ups and complaints — with an alert the moment a customer goes over limit." },
    capabilities: [
      { ar: "كشف حساب جاهز تبعته للعميل في ثانية", en: "A statement ready to send to the customer in seconds" },
      { ar: "متابعات تحصيل ومواعيد توصيل ليها مسؤول وميعاد", en: "Collection and delivery follow-ups with an owner and a date" },
      { ar: "شكاوى ما بعد البيع متابعة لحد ما تتقفل", en: "After-sales complaints tracked until they are closed" },
    ],
    doc: {
      title: { ar: "كشف حساب عميل", en: "Customer statement" },
      no: "CUST-022",
      fields: [
        { k: { ar: "العميل", en: "Customer" }, v: { ar: "فندق سان ستيفانو", en: "San Stefano Hotel" } },
        { k: { ar: "حد الائتمان", en: "Credit limit" }, v: "40,000.00" },
        { k: { ar: "الرصيد", en: "Balance" }, v: "46,850.00" },
        { k: { ar: "آخر تحصيل", en: "Last payment" }, v: "2026-10-15" },
      ],
      lines: {
        cols: [{ ar: "المستند", en: "Document" }, { ar: "التاريخ", en: "Date" }, { ar: "مدين", en: "Debit" }, { ar: "دائن", en: "Credit" }],
        rows: [
          ["INV-2026-0141", "2026-10-02", "33,500.00", "—"],
          ["CHQ-00405", "2026-10-15", "—", "18,000.00"],
          ["INV-2026-0160", "2026-10-28", "31,350.00", "—"],
        ],
      },
      switchLabel: { ar: "فاتورة آجل جديدة بـ 11,400", en: "New credit invoice of 11,400" },
      options: [
        {
          l: { ar: "بواسطة البائع", en: "By the salesperson" },
          blocked: true,
          note: { ar: "اتوقفت: العميل متجاوز حده الائتماني بـ 6,850. البيع الآجل محتاج موافقة المدير — أو تحصيل الأول.", en: "Stopped: the customer is already 6,850 over their credit limit. A credit sale needs manager approval — or a payment first." },
          impact: [],
        },
        {
          l: { ar: "بموافقة المدير", en: "With manager approval" },
          note: { ar: "اتعدّت بموافقة المدير، والموافقة متسجلة باسمه في سجل الرقابة.", en: "Approved by the manager, and the approval is recorded under their name in the control log." },
          impact: [{ acc: "1120", name: A.cust, dr: 11400 }, { acc: "4101", name: A.salesCredit, cr: 10000 }, { acc: "2300", name: A.tax, cr: 1400 }],
        },
      ],
    },
  },
  {
    id: "hr",
    name: { ar: "شؤون الموظفين والرواتب", en: "People & payroll" },
    pitch: { ar: "الحضور والانصراف، الورديات، السلف، والرواتب مربوطة بحسابات الشركة بضغطة زرار.", en: "Attendance, shifts, advances and payroll — tied to the company’s books in one click." },
    capabilities: [
      { ar: "ورديات وحضور وانصراف وتأخير محسوب لوحده", en: "Shifts, attendance and lateness calculated for you" },
      { ar: "مسير رواتب بالإضافي والسلف والخصومات", en: "Payroll with overtime, advances and deductions" },
      { ar: "ملف لكل موظف: مستنداته وتقييم أدائه", en: "A file per employee: documents and performance reviews" },
    ],
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
    name: { ar: "الفروع والصلاحيات", en: "Branches & permissions" },
    pitch: { ar: "كل موظف يشوف فرعه وشغله بس، وإنت كمدير تشوف الشركة كلها من الموبايل أو اللابتوب من أي مكان.", en: "Each employee sees only their branch and their work; you see the whole company from your phone or laptop, anywhere." },
    capabilities: [
      { ar: "صلاحيات على مقاس كل وظيفة: عرض، إنشاء، تعديل", en: "Permissions cut to each job: view, create, edit" },
      { ar: "سجل رقابة بيقولك مين عمل إيه وإمتى", en: "A control log of who did what, and when" },
      { ar: "حماية ضد الأخطاء: الفاتورة مستحيل تتسجل مرتين", en: "Protection against mistakes: an invoice can never be saved twice" },
      { ar: "شغّل الإدارات اللي محتاجها بس، وزوّد بعدين", en: "Switch on only the departments you need, add more later" },
    ],
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
        cols: [{ ar: "الإدارة", en: "Department" }, { ar: "عرض", en: "View" }, { ar: "إنشاء", en: "Create" }, { ar: "تعديل", en: "Edit" }],
        rows: [
          [{ ar: "المبيعات", en: "Sales" }, "✓", "✓", "✓"],
          [{ ar: "المشتريات", en: "Purchasing" }, "✓", "✓", "—"],
          [{ ar: "الحسابات العامة", en: "General ledger" }, "✓", "—", "—"],
        ],
      },
      switchLabel: { ar: "نطاق بيانات المبيعات", en: "Sales data scope" },
      options: [
        { l: { ar: "فرعه فقط", en: "Own branch" }, note: { ar: "كريم شايف فواتير الإسكندرية بس — 3 من 7.", en: "Karim sees Alexandria invoices only — 3 of 7." }, impact: [] },
        { l: { ar: "الشركة كلها", en: "Company-wide" }, note: { ar: "كريم شايف فواتير كل الفروع — 7 من 7.", en: "Karim sees invoices from every branch — 7 of 7." }, impact: [] },
      ],
    },
  },
];
