import { IMsg } from '@/types';

export default function MyMessage(item: IMsg) {
  const dateFormatter = (date: string) => {
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

  return (
    <li className="flex justify-end items-end gap-2">
      <div className="text-gray-600 text-sm">{dateFormatter(item.date)}</div>
      <div className="bg-blue-400 p-2 rounded-lg max-w-[250px]">{item.msg}</div>
    </li>
  );
}
