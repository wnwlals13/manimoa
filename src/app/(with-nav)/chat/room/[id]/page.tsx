'use client';

import { useFetchAllMessages } from '@/app/lib/chat/hook/useFetchAllMessages';
import { useSendMessage } from '@/app/lib/chat/hook/useSendMessage';
import MyMessage from '@/components/chat/my-message';
import OtherMessage from '@/components/chat/other-message';
import { Button } from '@/components/ui/button';
import { debounce } from '@/lib/debounce';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { IMsg } from '@/types';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import SocketIoClient, { Socket } from 'socket.io-client';

export default function Page({ params }: { params: { id: string } }) {
  const { user } = useAuthStore();
  const [msg, setMsg] = useState<string>('');
  const [chat, setChat] = useState<IMsg[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false); // 채팅 연결 여부
  const [roomId, setRoomId] = useState<string>(params.id); // 연결된 채팅 방
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate } = useSendMessage(params.id);
  const { data } = useFetchAllMessages(params.id);
  const messageList = data?.messages;

  const handleSetMsg = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  });

  const handleSendMessage = async () => {
    if (!socket || !inputRef.current) return;
    const message: IMsg = {
      author: user?.uid as string,
      msg,
      date: new Date().toString(),
      roomId: roomId,
    };
    socket.emit(`chatting`, message);
    setMsg(''); // 메세지 내용 초기화
    inputRef.current.value = '';

    // 메세지 저장
    mutate(message);
  };

  const connectToChatServer = () => {
    setIsConnected(true);
    const _socket = SocketIoClient('http://localhost:5000', {
      autoConnect: false,
      query: { chatRoomId: params.id },
    });
    _socket.connect();
    setSocket(_socket);
    _socket?.emit('joinChatRoom', user?.uid);
  };

  const disconnectToChatServer = () => {
    socket?.disconnect();
  };

  const onMessageReceived = (message: IMsg) => {
    console.log('client =>', message);
    setChat((currentMsg) => [
      ...currentMsg,
      {
        author: message.author,
        msg: message.msg,
        date: message.date,
        roomId: params.id,
      },
    ]);
  };

  useEffect(() => {
    setRoomId(params.id);

    if (!socket?.connected) {
      connectToChatServer();
    }
    socket?.on('connect', connectToChatServer);
    return () => {
      socket?.off('connect', connectToChatServer);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('send message', onMessageReceived);

    return () => {
      disconnectToChatServer();
      socket?.off('send message', onMessageReceived);
    };
  }, [socket]);

  useEffect(() => {
    if (messageList) {
      setChat([...messageList]);
    }
  }, [messageList]);

  return (
    <>
      <ul className="flex-1 bg-gray-200 p-default flex flex-col gap-2 overflow-scroll">
        {chat.map((item, idx) =>
          item.author == user?.uid ? (
            <MyMessage key={idx} {...item} />
          ) : (
            <OtherMessage key={idx} {...item} />
          ),
        )}
      </ul>
      <div className="flex gap-2 bg-white pt-[20px] p-default">
        <input
          ref={inputRef}
          className="border flex-1"
          onChange={handleSetMsg}
        ></input>
        <Button
          variant={!msg ? `outline` : 'submain'}
          onClick={handleSendMessage}
          disabled={!msg}
        >
          <FiSend size={25} />
        </Button>
      </div>
    </>
  );
}
