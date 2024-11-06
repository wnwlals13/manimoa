import { IMsg } from '@/types';
import { RequestChatDto } from './hook/useNewChat';
import Cookies from 'js-cookie';

export const addNewChat = async (data: RequestChatDto) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/room/addNewChat`,
      { method: 'post', body: JSON.stringify(data.userIds) },
    ).then((res) => res.json());
    return result;
  } catch (err) {
    console.error('error', err);
  }
};

export const fetchMyChatRooms = async () => {
  try {
    const cookieStore = Cookies.get('user') as string;
    const user = JSON.parse(cookieStore);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/room/readChatRooms?userId=${user.uid}`,
      { method: 'get' },
    ).then((res) => res.json());
    return result;
  } catch (err) {
    console.error('error', err);
  }
};

export const fetchAllMessages = async (roomId: string) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/message/readAll?roomId=${roomId}`,
      { method: 'get' },
    ).then((res) => res.json());
    return result;
  } catch (err) {
    console.error('error', err);
  }
};

export const sendMessage = async (msg: IMsg) => {
  try {
    // const cookieStore = Cookies.get('user') as string;
    // const user = JSON.parse(cookieStore);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/message/send`,
      { method: 'post', body: JSON.stringify(msg) },
    ).then((res) => res.json());
    return result;
  } catch (err) {
    console.error('error', err);
  }
};

export const removeChat = async ({
  willRemoveRooms,
}: {
  willRemoveRooms: string[];
}) => {
  try {
    // const cookieStore = Cookies.get('user') as string;
    // const user = JSON.parse(cookieStore);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/room/removeChat`,
      { method: 'post', body: JSON.stringify(willRemoveRooms) },
    ).then((res) => res.json());
    return result;
  } catch (err) {
    console.error('error', err);
  }
};
