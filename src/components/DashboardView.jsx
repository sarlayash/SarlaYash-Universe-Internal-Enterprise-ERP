import React from "react";
import {
  CalendarCheck2,
  Clock,
  Award,
  Globe2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Users,
  ChevronRight,
  Check
} from "lucide-react";

export default function DashboardView({
  currentUser,
  employees,
  attendanceList,
  leavesList,
  channelsList,
  earningTargets,
  announcements,
  todayAttendance,
  onNavigate,
  onQuickPunch
}) {
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;

  // Calculate stats
  const totalLeaveBalance =
    (currentUser?.leaveBalance?.casual || 0) +
    (currentUser?.leaveBalance?.sick || 0) +
    (currentUser?.leaveBalance?.privilege || 0) +
    (currentUser?.leaveBalance?.blessings || 0);

  const pendingLeavesForManager = leavesList.filter((l) => l.status === "Pending");
  const myLeaves = leavesList.filter((l) => l.employeeId === currentUser?.id);
  const myAssignedChannels = channelsList.filter(
    (c) => c.assignedEcode === currentUser?.ecode || currentUser?.assignedChannels?.includes(c.name)
  );

  const myTarget = earningTargets.find((t) => t.employeeEcode === currentUser?.ecode) || earningTargets[0];

  const todayPresentCount = attendanceList.filter((a) => a.date === "2026-11-16" && a.status !== "Absent").length;

  return (
    <div className="space-y-6">
      {/* Top Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-900 via-slate-900 to-[#0e1b3d] border border-amber-500/30 p-6 lg:p-8 shadow-2xl">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SarlaYash Universe • Empowered by Kapil</span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="gold-gradient-text">{currentUser?.name}</span>
            </h2>

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {currentUser?.designation} • Department of {currentUser?.department}. Today is{" "}
              <span className="text-amber-300 font-medium">Monday, 16 November 2026</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 font-mono">
                Employee ID: <strong className="text-white">{currentUser?.ecode}</strong>
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                Reporting To: <strong className="text-amber-400">{currentUser?.reportsTo}</strong>
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5" /> Active Status
              </span>
            </div>
          </div>

          {/* Quick Punch Action Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-xl shrink-0 w-full sm:w-auto">
            <div className="flex items-center justify-between gap-6 mb-3">
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Today's Shift Status</p>
                <p className="text-base font-bold text-white flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isCheckedIn ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}></span>
                  {isCheckedIn ? "Present (Clocked In)" : "Not Clocked In Yet"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slate-400">Time</p>
                <p className="text-sm font-mono font-bold text-amber-300">
                  {todayAttendance?.checkIn || "09:30 AM Shift"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={onQuickPunch}
                className={`w-full py-2.5 px-5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isCheckedIn
                    ? "bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30"
                    : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:brightness-110 glow-gold"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{isCheckedIn ? "Clock Out for the Day" : "Clock In / Mark Attendance"}</span>
              </button>

              <button
                onClick={() => onNavigate("tasks")}
                className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-amber-500/30"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Submit Daily Task Log</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <div
          onClick={() => onNavigate("attendance")}
          className="glass-panel glass-panel-hover p-4 rounded-2xl cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Monthly Attendance</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white">96.8%</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">22 / 23</span> working days attended
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400">
            <span>View Punch Logs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Leave Balance Card */}
        <div
          onClick={() => onNavigate("leaves")}
          className="glass-panel glass-panel-hover p-4 rounded-2xl cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Available Leaves</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white">{totalLeaveBalance} Days</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span>CL: {currentUser?.leaveBalance?.casual}</span> •{" "}
              <span>SL: {currentUser?.leaveBalance?.sick}</span> •{" "}
              <span className="text-amber-300 font-semibold">Blessings: {currentUser?.leaveBalance?.blessings}</span>
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400">
            <span>Apply or Manage</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Channels Impact Card */}
        <div
          onClick={() => onNavigate("channels")}
          className="glass-panel glass-panel-hover p-4 rounded-2xl cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Assigned Channels</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Globe2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white">
              {myAssignedChannels.length > 0 ? myAssignedChannels.length : "18 Portals"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 truncate">
              {myAssignedChannels.length > 0
                ? myAssignedChannels[0]?.name
                : "LinkedIn • YouTube • Facebook"}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400">
            <span>Open Channel Command</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* SarlaYash Blessings Reward Card */}
        <div
          onClick={() => onNavigate("earning-model")}
          className="glass-panel glass-panel-hover p-4 rounded-2xl cursor-pointer bg-gradient-to-br from-amber-500/10 to-transparent"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400">Blessings Earning Tier</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-amber-200">
              {myTarget ? myTarget.rewardTier : "Diamond"}
            </h3>
            <p className="text-xs text-slate-300 mt-1 truncate font-medium">
              {myTarget?.targetTitle || "Choose your target. Create impact."}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400">
            <span>View Earning Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* SarlaYash Blessings Banner & Internships Earning Model Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Banner Card */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-amber-500/30 bg-[#090f20] shadow-2xl relative flex flex-col justify-between">
          <div className="relative">
            <img
              src="./sarlayash_blessings_banner.jpg"
              alt="SarlaYash Blessings Internships Earning Model"
              className="w-full h-56 object-cover object-top opacity-90 hover:opacity-100 transition-opacity"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090f20] via-[#090f20]/50 to-transparent"></div>

            <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                  SarlaYash Blessings 🙌
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-serif mt-1 gold-gradient-text">
                  Internships Earning Model
                </h3>
              </div>

              <button
                onClick={() => onNavigate("earning-model")}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg flex items-center gap-1.5"
              >
                <span>Explore Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-6 pt-3 space-y-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200">
              <p className="text-sm font-semibold italic text-center text-amber-300">
                “ Choose your target. Create the impact. Prove the results. Earn your reward. 🚀 ”
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-base font-bold text-amber-400">1. Target</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Select high-value KPI</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-base font-bold text-amber-400">2. Impact</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Execute & deliver</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-base font-bold text-amber-400">3. Results</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Submit verified proof</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-base font-bold text-amber-400">4. Reward</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Stipend & accolades</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Quick Approval / My Actions Panel */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-navy-900 to-[#0a1226] p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                {isAdmin ? "Admin Approval Desk" : "My Leave Status"}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                {isAdmin ? `${pendingLeavesForManager.length} Pending` : `${myLeaves.length} Total`}
              </span>
            </div>

            {isAdmin ? (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">
                  You have administrative privileges to review and approve company leave requests.
                </p>

                {pendingLeavesForManager.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                    No pending leave requests at this moment!
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {pendingLeavesForManager.slice(0, 3).map((leave) => (
                      <div
                        key={leave.id}
                        onClick={() => onNavigate("leaves")}
                        className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 hover:border-amber-400 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{leave.employeeName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                            {leave.leaveType}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{leave.reason}</p>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800 text-[10px] text-slate-400">
                          <span>{leave.startDate} to {leave.endDate}</span>
                          <span className="font-bold text-amber-400">Review & Approve →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">Track your submitted leaves and manager decisions:</p>
                {myLeaves.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                    No leaves applied yet. Need time off?
                  </div>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {myLeaves.map((leave) => (
                      <div key={leave.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200">{leave.leaveType}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              leave.status === "Approved"
                                ? "bg-emerald-500/20 text-emerald-300"
                                : leave.status === "Pending"
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-rose-500/20 text-rose-300"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{leave.startDate} ({leave.daysCount} day)</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <button
              onClick={() => onNavigate("leaves")}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-amber-500/20"
            >
              <span>{isAdmin ? "Open Full Approval Desk" : "Apply for New Leave"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Team Presence Roster Today & Company Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Attendance Feed (All 10 members) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                Team Presence Today ({todayPresentCount}/10 On Board)
              </h3>
              <p className="text-xs text-slate-400">Live check-in feed across the SarlaYash team</p>
            </div>
            <button
              onClick={() => onNavigate("attendance")}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Full Attendance Roster</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {employees.map((emp) => {
              const att = attendanceList.find(
                (a) => a.employeeId === emp.id && a.date === "2026-11-16"
              );
              const isPresent = !!att?.checkIn;
              return (
                <div
                  key={emp.id}
                  className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-amber-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-xl shrink-0">{emp.avatar}</span>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-bold text-slate-200 truncate">{emp.name}</span>
                        <span className="text-[9px] font-mono text-slate-400 shrink-0">({emp.ecode})</span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">{emp.designation}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        isPresent
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isPresent ? att.checkIn : "Not In"}
                    </span>
                    <p className="text-[9px] text-slate-400 mt-0.5">
                      {att?.workMode ? (att.workMode.includes("Remote") ? "WFH" : "Office") : "Shift"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Announcements & Policy Highlights */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Leadership Bulletins
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">
                Official
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {announcements.slice(0, 2).map((ann) => (
                <div key={ann.id} className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 line-clamp-1">{ann.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">{ann.content}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span className="font-medium text-slate-300">{ann.author}</span>
                    <span>{ann.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate("policies")}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 font-semibold text-xs border border-slate-800 transition-colors flex items-center justify-center gap-1.5 mt-4"
          >
            <span>View All Announcements & POSH Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
