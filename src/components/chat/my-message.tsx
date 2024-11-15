import { IMsg } from '@/types';
import { formatMessageDate } from '@/util/formatMessageDate';

export default function MyMessage(item: IMsg) {
  return (
    <li className="flex justify-end items-end gap-2">
      <div className="text-gray-600 text-sm">
        {formatMessageDate(item.date)}
      </div>
      <div className="bg-blue-400 p-2 rounded-lg max-w-[250px]">{item.msg}</div>
    </li>
  );
}
