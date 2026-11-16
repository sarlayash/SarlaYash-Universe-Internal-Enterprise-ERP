import React, { useState } from "react";
import {
  Globe2,
  ExternalLink,
  UserCheck,
  TrendingUp,
  Share2,
  Sparkles,
  Search,
  CheckCircle2
} from "lucide-react";

// Platform SVG Icons
const YoutubeIcon = ({ className = "w-5 h-5 text-red-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5 text-blue-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5 text-sky-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function ChannelsView({
  channelsList,
  employees,
  currentUser,
  onUpdateChannelAssignee
}) {
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [reassignModalChannel, setReassignModalChannel] = useState(null);
  const [newAssigneeEcode, setNewAssigneeEcode] = useState("");
  const [feedback, setFeedback] = useState("");

  const filteredChannels = channelsList.filter((ch) => {
    const matchesPlatform = selectedPlatform === "All" || ch.platform === selectedPlatform;
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ch.assignedTo && ch.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPlatform && matchesSearch;
  });

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "YouTube":
        return <YoutubeIcon className="w-5 h-5 text-red-500" />;
      case "LinkedIn":
        return <LinkedinIcon className="w-5 h-5 text-blue-500" />;
      case "Facebook":
        return <FacebookIcon className="w-5 h-5 text-sky-500" />;
      default:
        return <Globe2 className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleSaveReassignment = () => {
    if (!reassignModalChannel || !newAssigneeEcode) return;
    const selectedEmp = employees.find((e) => e.ecode === newAssigneeEcode);
    if (!selectedEmp) return;

    onUpdateChannelAssignee(reassignModalChannel.id, selectedEmp.name, selectedEmp.ecode);
    setFeedback(`Assigned ${reassignModalChannel.name} to ${selectedEmp.name}!`);
    setReassignModalChannel(null);
    setTimeout(() => setFeedback(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-[#ffd700]" />
            <span className="tracking-tight">SarlaYash Social Media & Broadcast Command</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracking 18 official channels across LinkedIn, YouTube, and Facebook
          </p>
        </div>

        {/* Platform filter tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0e0e16] border border-[#222230] self-start sm:self-auto text-xs">
          {["All", "YouTube", "LinkedIn", "Facebook"].map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedPlatform === platform
                  ? "bg-[#dc2626] text-white shadow glow-red-sm border border-[#ffd700]/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {platform} {platform === "All" ? `(${channelsList.length})` : ""}
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Flagship Amber / AI Ladder Highlight */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#2a080c] via-[#120a0d] to-[#08080d] border-2 border-[#dc2626]/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 glow-red-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#dc2626]/20 border border-[#dc2626]/50 flex items-center justify-center shrink-0">
            <YoutubeIcon className="w-7 h-7 text-[#dc2626]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffd700] bg-[#dc2626]/30 px-2.5 py-0.5 rounded border border-[#dc2626]/40">
              Flagship YouTube Series
            </span>
            <h3 className="text-base font-extrabold text-white mt-1">
              AI Ladder 🪜 With Kapil • Lead by Amber Khanum
            </h3>
            <p className="text-xs text-slate-300">
              Generative AI & Hands-On Engineering • Official Ecosystem Flagship
            </p>
          </div>
        </div>

        <a
          href="https://www.youtube.com/@AILadderWithKapil"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-xs flex items-center gap-2 shadow-lg glow-red-sm transition-all shrink-0 border border-[#ffd700]/30"
        >
          <span>Visit YouTube Channel</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#ffd700]" />
        </a>
      </div>

      {/* Search & Channel Cards */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search channel name or team member..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#0c0c12] border border-[#222230] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="p-5 rounded-3xl bg-[#0c0c12] border border-[#222230] hover:border-[#ffd700]/50 space-y-4 flex flex-col justify-between shadow-xl transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#08080d] border border-[#222230]">
                      {getPlatformIcon(channel.platform)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {channel.platform}
                      </span>
                      <h4 className="font-bold text-white text-xs line-clamp-1">{channel.name}</h4>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-[#08080d] border border-[#222230]">
                  <span className="text-slate-400">Content Domain:</span>
                  <strong className="text-[#ffd700] text-[11px] truncate">{channel.category || "Educational Media"}</strong>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Current Team Member:
                  </span>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#050508] border border-[#222230]">
                    <span className="font-semibold text-slate-200">
                      {channel.assignedTo || "Unassigned"}
                    </span>
                    {channel.assignedEcode && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1a0a0d] text-[#ffd700] border border-[#dc2626]/30">
                        {channel.assignedEcode}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-[#1e1e2c]">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#08080d] hover:bg-[#161622] text-[#ffd700] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#ffd700]/30 transition-all"
                >
                  <span>Open URL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setReassignModalChannel(channel);
                      setNewAssigneeEcode(channel.assignedEcode || "SYM004");
                    }}
                    className="py-2 px-3 rounded-xl bg-[#161622] hover:bg-[#1e1e2c] text-slate-300 text-xs font-semibold border border-[#222230]"
                  >
                    Reassign
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reassign Modal */}
      {reassignModalChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/40 p-6 shadow-2xl space-y-4 glow-red-sm">
            <h3 className="font-bold text-base text-white">Reassign Channel Responsible Member</h3>
            <p className="text-xs text-slate-300">Channel: <strong className="text-[#ffd700]">{reassignModalChannel.name}</strong></p>

            <div className="space-y-1 text-xs">
              <label className="text-slate-400">Select Employee</label>
              <select
                value={newAssigneeEcode}
                onChange={(e) => setNewAssigneeEcode(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.ecode}>
                    {emp.name} ({emp.ecode} - {emp.designation})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222230]">
              <button
                onClick={() => setReassignModalChannel(null)}
                className="px-4 py-2 rounded-xl bg-[#161622] text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReassignment}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-xs border border-[#ffd700]/30 shadow glow-red-sm"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
