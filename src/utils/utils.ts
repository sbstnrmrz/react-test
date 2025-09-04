export const getFmtDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDay().toString();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = date.getFullYear().toString();

  return `${month} ${day}, ${year}`;
}

export const getFmtTime = (timestamp: number) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 24;

  const _minutes = minutes.toString().padStart(2, '0');

  return `${hours}:${minutes} ${ampm}`;
}
