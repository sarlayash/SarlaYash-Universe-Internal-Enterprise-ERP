import React from "react";
import {
  LayoutDashboard,
  Clock,
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
      label: "My Dashboard",
      icon: LayoutDashboard,
      badge: null,
      desc: "Overview & Personal KPIs"
    },
    {
      id: "attendance",
      label: "Daily Attendance",
      icon: Clock,
      badge: isCheckedIn ? "Active" : "Pending",
      badgeColor: isCheckedIn ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30",
      desc: "Punch In/Out & Monthly Log"
    },
    {
      id: "leaves",
      label: "Leave Management",
      icon: CalendarCheck2,
      badge: isAdmin && pendingLeavesCount > 0 ? `${pendingLeavesCount} Pending` : null,
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "Apply & Approval Desk"
    },
    {
      id: "calendar",
      label: "Company Calendar",
      icon: CalendarDays,
      badge: "2026",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      desc: "Holidays, Events & Leaves"
    },
    {
      id: "org",
      label: "Team & Org Chart",
      icon: Users2,
      badge: "10 Members",
      badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
      desc: "Reporting Hierarchy & Directory"
    },
    {
      id: "channels",
      label: "Channels Command",
      icon: Globe2,
      badge: "18 Channels",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "LinkedIn, YouTube & Facebook"
    },
    {
      id: "earning-model",
      label: "Blessings Earning Model",
      icon: Award,
      badge: "Flagship",
      badgeColor: "bg-gradient-to-r from-amber-500/30 to-yellow-400/30 text-amber-300 border-amber-400/40",
      desc: "Internships & Milestone Rewards"
    },
    {
      id: "payslip",
      label: "My Payslips",
      icon: ReceiptText,
      badge: null,
      desc: "Salary Statements & Form 16"
    },
    {
      id: "policies",
      label: "Policies & Notice Board",
      icon: FileText,
      badge: "POSH",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Code of Conduct & Announcements"
    }
  ];

  return (
    <aside className="w-full lg:w-72 bg-[#091124] border-r border-amber-500/20 flex flex-col justify-between shrink-0 min-h-[calc(100vh-65px)]">
      {/* Top Section */}
      <div className="p-4 space-y-4">
        {/* User Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-navy-850 via-slate-900 to-navy-900 border border-amber-500/25 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold flex items-center justify-center text-xl shadow-md border border-amber-300/40">
              {currentUser?.avatar || "👤"}
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white truncate">{currentUser?.name}</span>
              </div>
              <p className="text-[11px] text-amber-400/90 font-medium truncate">{currentUser?.designation}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {currentUser?.ecode}
                </span>
                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                  isAdmin ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                }`}>
                  {currentUser?.role === "super_admin" ? "Founder / Super Admin" : currentUser?.role === "admin" ? "Executive Leader" : "Solution Engineer"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Reports to:</span>
            <span className="font-semibold text-slate-200 truncate max-w-[140px]">{currentUser?.reportsTo}</span>
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
                    ? "bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-300 border border-amber-500/40 shadow-sm font-semibold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? "bg-amber-400 text-slate-950 font-bold" : "bg-slate-800/80 text-slate-400 group-hover:text-amber-400"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block leading-tight">{item.label}</span>
                    <span className="text-[10px] text-slate-500 block">{item.desc}</span>
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
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">Today's Shift</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
              isCheckedIn ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            }`}>
              {isCheckedIn ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
              {isCheckedIn ? "Checked In" : "Not Checked In"}
            </span>
          </div>

          <div className="text-[11px] text-slate-300 flex items-center justify-between">
            <span>Punch Time:</span>
            <span className="font-mono font-bold text-white">{todayAttendance?.checkIn || "--:--"}</span>
          </div>

          <button
            onClick={onQuickPunch}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              isCheckedIn
                ? "bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30"
                : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow glow-gold-sm"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isCheckedIn ? "Clock Out Now" : "Clock In Now"}</span>
          </button>
        </div>

        {/* Company Footer tag */}
        <div className="text-center">
          <p className="text-[10px] text-slate-500">
            SarlaYash Learning Solutions LLP
          </p>
          <p className="text-[9px] text-amber-500/80 font-serif">
            ✦ Group of Institutions ✦
          </p>
        </div>
      </div>
    </aside>
  );
}
