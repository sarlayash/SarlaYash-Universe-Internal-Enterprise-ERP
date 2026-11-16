import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import AttendanceView from "./components/AttendanceView";
import DailyTasksView from "./components/DailyTasksView";
import LeaveView from "./components/LeaveView";
import CalendarView from "./components/CalendarView";
import OrgHierarchyView from "./components/OrgHierarchyView";
import ChannelsView from "./components/ChannelsView";
import EarningModelView from "./components/EarningModelView";
import PayslipView from "./components/PayslipView";
import PoliciesView from "./components/PoliciesView";
import LoginModal from "./components/LoginModal";
import confetti from "canvas-confetti";

import {
  getStoredData,
  setStoredData,
  initializeStorage,
  KEYS
} from "./utils/storage";

import {
  INITIAL_EMPLOYEES,
  INITIAL_CHANNELS,
  INITIAL_LEAVES,
  INITIAL_ATTENDANCE,
  INITIAL_HOLIDAYS_AND_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EARNING_TARGETS,
  INITIAL_TASKS
} from "./data/initialData";

export default function App() {
  // Initialize storage on first load
  useEffect(() => {
    initializeStorage();
  }, []);

  const [employees, setEmployees] = useState(() =>
    getStoredData(KEYS.EMPLOYEES, INITIAL_EMPLOYEES)
  );
  const [channels, setChannels] = useState(() =>
    getStoredData(KEYS.CHANNELS, INITIAL_CHANNELS)
  );
  const [leaves, setLeaves] = useState(() =>
    getStoredData(KEYS.LEAVES, INITIAL_LEAVES)
  );
  const [attendance, setAttendance] = useState(() =>
    getStoredData(KEYS.ATTENDANCE, INITIAL_ATTENDANCE)
  );
  const [events, setEvents] = useState(() =>
    getStoredData(KEYS.EVENTS, INITIAL_HOLIDAYS_AND_EVENTS)
  );
  const [announcements, setAnnouncements] = useState(() =>
    getStoredData(KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS)
  );
  const [earningTargets, setEarningTargets] = useState(() =>
    getStoredData(KEYS.EARNING_TARGETS, INITIAL_EARNING_TARGETS)
  );
  const [tasks, setTasks] = useState(() =>
    getStoredData(KEYS.TASKS, INITIAL_TASKS)
  );
  const [currentUserId, setCurrentUserId] = useState(() =>
    getStoredData(KEYS.CURRENT_USER_ID, "SYM001")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    getStoredData(KEYS.IS_LOGGED_IN, false)
  );

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    setStoredData(KEYS.EMPLOYEES, employees);
  }, [employees]);

  useEffect(() => {
    setStoredData(KEYS.CHANNELS, channels);
  }, [channels]);

  useEffect(() => {
    setStoredData(KEYS.LEAVES, leaves);
  }, [leaves]);

  useEffect(() => {
    setStoredData(KEYS.ATTENDANCE, attendance);
  }, [attendance]);

  useEffect(() => {
    setStoredData(KEYS.EVENTS, events);
  }, [events]);

  useEffect(() => {
    setStoredData(KEYS.ANNOUNCEMENTS, announcements);
  }, [announcements]);

  useEffect(() => {
    setStoredData(KEYS.EARNING_TARGETS, earningTargets);
  }, [earningTargets]);

  useEffect(() => {
    setStoredData(KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    setStoredData(KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    setStoredData(KEYS.IS_LOGGED_IN, isLoggedIn);
  }, [isLoggedIn]);

  const currentUser = employees.find((e) => e.id === currentUserId) || employees[0];

  // Today's attendance for current user (16 Nov 2026)
  const todayAttendance = attendance.find(
    (a) => a.employeeId === currentUser?.id && a.date === "2026-11-16"
  );

  // Pending leaves count
  const pendingLeavesCount = leaves.filter((l) => l.status === "Pending").length;

  // Handlers
  const handleSwitchUser = (empId) => {
    setCurrentUserId(empId);
  };

  const handleLoginSuccess = (empId) => {
    setCurrentUserId(empId);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLoginModalOpen(true);
  };

  const handleRecordAttendance = (record) => {
    setAttendance((prev) => {
      const idx = prev.findIndex(
        (a) => a.employeeId === record.employeeId && a.date === record.date
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = record;
        return updated;
      }
      return [record, ...prev];
    });
  };

  const handleQuickPunch = () => {
    const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    if (!isCheckedIn) {
      handleRecordAttendance({
        id: `ATT-${Date.now()}`,
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        date: "2026-11-16",
        checkIn: timeStr,
        checkOut: null,
        workMode: "Office - Campus",
        status: "Present",
        notes: "Quick punch via header widget."
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      handleRecordAttendance({
        ...todayAttendance,
        checkOut: timeStr,
        notes: `${todayAttendance.notes} | Out at ${timeStr}`
      });
    }
  };

  const handleApplyLeave = (newLeave) => {
    setLeaves((prev) => [newLeave, ...prev]);
  };

  const handleUpdateLeaveStatus = (leaveId, newStatus, remarks) => {
    setLeaves((prev) =>
      prev.map((l) =>
        l.id === leaveId
          ? { ...l, status: newStatus, managerRemarks: remarks }
          : l
      )
    );
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleUpdateChannelAssignee = (channelId, name, ecode) => {
    setChannels((prev) =>
      prev.map((c) =>
        c.id === channelId
          ? { ...c, assignedTo: name, assignedEcode: ecode }
          : c
      )
    );
  };

  const handleAddTarget = (newTarget) => {
    setEarningTargets((prev) => [newTarget, ...prev]);
  };

  const handleUpdateTargetProgress = (targetId, newProgress) => {
    setEarningTargets((prev) =>
      prev.map((t) =>
        t.id === targetId
          ? {
              ...t,
              currentProgress: newProgress,
              status: newProgress >= t.targetValue ? "Verified & Rewarded 🎉" : `In Progress (${Math.round((newProgress / t.targetValue) * 100)}%)`
            }
          : t
      )
    );
  };

  const handleAddAnnouncement = (newAnnouncement) => {
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: newStatus }
          : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Fixed Navbar */}
      <Navbar
        currentUser={currentUser}
        employees={employees}
        onSwitchUser={handleSwitchUser}
        todayAttendance={todayAttendance}
        onQuickPunch={handleQuickPunch}
        pendingLeavesCount={pendingLeavesCount}
        onNavigate={(tab) => setActiveTab(tab)}
        onLogout={handleLogout}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          pendingLeavesCount={pendingLeavesCount}
          todayAttendance={todayAttendance}
          onQuickPunch={handleQuickPunch}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          {activeTab === "dashboard" && (
            <DashboardView
              currentUser={currentUser}
              employees={employees}
              attendanceList={attendance}
              leavesList={leaves}
              channelsList={channels}
              earningTargets={earningTargets}
              announcements={announcements}
              todayAttendance={todayAttendance}
              onNavigate={(tab) => setActiveTab(tab)}
              onQuickPunch={handleQuickPunch}
            />
          )}

          {activeTab === "attendance" && (
            <AttendanceView
              currentUser={currentUser}
              employees={employees}
              attendanceList={attendance}
              onRecordAttendance={handleRecordAttendance}
              todayAttendance={todayAttendance}
            />
          )}

          {activeTab === "tasks" && (
            <DailyTasksView
              tasksList={tasks}
              currentUser={currentUser}
              employees={employees}
              onAddTask={handleAddTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
            />
          )}

          {activeTab === "leaves" && (
            <LeaveView
              currentUser={currentUser}
              leavesList={leaves}
              onApplyLeave={handleApplyLeave}
              onUpdateLeaveStatus={handleUpdateLeaveStatus}
            />
          )}

          {activeTab === "calendar" && (
            <CalendarView
              eventsList={events}
              leavesList={leaves}
              currentUser={currentUser}
              onAddEvent={handleAddEvent}
            />
          )}

          {activeTab === "org" && (
            <OrgHierarchyView
              employees={employees}
              channelsList={channels}
              onSwitchUser={handleSwitchUser}
              onSelectEmployeeForPayslip={(empId) => {
                setCurrentUserId(empId);
                setActiveTab("payslip");
              }}
            />
          )}

          {activeTab === "channels" && (
            <ChannelsView
              channelsList={channels}
              employees={employees}
              currentUser={currentUser}
              onUpdateChannelAssignee={handleUpdateChannelAssignee}
            />
          )}

          {activeTab === "earning-model" && (
            <EarningModelView
              earningTargets={earningTargets}
              currentUser={currentUser}
              employees={employees}
              onAddTarget={handleAddTarget}
              onUpdateTargetProgress={handleUpdateTargetProgress}
            />
          )}

          {activeTab === "payslip" && (
            <PayslipView
              currentUser={currentUser}
              employees={employees}
            />
          )}

          {activeTab === "policies" && (
            <PoliciesView
              announcements={announcements}
              currentUser={currentUser}
              onAddAnnouncement={handleAddAnnouncement}
            />
          )}
        </main>
      </div>

      {/* Mandatory Login Modal on Landing Page or when requested */}
      <LoginModal
        isOpen={!isLoggedIn || isLoginModalOpen}
        isMandatory={!isLoggedIn}
        onClose={() => setIsLoginModalOpen(false)}
        employees={employees}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
