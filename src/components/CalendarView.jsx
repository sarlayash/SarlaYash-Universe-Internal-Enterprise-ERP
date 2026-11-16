import React, { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Award,
  Video,
  Clock,
  MapPin,
  CheckCircle,
  X
} from "lucide-react";

export default function CalendarView({
  eventsList,
  leavesList,
  currentUser,
  onAddEvent
}) {
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 16)); // November 2026
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("2026-11-20");
  const [newEventType, setNewEventType] = useState("Company Event");
  const [newEventColor, setNewEventColor] = useState("gold");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Get calendar matrix
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Combine events and approved leaves
  const approvedLeaves = leavesList.filter((l) => l.status === "Approved");

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    onAddEvent({
      id: `EV-${Date.now()}`,
      date: newEventDate,
      title: newEventTitle,
      type: newEventType,
      color: newEventColor
    });

    setNewEventTitle("");
    setShowAddModal(false);
  };

  // Filter events in current month
  const currentMonthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthEvents = eventsList.filter((e) => e.date.startsWith(currentMonthPrefix));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-amber-400" />
            <span>SarlaYash Enterprise Calendar & Events</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official holidays, team leaves, live YouTube masterclasses, and corporate milestones
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 shadow glow-gold-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event / Holiday</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-amber-300 px-3 font-mono">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Calendar & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid (3 Cols) */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-3xl space-y-4">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
              <div key={day} className={idx === 0 || idx === 6 ? "text-amber-500/80" : ""}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Cells */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank cells for starting day offset */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="min-h-24 p-2 rounded-2xl bg-slate-950/20 border border-transparent opacity-30"></div>
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
              const isToday = year === 2026 && month === 10 && dayNum === 16;

              // Find events on this date
              const dayEvents = eventsList.filter((e) => e.date === dateStr);
              // Find leaves on this date
              const dayLeaves = approvedLeaves.filter((l) => dateStr >= l.startDate && dateStr <= l.endDate);

              return (
                <div
                  key={`day-${dayNum}`}
                  className={`min-h-24 p-2 rounded-2xl border flex flex-col justify-between transition-all group hover:border-amber-500/40 ${
                    isToday
                      ? "bg-amber-500/15 border-amber-400 shadow-md ring-1 ring-amber-400/50"
                      : "bg-slate-900/60 border-slate-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center font-mono ${
                        isToday
                          ? "bg-amber-400 text-slate-950 font-black shadow"
                          : "text-slate-300 group-hover:text-amber-300"
                      }`}
                    >
                      {dayNum}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-1 rounded">
                        Today
                      </span>
                    )}
                  </div>

                  {/* Badges container */}
                  <div className="space-y-1 mt-1 overflow-hidden">
                    {dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-semibold truncate border ${
                          evt.type === "Holiday"
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                            : evt.type === "Live Broadcast"
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        }`}
                        title={evt.title}
                      >
                        {evt.title}
                      </div>
                    ))}

                    {dayLeaves.map((lv) => (
                      <div
                        key={lv.id}
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 truncate"
                        title={`On Leave: ${lv.employeeName}`}
                      >
                        🌴 {lv.employeeName}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Official Holiday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>Company Milestone</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>Live Masterclass / YouTube</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span>Approved Team Leave</span>
            </div>
          </div>
        </div>

        {/* Sidebar: Upcoming Month Agenda */}
        <div className="glass-panel p-6 rounded-3xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{monthNames[month]} Agenda</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">{monthEvents.length} Items</span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {monthEvents.map((evt) => (
                <div key={evt.id} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-amber-300 font-bold">{evt.date}</span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                        evt.type === "Holiday"
                          ? "bg-rose-500/20 text-rose-300"
                          : evt.type === "Live Broadcast"
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {evt.type}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-100">{evt.title}</p>
                </div>
              ))}

              {monthEvents.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500">
                  No company events scheduled for this month.
                </div>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs space-y-1">
            <p className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Next High Impact Event
            </p>
            <p className="text-[11px] text-slate-300">
              20 Nov: <strong>AI Ladder Live Masterclass</strong> hosted by Kapil Narula & Amber Khanum.
            </p>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#0a1226] border border-amber-500/40 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Add Calendar Event / Holiday</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Event Title</label>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Annual Tech Symposium / Founder's Day"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Event Date</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Category</label>
                <select
                  value={newEventType}
                  onChange={(e) => {
                    setNewEventType(e.target.value);
                    if (e.target.value === "Holiday") setNewEventColor("red");
                    else if (e.target.value === "Live Broadcast") setNewEventColor("cyan");
                    else setNewEventColor("gold");
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Company Event">Company Event / Milestone</option>
                  <option value="Holiday">Official Holiday</option>
                  <option value="Live Broadcast">YouTube Live / Masterclass</option>
                  <option value="Training">Training & Upskilling</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:brightness-110 shadow"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
