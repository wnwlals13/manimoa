export const formatMessageDate = (date: string) => {
  const parseDate = new Date(date);
  let hours = parseDate.getHours();
  const minutes = String(parseDate.getMinutes()).padStart(2, '0');
  let ampm = '오전';
  if (hours > 12) {
    ampm = '오후';
    hours = hours - 12;
  }
  return `${ampm} ${String(hours).padStart(2, '0')}:${minutes}`;
};
