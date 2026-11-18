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
  FileEdit,
  Plus,
  Trash2,
  Edit3,
  User,
  RotateCcw
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
  onRejectCorrection,
  onDirectFounderCorrection,
  onDeleteAttendanceRecord
}) {
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";
  const [workMode, setWorkMode] = useState("Office");
  const [workNote, setWorkNote] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Super Admin Master Roster Filters
  const [selectedDateFilter, setSelectedDateFilter] = useState("all"); // 'all' or 'YYYY-MM-DD'
  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState("all"); // 'all' or empId
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sub-tabs for Super Admin
  const [adminTab, setAdminTab] = useState("roster"); // 'roster' | 'corrections'

  // Employee Punch Correction Request Modal State
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionDate, setCorrectionDate] = useState(() => getISTDate());
  const [correctCheckIn, setCorrectCheckIn] = useState("09:30 AM");
  const [correctCheckOut, setCorrectCheckOut] = useState("06:30 PM");
  const [correctWorkMode, setCorrectWorkMode] = useState("Office");
  const [correctionReason, setCorrectionReason] = useState("");

  // Founder Direct Punch Correction & Entry Modal State
  const [showFounderEditModal, setShowFounderEditModal] = useState(false);
  const [founderEditData, setFounderEditData] = useState({
    id: null,
    employeeId: "SYM002",
    date: getISTDate(),
    checkIn: "09:30 AM",
    checkOut: "06:30 PM",
    workMode: "Office",
    status: "Present",
    notes: ""
  });

  const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;

  // Handle employee quick punch using official IST Time
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

  // Submit Employee Punch Correction Request
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
      status: "Pending",
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

  // Open Direct Founder Punch Modal for new entry
  const handleOpenDirectEntry = (preselectedEmpId = null, preselectedDate = null) => {
    const defaultEmp = preselectedEmpId || (employees[1]?.id || "SYM002");
    const targetDate = preselectedDate || (selectedDateFilter !== "all" ? selectedDateFilter : getISTDate());

    // Check if record already exists
    const existing = attendanceList.find(
      (a) => a.employeeId === defaultEmp && a.date === targetDate
    );

    if (existing) {
      setFounderEditData({
        id: existing.id,
        employeeId: existing.employeeId,
        date: existing.date,
        checkIn: existing.checkIn || "09:30 AM",
        checkOut: existing.checkOut || "06:30 PM",
        workMode: existing.workMode || "Office",
        status: existing.status || "Present",
        notes: existing.notes || ""
      });
    } else {
      setFounderEditData({
        id: null,
        employeeId: defaultEmp,
        date: targetDate,
        checkIn: "09:30 AM",
        checkOut: "06:30 PM",
        workMode: "Office",
        status: "Present",
        notes: "Direct punch entry by Founder Kapil Narula."
      });
    }
    setShowFounderEditModal(true);
  };

  // Open Direct Founder Punch Modal for editing existing row
  const handleEditRow = (record) => {
    setFounderEditData({
      id: record.id,
      employeeId: record.employeeId,
      date: record.date,
      checkIn: record.checkIn || "09:30 AM",
      checkOut: record.checkOut || "",
      workMode: record.workMode || "Office",
      status: record.status || "Present",
      notes: record.notes || ""
    });
    setShowFounderEditModal(true);
  };

  // Save Direct Founder Correction
  const handleSaveFounderCorrection = (e) => {
    e.preventDefault();

    if (founderEditData.date < "2026-11-01") {
      alert("Attendance records are active strictly from 01 November 2026 onwards.");
      return;
    }

    const emp = employees.find((e) => e.id === founderEditData.employeeId);
    if (!emp) {
      alert("Employee not found.");
      return;
    }

    const recordToSave = {
      id: founderEditData.id || `ATT-${Date.now()}-${founderEditData.employeeId}`,
      employeeId: founderEditData.employeeId,
      employeeName: emp.name,
      date: founderEditData.date,
      checkIn: founderEditData.checkIn.trim() || null,
      checkOut: founderEditData.checkOut.trim() || null,
      workMode: founderEditData.workMode,
      status: founderEditData.status,
      notes: founderEditData.notes.trim()
        ? founderEditData.notes.includes("Founder")
          ? founderEditData.notes
          : `${founderEditData.notes} [Corrected by Founder Kapil]`
        : "Record updated by Founder Kapil Narula."
    };

    if (onDirectFounderCorrection) {
      onDirectFounderCorrection(recordToSave);
    } else {
      onRecordAttendance(recordToSave);
    }

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    setFeedbackMsg(`Successfully updated attendance for ${emp.name} on ${recordToSave.date}!`);
    setShowFounderEditModal(false);
    setTimeout(() => setFeedbackMsg(""), 4500);
  };

  // Delete Attendance Record (Super Admin)
  const handleDeleteRecord = (record) => {
    if (window.confirm(`Are you sure you want to remove the attendance record for ${record.employeeName} on ${record.date}?`)) {
      if (onDeleteAttendanceRecord) {
        onDeleteAttendanceRecord(record.id, record.employeeName, record.date);
      }
      setFeedbackMsg(`Attendance record for ${record.employeeName} on ${record.date} deleted.`);
      setShowFounderEditModal(false);
      setTimeout(() => setFeedbackMsg(""), 4500);
    }
  };

  // Filter attendance for current user history (strictly November 2026 onwards)
  const myAttendanceHistory = attendanceList
    .filter((a) => a.employeeId === currentUser.id && a.date >= "2026-11-01")
    .sort((a, b) => b.date.localeCompare(a.date));

  // Dynamic Real Metrics for Current User
  const myPresentDays = myAttendanceHistory.filter(
    (a) => a.status === "Present" || a.status?.includes("Approved") || a.status?.includes("Corrected")
  ).length;
  const myLateDays = myAttendanceHistory.filter((a) => a.status === "Late Mark").length;
  const myTotalLoggedDays = myAttendanceHistory.length;
  const myCorrections = punchCorrections.filter((c) => c.employeeId === currentUser.id);
  const pendingCorrections = punchCorrections.filter((c) => c.status === "Pending");

  // Multi-Day Team Master Roster Calculation
  // 1. If a single specific date is chosen: show all 10 employees for that specific day
  // 2. If 'all' dates chosen: list all historical attendance entries matching employee/status/search filters
  let filteredRosterList = [];

  if (selectedDateFilter !== "all") {
    // Single Day View for all 10 employees
    filteredRosterList = employees.map((emp) => {
      const match = attendanceList.find(
        (a) => a.employeeId === emp.id && a.date === selectedDateFilter
      );
      return {
        id: match?.id || `TEMP-${emp.id}-${selectedDateFilter}`,
        employeeId: emp.id,
        employeeName: emp.name,
        employeeEcode: emp.ecode,
        employeeAvatar: emp.avatar,
        designation: emp.designation,
        department: emp.department,
        reportsTo: emp.reportsTo,
        date: selectedDateFilter,
        checkIn: match?.checkIn || null,
        checkOut: match?.checkOut || null,
        workMode: match?.workMode || "--",
        status: match?.status || "Not Clocked / Absent",
        notes: match?.notes || "",
        isExistingRecord: !!match
      };
    });
  } else {
    // Multi-Day View: all recorded attendance entries in November 2026
    filteredRosterList = attendanceList
      .filter((a) => a.date >= "2026-11-01")
      .map((record) => {
        const emp = employees.find((e) => e.id === record.employeeId) || {};
        return {
          id: record.id,
          employeeId: record.employeeId,
          employeeName: record.employeeName || emp.name,
          employeeEcode: emp.ecode || record.employeeId,
          employeeAvatar: emp.avatar || "👤",
          designation: emp.designation || "--",
          department: emp.department || "--",
          reportsTo: emp.reportsTo || "Kapil Narula",
          date: record.date,
          checkIn: record.checkIn,
          checkOut: record.checkOut,
          workMode: record.workMode,
          status: record.status,
          notes: record.notes,
          isExistingRecord: true
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  // Apply Employee, Status, and Search Filters
  const displayedRoster = filteredRosterList.filter((item) => {
    const matchesEmp = selectedEmployeeFilter === "all" || item.employeeId === selectedEmployeeFilter;
    const matchesStatus =
      selectedStatusFilter === "all" ||
      (selectedStatusFilter === "Present" && (item.status === "Present" || item.status?.includes("Approved") || item.status?.includes("Corrected"))) ||
      (selectedStatusFilter === "Late Mark" && item.status === "Late Mark") ||
      (selectedStatusFilter === "Not Clocked" && item.status.includes("Not Clocked"));
    const matchesSearch =
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeEcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesEmp && matchesStatus && matchesSearch;
  });

  // Export CSV of currently displayed roster
  const exportAttendanceCSV = () => {
    const headers = "Employee Code,Name,Designation,Department,Date,Check In,Check Out,Work Mode,Status,Notes\n";
    const rows = displayedRoster
      .map((item) => {
        return `"${item.employeeEcode}","${item.employeeName}","${item.designation}","${item.department}","${item.date}","${
          item.checkIn || "Absent"
        }","${item.checkOut || "--"}","${item.workMode || "--"}","${item.status}","${(item.notes || "").replace(/"/g, '""')}"`;
      })
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `SarlaYash_Attendance_${selectedDateFilter === "all" ? "All_November_Days" : selectedDateFilter}.csv`);
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
                {isSuperAdmin ? "Founder Master Attendance & All-Days Punch Correction Terminal" : "My Daily Attendance Terminal"}
              </span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1c0c0e] text-[#ffd700] border border-[#dc2626]/40 text-[10px] font-mono font-bold">
              Active from Nov 01, 2026
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isSuperAdmin
              ? "Super Admin Master Authority • View, correct, and add punch-in & punch-out records for all 10 employees across all days"
              : "Standard Shift: 09:30 AM – 06:30 PM • 5-Day Work Week • Real-time punch logging"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct Founder Punch Entry Button (Super Admin Only) */}
          {isSuperAdmin && (
            <button
              onClick={() => handleOpenDirectEntry()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold text-xs shadow-lg glow-red-sm hover:brightness-110 transition-all border border-red-500/50"
            >
              <Plus className="w-4 h-4" />
              <span>Direct Founder Punch Entry</span>
            </button>
          )}

          {/* Correction Request Button (For Regular Employees) */}
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
        {/* Interactive Punch Station for Current User */}
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

        {/* Real Dynamic November 2026 Summary for Current User */}
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
            <p>Punches are validated strictly from 01 November 2026. Shifts auto clock-out at 12:00 AM Midnight IST if unclosed.</p>
          </div>
        </div>
      </div>

      {/* SUPER ADMIN DESK: ALL-DAYS PUNCH CORRECTION & MASTER ROSTER (Founder Only) */}
      {isSuperAdmin && (
        <div className="rounded-3xl bg-[#0c0c12] border-2 border-[#ffd700]/40 p-6 space-y-5 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ffd700]" />
                <h3 className="font-black text-base lg:text-lg text-white font-serif gold-gradient-text">
                  Founder Super Admin Attendance Command
                </h3>
                {pendingCorrections.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] font-bold">
                    {pendingCorrections.length} Correction Requests
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Full authority to inspect all punch-in and punch-out records for all employees across all days, and correct or add entries directly.
              </p>
            </div>

            {/* Admin Subtabs & Direct Punch Add Button */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleOpenDirectEntry()}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white text-xs font-bold shadow flex items-center gap-1.5 border border-red-500/50"
              >
                <Plus className="w-3.5 h-3.5" /> ➕ Add / Correct Punch
              </button>

              <div className="flex items-center gap-1 bg-[#08080d] p-1 rounded-2xl border border-[#222230]">
                <button
                  onClick={() => setAdminTab("roster")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    adminTab === "roster"
                      ? "bg-[#dc2626] text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  All-Days Master Roster ({displayedRoster.length})
                </button>
                <button
                  onClick={() => setAdminTab("corrections")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    adminTab === "corrections"
                      ? "bg-[#dc2626] text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Correction Requests Desk ({pendingCorrections.length})
                </button>
              </div>
            </div>
          </div>

          {/* Subtab 1: All-Days Master Company Roster */}
          {adminTab === "roster" && (
            <div className="space-y-4">
              {/* Comprehensive Filter Controls */}
              <div className="p-4 rounded-2xl bg-[#08080d] border border-[#222230] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#ffd700]" />
                    <span className="text-xs font-bold text-white">Master Roster Filters:</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Showing <strong className="text-[#ffd700]">{displayedRoster.length}</strong> record(s)</span>
                    <button
                      onClick={() => {
                        setSelectedDateFilter("all");
                        setSelectedEmployeeFilter("all");
                        setSelectedStatusFilter("all");
                        setSearchQuery("");
                      }}
                      className="text-[#ffd700] hover:underline flex items-center gap-1 ml-2"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Date Filter */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Filter By Date</label>
                    <div className="flex items-center gap-1">
                      <select
                        value={selectedDateFilter}
                        onChange={(e) => setSelectedDateFilter(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#0e0e16] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
                      >
                        <option value="all">📅 All November Days</option>
                        <option value="2026-11-18">Today (18 Nov 2026)</option>
                        <option value="2026-11-17">Yesterday (17 Nov 2026)</option>
                        <option value="2026-11-16">Launch Day (16 Nov 2026)</option>
                        <option value="2026-11-13">13 Nov 2026</option>
                        <option value="2026-11-12">12 Nov 2026</option>
                        <option value="2026-11-11">11 Nov 2026</option>
                        <option value="2026-11-10">10 Nov 2026</option>
                        <option value="2026-11-09">09 Nov 2026</option>
                        <option value="2026-11-06">06 Nov 2026</option>
                        <option value="2026-11-05">05 Nov 2026</option>
                        <option value="2026-11-04">04 Nov 2026</option>
                        <option value="2026-11-03">03 Nov 2026</option>
                        <option value="2026-11-02">02 Nov 2026</option>
                      </select>
                    </div>
                  </div>

                  {/* Employee Filter */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Filter By Employee</label>
                    <select
                      value={selectedEmployeeFilter}
                      onChange={(e) => setSelectedEmployeeFilter(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#0e0e16] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
                    >
                      <option value="all">👥 All 10 Employees</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name} ({emp.ecode})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Filter By Status</label>
                    <select
                      value={selectedStatusFilter}
                      onChange={(e) => setSelectedStatusFilter(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#0e0e16] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
                    >
                      <option value="all">⚡ All Statuses</option>
                      <option value="Present">Present Only</option>
                      <option value="Late Mark">Late Mark Only</option>
                      <option value="Not Clocked">Not Clocked / Absent</option>
                    </select>
                  </div>

                  {/* Search Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Search Text</label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search name, ecode, notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#0e0e16] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Master Roster Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#222230]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#08080d] border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Employee</th>
                      <th className="py-3 px-3">Punch In</th>
                      <th className="py-3 px-3">Punch Out</th>
                      <th className="py-3 px-3">Work Mode</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Notes & Handover</th>
                      <th className="py-3 px-3 text-right">Founder Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e1e2c]">
                    {displayedRoster.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-8 text-center text-slate-500 text-xs">
                          No attendance records found matching the current filters.
                        </td>
                      </tr>
                    ) : (
                      displayedRoster.map((item) => {
                        const isPresent = !!item.checkIn;
                        return (
                          <tr key={`${item.employeeId}-${item.date}-${item.id}`} className="hover:bg-[#12121c] transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-[#ffd700]">
                              {item.date}
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <span className="text-base">{item.employeeAvatar}</span>
                                <div>
                                  <p className="font-bold text-white">{item.employeeName}</p>
                                  <p className="text-[10px] text-slate-400 font-mono">
                                    {item.employeeEcode} • {item.designation}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-mono">
                              {isPresent ? (
                                <span className="text-emerald-400 font-bold">{item.checkIn}</span>
                              ) : (
                                <span className="text-slate-500 italic">Not Clocked</span>
                              )}
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-300">
                              {item.checkOut ? (
                                <span className="text-slate-200">{item.checkOut}</span>
                              ) : isPresent ? (
                                <span className="text-amber-400 text-[10px]">In Shift</span>
                              ) : (
                                "--"
                              )}
                            </td>
                            <td className="py-3 px-3 text-slate-300">
                              {item.workMode || "--"}
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                item.status.includes("Present") || item.status.includes("Approved")
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : item.status.includes("Late Mark")
                                  ? "bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/40"
                                  : "bg-slate-700/30 text-slate-400 border border-slate-700/40"
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-slate-400 max-w-xs truncate" title={item.notes}>
                              {item.notes || "—"}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleEditRow(item)}
                                  className="px-2.5 py-1 rounded-lg bg-[#14141e] hover:bg-[#1c1c28] text-[#ffd700] text-[11px] font-bold border border-[#ffd700]/30 transition-all flex items-center gap-1 shadow"
                                  title="Correct punch in, punch out, work mode or status"
                                >
                                  <Edit3 className="w-3 h-3 text-[#dc2626]" />
                                  <span>{isPresent ? "Correct / Edit" : "➕ Add Punch"}</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subtab 2: Employee Punch Correction Requests Desk */}
          {adminTab === "corrections" && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-extrabold text-[#ffd700] tracking-wider">
                Submitted Punch Correction Requests from Employees:
              </h4>

              {punchCorrections.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-[#222230] rounded-2xl">
                  No punch correction requests submitted yet. When employees request adjustments, they appear here for Founder review.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-[#222230]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#08080d] border-b border-[#222230] text-slate-400 uppercase tracking-wider text-[11px]">
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

      {/* FOUNDER DIRECT PUNCH EDIT & CORRECTION MODAL (Super Admin Only) */}
      {showFounderEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/60 p-6 shadow-2xl space-y-5 glow-red-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ffd700]" />
                <div>
                  <h3 className="font-bold text-base text-white">
                    {founderEditData.id ? "Founder Direct Punch Correction" : "Founder Direct Punch Entry"}
                  </h3>
                  <p className="text-[11px] text-[#ffd700] font-mono">
                    Official Executive Override • Active from Nov 01, 2026
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFounderEditModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFounderCorrection} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-[#0e0e16] border border-[#ffd700]/30 text-[11px] text-slate-300">
                <p className="font-bold text-white">Founder Super Admin Guarantee:</p>
                <p className="text-slate-400 mt-0.5">
                  Saving this form directly updates the employee's official attendance record across all modules and dispatches a verified real-time notification to their portal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Employee Selector */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Target Employee</label>
                  <select
                    value={founderEditData.employeeId}
                    onChange={(e) => setFounderEditData({ ...founderEditData, employeeId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                    required
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.ecode}) — {emp.designation}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Picker */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Shift Date (Nov 01, 2026 onwards)</label>
                  <input
                    type="date"
                    min="2026-11-01"
                    max="2026-11-30"
                    value={founderEditData.date}
                    onChange={(e) => setFounderEditData({ ...founderEditData, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700] font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Punch-In Time</label>
                  <input
                    type="text"
                    value={founderEditData.checkIn}
                    onChange={(e) => setFounderEditData({ ...founderEditData, checkIn: e.target.value })}
                    placeholder="09:30 AM"
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700] font-mono"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Punch-Out Time</label>
                  <input
                    type="text"
                    value={founderEditData.checkOut}
                    onChange={(e) => setFounderEditData({ ...founderEditData, checkOut: e.target.value })}
                    placeholder="06:30 PM (or blank if ongoing)"
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Work Mode</label>
                  <select
                    value={founderEditData.workMode}
                    onChange={(e) => setFounderEditData({ ...founderEditData, workMode: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  >
                    <option value="Office">In-Office / Studio Campus</option>
                    <option value="Remote / Work From Home">Remote / Work From Home</option>
                    <option value="Field / On-Duty">Field / On-Duty Client Visit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Official Status</label>
                  <select
                    value={founderEditData.status}
                    onChange={(e) => setFounderEditData({ ...founderEditData, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  >
                    <option value="Present">Present</option>
                    <option value="Late Mark">Late Mark</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Present [Corrected by Founder]">Present [Corrected by Founder]</option>
                    <option value="Excused / On-Duty">Excused / On-Duty</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Founder Remarks / Justification</label>
                <textarea
                  rows="3"
                  value={founderEditData.notes}
                  onChange={(e) => setFounderEditData({ ...founderEditData, notes: e.target.value })}
                  placeholder="e.g. Verified YouTube production shift and approved 8.5 logged hours."
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#222230]">
                {founderEditData.id ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteRecord(founderEditData)}
                    className="px-3 py-2 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-900/60 font-semibold border border-red-500/30 flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Punch
                  </button>
                ) : (
                  <div></div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFounderEditModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#14141e] text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold flex items-center gap-1.5 shadow-lg glow-red-sm hover:brightness-110"
                  >
                    <Check className="w-3.5 h-3.5" /> Save Official Record
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REGULAR EMPLOYEE PUNCH CORRECTION REQUEST MODAL */}
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
