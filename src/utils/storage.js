import {
  INITIAL_EMPLOYEES,
  INITIAL_CHANNELS,
  INITIAL_LEAVES,
  INITIAL_ATTENDANCE,
  INITIAL_HOLIDAYS_AND_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EARNING_TARGETS,
  INITIAL_TASKS,
  INITIAL_PUNCH_CORRECTIONS,
  INITIAL_NOTIFICATIONS
} from "../data/initialData";

const KEYS = {
  EMPLOYEES: "sarlayash_erp_employees_v3",
  CHANNELS: "sarlayash_erp_channels_v3",
  LEAVES: "sarlayash_erp_leaves_v3",
  ATTENDANCE: "sarlayash_erp_attendance_v3",
  EVENTS: "sarlayash_erp_events_v3",
  ANNOUNCEMENTS: "sarlayash_erp_announcements_v3",
  EARNING_TARGETS: "sarlayash_erp_earning_targets_v3",
  TASKS: "sarlayash_erp_tasks_v3",
  PUNCH_CORRECTIONS: "sarlayash_erp_punch_corrections_v3",
  NOTIFICATIONS: "sarlayash_erp_notifications_v3",
  CURRENT_USER_ID: "sarlayash_erp_current_user_id_v3",
  IS_LOGGED_IN: "sarlayash_erp_is_logged_in_v3"
};

export const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Error reading localStorage", e);
    return fallback;
  }
};

export const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving localStorage", e);
  }
};

export const initializeStorage = () => {
  if (!localStorage.getItem(KEYS.EMPLOYEES)) {
    setStoredData(KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  }
  if (!localStorage.getItem(KEYS.CHANNELS)) {
    setStoredData(KEYS.CHANNELS, INITIAL_CHANNELS);
  }
  if (!localStorage.getItem(KEYS.LEAVES)) {
    setStoredData(KEYS.LEAVES, INITIAL_LEAVES);
  }
  if (!localStorage.getItem(KEYS.ATTENDANCE)) {
    setStoredData(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  }
  if (!localStorage.getItem(KEYS.EVENTS)) {
    setStoredData(KEYS.EVENTS, INITIAL_HOLIDAYS_AND_EVENTS);
  }
  if (!localStorage.getItem(KEYS.ANNOUNCEMENTS)) {
    setStoredData(KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }
  if (!localStorage.getItem(KEYS.EARNING_TARGETS)) {
    setStoredData(KEYS.EARNING_TARGETS, INITIAL_EARNING_TARGETS);
  }
  if (!localStorage.getItem(KEYS.TASKS)) {
    setStoredData(KEYS.TASKS, INITIAL_TASKS);
  }
  if (!localStorage.getItem(KEYS.PUNCH_CORRECTIONS)) {
    setStoredData(KEYS.PUNCH_CORRECTIONS, INITIAL_PUNCH_CORRECTIONS);
  }
  if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
    setStoredData(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER_ID)) {
    setStoredData(KEYS.CURRENT_USER_ID, "SYM001");
  }
  if (localStorage.getItem(KEYS.IS_LOGGED_IN) === null) {
    setStoredData(KEYS.IS_LOGGED_IN, false);
  }
};

export const resetAllData = () => {
  localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
  localStorage.setItem(KEYS.CHANNELS, JSON.stringify(INITIAL_CHANNELS));
  localStorage.setItem(KEYS.LEAVES, JSON.stringify(INITIAL_LEAVES));
  localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(INITIAL_ATTENDANCE));
  localStorage.setItem(KEYS.EVENTS, JSON.stringify(INITIAL_HOLIDAYS_AND_EVENTS));
  localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
  localStorage.setItem(KEYS.EARNING_TARGETS, JSON.stringify(INITIAL_EARNING_TARGETS));
  localStorage.setItem(KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
  localStorage.setItem(KEYS.PUNCH_CORRECTIONS, JSON.stringify(INITIAL_PUNCH_CORRECTIONS));
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  localStorage.setItem(KEYS.CURRENT_USER_ID, JSON.stringify("SYM001"));
  localStorage.setItem(KEYS.IS_LOGGED_IN, JSON.stringify(false));
  window.location.reload();
};

export { KEYS };
