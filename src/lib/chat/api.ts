import { IChatRoom, IMsg } from '@/types';
import Cookies from 'js-cookie';
import { RequestChatDto } from './type';
import { ChatRequestDto } from './hook/useFetchMyChatRooms';

export const addNewChat = async (data: RequestChatDto) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/room/addNewChat`,
      { method: 'post', body: JSON.stringify(data) },
    ).then((res) => res.json());
    return result;
  } catch (err) {
    console.error('error', err);
  }
};

export const fetchMyChatRooms = async ({
  pageParam,
  pageSize,
}: ChatRequestDto) => {
  try {
    const cookieStore = Cookies.get('user') as string;
    const user = JSON.parse(cookieStore);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/room/readChatRooms?cursor=` +
        pageParam +
        `&pageSize=` +
        pageSize +
        `&userId=${user.uid}`,
      { method: 'get' },
    ).then((res) => res.json());

    //가공
    const chats: IChatRoom[] = result?.chats.map((item: any) => {
      // 이메일 문자열을 배열로 가공
      let emailArr = null;
      if (item.participantEmails) {
        const emailList = item.participantEmails.split(',') as string[];
        emailArr = emailList.map((email: string) => {
          const emailData = email.split(':');
          return { id: emailData[0], email: emailData[1] };
        });
        // 내 아이디 제외
        emailArr = emailArr.filter((item) => Number(item.id) !== user.uid);
      }

      // 프로필 문자열을 배열로 가공
      let profileArr = null;
      if (item.participantProfiles) {
        const profileList = item.participantProfiles.split(',') as string[];
        profileArr = profileList.map((profile: string) => {
          const profileData = profile.split(':');
          return { id: profileData[0], profileImg: profileData[1] };
        });
        // 내 아이디 제외
        profileArr = profileArr.filter((item) => Number(item.id) !== user.uid);
      }

      // id 문자열을 배열로 가공
      let userIdArr = null;
      if (item.participantIds) {
        const userIdList = item.participantIds.split(',') as string[];
        userIdArr = userIdList.filter((id: string) => id !== user.uid);
        // 내 아이디 제외
        userIdArr = userIdArr.filter((item) => Number(item) != user.uid);
      }

      return {
        ...item,
        participantEmails: emailArr,
        participantProfiles: profileArr,
        participantIds: userIdArr,
      };
    });

    if (!chats) {
      console.error('error');
    }

    return { ...result, chats: chats };
  } catch (err) {
    console.error('error', err);
  }
};

export const fetchAllMessages = async (roomId: string) => {
  try {
    console.log('roomId', roomId);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/message/readAll?roomId=${roomId}`,
      { method: 'get', cache: 'no-store' },
    ).then((res) => res.json());
    return result;
  } catch (err) {
    console.error('error', err);
  }
};

export const sendMessage = async (msg: IMsg) => {
  try {
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
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/room/removeChat`,
      { method: 'PATCH', body: JSON.stringify(willRemoveRooms) },
    ).then((res) => res.json());
    return result;
  } catch (err) {
    console.error('error', err);
  }
};
