export const getFmtDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = date.getFullYear().toString();

  return `${month} ${day}, ${year}`;
}

// gets formatted time string
export const getFmtTime = (timestamp: number) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 24;

  const _minutes = minutes.toString().padStart(2, '0');
  const _hours = hours.toString().padStart(2, '0');

  return `${_hours}:${_minutes} ${ampm}`;
}

// gets formatted time string with seconds
export const getFmtTimeSecs = (timestamp: number) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 24;

  const _minutes = minutes.toString().padStart(2, '0');
  const _hours = hours.toString().padStart(2, '0');
  const _seconds = seconds.toString().padStart(2, '0');

  return `${_hours}:${_minutes}:${_seconds} ${ampm}`;
}

export const getFmtDuration = (milliseconds: number) => {
    if (milliseconds < 0) {
        return "Event has passed";
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400); // 86400 seconds in a day
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);

    

    // Handle case where time is less than 1 second
    if (parts.length === 0) {
      return "0s";
    }

    return parts.join(' ');
}


