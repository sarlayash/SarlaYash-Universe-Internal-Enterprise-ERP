import React, { useState } from "react";
import {
  Users2,
  GitFork,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Award,
  Globe2
} from "lucide-react";

export default function OrgHierarchyView({
  employees,
  channelsList,
  onSwitchUser,
  onSelectEmployeeForPayslip
}) {
  const [viewMode, setViewMode] = useState("tree"); // "tree" | "directory"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [activeEmployeeModal, setActiveEmployeeModal] = useState(null);

  // Groupings for tree
  const founder = employees.find((e) => e.ecode === "SYM001");
  const ceo = employees.find((e) => e.ecode === "SYM002");
  const cpo = employees.find((e) => e.ecode === "SYM003");

  const ceoReports = employees.filter((e) => e.reportsTo === "Sathursan Kamalanathan");
  const cpoReports = employees.filter((e) => e.reportsTo === "Trisha Ghosh");

  // Filtering for directory
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.ecode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || emp.department.includes(selectedDept);
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <Users2 className="w-6 h-6 text-[#ffd700]" />
            <span className="tracking-tight">Organization Hierarchy & Employee Directory</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete institutional structure, reporting lines, and 10 core team members
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0e0e16] border border-[#222230] self-start sm:self-auto">
          <button
            onClick={() => setViewMode("tree")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "tree"
                ? "bg-[#dc2626] text-white shadow glow-red-sm border border-[#ffd700]/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Org Tree View</span>
          </button>
          <button
            onClick={() => setViewMode("directory")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "directory"
                ? "bg-[#dc2626] text-white shadow glow-red-sm border border-[#ffd700]/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users2 className="w-3.5 h-3.5" />
            <span>Directory Cards ({employees.length})</span>
          </button>
        </div>
      </div>

      {/* ORG TREE VIEW */}
      {viewMode === "tree" && (
        <div className="p-6 lg:p-8 rounded-3xl bg-[#0c0c12] border border-[#222230] space-y-8 overflow-x-auto shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffd700] bg-[#1a0a0d] px-3.5 py-1.5 rounded-full border border-[#dc2626]/40">
              SarlaYash Universe Leadership Tree • Powered By Kapil
            </span>
          </div>

          <div className="min-w-[800px] flex flex-col items-center">
            {/* LEVEL 1: FOUNDER */}
            {founder && (
              <div className="flex flex-col items-center">
                <div
                  onClick={() => setActiveEmployeeModal(founder)}
                  className="w-72 p-5 rounded-2xl bg-gradient-to-br from-[#1a0a0d] via-[#120a0e] to-[#09090e] border-2 border-[#ffd700] shadow-2xl text-center cursor-pointer hover:scale-105 transition-transform relative group glow-red-sm"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#ffd700] via-[#fef08a] to-[#d4af37] text-slate-950 font-black text-2xl flex items-center justify-center mx-auto mb-2 shadow-lg ring-2 ring-[#dc2626]">
                    {founder.avatar}
                  </div>
                  <h3 className="font-extrabold text-base text-white tracking-wide">{founder.name}</h3>
                  <p className="text-xs font-bold text-[#ffd700] font-serif uppercase tracking-wider">{founder.designation}</p>
                  <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#050508] text-[#ffd700] border border-[#ffd700]/30">
                    {founder.ecode} • Reports: {founder.reportsTo}
                  </span>
                </div>

                {/* Connecting Line Down */}
                <div className="w-0.5 h-8 bg-[#ffd700]/60"></div>
                <div className="w-[520px] h-0.5 bg-[#ffd700]/60"></div>
              </div>
            )}

            {/* LEVEL 2: CEO & CPO */}
            <div className="flex items-start justify-between w-[640px] pt-0">
              {/* Left Wing: CEO Sathursan */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-[#ffd700]/60"></div>
                <div
                  onClick={() => setActiveEmployeeModal(ceo)}
                  className="w-64 p-4 rounded-2xl bg-[#09090e] border border-[#ffd700]/40 shadow-xl text-center cursor-pointer hover:scale-105 transition-transform hover:border-[#dc2626]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#dc2626]/20 text-[#ffd700] font-bold text-lg flex items-center justify-center mx-auto mb-1.5 border border-[#dc2626]/40">
                    {ceo?.avatar}
                  </div>
                  <h4 className="font-bold text-sm text-white">{ceo?.name}</h4>
                  <p className="text-[11px] text-[#ffd700] font-semibold">{ceo?.designation}</p>
                  <span className="text-[9px] font-mono text-slate-400">({ceo?.ecode})</span>
                </div>

                <div className="w-0.5 h-8 bg-[#dc2626]/60"></div>
                <div className="w-64 h-0.5 bg-[#dc2626]/60"></div>

                {/* Level 3: CEO's Solution Engineers (Amber, Arpan, Abhishek) */}
                <div className="flex flex-col gap-2.5 pt-3 w-64">
                  {ceoReports.map((eng) => (
                    <div
                      key={eng.id}
                      onClick={() => setActiveEmployeeModal(eng)}
                      className="p-2.5 rounded-xl bg-[#08080d] border border-[#222230] hover:border-[#ffd700]/40 transition-all text-left flex items-center gap-2.5 cursor-pointer hover:bg-[#12121c]"
                    >
                      <span className="text-base shrink-0">{eng.avatar}</span>
                      <div className="truncate">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs text-white truncate">{eng.name}</p>
                          <span className="text-[9px] font-mono text-[#ffd700]">{eng.ecode}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{eng.designation}</p>
                        {eng.name === "Amber Khanum" && (
                          <span className="text-[8px] bg-[#dc2626]/20 text-[#fca5a5] px-1 py-0.2 rounded font-bold border border-[#dc2626]/30">
                            AI Ladder 🪜 Lead
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Wing: CPO Trisha */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-[#ffd700]/60"></div>
                <div
                  onClick={() => setActiveEmployeeModal(cpo)}
                  className="w-64 p-4 rounded-2xl bg-[#09090e] border border-[#ffd700]/40 shadow-xl text-center cursor-pointer hover:scale-105 transition-transform hover:border-[#dc2626]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#dc2626]/20 text-[#ffd700] font-bold text-lg flex items-center justify-center mx-auto mb-1.5 border border-[#dc2626]/40">
                    {cpo?.avatar}
                  </div>
                  <h4 className="font-bold text-sm text-white">{cpo?.name}</h4>
                  <p className="text-[11px] text-[#ffd700] font-semibold">{cpo?.designation}</p>
                  <span className="text-[9px] font-mono text-slate-400">({cpo?.ecode})</span>
                </div>

                <div className="w-0.5 h-8 bg-[#dc2626]/60"></div>
                <div className="w-64 h-0.5 bg-[#dc2626]/60"></div>

                {/* Level 3: CPO's Solution Engineers (Nidhi, Manju, Tarunika, Madhumita) */}
                <div className="flex flex-col gap-2.5 pt-3 w-64">
                  {cpoReports.map((eng) => (
                    <div
                      key={eng.id}
                      onClick={() => setActiveEmployeeModal(eng)}
                      className="p-2.5 rounded-xl bg-[#08080d] border border-[#222230] hover:border-[#ffd700]/40 transition-all text-left flex items-center gap-2.5 cursor-pointer hover:bg-[#12121c]"
                    >
                      <span className="text-base shrink-0">{eng.avatar}</span>
                      <div className="truncate">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs text-white truncate">{eng.name}</p>
                          <span className="text-[9px] font-mono text-[#ffd700]">{eng.ecode}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{eng.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIRECTORY VIEW */}
      {viewMode === "directory" && (
        <div className="space-y-4">
          {/* Search bar & Department filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0c0c12] border border-[#222230]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, ECODE, or designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700]"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
              >
                <option value="All">All Departments</option>
                <option value="Executive">Executive Leadership</option>
                <option value="AI">AI & Solution Engineering</option>
                <option value="Talent">Talent & Solutions</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                className="p-5 rounded-3xl bg-[#0c0c12] border border-[#222230] hover:border-[#ffd700]/50 space-y-4 relative flex flex-col justify-between shadow-xl transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffd700] via-[#fef08a] to-[#d4af37] text-slate-950 font-black flex items-center justify-center text-xl shadow ring-2 ring-[#dc2626]/40">
                        {emp.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{emp.name}</h4>
                        <p className="text-xs text-[#ffd700] font-medium">{emp.designation}</p>
                        <span className="text-[10px] font-mono text-[#ffd700] bg-[#1a0a0d] px-1.5 py-0.5 rounded border border-[#dc2626]/30">
                          {emp.ecode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {emp.bio}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-[#1e1e2c]">
                    <div className="flex items-center justify-between">
                      <span>Reports To:</span>
                      <strong className="text-white">{emp.reportsTo}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Department:</span>
                      <strong className="text-slate-300 truncate max-w-[150px]">{emp.department}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Email:</span>
                      <a href={`mailto:${emp.email}`} className="text-[#ffd700] hover:underline truncate max-w-[150px]">
                        {emp.email}
                      </a>
                    </div>
                  </div>

                  {emp.assignedChannels && emp.assignedChannels.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Channel Assignment:
                      </span>
                      <span className="inline-block text-[10px] bg-[#dc2626]/15 text-[#fca5a5] border border-[#dc2626]/30 px-2 py-0.5 rounded-md font-semibold truncate max-w-full">
                        {emp.assignedChannels[0]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#1e1e2c]">
                  <button
                    onClick={() => onSwitchUser(emp.id)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-[#161622] hover:bg-[#1e1e2c] text-slate-300 hover:text-white text-[11px] font-semibold border border-[#222230] transition-colors"
                  >
                    Switch Persona
                  </button>
                  <button
                    onClick={() => setActiveEmployeeModal(emp)}
                    className="py-1.5 px-3 rounded-xl bg-[#dc2626]/20 hover:bg-[#dc2626]/30 text-[#fca5a5] text-[11px] font-bold border border-[#dc2626]/30 transition-colors"
                  >
                    Profile Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Details Modal */}
      {activeEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/40 p-6 shadow-2xl space-y-5 glow-red-sm">
            <div className="flex items-start justify-between pb-3 border-b border-[#222230]">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ffd700] via-[#fef08a] to-[#d4af37] text-slate-950 font-black text-2xl flex items-center justify-center shadow ring-2 ring-[#dc2626]/40">
                  {activeEmployeeModal.avatar}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">{activeEmployeeModal.name}</h3>
                  <p className="text-xs text-[#ffd700] font-semibold">{activeEmployeeModal.designation}</p>
                  <span className="text-[10px] font-mono text-slate-400">ID: {activeEmployeeModal.ecode}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveEmployeeModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#161622]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300 italic">{activeEmployeeModal.bio}</p>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#08080d] border border-[#222230]">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Reports To</span>
                  <strong className="text-white font-medium">{activeEmployeeModal.reportsTo}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Department</span>
                  <strong className="text-white font-medium">{activeEmployeeModal.department}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Official Email</span>
                  <strong className="text-[#ffd700]">{activeEmployeeModal.email}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Phone</span>
                  <strong className="text-slate-200">{activeEmployeeModal.phone}</strong>
                </div>
              </div>

              {activeEmployeeModal.assignedChannels && (
                <div className="p-3 rounded-xl bg-[#140a0c] border border-[#dc2626]/30 text-rose-200">
                  <span className="text-[10px] uppercase font-bold text-[#ffd700] block mb-1">
                    Assigned Broadcast Channel:
                  </span>
                  <p className="font-semibold">{activeEmployeeModal.assignedChannels.join(", ")}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222230]">
              <button
                onClick={() => {
                  onSwitchUser(activeEmployeeModal.id);
                  setActiveEmployeeModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-xs shadow-lg glow-red-sm border border-[#ffd700]/30"
              >
                Login as this Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
