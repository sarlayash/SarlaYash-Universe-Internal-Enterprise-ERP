import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  Megaphone,
  Plus,
  BookOpen,
  Scale,
  Sparkles,
  ChevronRight,
  Send,
  X
} from "lucide-react";
import { COMPANY_POLICIES } from "../data/initialData";

export default function PoliciesView({
  announcements,
  currentUser,
  onAddAnnouncement
}) {
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Leadership Vision");
  const [selectedPolicy, setSelectedPolicy] = useState(COMPANY_POLICIES[1]); // Default POSH

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    onAddAnnouncement({
      id: `ANN-${Date.now()}`,
      title: title,
      author: `${currentUser.name} (${currentUser.designation})`,
      date: new Date().toISOString().split("T")[0],
      category: category,
      priority: "High",
      content: content
    });

    setTitle("");
    setContent("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[#ffd700]" />
            <span className="tracking-tight">Notice Board, Compliance & Company Policies</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official communications, POSH regulations, and SarlaYash corporate governance
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-xs shadow-lg glow-red-sm transition-all self-start sm:self-auto border border-[#ffd700]/30"
          >
            <Plus className="w-4 h-4 text-[#ffd700]" />
            <span>Broadcast Announcement</span>
          </button>
        )}
      </div>

      {/* POSH & Ethics Spotlight Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#2a080c] via-[#140a0e] to-[#09090e] border-2 border-[#dc2626]/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glow-red-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#dc2626]/20 border border-[#dc2626]/40 flex items-center justify-center shrink-0">
            <Scale className="w-6 h-6 text-[#ffd700]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffd700] bg-[#dc2626]/30 px-2.5 py-0.5 rounded border border-[#dc2626]/40">
              Mysteries Of POSH With Kapil • Zero Tolerance
            </span>
            <h3 className="text-base font-extrabold text-white mt-1">
              Workplace Respect, Dignity & Prevention of Sexual Harassment
            </h3>
            <p className="text-xs text-slate-300">
              SarlaYash mandates an absolute safe, empowering environment for all colleagues and interns.
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedPolicy(COMPANY_POLICIES[1])}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-xs flex items-center gap-2 shadow-lg glow-red-sm transition-all shrink-0 border border-[#ffd700]/30"
        >
          <span>Read Full POSH Guidelines</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#ffd700]" />
        </button>
      </div>

      {/* Two Column Section: Announcements Board vs Policies Library */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Announcements */}
        <div className="lg:col-span-2 rounded-3xl bg-[#0c0c12] border border-[#222230] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#ffd700]" />
              <span>Official Leadership Bulletins ({announcements.length})</span>
            </h3>
            <span className="text-xs text-slate-400">All-Company Feed</span>
          </div>

          <div className="space-y-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-2xl bg-[#08080d] border border-[#222230] hover:border-[#ffd700]/40 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#dc2626]/15 text-[#fca5a5] border border-[#dc2626]/30">
                      {ann.category}
                    </span>
                    <h4 className="font-bold text-white text-sm">{ann.title}</h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#ffd700]">{ann.date}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {ann.content}
                </p>

                <div className="pt-2 border-t border-[#1e1e2c] flex items-center justify-between text-[11px] text-slate-400">
                  <span>Author: <strong className="text-[#ffd700]">{ann.author}</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Broadcast
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (1 col): Policies Library */}
        <div className="rounded-3xl bg-[#0c0c12] border border-[#222230] p-6 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#ffd700]" />
                <span>Enterprise Policies</span>
              </h3>
              <span className="text-[10px] text-slate-400">Governance</span>
            </div>

            <div className="space-y-2">
              {COMPANY_POLICIES.map((policy) => {
                const isSelected = selectedPolicy?.id === policy.id;
                return (
                  <div
                    key={policy.id}
                    onClick={() => setSelectedPolicy(policy)}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#140a0c] border-[#dc2626] shadow-md ring-1 ring-[#ffd700]/30"
                        : "bg-[#08080d] border-[#222230] hover:border-slate-700"
                    }`}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#ffd700]">
                      {policy.category}
                    </span>
                    <h5 className="font-bold text-white text-xs mt-0.5">{policy.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{policy.summary}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Policy Detail */}
          {selectedPolicy && (
            <div className="p-4 rounded-2xl bg-[#08080d] border border-[#ffd700]/30 text-xs space-y-2 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#ffd700]">Policy Document</span>
                <span className="text-[10px] text-slate-500">Updated: {selectedPolicy.lastUpdated}</span>
              </div>
              <h4 className="font-bold text-white text-sm">{selectedPolicy.title}</h4>
              <p className="text-slate-300 text-xs leading-relaxed">{selectedPolicy.summary}</p>
              <div className="pt-2 border-t border-[#1e1e2c] text-[10px] text-[#ffd700]/80">
                Official SarlaYash Compliance Committee
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Broadcast Announcement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/40 p-6 shadow-2xl space-y-4 glow-red-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <h3 className="font-bold text-base text-white">Broadcast Announcement to Notice Board</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#161622]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Bulletin Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Q4 Company All-Hands & Internships Celebration"
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white"
                >
                  <option value="Founder's Vision">Founder's Vision</option>
                  <option value="Operations & Strategy">Operations & Strategy</option>
                  <option value="People & Culture">People & Culture</option>
                  <option value="Channel Milestone">Channel Milestone</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Message Content</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write message for the SarlaYash team..."
                  className="w-full p-3 rounded-xl bg-[#050508] border border-[#2a2a38] text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222230]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161622] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold border border-[#ffd700]/30 shadow glow-red-sm"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
