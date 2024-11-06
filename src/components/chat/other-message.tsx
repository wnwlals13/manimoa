import { IMsg } from '@/types';

export default function OtherMessage(item: IMsg) {
  const dateFormatter = (date: string) => {
    const parseDate = new Date(date);
    let hours = parseDate.getHours();
    const minutes = parseDate.getMinutes();
    let ampm = '오전';
    if (hours > 12) {
      ampm = '오후';
      hours = hours - 12;
    }
    return `${ampm} ${hours}:${minutes}`;
  };

  return (
    <li className="flex justify-start items-start gap-2">
      <div className="flex flex-col">
        <div className="w-[35px] h-[35px] bg-white rounded-full"></div>
      </div>
      <div className="flex-1 flex items-end gap-2">
        <div className="bg-white p-2 rounded-lg max-w-[250px]">{item.msg}</div>
        <div className="text-gray-600 text-sm">{dateFormatter(item.date)}</div>
      </div>
    </li>
  );
}
