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
  ChevronRight,
  ShieldAlert,
  Radio
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentUser,
  pendingLeavesCount = 0,
  pendingCorrectionsCount = 0,
  broadcastsCount = 0,
  todayAttendance,
  onQuickPunch
}) {
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";
  const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;

  const totalAdminAlerts = pendingLeavesCount + pendingCorrectionsCount;

  const navItems = [
    {
      id: "dashboard",
      label: isSuperAdmin ? "Founder Executive Dashboard" : "My Individual Dashboard",
      icon: LayoutDashboard,
      badge: null,
      desc: isSuperAdmin ? "Company-Wide Command" : "Personal Workspace"
    },
    {
      id: "broadcasts",
      label: isSuperAdmin ? "Founder Broadcast Hub" : "Sessions & Speaker Roles",
      icon: Radio,
      badge: broadcastsCount > 0 ? `${broadcastsCount} Active` : "Live",
      badgeColor: "bg-[#dc2626] text-white font-black",
      desc: isSuperAdmin ? "Push Posters, Videos & Meets" : "Nominate Speaker & Enroll"
    },
    {
      id: "attendance",
      label: isSuperAdmin ? "Master Attendance & Corrections" : "My Attendance & Punch",
      icon: Clock,
      badge: isCheckedIn ? "Present" : "Not In",
      badgeColor: isCheckedIn ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-[#dc2626]/20 text-[#fca5a5] border-[#dc2626]/40",
      desc: isSuperAdmin ? "Roster & Punch Corrections" : "Daily Punch (Midnight Auto-Out)"
    },
    {
      id: "tasks",
      label: isSuperAdmin ? "Team Deliverables & Tasks" : "My Daily Tasks & Log",
      icon: CheckSquare,
      badge: "Worklog",
      badgeColor: "bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/30",
      desc: isSuperAdmin ? "Review All Engineers" : "Submit Daily Hours & Proof"
    },
    {
      id: "leaves",
      label: isSuperAdmin ? "Leave Approvals Desk" : "My Leave Management",
      icon: CalendarCheck2,
      badge: isSuperAdmin && pendingLeavesCount > 0 ? `${pendingLeavesCount} Pending` : null,
      badgeColor: "bg-[#dc2626] text-white font-extrabold border-red-500",
      desc: isSuperAdmin ? "Founder Approve / Reject" : "Apply & Balance Quota"
    },
    {
      id: "earning-model",
      label: "Blessings Internships",
      icon: Award,
      badge: "Slabs 0–3",
      badgeColor: "bg-gradient-to-r from-[#dc2626] to-[#ffd700] text-slate-950 font-black",
      desc: "₹1,000 to ₹15,000 Model"
    },
    {
      id: "calendar",
      label: "Company Calendar",
      icon: CalendarDays,
      badge: "2026",
      badgeColor: "bg-[#181824] text-slate-300 border-[#2b2b3a]",
      desc: "Nov 2026+ Events & Holidays"
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
      desc: "Official Media Ecosystem"
    },
    {
      id: "payslip",
      label: isSuperAdmin ? "Compensation Master" : "My Monthly Payslip",
      icon: ReceiptText,
      badge: null,
      desc: "Salary & Blessings Bonus"
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
        {/* User Persona Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#121218] via-[#0d0d12] to-[#1c0c0e] border border-[#ffd700]/30 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#dc2626]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#08080c] border-2 border-[#ffd700] flex items-center justify-center text-xl shadow-md glow-gold-sm shrink-0">
              {currentUser?.avatar || "👤"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-extrabold text-white text-xs truncate">
                  {currentUser?.name}
                </p>
                {isSuperAdmin && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-[#dc2626] text-white border border-red-400">
                    FOUNDER
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-300 truncate mt-0.5">
                {currentUser?.designation}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#180a0c] text-[#ffd700] border border-[#dc2626]/40 font-mono font-bold">
                  {currentUser?.ecode}
                </span>
                <span className="text-[9px] text-slate-400 truncate">
                  Dept: {currentUser?.department?.split(" ")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Super Admin Status Banner */}
          {isSuperAdmin && totalAdminAlerts > 0 && (
            <div className="mt-3 pt-2.5 border-t border-[#222230] flex items-center justify-between text-[10px]">
              <span className="text-red-400 font-bold flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-[#dc2626]" /> Approvals Pending:
              </span>
              <span className="px-2 py-0.5 rounded bg-[#dc2626] text-white font-extrabold font-mono">
                {totalAdminAlerts} Actionable
              </span>
            </div>
          )}
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
                className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all relative ${
                  isActive
                    ? "bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white font-extrabold shadow-lg glow-red-sm border border-[#ffd700]/40"
                    : "text-slate-300 hover:text-white hover:bg-[#12121c] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-[#ffd700]" : "text-slate-400 group-hover:text-[#ffd700]"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className={`text-xs truncate ${isActive ? "text-white font-bold" : "text-slate-200"}`}>
                      {item.label}
                    </p>
                    <p className={`text-[10px] truncate ${isActive ? "text-amber-100" : "text-slate-500"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full border shrink-0 ml-2 ${
                      item.badgeColor || "bg-[#161622] text-slate-300 border-[#2b2b3a]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-[#222230] space-y-2 text-[10px] text-slate-500">
        <div className="flex items-center justify-between">
          <span className="text-[#ffd700] font-semibold">SarlaYash Universe</span>
          <span className="font-mono text-slate-400">v2.7 Enterprise</span>
        </div>
        <p className="text-[9px] leading-tight text-slate-400">
          Midnight IST Auto Clock-Out • Sessions & Speaker Nominations Active 🙌
        </p>
      </div>
    </aside>
  );
}
