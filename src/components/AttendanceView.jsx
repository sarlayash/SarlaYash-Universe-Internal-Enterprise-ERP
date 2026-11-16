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
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AttendanceView({
  currentUser,
  employees,
  attendanceList,
  onRecordAttendance,
  todayAttendance
}) {
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const [workMode, setWorkMode] = useState("Office");
  const [workNote, setWorkNote] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;

  // Handle punch
  const handlePunch = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!isCheckedIn) {
      // Check in
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
      setFeedbackMsg(`Checked in successfully at ${timeStr}! Status: ${status}`);
    } else {
      // Check out
      onRecordAttendance({
        ...todayAttendance,
        checkOut: timeStr,
        notes: workNote ? `${todayAttendance.notes} | Out note: ${workNote}` : todayAttendance.notes
      });
      setFeedbackMsg(`Checked out successfully at ${timeStr}. Great work today!`);
    }

    setWorkNote("");
    setTimeout(() => setFeedbackMsg(""), 4500);
  };

  // Filter attendance list for current user history
  const myAttendanceHistory = attendanceList.filter((a) => a.employeeId === currentUser.id);

  // Today's team attendance
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

  // Export CSV
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-400" />
            <span>Daily Attendance & Time Tracking</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Standard Operating Hours: 09:30 AM – 06:30 PM • Geolocation & Shift Verification
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={exportAttendanceCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Master CSV</span>
          </button>
        )}
      </div>

      {feedbackMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Top Interactive Punch Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Punch Clock Station */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-navy-900 via-slate-900 to-[#0c1836] border border-amber-500/30 p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <UserCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-base text-white">Punch Terminal</h3>
                <p className="text-xs text-slate-400">Authenticated for: {currentUser?.name} ({currentUser?.ecode})</p>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              isCheckedIn
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
            }`}>
              {isCheckedIn ? "Checked In • Working" : "Not Checked In"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setWorkMode("Office")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                workMode === "Office"
                  ? "bg-amber-500/20 border-amber-400 text-amber-200 font-semibold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Building className="w-4 h-4 text-amber-400 mb-1" />
              <p className="text-xs font-bold">Office Campus</p>
              <p className="text-[10px] text-slate-400">HQ / Learning Studio</p>
            </button>

            <button
              type="button"
              onClick={() => setWorkMode("Remote / Work From Home")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                workMode.includes("Remote")
                  ? "bg-amber-500/20 border-amber-400 text-amber-200 font-semibold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Laptop className="w-4 h-4 text-blue-400 mb-1" />
              <p className="text-xs font-bold">Remote / WFH</p>
              <p className="text-[10px] text-slate-400">Approved Virtual Work</p>
            </button>

            <button
              type="button"
              onClick={() => setWorkMode("Field / On-Duty")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                workMode.includes("Field")
                  ? "bg-amber-500/20 border-amber-400 text-amber-200 font-semibold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Car className="w-4 h-4 text-purple-400 mb-1" />
              <p className="text-xs font-bold">On Duty / Client</p>
              <p className="text-[10px] text-slate-400">Institutional Visit</p>
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              {isCheckedIn ? "End of Day Summary / Work Handover Note:" : "Today's Work Plan / Task Objective:"}
            </label>
            <input
              type="text"
              value={workNote}
              onChange={(e) => setWorkNote(e.target.value)}
              placeholder={isCheckedIn ? "e.g. Completed YouTube episode recording, published 2 LinkedIn posts..." : "e.g. Preparing DSA graphs curriculum and reviewing student assignments..."}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-400">
              <span>Current Punch-in: </span>
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
              className={`w-full sm:w-auto px-8 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-xl ${
                isCheckedIn
                  ? "bg-rose-600 hover:bg-rose-500 text-white"
                  : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:brightness-110 glow-gold"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{isCheckedIn ? "CLOCK OUT FOR TODAY" : "PUNCH IN / CLOCK IN"}</span>
            </button>
          </div>
        </div>

        {/* Monthly Summary Card */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Calendar className="w-4 h-4 text-amber-400" />
              November 2026 Summary
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Days</span>
                <p className="text-lg font-bold text-white">30 Days</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold">Present</span>
                <p className="text-lg font-bold text-emerald-300">22 Days</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] text-amber-400 uppercase font-semibold">Late Marks</span>
                <p className="text-lg font-bold text-amber-300">1 Time</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] text-blue-400 uppercase font-semibold">Avg Hours</span>
                <p className="text-lg font-bold text-blue-300">8.6 hrs</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-white">Policy Note:</p>
            <p>Grace period: up to 09:30 AM. 3 Late Marks in a month equals half-day leave deduction per company rules.</p>
          </div>
        </div>
      </div>

      {/* Admin Live Team Attendance Board (All 10 Team Members) */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-400" />
              Company Team Attendance Roster • 16 Nov 2026
            </h3>
            <p className="text-xs text-slate-400">Complete visibility across Founders, Executives & Engineers</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search employee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400 w-44"
              />
            </div>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Departments</option>
              <option value="Executive">Executive</option>
              <option value="Engineering">Engineering & AI</option>
              <option value="Talent">Talent & Solutions</option>
            </select>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Employee</th>
                <th className="py-3 px-3">Designation</th>
                <th className="py-3 px-3">Reports To</th>
                <th className="py-3 px-3">Check In</th>
                <th className="py-3 px-3">Work Mode</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Task Notes</th>
                {isAdmin && <th className="py-3 px-3 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTeamAttendance.map(({ employee, attendance }) => {
                const isPresent = !!attendance?.checkIn;
                return (
                  <tr key={employee.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{employee.avatar}</span>
                        <div>
                          <p className="font-bold text-white">{employee.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{employee.ecode}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <p className="font-medium text-slate-300">{employee.designation}</p>
                      <p className="text-[10px] text-slate-500">{employee.department}</p>
                    </td>

                    <td className="py-3 px-3 text-slate-400">
                      {employee.reportsTo}
                    </td>

                    <td className="py-3 px-3 font-mono">
                      {isPresent ? (
                        <span className="text-emerald-400 font-bold">{attendance.checkIn}</span>
                      ) : (
                        <span className="text-slate-500 italic">Not Clocked</span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-slate-300">
                      {attendance?.workMode || "--"}
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isPresent
                            ? attendance?.status === "Late Mark"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {attendance?.status || "Absent"}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-400 max-w-xs truncate">
                      {attendance?.notes || "—"}
                    </td>

                    {isAdmin && (
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
                              status: "Present",
                              notes: "Admin Regularized Attendance."
                            });
                            setFeedbackMsg(`Attendance regularized for ${employee.name}!`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-semibold border border-amber-500/30 transition-colors"
                        >
                          Regularize
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
