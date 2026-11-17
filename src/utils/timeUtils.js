// SarlaYash Universe — IST Time Zone & Midnight Auto Clock-out Utility
// Standard Operating Time Zone: Asia/Kolkata (IST = UTC+5:30)

export const getISTDate = () => {
  try {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    return formatter.format(new Date()); // Returns "YYYY-MM-DD"
  } catch (e) {
    // Fallback
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const ist = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + istOffset);
    return ist.toISOString().split("T")[0];
  }
};

export const getISTTime = () => {
  return new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
};

export const getISTHours = () => {
  const str = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit"
  });
  return parseInt(str, 10);
};

export const getISTMinutes = () => {
  const str = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    minute: "2-digit"
  });
  return parseInt(str, 10);
};

/**
 * Automatically clocks out any unclosed shift where 12 Midnight IST has passed.
 * If record.checkIn is present and checkOut is null/empty:
 * - If record.date < currentISTDate (i.e. past calendar day in IST), it auto-closes at 11:59 PM.
 * - If record.date === currentISTDate AND IST hours is 0 (i.e. 12 midnight has arrived), auto-closes.
 */
export const autoCloseMidnightAttendance = (attendanceList) => {
  const currentISTDate = getISTDate();
  const currentISTHour = getISTHours();

  let hasChanged = false;
  const autoClosedEmployees = [];

  const updatedList = attendanceList.map((record) => {
    // Check if shift is unclosed
    if (record.checkIn && !record.checkOut) {
      const isPastDay = record.date < currentISTDate;
      const isMidnightReached = record.date === currentISTDate && currentISTHour === 0;

      if (isPastDay || isMidnightReached) {
        hasChanged = true;
        autoClosedEmployees.push({
          employeeId: record.employeeId,
          employeeName: record.employeeName,
          date: record.date
        });

        const autoNote = record.notes
          ? `${record.notes} | [Auto Clock-out at 12:00 AM IST]`
          : `[Auto Clock-out at 12:00 AM IST Midnight Closure]`;

        return {
          ...record,
          checkOut: "11:59 PM",
          status: record.status || "Present",
          notes: autoNote,
          autoClosedAtMidnight: true
        };
      }
    }
    return record;
  });

  return {
    updatedList,
    hasChanged,
    autoClosedEmployees
  };
};
