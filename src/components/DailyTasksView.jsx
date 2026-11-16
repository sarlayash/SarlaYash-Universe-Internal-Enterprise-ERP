import React, { useState } from "react";
import {
  CheckSquare,
  Plus,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Users,
  Search,
  Filter,
  Check,
  X
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DailyTasksView({
  tasksList,
  currentUser,
  employees,
  onAddTask,
  onUpdateTaskStatus
}) {
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const [activeTab, setActiveTab] = useState(isAdmin ? "team-tasks" : "my-tasks");
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Form state
  const [taskTitle, setTaskTitle] = useState("");
  const [channel, setChannel] = useState(currentUser?.assignedChannels?.[0] || "SarlaYash Mission");
  const [category, setCategory] = useState("Daily Deliverables");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Completed");
  const [hoursSpent, setHoursSpent] = useState("4.0");
  const [deliverables, setDeliverables] = useState("");
  const [proofUrl, setProofUrl] = useState("");

  // Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const myTasks = tasksList.filter((t) => t.employeeId === currentUser?.id || t.employeeEcode === currentUser?.ecode);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || !deliverables.trim()) {
      alert("Please provide both task title and deliverables summary.");
      return;
    }

    const newTask = {
      id: `TSK-${Date.now()}`,
      employeeId: currentUser.id,
      employeeEcode: currentUser.ecode,
      title: taskTitle,
      channel: channel,
      category: category,
      priority: priority,
      status: status,
      dueDate: new Date().toISOString().split("T")[0],
      deliverables: deliverables,
      hoursSpent: parseFloat(hoursSpent) || 3.0,
      proofUrl: proofUrl || ""
    };

    onAddTask(newTask);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setFeedback(`Daily task log "${taskTitle}" submitted successfully!`);
    setShowAddModal(false);
    setTaskTitle("");
    setDeliverables("");
    setProofUrl("");
    setTimeout(() => setFeedback(""), 4500);
  };

  const handleMarkComplete = (taskId) => {
    onUpdateTaskStatus(taskId, "Completed");
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 }
    });
    setFeedback("Task marked as Completed!");
    setTimeout(() => setFeedback(""), 3500);
  };

  // Filter team tasks
  const filteredTeamTasks = tasksList.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.employeeEcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-[#ffd700]" />
            <span className="tracking-tight">Daily Tasks & Work Log Submissions</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Submit daily accomplishments, track channel commitments, and log verified work hours
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white font-bold text-xs hover:brightness-110 shadow-lg glow-red-sm transition-all self-start sm:self-auto border border-[#ffd700]/30"
        >
          <Plus className="w-4 h-4 text-[#ffd700]" />
          <span>Submit Today's Task Log</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#222230] pb-2">
        <button
          onClick={() => setActiveTab("my-tasks")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "my-tasks"
              ? "bg-[#dc2626] text-white shadow glow-red-sm border border-[#ffd700]/40"
              : "bg-[#0e0e16] text-slate-400 hover:text-white border border-[#222230]"
          }`}
        >
          <User className="w-4 h-4 text-[#ffd700]" />
          <span>My Assigned Tasks ({myTasks.length})</span>
        </button>

        {isAdmin && (
          <button
            onClick={() => setActiveTab("team-tasks")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "team-tasks"
                ? "bg-[#dc2626] text-white shadow glow-red-sm border border-[#ffd700]/40"
                : "bg-[#0e0e16] text-slate-400 hover:text-white border border-[#222230]"
            }`}
          >
            <Users className="w-4 h-4 text-[#ffd700]" />
            <span>Team Work Log Roster ({tasksList.length})</span>
          </button>
        )}
      </div>

      {/* MY TASKS TAB */}
      {activeTab === "my-tasks" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#0c0c12] border-l-4 border-l-[#ffd700] border border-[#222230] shadow-md">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Tasks</span>
              <p className="text-2xl font-black text-white mt-1">{myTasks.length}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Assigned & Submitted</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0c12] border-l-4 border-l-emerald-500 border border-[#222230] shadow-md">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Completed Today</span>
              <p className="text-2xl font-black text-emerald-300 mt-1">
                {myTasks.filter((t) => t.status === "Completed").length}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Verified deliverables</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0c12] border-l-4 border-l-[#dc2626] border border-[#222230] shadow-md">
              <span className="text-[10px] uppercase font-bold text-[#fca5a5]">Total Hours Logged</span>
              <p className="text-2xl font-black text-[#ffd700] mt-1">
                {myTasks.reduce((sum, t) => sum + (t.hoursSpent || 0), 0).toFixed(1)} hrs
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Across assigned channels</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0c0c12] border border-[#222230] space-y-4 shadow-xl">
            <h3 className="font-bold text-base text-white flex items-center gap-2 pb-3 border-b border-[#222230]">
              <FileText className="w-5 h-5 text-[#ffd700]" />
              <span>Tasks & Deliverables for {currentUser?.name} ({currentUser?.ecode})</span>
            </h3>

            {myTasks.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-[#222230] rounded-2xl">
                No tasks logged yet for today. Click "Submit Today's Task Log" above!
              </div>
            ) : (
              <div className="space-y-3">
                {myTasks.map((t) => {
                  const isDone = t.status === "Completed";
                  return (
                    <div
                      key={t.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDone
                          ? "bg-[#08080d] border-emerald-500/30"
                          : "bg-[#0d0d14] border-[#ffd700]/30 shadow-md"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#dc2626]/15 text-[#fca5a5] border border-[#dc2626]/30">
                              {t.channel}
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-[#161622] text-slate-300 border border-[#222230]">
                              {t.category}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                                isDone
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                  : "bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40"
                              }`}
                            >
                              {t.status}
                            </span>
                          </div>

                          <h4 className="font-bold text-white text-sm">{t.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{t.deliverables}</p>

                          <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-[#1e1e2c]">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#ffd700]" />
                              <strong className="text-white">{t.hoursSpent}</strong> hours logged
                            </span>
                            <span>Date: {t.dueDate}</span>
                            {t.proofUrl && (
                              <a
                                href={t.proofUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ffd700] hover:underline flex items-center gap-1 font-semibold"
                              >
                                <span>Proof Link</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        {!isDone && (
                          <button
                            onClick={() => handleMarkComplete(t.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 self-start shrink-0 shadow transition-all"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Completed</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TEAM TASKS TAB (ADMIN / MANAGERS) */}
      {isAdmin && activeTab === "team-tasks" && (
        <div className="p-6 rounded-3xl bg-[#0c0c12] border border-[#222230] space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#222230]">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ffd700]" />
                <span>Company-Wide Daily Task Submissions</span>
              </h3>
              <p className="text-xs text-slate-400">
                Live accountability dashboard across all 10 members
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter tasks or member..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700] w-44"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3">Member</th>
                  <th className="py-3 px-3">Task & Deliverables</th>
                  <th className="py-3 px-3">Channel / Project</th>
                  <th className="py-3 px-3">Hours</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e2c]">
                {filteredTeamTasks.map((task) => {
                  const emp = employees.find((e) => e.ecode === task.employeeEcode);
                  return (
                    <tr key={task.id} className="hover:bg-[#12121c] transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{emp?.avatar || "👤"}</span>
                          <div>
                            <p className="font-bold text-white">{emp?.name || task.employeeEcode}</p>
                            <span className="text-[10px] font-mono text-[#ffd700]">{task.employeeEcode}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 max-w-sm">
                        <p className="font-bold text-slate-100">{task.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{task.deliverables}</p>
                      </td>

                      <td className="py-3 px-3">
                        <span className="text-[10px] font-semibold text-slate-300 bg-[#08080d] px-2 py-0.5 rounded border border-[#222230]">
                          {task.channel}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono font-bold text-[#ffd700]">
                        {task.hoursSpent} hrs
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            task.status === "Completed"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        {task.proofUrl ? (
                          <a
                            href={task.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#ffd700] hover:underline font-semibold"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-500 italic text-[11px]">Internal</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submit Daily Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/40 p-6 shadow-2xl space-y-4 glow-red-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <div>
                <h3 className="font-bold text-base text-white">Submit Today's Work Log & Tasks</h3>
                <p className="text-xs text-slate-400">Contributor: {currentUser?.name} ({currentUser?.ecode})</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#161622]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Task Title / Activity</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Recorded AI Ladder Episode 14, Published 2 LinkedIn posts..."
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Channel / Focus Area</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white"
                  >
                    <option value="AI Ladder 🪜 With Kapil">AI Ladder 🪜 With Kapil</option>
                    <option value="DSA Unfiltered With Kapil">DSA Unfiltered With Kapil</option>
                    <option value="Polish Aptitude With Kapil">Polish Aptitude With Kapil</option>
                    <option value="Cyber IQ With Kapil">Cyber IQ With Kapil</option>
                    <option value="Mysteries Of POSH with Kapil">Mysteries Of POSH with Kapil</option>
                    <option value="Mind Your Words With Kapil">Mind Your Words With Kapil</option>
                    <option value="SarlaYash Mission | Powered By Kapil">SarlaYash Mission</option>
                    <option value="HR Mirror With Kapil">HR Mirror With Kapil</option>
                    <option value="Enterprise Platform Engineering">Enterprise Platform Engineering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Hours Spent Today</label>
                  <input
                    type="number"
                    step="0.5"
                    value={hoursSpent}
                    onChange={(e) => setHoursSpent(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Work Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white"
                >
                  <option value="Completed">Completed Today</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Deliverables Summary (Accomplishments)</label>
                <textarea
                  rows={3}
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  placeholder="Detail the work done, code written, students engaged, or content created..."
                  className="w-full p-3 rounded-xl bg-[#050508] border border-[#2a2a38] text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Proof URL / GitHub / Video Link (Optional)</label>
                <input
                  type="text"
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  placeholder="https://... or PR link"
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222230]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161622] text-slate-300 hover:bg-[#1e1e2c]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold shadow-lg glow-red-sm border border-[#ffd700]/30"
                >
                  Save & Submit Work Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
