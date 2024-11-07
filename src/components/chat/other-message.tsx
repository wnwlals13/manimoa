import { IMsg } from '@/types';

export default function OtherMessage(item: IMsg) {
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
    <li className="flex justify-start items-start gap-2">
      <div className="flex-1 flex items-end gap-2">
        <div className="bg-white p-2 rounded-lg max-w-[250px]">{item.msg}</div>
        <div className="text-gray-600 text-sm">{dateFormatter(item.date)}</div>
      </div>
    </li>
  );
}
