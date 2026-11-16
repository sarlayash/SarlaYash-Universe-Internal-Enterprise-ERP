import React, { useState } from "react";
import {
  ReceiptText,
  Printer,
  Download,
  Calendar,
  Building2,
  CheckCircle,
  Sparkles,
  User,
  ShieldCheck
} from "lucide-react";

export default function PayslipView({
  currentUser,
  employees
}) {
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";
  const [selectedEmpId, setSelectedEmpId] = useState(currentUser.id);
  const [selectedMonth, setSelectedMonth] = useState("November 2026");

  const targetEmp = isSuperAdmin
    ? (employees.find((e) => e.id === selectedEmpId) || currentUser)
    : currentUser;

  const basic = targetEmp.salary?.basic || 75000;
  const hra = targetEmp.salary?.hra || 30000;
  const allowances = targetEmp.salary?.allowances || 12000;
  const blessingsBonus = 15000; // SarlaYash Blessings Special Performance Incentive
  const gross = basic + hra + allowances + blessingsBonus;

  const pf = targetEmp.salary?.pf || 3800;
  const tax = targetEmp.salary?.tax || 6500;
  const deductions = pf + tax;
  const netPay = gross - deductions;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <ReceiptText className="w-6 h-6 text-[#ffd700]" />
            <span className="tracking-tight">Employee Compensation & Payslip Portal</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated monthly payroll, SarlaYash Blessings bonuses, and statutory deductions
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Employee Selector for Super Admin only */}
          {isSuperAdmin && (
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.ecode})
                </option>
              ))}
            </select>
          )}

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
          >
            <option value="November 2026">November 2026</option>
            <option value="December 2026">December 2026</option>
          </select>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-xs shadow-lg glow-red-sm transition-all border border-[#ffd700]/30"
          >
            <Printer className="w-4 h-4 text-[#ffd700]" />
            <span>Print Payslip</span>
          </button>
        </div>
      </div>

      {/* Payslip Document Container */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-[#08080d] border-2 border-[#ffd700]/40 p-6 sm:p-10 shadow-2xl space-y-6 print:border-none print:shadow-none print:bg-white print:text-black glow-red-sm">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#222230] text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#ffd700] via-[#fef08a] to-[#d4af37] shadow-lg ring-2 ring-[#dc2626]">
              <img
                src="./sarlayash_logo.jpg"
                alt="SarlaYash Emblem"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white font-serif tracking-wider gold-gradient-text">
                SARLAYASH LEARNING SOLUTIONS LLP
              </h3>
              <p className="text-xs text-[#ffd700] font-semibold font-serif">
                SarlaYash Group Of Institutions • Powered By Kapil
              </p>
              <p className="text-[10px] text-slate-400">
                Corporate Identification No: LLP-SYU-2021-IND • New Delhi & Global Hub
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="px-3 py-1 rounded-full bg-[#1a0a0d] text-[#ffd700] font-extrabold text-xs uppercase tracking-widest border border-[#dc2626]/40">
              Salary Statement
            </span>
            <p className="text-sm font-bold text-white mt-1.5 font-mono">{selectedMonth}</p>
          </div>
        </div>

        {/* Employee Particulars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#0c0c12] border border-[#222230] text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Employee Name</span>
            <p className="font-bold text-white text-sm mt-0.5">{targetEmp.name}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Employee Code</span>
            <p className="font-mono font-bold text-[#ffd700] text-sm mt-0.5">{targetEmp.ecode}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Designation</span>
            <p className="font-medium text-slate-200 mt-0.5">{targetEmp.designation}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Department</span>
            <p className="font-medium text-slate-200 mt-0.5">{targetEmp.department}</p>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Date of Joining</span>
            <p className="text-slate-300 mt-0.5">{targetEmp.joiningDate}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Bank Account</span>
            <p className="font-mono text-slate-300 mt-0.5">HDFC-XXXX-8821</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">PAN / UAN</span>
            <p className="font-mono text-slate-300 mt-0.5">ABCPS9872K / 100982</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Payable Days</span>
            <p className="font-bold text-emerald-400 mt-0.5">30 / 30 Days</p>
          </div>
        </div>

        {/* Two-Column Salary Table: Earnings vs Deductions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Earnings */}
          <div className="space-y-3 p-4 rounded-2xl bg-[#0c0c12] border border-[#222230]">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] pb-2 border-b border-[#222230]">
              Earnings (A)
            </h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Basic Salary</span>
                <span className="font-mono text-white font-semibold">₹{basic.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">House Rent Allowance (HRA)</span>
                <span className="font-mono text-white font-semibold">₹{hra.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Special & Conveyance Allowance</span>
                <span className="font-mono text-white font-semibold">₹{allowances.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[#ffd700] font-semibold p-2 rounded-xl bg-[#140a0c] border border-[#dc2626]/30">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#ffd700]" /> SarlaYash Blessings Incentive
                </span>
                <span className="font-mono font-bold text-[#ffd700]">₹{blessingsBonus.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#222230] flex items-center justify-between font-bold text-white">
              <span>Gross Earnings (A):</span>
              <span className="font-mono text-emerald-400 text-sm">₹{gross.toLocaleString()}</span>
            </div>
          </div>

          {/* Deductions */}
          <div className="space-y-3 p-4 rounded-2xl bg-[#0c0c12] border border-[#222230]">
            <h4 className="font-bold text-[#fca5a5] uppercase tracking-wider text-[11px] pb-2 border-b border-[#222230]">
              Deductions (B)
            </h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Provident Fund (Employee PF)</span>
                <span className="font-mono text-white font-semibold">₹{pf.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Tax Deducted at Source (TDS)</span>
                <span className="font-mono text-white font-semibold">₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Professional Tax (PT)</span>
                <span className="font-mono text-white font-semibold">₹200</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#222230] flex items-center justify-between font-bold text-white">
              <span>Total Deductions (B):</span>
              <span className="font-mono text-[#f87171] text-sm">₹{(deductions + 200).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Net Take Home Highlight */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#20080b] via-[#120a0d] to-[#09090e] border-2 border-[#ffd700]/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl glow-red-sm">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#ffd700]">
              Net Payable Amount (A - B)
            </span>
            <p className="text-xs text-slate-300 mt-0.5">
              Disbursed directly to registered bank account via NEFT/IMPS.
            </p>
          </div>

          <div className="text-center sm:text-right">
            <h2 className="text-3xl font-black text-[#ffd700] font-mono tracking-tight">
              ₹{(netPay - 200).toLocaleString()}
            </h2>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              ✦ Disbursed with Blessings ✦
            </span>
          </div>
        </div>

        {/* Footer Authorization */}
        <div className="pt-6 border-t border-[#222230] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            <p className="font-medium text-slate-300">Digitally Verified & Approved by:</p>
            <p className="text-[#ffd700] font-serif font-bold">Kapil Narula (Founder) & Trisha Ghosh (CPO)</p>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500">
            <p>Computer generated document. No physical signature required.</p>
            <p className="text-[#ffd700]/70 font-semibold">SarlaYash Universe Internal Enterprise ERP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
