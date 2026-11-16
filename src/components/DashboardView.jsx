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
  Check,
  CheckSquare
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
      {/* Top Welcome Hero - Fortune 500 Velvet Red & Obsidian Glow */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d090a] via-[#140e10] to-[#07070a] border-2 border-[#ffd700]/30 p-6 lg:p-8 shadow-2xl">
        {/* Dramatic Velvet Red ambient spotlight */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#dc2626]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#ffd700]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dc2626]/20 border border-[#dc2626]/40 text-[#ffd700] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>SarlaYash Universe • Powered By Kapil</span>
            </div>

            <h2 className="text-2xl lg:text-4xl font-black text-white tracking-tight font-serif">
              Welcome back, <span className="gold-gradient-text">{currentUser?.name}</span>
            </h2>

            <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
              {currentUser?.designation} • Department of <span className="text-white font-semibold">{currentUser?.department}</span>. Today is{" "}
              <span className="text-[#ffd700] font-bold">Monday, 16 November 2026</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-[#09090e] border border-[#262635] text-slate-300 font-mono">
                Employee ID: <strong className="text-white">{currentUser?.ecode}</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#09090e] border border-[#262635] text-slate-300">
                Reporting To: <strong className="text-[#ffd700]">{currentUser?.reportsTo}</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 font-bold">
                <Check className="w-3.5 h-3.5" /> Active in Service
              </span>
            </div>
          </div>

          {/* Quick Punch Action Card */}
          <div className="p-4 rounded-3xl bg-[#0c0c12] border-2 border-[#ffd700]/30 shadow-2xl shrink-0 w-full sm:w-auto space-y-3">
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Today's Shift Status</p>
                <p className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2 mt-0.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isCheckedIn ? "bg-emerald-400 animate-pulse" : "bg-[#dc2626]"}`}></span>
                  {isCheckedIn ? "Present (Clocked In)" : "Not Clocked In Yet"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Time</p>
                <p className="text-sm font-mono font-black text-[#ffd700]">
                  {todayAttendance?.checkIn || "09:30 AM Shift"}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={onQuickPunch}
                className={`w-full py-2.5 px-5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isCheckedIn
                    ? "bg-[#181824] hover:bg-[#202030] text-[#f87171] border border-red-500/40"
                    : "bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white hover:brightness-110 glow-red-sm border border-red-500/50"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{isCheckedIn ? "Clock Out for the Day" : "Clock In / Mark Attendance"}</span>
              </button>

              <button
                onClick={() => onNavigate("tasks")}
                className="w-full py-2 px-4 rounded-xl bg-[#14141e] hover:bg-[#1a1a26] text-[#ffd700] font-bold text-xs transition-all flex items-center justify-center gap-2 border border-[#ffd700]/30"
              >
                <FileText className="w-3.5 h-3.5 text-[#dc2626]" />
                <span>Submit Daily Task Log</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards - Fortune 500 Standards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <div
          onClick={() => onNavigate("attendance")}
          className="glass-panel glass-panel-hover p-5 rounded-3xl cursor-pointer border-t-4 border-t-emerald-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Attendance Rate</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-black text-white">96.8%</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">22 / 23</span> working days attended
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#222230] flex items-center justify-between text-[11px] text-[#ffd700] font-bold">
            <span>Punch Terminal & Matrix</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Leave Balance Card */}
        <div
          onClick={() => onNavigate("leaves")}
          className="glass-panel glass-panel-hover p-5 rounded-3xl cursor-pointer border-t-4 border-t-[#dc2626]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Available Leaves</span>
            <div className="p-2 rounded-xl bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/40">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-black text-white">{totalLeaveBalance} Days</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span>CL: {currentUser?.leaveBalance?.casual}</span> •{" "}
              <span>SL: {currentUser?.leaveBalance?.sick}</span> •{" "}
              <span className="text-[#ffd700] font-bold">Care: {currentUser?.leaveBalance?.blessings}</span>
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#222230] flex items-center justify-between text-[11px] text-[#ffd700] font-bold">
            <span>Apply or Review Leaves</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Daily Tasks Card */}
        <div
          onClick={() => onNavigate("tasks")}
          className="glass-panel glass-panel-hover p-5 rounded-3xl cursor-pointer border-t-4 border-t-[#ffd700]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Daily Tasks Log</span>
            <div className="p-2 rounded-xl bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-black text-white">
              {myAssignedChannels.length > 0 ? `${myAssignedChannels.length} Channels` : "Active"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 truncate">
              {myAssignedChannels.length > 0 ? myAssignedChannels[0]?.name : "Submit today's deliverables"}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#222230] flex items-center justify-between text-[11px] text-[#ffd700] font-bold">
            <span>Submit Work Log</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* SarlaYash Blessings Slabs Card */}
        <div
          onClick={() => onNavigate("earning-model")}
          className="glass-panel glass-panel-hover p-5 rounded-3xl cursor-pointer border-t-4 border-t-[#ffd700] bg-gradient-to-br from-[#1a0a0c] to-[#0c0c12]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#ffd700] uppercase tracking-wider">Performance Slab</span>
            <div className="p-2 rounded-xl bg-[#dc2626]/20 text-white border border-[#dc2626]/50">
              <Award className="w-4 h-4 text-[#ffd700]" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-black text-[#ffd700] font-mono">
              ₹1k–₹15k
            </h3>
            <p className="text-xs text-slate-200 mt-1 truncate font-medium">
              Slabs 0 to 3 • 100% Refundable
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#222230] flex items-center justify-between text-[11px] text-[#ffd700] font-bold">
            <span>Decide Your Paycheck</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* SarlaYash Blessings Banner & Internships Model Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Banner Card */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden border-2 border-[#ffd700]/30 bg-[#09090e] shadow-2xl relative flex flex-col justify-between">
          <div className="relative">
            <img
              src="./sarlayash_blessings_banner.jpg"
              alt="SarlaYash Blessings Internships Earning Model"
              className="w-full h-56 object-cover object-top opacity-95 hover:opacity-100 transition-opacity"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-[#09090e]/60 to-transparent"></div>

            <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-[#dc2626] text-white font-black text-[10px] tracking-wider uppercase shadow">
                  SarlaYash Blessings 🙌
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-serif mt-1 gold-gradient-text drop-shadow">
                  WHAT MAKES US DIFFERENT?
                </h3>
              </div>

              <button
                onClick={() => onNavigate("earning-model")}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white font-black text-xs hover:brightness-110 shadow-lg flex items-center gap-1.5 border border-red-500/50"
              >
                <span>Explore Slabs & Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-6 pt-3 space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#20090a] via-[#150708] to-[#1a0a0c] border border-[#dc2626]/40 text-center">
              <p className="text-sm font-bold italic text-[#ffd700]">
                “ Choose your target. Create the impact. Prove the results. Earn your reward. 🚀 ”
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 rounded-2xl bg-[#111118] border border-[#222230]">
                <span className="text-base font-extrabold text-[#ffd700]">⏰ 1 Hour</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Daily consistency</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#111118] border border-[#222230]">
                <span className="text-base font-extrabold text-white">📅 5 Days</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Time to breathe</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#111118] border border-[#222230]">
                <span className="text-base font-extrabold text-[#dc2626]">🏠 WFH</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Learn from anywhere</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#111118] border border-[#222230]">
                <span className="text-base font-extrabold text-[#ffd700]">💰 ₹50 Refund</span>
                <p className="text-[10px] text-slate-400 mt-0.5">100% returned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Quick Approval / My Actions Panel */}
        <div className="rounded-3xl border-2 border-[#ffd700]/30 bg-gradient-to-b from-[#121218] to-[#09090f] p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#dc2626]" />
                {isAdmin ? "Executive Leave Desk" : "My Leave Status"}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#181824] text-[#ffd700] font-mono font-bold">
                {isAdmin ? `${pendingLeavesForManager.length} Pending` : `${myLeaves.length} Total`}
              </span>
            </div>

            {isAdmin ? (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-300">
                  Leadership privileges: review and approve submitted leaves across all team members.
                </p>

                {pendingLeavesForManager.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-[#262635] rounded-2xl">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                    All leave applications are up to date!
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {pendingLeavesForManager.slice(0, 3).map((leave) => (
                      <div
                        key={leave.id}
                        onClick={() => onNavigate("leaves")}
                        className="p-3 rounded-2xl bg-[#14141e] border border-[#dc2626]/30 hover:border-[#ffd700] transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{leave.employeeName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#dc2626]/20 text-[#fca5a5] font-semibold">
                            {leave.leaveType}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{leave.reason}</p>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#222230] text-[10px] text-slate-400">
                          <span>{leave.startDate} to {leave.endDate}</span>
                          <span className="font-bold text-[#ffd700]">Review & Decide →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-300">Track your submitted leaves and manager decisions:</p>
                {myLeaves.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-[#262635] rounded-2xl">
                    No leaves applied yet. Need time off?
                  </div>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {myLeaves.map((leave) => (
                      <div key={leave.id} className="p-3 rounded-2xl bg-[#14141e] border border-[#222230] text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{leave.leaveType}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              leave.status === "Approved"
                                ? "bg-emerald-500/20 text-emerald-300"
                                : leave.status === "Pending"
                                ? "bg-[#dc2626]/20 text-[#fca5a5]"
                                : "bg-slate-800 text-slate-400"
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

          <div className="mt-4 pt-4 border-t border-[#222230]">
            <button
              onClick={() => onNavigate("leaves")}
              className="w-full py-2.5 rounded-xl bg-[#161622] hover:bg-[#202030] text-[#ffd700] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#ffd700]/30"
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
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#ffd700]" />
                Team Presence Today ({todayPresentCount}/10 On Board)
              </h3>
              <p className="text-xs text-slate-400">Live attendance telemetry across SarlaYash team</p>
            </div>
            <button
              onClick={() => onNavigate("attendance")}
              className="text-xs text-[#ffd700] hover:text-white font-bold flex items-center gap-1"
            >
              <span>Full Attendance Matrix</span>
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
                  className="p-3 rounded-2xl bg-[#0f0f16] border border-[#222230] flex items-center justify-between gap-3 hover:border-[#ffd700]/40 transition-all"
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-xl shrink-0">{emp.avatar}</span>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-bold text-white truncate">{emp.name}</span>
                        <span className="text-[9px] font-mono text-slate-400 shrink-0">({emp.ecode})</span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">{emp.designation}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isPresent
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/30"
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
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#dc2626]" />
                Leadership Bulletins
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#dc2626]/20 text-[#fca5a5] font-extrabold uppercase border border-red-500/40">
                Official
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {announcements.slice(0, 2).map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-2xl bg-[#111118] border border-[#222230] text-xs space-y-1.5">
                  <span className="font-bold text-[#ffd700] line-clamp-1">{ann.title}</span>
                  <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">{ann.content}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#222230]">
                    <span className="font-medium text-white">{ann.author}</span>
                    <span>{ann.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate("policies")}
            className="w-full py-2.5 rounded-xl bg-[#12121c] hover:bg-[#1a1a26] text-white hover:text-[#ffd700] font-bold text-xs border border-[#262635] transition-colors flex items-center justify-center gap-1.5 mt-4"
          >
            <span>View All Bulletins & Policies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
