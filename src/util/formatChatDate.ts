export function formatChatDate(date: string): string {
  const start = new Date(date);
  const now = new Date();

  const thisYear = now.getFullYear();
  const chatYear = start.getFullYear();

  if (chatYear === thisYear)
    return `${start.getMonth()}월 ${start.getDate()}일`;

  return `${start.toLocaleDateString()}`;
}
