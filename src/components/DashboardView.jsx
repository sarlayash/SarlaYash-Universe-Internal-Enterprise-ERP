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
  CheckSquare,
  Shield,
  FileEdit,
  Radio,
  Video,
  ExternalLink,
  Plus
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
  punchCorrections = [],
  broadcasts = [],
  onNavigate,
  onQuickPunch,
  onNominateClick,
  onPushBroadcastClick
}) {
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";
  const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;

  // Real Dynamic Metrics (No Fake Data)
  const myNovAttendance = attendanceList.filter(
    (a) => a.employeeId === currentUser?.id && a.date >= "2026-11-01"
  );
  const myPresentDays = myNovAttendance.filter((a) => a.status === "Present" || a.status?.includes("Approved")).length;

  const totalLeaveBalance =
    (currentUser?.leaveBalance?.casual || 0) +
    (currentUser?.leaveBalance?.sick || 0) +
    (currentUser?.leaveBalance?.privilege || 0) +
    (currentUser?.leaveBalance?.blessings || 0);

  const pendingLeavesForAdmin = leavesList.filter((l) => l.status === "Pending");
  const pendingCorrectionsForAdmin = punchCorrections.filter((c) => c.status === "Pending");
  const myAssignedChannels = channelsList.filter(
    (c) => c.assignedEcode === currentUser?.ecode || currentUser?.assignedChannels?.includes(c.name)
  );

  const todayPresentCount = attendanceList.filter(
    (a) => a.date === "2026-11-17" && a.checkIn
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Welcome Hero - Fortune 500 Velvet Red & Obsidian Glow */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d090a] via-[#140e10] to-[#07070a] border-2 border-[#ffd700]/30 p-6 lg:p-8 shadow-2xl">
        {/* Ambient spotlight */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#dc2626]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#ffd700]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dc2626]/20 border border-[#dc2626]/40 text-[#ffd700] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>
                {isSuperAdmin ? "Founder Executive Portal • Super Admin" : "SarlaYash Universe • Individual Workspace"}
              </span>
            </div>

            <h2 className="text-2xl lg:text-4xl font-black text-white tracking-tight font-serif">
              Welcome back, <span className="gold-gradient-text">{currentUser?.name}</span>
            </h2>

            <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
              {currentUser?.designation} • Department of <span className="text-white font-semibold">{currentUser?.department}</span>. Official time:{" "}
              <span className="text-[#ffd700] font-bold">Tuesday, 17 November 2026 (IST)</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-[#09090e] border border-[#262635] text-slate-300 font-mono">
                Employee ID: <strong className="text-white">{currentUser?.ecode}</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#09090e] border border-[#262635] text-slate-300">
                Reporting Line: <strong className="text-[#ffd700]">{currentUser?.reportsTo}</strong>
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
                  {isCheckedIn ? "Present (Clocked In)" : "Not Clocked In Today"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Punch</p>
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

      {/* MIDNIGHT IST AUTO CLOCK-OUT POLICY NOTICE */}
      <div className="p-3.5 rounded-2xl bg-[#09090f] border border-[#ffd700]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-inner">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-[#dc2626]/20 border border-[#dc2626]/40 text-[#ffd700]">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white flex items-center gap-2">
              <span>Midnight IST Auto-Closure Policy Active</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.2 rounded-full font-mono">
                12:00 AM IST
              </span>
            </p>
            <p className="text-slate-400 text-[11px]">
              If you forget to clock out, your shift automatically closes at 12:00 AM Midnight IST as per company operating regulations.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate("attendance")}
          className="text-[#ffd700] font-bold text-xs hover:underline flex items-center gap-1 shrink-0"
        >
          <span>View My Attendance Matrix</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SUPER ADMIN ACTION BANNER (If Founder Kapil) */}
      {isSuperAdmin && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#1c0c0e] via-[#120a0d] to-[#0e0e16] border-2 border-[#ffd700]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#dc2626]/20 border border-[#dc2626]/40 text-[#ffd700]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-white text-base">Founder Super Admin Desk Pending Items</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {pendingLeavesForAdmin.length} leave application(s) • {pendingCorrectionsForAdmin.length} punch correction request(s) awaiting your executive approval.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            {pendingLeavesForAdmin.length > 0 && (
              <button
                onClick={() => onNavigate("leaves")}
                className="px-4 py-2 rounded-xl bg-[#dc2626] hover:bg-red-600 text-white font-bold text-xs shadow flex items-center gap-1.5"
              >
                <CalendarCheck2 className="w-4 h-4" /> Review Leaves ({pendingLeavesForAdmin.length})
              </button>
            )}
            {pendingCorrectionsForAdmin.length > 0 && (
              <button
                onClick={() => onNavigate("attendance")}
                className="px-4 py-2 rounded-xl bg-[#09090e] border border-[#ffd700]/40 hover:bg-[#161622] text-[#ffd700] font-bold text-xs shadow flex items-center gap-1.5"
              >
                <FileEdit className="w-4 h-4" /> Review Punches ({pendingCorrectionsForAdmin.length})
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <div
          onClick={() => onNavigate("attendance")}
          className="glass-panel glass-panel-hover p-5 rounded-3xl cursor-pointer border-t-4 border-t-emerald-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {isSuperAdmin ? "Today's Team Clock-In" : "November 2026 Shifts"}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-black text-white font-mono">
              {isSuperAdmin ? `${todayPresentCount} / 10` : `${myPresentDays} Days`}
            </h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">
                {isSuperAdmin ? "Members Clocked In Today" : "Punched Present since Nov 01"}
              </span>
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#222230] flex items-center justify-between text-[11px] text-[#ffd700] font-bold">
            <span>{isSuperAdmin ? "Master Attendance Board" : "Open Punch Terminal"}</span>
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
            <h3 className="text-3xl font-black text-white font-mono">{totalLeaveBalance} Days</h3>
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
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Assigned Ecosystem</span>
            <div className="p-2 rounded-xl bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-black text-white font-mono">
              {myAssignedChannels.length > 0 ? `${myAssignedChannels.length} Channels` : "Active"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 truncate">
              {myAssignedChannels.length > 0 ? myAssignedChannels[0]?.name : "Submit today's deliverables"}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#222230] flex items-center justify-between text-[11px] text-[#ffd700] font-bold">
            <span>Submit Daily Worklog</span>
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

      {/* NEW SECTION: FOUNDER BROADCASTS, SESSIONS & SPEAKER NOMINATIONS SPOTLIGHT */}
      <div className="rounded-3xl bg-[#0a0a10] border-2 border-[#ffd700]/30 p-6 shadow-2xl space-y-5 glow-red-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#dc2626] animate-pulse" />
              <h3 className="text-base sm:text-lg font-black text-white font-serif gold-gradient-text">
                Founder Broadcasts & Upcoming Masterclasses
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] font-black uppercase">
                Active Calls
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Sessions announced by Founder Kapil Narula • Nominate for Speaker roles, co-hosting & technical execution
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isSuperAdmin && (
              <button
                onClick={() => onNavigate("broadcasts")}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white text-xs font-bold shadow flex items-center gap-1.5 border border-[#ffd700]/30"
              >
                <Plus className="w-3.5 h-3.5" /> Push Broadcast
              </button>
            )}
            <button
              onClick={() => onNavigate("broadcasts")}
              className="px-3.5 py-1.5 rounded-xl bg-[#14141e] hover:bg-[#1c1c28] text-[#ffd700] text-xs font-bold border border-[#ffd700]/30 transition-all flex items-center gap-1"
            >
              <span>View All ({broadcasts.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Session Cards Grid on Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {broadcasts.slice(0, 3).map((item) => {
            const hasNominated = (item.nominations || []).some(
              (n) => n.employeeId === currentUser?.id || n.employeeEcode === currentUser?.ecode
            );

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#0e0e16] border border-[#222230] hover:border-[#ffd700]/50 transition-all space-y-3 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-2.5">
                  <div className="relative h-32 rounded-xl overflow-hidden bg-black">
                    <img
                      src={item.bannerUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      onError={(e) => {
                        e.target.src = "./sarlayash_blessings_banner.jpg";
                      }}
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#dc2626] text-white text-[9px] font-black uppercase shadow">
                      {item.type}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-xs line-clamp-2 group-hover:text-[#ffd700] transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-[#ffd700] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#dc2626]" />
                    <span>{item.dateTime}</span>
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {(item.availableRoles || []).slice(0, 2).map((role) => (
                      <span
                        key={role}
                        className="text-[9px] px-2 py-0.5 rounded bg-[#181824] text-slate-300 border border-[#2a2a38]"
                      >
                        🎤 {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1e1e2c] flex items-center justify-between gap-2">
                  {item.meetingLink && (
                    <a
                      href={item.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Join Meet</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      if (onNominateClick) onNominateClick(item);
                      else onNavigate("broadcasts");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      hasNominated
                        ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                        : "bg-[#dc2626] hover:bg-red-600 text-white shadow glow-red-sm"
                    }`}
                  >
                    {hasNominated ? "Enrolled" : "Nominate as Speaker"}
                  </button>
                </div>
              </div>
            );
          })}
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
                <span>Explore Slabs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#0e0e16] border border-[#222230]">
              <span className="text-[10px] uppercase font-bold text-slate-400">Pillar 1</span>
              <p className="font-extrabold text-white text-sm mt-0.5">⏰ Just 1 Hour a Day</p>
              <p className="text-[11px] text-slate-400 mt-1">Consistency over keeping people busy.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0e0e16] border border-[#222230]">
              <span className="text-[10px] uppercase font-bold text-slate-400">Pillar 2</span>
              <p className="font-extrabold text-white text-sm mt-0.5">📅 5-Day Work Week</p>
              <p className="text-[11px] text-slate-400 mt-1">Because growth needs time to breathe.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0e0e16] border border-[#222230]">
              <span className="text-[10px] uppercase font-bold text-slate-400">Pillar 3</span>
              <p className="font-extrabold text-white text-sm mt-0.5">💰 100% Refundable</p>
              <p className="text-[11px] text-slate-400 mt-1">₹50 daily commitment deposit refunded.</p>
            </div>
          </div>
        </div>

        {/* Official Bulletins */}
        <div className="rounded-3xl bg-[#0c0c12] border border-[#222230] p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#ffd700]" />
                <span>Leadership Bulletins</span>
              </h3>
              <span className="text-[10px] text-[#ffd700] font-mono">Official</span>
            </div>

            <div className="space-y-3 mt-4">
              {announcements.slice(0, 2).map((ann) => (
                <div key={ann.id} className="p-3 rounded-2xl bg-[#08080d] border border-[#222230] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#ffd700] font-semibold">{ann.author}</span>
                    <span className="text-[9px] text-slate-500 font-mono">{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug">{ann.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate("policies")}
            className="w-full py-2.5 rounded-xl bg-[#14141e] hover:bg-[#1a1a24] text-[#ffd700] font-bold text-xs border border-[#ffd700]/30 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Read Compliance & Policies</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
