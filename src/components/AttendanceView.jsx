import React, { useState } from "react";
import {
  Clock,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Download,
  Filter,
  UserCheck,
  Building,
  Laptop,
  Car,
  Search,
  Sparkles,
  Shield,
  Check,
  X,
  History,
  Send,
  FileEdit
} from "lucide-react";
import confetti from "canvas-confetti";
import { getISTDate, getISTTime } from "../utils/timeUtils";

export default function AttendanceView({
  currentUser,
  employees,
  attendanceList,
  onRecordAttendance,
  todayAttendance,
  punchCorrections = [],
  onRequestCorrection,
  onApproveCorrection,
  onRejectCorrection
}) {
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";
  const [workMode, setWorkMode] = useState("Office");
  const [workNote, setWorkNote] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Punch Correction Modal State
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionDate, setCorrectionDate] = useState(() => getISTDate());
  const [correctCheckIn, setCorrectCheckIn] = useState("09:30 AM");
  const [correctCheckOut, setCorrectCheckOut] = useState("06:30 PM");
  const [correctWorkMode, setCorrectWorkMode] = useState("Office");
  const [correctionReason, setCorrectionReason] = useState("");

  // Sub-tabs for Super Admin
  const [adminTab, setAdminTab] = useState("corrections"); // 'corrections' | 'roster'

  const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;

  // Handle punch using official IST Time
  const handlePunch = () => {
    const timeStr = getISTTime();
    const dateStr = getISTDate(); // Current operational date in IST

    if (!isCheckedIn) {
      // Check in
      const now = new Date();
      const status = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 30) ? "Late Mark" : "Present";
      onRecordAttendance({
        id: `ATT-${Date.now()}`,
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        date: dateStr,
        checkIn: timeStr,
        checkOut: null,
        workMode: workMode,
        status: status,
        notes: workNote || "Daily tasks commenced."
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      setFeedbackMsg(`Checked in successfully at ${timeStr} (IST)! Status: ${status}`);
    } else {
      // Check out
      onRecordAttendance({
        ...todayAttendance,
        checkOut: timeStr,
        notes: workNote ? `${todayAttendance.notes} | Out note: ${workNote}` : todayAttendance.notes
      });
      setFeedbackMsg(`Checked out successfully at ${timeStr} (IST). Great work today!`);
    }

    setWorkNote("");
    setTimeout(() => setFeedbackMsg(""), 4500);
  };

  // Submit Punch Correction Request
  const handleSubmitCorrection = (e) => {
    e.preventDefault();
    if (!correctionReason.trim()) {
      alert("Please specify the reason for punch correction.");
      return;
    }

    if (correctionDate < "2026-11-01") {
      alert("Attendance is active strictly from 01 November 2026 onwards. No past months permitted.");
      return;
    }

    const newCorrection = {
      id: `CORR-${Date.now()}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      employeeEcode: currentUser.ecode,
      date: correctionDate,
      requestedCheckIn: correctCheckIn,
      requestedCheckOut: correctCheckOut,
      workMode: correctWorkMode,
      reason: correctionReason,
      status: "Pending", // Pending, Approved, Rejected
      requestedAt: new Date().toISOString(),
      adminRemarks: ""
    };

    onRequestCorrection(newCorrection);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });

    setFeedbackMsg("Punch correction request sent to Founder Kapil Narula for review & approval!");
    setShowCorrectionModal(false);
    setCorrectionReason("");
    setTimeout(() => setFeedbackMsg(""), 4500);
  };

  // Filter attendance for current user history (strictly November 2026 onwards)
  const myAttendanceHistory = attendanceList.filter(
    (a) => a.employeeId === currentUser.id && a.date >= "2026-11-01"
  );

  // Dynamic Real Metrics (No Fake Numbers)
  const myPresentDays = myAttendanceHistory.filter((a) => a.status === "Present" || a.status?.includes("Approved")).length;
  const myLateDays = myAttendanceHistory.filter((a) => a.status === "Late Mark").length;
  const myTotalLoggedDays = myAttendanceHistory.length;

  // Corrections for current user
  const myCorrections = punchCorrections.filter((c) => c.employeeId === currentUser.id);

  // Pending corrections for Super Admin
  const pendingCorrections = punchCorrections.filter((c) => c.status === "Pending");

  // Today's team attendance (for Super Admin)
  const todayTeamAttendance = employees.map((emp) => {
    const record = attendanceList.find(
      (a) => a.employeeId === emp.id && a.date === "2026-11-16"
    );
    return {
      employee: emp,
      attendance: record || null
    };
  });

  const filteredTeamAttendance = todayTeamAttendance.filter(({ employee, attendance }) => {
    const matchesDept = selectedDepartment === "All" || employee.department.toLowerCase().includes(selectedDepartment.toLowerCase());
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.ecode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Export CSV (Super Admin)
  const exportAttendanceCSV = () => {
    const headers = "Employee Code,Name,Designation,Department,Date,Check In,Check Out,Work Mode,Status,Notes\n";
    const rows = todayTeamAttendance
      .map(({ employee, attendance }) => {
        return `"${employee.ecode}","${employee.name}","${employee.designation}","${employee.department}","2026-11-16","${
          attendance?.checkIn || "Absent"
        }","${attendance?.checkOut || "--"}","${attendance?.workMode || "--"}","${attendance?.status || "Absent"}","${
          attendance?.notes || ""
        }"`;
      })
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `SarlaYash_Attendance_2026-11-16.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-[#ffd700]" />
              <span className="tracking-tight">
                {isSuperAdmin ? "Executive Attendance & Master Corrections" : "My Daily Attendance Terminal"}
              </span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1c0c0e] text-[#ffd700] border border-[#dc2626]/40 text-[10px] font-mono font-bold">
              Active from Nov 01, 2026
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standard Shift: 09:30 AM – 06:30 PM • 5-Day Work Week • Real-time punch logging
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Correction Request Button */}
          <button
            onClick={() => setShowCorrectionModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14141e] hover:bg-[#1c1c2a] text-[#ffd700] font-bold text-xs border border-[#ffd700]/30 transition-all shadow-md"
          >
            <FileEdit className="w-4 h-4 text-[#dc2626]" />
            <span>Request Punch Correction</span>
          </button>

          {isSuperAdmin && (
            <button
              onClick={exportAttendanceCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0e0e16] hover:bg-[#161622] text-[#ffd700] font-bold text-xs border border-[#ffd700]/30 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Top Punch Terminal Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Punch Station */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-[#121218] via-[#0d0d12] to-[#1a0a0c] border-2 border-[#ffd700]/30 p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#dc2626]/20 text-[#ffd700] border border-[#dc2626]/40">
                <UserCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-base text-white">Daily Punch Terminal</h3>
                <p className="text-xs text-slate-400">Authenticated: {currentUser?.name} ({currentUser?.ecode})</p>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              isCheckedIn
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-[#dc2626]/20 text-[#fca5a5] border-[#dc2626]/40"
            }`}>
              {isCheckedIn ? "Checked In • Working" : "Not Checked In Today"}
            </span>
          </div>

          {/* Work Mode Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setWorkMode("Office")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                workMode === "Office"
                  ? "bg-[#dc2626]/20 border-[#dc2626] text-white font-bold"
                  : "bg-[#0a0a0f] border-[#222230] text-slate-400 hover:text-white"
              }`}
            >
              <Building className="w-4 h-4 text-[#ffd700] mb-1" />
              <p className="text-xs font-bold">In-Office / Campus</p>
              <p className="text-[10px] text-slate-400">HQ / Learning Studio</p>
            </button>

            <button
              type="button"
              onClick={() => setWorkMode("Remote / Work From Home")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                workMode.includes("Remote")
                  ? "bg-[#dc2626]/20 border-[#dc2626] text-white font-bold"
                  : "bg-[#0a0a0f] border-[#222230] text-slate-400 hover:text-white"
              }`}
            >
              <Laptop className="w-4 h-4 text-[#ffd700] mb-1" />
              <p className="text-xs font-bold">Remote / WFH</p>
              <p className="text-[10px] text-slate-400">Permanent WFH Model</p>
            </button>

            <button
              type="button"
              onClick={() => setWorkMode("Field / On-Duty")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                workMode.includes("Field")
                  ? "bg-[#dc2626]/20 border-[#dc2626] text-white font-bold"
                  : "bg-[#0a0a0f] border-[#222230] text-slate-400 hover:text-white"
              }`}
            >
              <Car className="w-4 h-4 text-[#ffd700] mb-1" />
              <p className="text-xs font-bold">On Duty / Field</p>
              <p className="text-[10px] text-slate-400">Campus / Institutional Drive</p>
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              {isCheckedIn ? "End of Day Accomplishments / Handover Note:" : "Today's Work Objective / Plan:"}
            </label>
            <input
              type="text"
              value={workNote}
              onChange={(e) => setWorkNote(e.target.value)}
              placeholder={isCheckedIn ? "e.g. Published YouTube walkthrough, reviewed 10 LeetCode problems..." : "e.g. Preparing AI Ladder tutorial notes, engaging with LinkedIn community..."}
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090e] border border-[#2a2a38] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-400">
              <span>Today's Punch-in: </span>
              <strong className="text-white font-mono">{todayAttendance?.checkIn || "None"}</strong>
              {todayAttendance?.checkOut && (
                <>
                  <span className="ml-3">Punch-out: </span>
                  <strong className="text-white font-mono">{todayAttendance?.checkOut}</strong>
                </>
              )}
            </div>

            <button
              onClick={handlePunch}
              className={`w-full sm:w-auto px-8 py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-xl ${
                isCheckedIn
                  ? "bg-[#dc2626] hover:bg-[#b91c1c] text-white glow-red-sm"
                  : "bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white hover:brightness-110 glow-red border border-red-500/50"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{isCheckedIn ? "CLOCK OUT FOR TODAY" : "PUNCH IN / CLOCK IN"}</span>
            </button>
          </div>
        </div>

        {/* Real Dynamic November 2026 Summary (No Fake Numbers) */}
        <div className="rounded-3xl bg-[#0c0c12] border border-[#ffd700]/20 p-6 space-y-4 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2 pb-3 border-b border-[#222230]">
              <Calendar className="w-4 h-4 text-[#ffd700]" />
              <span>November 2026 Shift Telemetry</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-[#08080d] border border-[#222230]">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Logged Shifts</span>
                <p className="text-lg font-bold text-white font-mono">{myTotalLoggedDays} Days</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold">Present Shifts</span>
                <p className="text-lg font-bold text-emerald-300 font-mono">{myPresentDays} Days</p>
              </div>

              <div className="p-3 rounded-xl bg-[#dc2626]/10 border border-[#dc2626]/20">
                <span className="text-[10px] text-[#fca5a5] uppercase font-semibold">Late Marks</span>
                <p className="text-lg font-bold text-[#f87171] font-mono">{myLateDays} Shifts</p>
              </div>

              <div className="p-3 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/20">
                <span className="text-[10px] text-[#ffd700] uppercase font-semibold">Corrections</span>
                <p className="text-lg font-bold text-amber-200 font-mono">{myCorrections.length} Total</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#08080d] border border-[#222230] text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-white">Punch Policy Notice:</p>
            <p>Punches are validated strictly from 01 November 2026. If you forget to punch, submit a correction for Founder review.</p>
          </div>
        </div>
      </div>

      {/* SUPER ADMIN DESK: Punch Corrections & Master Roster (Founder Only) */}
      {isSuperAdmin && (
        <div className="rounded-3xl bg-[#0c0c12] border-2 border-[#ffd700]/40 p-6 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ffd700]" />
                <h3 className="font-bold text-base text-white">Founder Super Admin Attendance Control</h3>
                {pendingCorrections.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] font-bold">
                    {pendingCorrections.length} Actionable
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Master authority to approve/reject punch corrections and inspect team-wide records.
              </p>
            </div>

            {/* Admin Subtabs */}
            <div className="flex items-center gap-2 bg-[#08080d] p-1 rounded-2xl border border-[#222230]">
              <button
                onClick={() => setAdminTab("corrections")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  adminTab === "corrections"
                    ? "bg-[#dc2626] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Punch Corrections Desk ({pendingCorrections.length})
              </button>
              <button
                onClick={() => setAdminTab("roster")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  adminTab === "roster"
                    ? "bg-[#dc2626] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Company Master Roster
              </button>
            </div>
          </div>

          {/* Subtab 1: Punch Corrections Review */}
          {adminTab === "corrections" && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-extrabold text-[#ffd700] tracking-wider">
                Submitted Punch Correction Requests:
              </h4>

              {punchCorrections.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-[#222230] rounded-2xl">
                  No punch correction requests submitted yet. When employees request adjustments, they appear here for Founder approval.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#222230] text-slate-400 uppercase tracking-wider text-[11px]">
                        <th className="py-2.5 px-3">Employee</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Requested Timing</th>
                        <th className="py-2.5 px-3">Mode</th>
                        <th className="py-2.5 px-3">Employee Justification</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Founder Decision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e1e2c]">
                      {punchCorrections.map((corr) => (
                        <tr key={corr.id} className="hover:bg-[#12121c] transition-colors">
                          <td className="py-3 px-3">
                            <p className="font-bold text-white">{corr.employeeName}</p>
                            <p className="text-[10px] text-[#ffd700] font-mono">{corr.employeeEcode}</p>
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-300">{corr.date}</td>
                          <td className="py-3 px-3 font-mono">
                            <span className="text-emerald-400">{corr.requestedCheckIn}</span> –{" "}
                            <span className="text-red-400">{corr.requestedCheckOut}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-300">{corr.workMode}</td>
                          <td className="py-3 px-3 text-slate-400 max-w-xs">{corr.reason}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              corr.status === "Approved"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : corr.status === "Rejected"
                                ? "bg-red-500/20 text-red-300 border border-red-500/40"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            }`}>
                              {corr.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {corr.status === "Pending" ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => onApproveCorrection(corr.id)}
                                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" /> Approve
                                </button>
                                <button
                                  onClick={() => {
                                    const remark = prompt("Enter remark for declining correction:");
                                    if (remark !== null) onRejectCorrection(corr.id, remark);
                                  }}
                                  className="px-3 py-1 rounded-lg bg-[#dc2626] hover:bg-red-600 text-white font-bold text-[11px] shadow flex items-center gap-1"
                                >
                                  <X className="w-3 h-3" /> Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-500 italic">Decision Recorded</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Subtab 2: Master Company Roster */}
          {adminTab === "roster" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-xs uppercase font-extrabold text-[#ffd700] tracking-wider">
                  Company Team Attendance Roster • 16 Nov 2026
                </h4>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search member..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700] w-44"
                    />
                  </div>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
                  >
                    <option value="All">All Departments</option>
                    <option value="Executive">Executive</option>
                    <option value="Engineering">Engineering & AI</option>
                    <option value="Talent">Talent & Solutions</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                      <th className="py-2.5 px-3">Employee</th>
                      <th className="py-2.5 px-3">Designation</th>
                      <th className="py-2.5 px-3">Reports To</th>
                      <th className="py-2.5 px-3">Check In</th>
                      <th className="py-2.5 px-3">Work Mode</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Task Notes</th>
                      <th className="py-2.5 px-3 text-right">Founder Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e1e2c]">
                    {filteredTeamAttendance.map(({ employee, attendance }) => {
                      const isPresent = !!attendance?.checkIn;
                      return (
                        <tr key={employee.id} className="hover:bg-[#12121c] transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{employee.avatar}</span>
                              <div>
                                <p className="font-bold text-white">{employee.name}</p>
                                <p className="text-[10px] text-[#ffd700] font-mono">{employee.ecode}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-300">{employee.designation}</td>
                          <td className="py-3 px-3 text-slate-400">{employee.reportsTo}</td>
                          <td className="py-3 px-3 font-mono">
                            {isPresent ? (
                              <span className="text-emerald-400 font-bold">{attendance.checkIn}</span>
                            ) : (
                              <span className="text-slate-500 italic">Not Clocked</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-slate-300">{attendance?.workMode || "--"}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isPresent ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                            }`}>
                              {attendance?.status || "Absent"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-400 max-w-xs truncate">{attendance?.notes || "—"}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                onRecordAttendance({
                                  id: `REG-${Date.now()}`,
                                  employeeId: employee.id,
                                  employeeName: employee.name,
                                  date: "2026-11-16",
                                  checkIn: attendance?.checkIn || "09:30 AM",
                                  checkOut: attendance?.checkOut || "06:30 PM",
                                  workMode: attendance?.workMode || "Office",
                                  status: "Present [Regularized by Founder]",
                                  notes: "Founder Kapil Narula regularized record."
                                });
                                setFeedbackMsg(`Attendance regularized for ${employee.name}!`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#0e0e16] hover:bg-[#1a1a24] text-[#ffd700] text-[10px] font-semibold border border-[#ffd700]/30 transition-colors"
                            >
                              Regularize
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* INDIVIDUAL PUNCH HISTORY TABLE (Nov 01, 2026 onwards for current user) */}
      <div className="rounded-3xl bg-[#0c0c12] border border-[#222230] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <History className="w-5 h-5 text-[#ffd700]" />
              <span>My November 2026 Attendance History</span>
            </h3>
            <p className="text-xs text-slate-400">Authenticated punches strictly from 01 November 2026</p>
          </div>
          <span className="text-xs font-mono text-[#ffd700] bg-[#14141e] px-3 py-1 rounded-xl border border-[#2a2a38]">
            {myAttendanceHistory.length} Logged Record(s)
          </span>
        </div>

        {myAttendanceHistory.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-[#222230] rounded-2xl">
            No punch records logged for November 2026 yet. Use the punch terminal above to clock in today!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#222230] text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Punch In</th>
                  <th className="py-2.5 px-3">Punch Out</th>
                  <th className="py-2.5 px-3">Work Mode</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Handover Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e2c]">
                {myAttendanceHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-[#12121c] transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-white">{item.date}</td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{item.checkIn || "--"}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{item.checkOut || "--"}</td>
                    <td className="py-3 px-3 text-slate-300">{item.workMode}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "Late Mark"
                          ? "bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/40"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PUNCH CORRECTION MODAL */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/50 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <div className="flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-[#ffd700]" />
                <h3 className="font-bold text-base text-white">Request Punch Correction</h3>
              </div>
              <button
                onClick={() => setShowCorrectionModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCorrection} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-[#0e0e16] border border-[#ffd700]/30 text-[11px] text-slate-300">
                <p className="font-bold text-white">Founder Review Protocol:</p>
                <p className="text-slate-400 mt-0.5">
                  Your request will be routed directly to Founder Kapil Narula for verification and approval.
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Correction Date (Active from Nov 01, 2026)</label>
                <input
                  type="date"
                  min="2026-11-01"
                  max="2026-11-30"
                  value={correctionDate}
                  onChange={(e) => setCorrectionDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Correct Check-In</label>
                  <input
                    type="text"
                    value={correctCheckIn}
                    onChange={(e) => setCorrectCheckIn(e.target.value)}
                    placeholder="09:30 AM"
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700] font-mono"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Correct Check-Out</label>
                  <input
                    type="text"
                    value={correctCheckOut}
                    onChange={(e) => setCorrectCheckOut(e.target.value)}
                    placeholder="06:30 PM"
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700] font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Work Mode</label>
                <select
                  value={correctWorkMode}
                  onChange={(e) => setCorrectWorkMode(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                >
                  <option value="Office">In-Office / Studio Campus</option>
                  <option value="Remote / Work From Home">Remote / Work From Home</option>
                  <option value="Field / On-Duty">Field / On-Duty Client Visit</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Reason / Justification for Correction</label>
                <textarea
                  rows="3"
                  value={correctionReason}
                  onChange={(e) => setCorrectionReason(e.target.value)}
                  placeholder="e.g. Forgot to clock in while recording YouTube session; completed 4 hours of development..."
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCorrectionModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#14141e] text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold flex items-center gap-1.5 shadow-lg glow-red-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Submit to Founder Kapil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
