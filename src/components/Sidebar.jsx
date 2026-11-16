import React from "react";
import {
  LayoutDashboard,
  Clock,
  CheckSquare,
  CalendarDays,
  CalendarCheck2,
  Users2,
  Globe2,
  Award,
  ReceiptText,
  FileText,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentUser,
  pendingLeavesCount,
  todayAttendance,
  onQuickPunch
}) {
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;

  const navItems = [
    {
      id: "dashboard",
      label: "Executive Dashboard",
      icon: LayoutDashboard,
      badge: null,
      desc: "Overview & Telemetry"
    },
    {
      id: "attendance",
      label: "Daily Attendance",
      icon: Clock,
      badge: isCheckedIn ? "Present" : "Not In",
      badgeColor: isCheckedIn ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-[#dc2626]/20 text-[#fca5a5] border-[#dc2626]/40",
      desc: "Punch Terminal & Logs"
    },
    {
      id: "tasks",
      label: "Daily Tasks & Log",
      icon: CheckSquare,
      badge: "Worklog",
      badgeColor: "bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/30",
      desc: "Submit Deliverables & Hours"
    },
    {
      id: "leaves",
      label: "Leave Management",
      icon: CalendarCheck2,
      badge: isAdmin && pendingLeavesCount > 0 ? `${pendingLeavesCount} Pending` : null,
      badgeColor: "bg-[#dc2626] text-white font-extrabold border-red-500",
      desc: "Apply & Approval Desk"
    },
    {
      id: "earning-model",
      label: "Blessings Internships",
      icon: Award,
      badge: "Slabs 0–3",
      badgeColor: "bg-gradient-to-r from-[#dc2626] to-[#ffd700] text-slate-950 font-black",
      desc: "Care Model & Paycheck"
    },
    {
      id: "calendar",
      label: "Company Calendar",
      icon: CalendarDays,
      badge: "2026",
      badgeColor: "bg-[#181824] text-slate-300 border-[#2b2b3a]",
      desc: "Holidays, Masterclasses, Leaves"
    },
    {
      id: "org",
      label: "Org Hierarchy & Team",
      icon: Users2,
      badge: "10 Members",
      badgeColor: "bg-[#181824] text-slate-300 border-[#2b2b3a]",
      desc: "Reporting Lines & Directory"
    },
    {
      id: "channels",
      label: "Channels Command Hub",
      icon: Globe2,
      badge: "18 Portals",
      badgeColor: "bg-[#ffd700]/15 text-[#ffd700] border-[#ffd700]/30",
      desc: "LinkedIn, YouTube, Facebook"
    },
    {
      id: "payslip",
      label: "Compensation & Slips",
      icon: ReceiptText,
      badge: null,
      desc: "Monthly Statement & Form 16"
    },
    {
      id: "policies",
      label: "Policies & POSH",
      icon: FileText,
      badge: "Zero Tolerance",
      badgeColor: "bg-[#dc2626]/20 text-[#fca5a5] border-[#dc2626]/30",
      desc: "Code of Ethics & Bulletins"
    }
  ];

  return (
    <aside className="w-full lg:w-72 bg-[#08080d] border-r border-[#ffd700]/25 flex flex-col justify-between shrink-0 min-h-[calc(100vh-65px)] shadow-2xl">
      {/* Top Section */}
      <div className="p-4 space-y-4">
        {/* User Card with SarlaYash Crimson & Gold Flair */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#121218] via-[#0d0d12] to-[#1c0c0e] border border-[#ffd700]/30 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#dc2626]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#dc2626] to-[#ffd700] text-white font-black flex items-center justify-center text-xl shadow-lg border border-[#ffd700]/40 shrink-0">
              {currentUser?.avatar || "👤"}
            </div>
            <div className="overflow-hidden">
              <span className="font-extrabold text-sm text-white truncate block">{currentUser?.name}</span>
              <p className="text-[11px] text-[#ffd700] font-semibold truncate font-serif">{currentUser?.designation}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#060609] text-white border border-[#2a2a36]">
                  {currentUser?.ecode}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                  isAdmin
                    ? "bg-[#dc2626]/25 text-[#fca5a5] border border-[#dc2626]/40"
                    : "bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40"
                }`}>
                  {currentUser?.role === "super_admin" ? "Founder" : currentUser?.role === "admin" ? "Executive" : "Engineer"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#222230] flex items-center justify-between text-[11px] text-slate-400">
            <span>Reports to:</span>
            <span className="font-bold text-white truncate max-w-[140px]">{currentUser?.reportsTo}</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-[#dc2626]/30 via-[#991b1b]/20 to-transparent text-white border-l-4 border-l-[#dc2626] border-y border-r border-[#ffd700]/30 shadow-md font-bold"
                    : "text-slate-400 hover:text-white hover:bg-[#12121a]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#dc2626] text-white shadow-md glow-red-sm"
                      : "bg-[#111118] text-slate-400 group-hover:text-[#ffd700] group-hover:bg-[#181822]"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold block leading-tight ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                      {item.label}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                  </div>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border tracking-wide ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Box */}
      <div className="p-4 border-t border-[#222230] bg-[#050507] space-y-3">
        <div className="p-3 rounded-2xl bg-[#0f0f15] border border-[#262635] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-semibold">Today's Shift</span>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 ${
              isCheckedIn
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/40"
            }`}>
              {isCheckedIn ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
              {isCheckedIn ? "Active Shift" : "Not In"}
            </span>
          </div>

          <div className="text-[11px] text-slate-300 flex items-center justify-between">
            <span>Punch Time:</span>
            <span className="font-mono font-bold text-[#ffd700]">{todayAttendance?.checkIn || "--:--"}</span>
          </div>

          <button
            onClick={onQuickPunch}
            className={`w-full py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg ${
              isCheckedIn
                ? "bg-[#181822] hover:bg-[#20202c] text-[#f87171] border border-red-500/40"
                : "bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:brightness-110 text-white glow-red-sm"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isCheckedIn ? "Clock Out Now" : "Clock In Now"}</span>
          </button>
        </div>

        {/* Corporate Footer tag */}
        <div className="text-center pt-1">
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">
            SarlaYash Learning Solutions LLP
          </p>
          <p className="text-[9px] text-[#ffd700] font-serif font-semibold">
            ✦ Group of Institutions • Powered By Kapil ✦
          </p>
        </div>
      </div>
    </aside>
  );
}
