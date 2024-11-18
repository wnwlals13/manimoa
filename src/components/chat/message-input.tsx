import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { Button } from '../ui/button/button';
import { FiSend } from 'react-icons/fi';
import { useSendMessage } from '@/lib/chat/hook/useSendMessage';
import { IMsg } from '@/types';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { debounce } from '@/util/debounce';

interface MessageInputProps {
  sendMessage: (roomId: string, message: IMsg) => void;
  roomId: string;
}

export default function MessageInput({
  sendMessage,
  roomId,
}: MessageInputProps) {
  const { user } = useAuthStore();
  const [msg, setMsg] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate } = useSendMessage(roomId);

  const handleSetMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = debounce((e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key == 'Enter' && msg) {
      handleSendMessage();
    }
  });

  const handleSendMessage = async () => {
    if (!inputRef.current) return;
    const message: IMsg = {
      author: user?.uid as string,
      msg,
      date: new Date().toString(),
      roomId: roomId,
    };

    sendMessage(roomId, message);
    setMsg(''); // 메세지 내용 초기화
    inputRef.current.value = '';

    // 메세지 저장
    mutate(message);
  };

  return (
    <div className="fixed bottom-0 min-w-custom w-custom flex gap-2 bg-white pt-[20px] p-default">
      <input
        ref={inputRef}
        className="border flex-1 pl-2 pr-2 outline-none rounded-sm"
        onChange={handleSetMsg}
        onKeyDown={handleKeyDown}
      ></input>
      <Button
        variant={!msg ? `outline` : 'submain'}
        onClick={handleSendMessage}
        disabled={!msg}
      >
        <FiSend size={25} />
      </Button>
    </div>
  );
}
