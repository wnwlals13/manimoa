import { IMsg } from '@/types';
import { formatMessageDate } from '@/util/formatMessageDate';

export default function OtherMessage(item: IMsg) {
  return (
    <li className="flex justify-start items-start gap-2">
      <div className="flex-1 flex items-end gap-2">
        <div className="bg-white p-2 rounded-lg max-w-[250px]">{item.msg}</div>
        <div className="text-gray-600 text-sm">
          {formatMessageDate(item.date)}
        </div>
      </div>
    </li>
  );
}
