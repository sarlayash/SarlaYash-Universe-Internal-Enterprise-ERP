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
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const [selectedEmpId, setSelectedEmpId] = useState(currentUser.id);
  const [selectedMonth, setSelectedMonth] = useState("November 2026");

  const targetEmp = employees.find((e) => e.id === selectedEmpId) || currentUser;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <ReceiptText className="w-6 h-6 text-amber-400" />
            <span>Employee Compensation & Payslip Portal</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated monthly payroll, SarlaYash Blessings bonuses, and statutory deductions
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Employee Selector for Admin */}
          {isAdmin && (
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
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
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="November 2026">November 2026</option>
            <option value="October 2026">October 2026</option>
            <option value="September 2026">September 2026</option>
          </select>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow glow-gold-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Payslip</span>
          </button>
        </div>
      </div>

      {/* Payslip Document Container */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-[#080d1c] border-2 border-amber-500/30 p-6 sm:p-10 shadow-2xl space-y-6 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-500/20 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-400 to-amber-600 shadow-md">
              <img
                src="./sarlayash_logo.jpg"
                alt="SarlaYash Emblem"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white font-serif tracking-wider">
                SARLAYASH LEARNING SOLUTIONS LLP
              </h3>
              <p className="text-xs text-amber-400 font-semibold font-serif">
                SarlaYash Group Of Institutions • Powered By Kapil
              </p>
              <p className="text-[10px] text-slate-400">
                Corporate Identification No: LLP-SYU-2021-IND • New Delhi & Global Hub
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs uppercase tracking-widest border border-amber-500/30">
              Salary Statement
            </span>
            <p className="text-sm font-bold text-white mt-1.5 font-mono">{selectedMonth}</p>
          </div>
        </div>

        {/* Employee Particulars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Employee Name</span>
            <p className="font-bold text-white text-sm mt-0.5">{targetEmp.name}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Employee Code</span>
            <p className="font-mono font-bold text-amber-300 text-sm mt-0.5">{targetEmp.ecode}</p>
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
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] pb-2 border-b border-slate-800">
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
              <div className="flex items-center justify-between text-amber-300 font-semibold p-1.5 rounded bg-amber-500/10 border border-amber-500/20">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> SarlaYash Blessings Incentive
                </span>
                <span className="font-mono font-bold">₹{blessingsBonus.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-bold text-white">
              <span>Gross Earnings (A):</span>
              <span className="font-mono text-emerald-400 text-sm">₹{gross.toLocaleString()}</span>
            </div>
          </div>

          {/* Deductions */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <h4 className="font-bold text-rose-400 uppercase tracking-wider text-[11px] pb-2 border-b border-slate-800">
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

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-bold text-white">
              <span>Total Deductions (B):</span>
              <span className="font-mono text-rose-400 text-sm">₹{(deductions + 200).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Net Take Home Highlight */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-600/20 border border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-amber-300">
              Net Payable Amount (A - B)
            </span>
            <p className="text-xs text-slate-300 mt-0.5">
              Disbursed directly to registered bank account via NEFT/IMPS.
            </p>
          </div>

          <div className="text-center sm:text-right">
            <h2 className="text-3xl font-black text-amber-300 font-mono tracking-tight">
              ₹{(netPay - 200).toLocaleString()}
            </h2>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              ✦ Disbursed with Blessings ✦
            </span>
          </div>
        </div>

        {/* Footer Authorization */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            <p className="font-medium text-slate-300">Digitally Verified & Approved by:</p>
            <p className="text-amber-400 font-serif font-bold">Kapil Narula (Founder) & Trisha Ghosh (CPO)</p>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500">
            <p>Computer generated document. No physical signature required.</p>
            <p>SarlaYash Universe Internal Enterprise ERP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
