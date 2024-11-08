import { NewComment, updateCommentDto } from './type';

export const fetchComments = async (
  feedId: string,
  pageSize: number,
  pageParam: number,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/readByFeed?id=${feedId}&cursor=${pageParam}&pageSize=${pageSize}`,
      {
        next: { tags: ['comment'] },
      },
    );
    if (!response.ok) {
      throw new Error('댓글 조회 결과 실패했습니다.');
    }
    const result = await response.json();

    // console.log('api', result);
    return result;
  } catch (err) {
    console.error(`댓글 조회 도중 에러가 발생했습니다.`, err);
  }
};

export const addComment = async (commentData: NewComment) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/add`,
      {
        method: 'post',
        body: JSON.stringify(commentData),
        next: { tags: ['comment'] },
      },
    );
    return await response.json();
  } catch (err) {
    console.error(`댓글 추가 도중 에러가 발생했습니다.`, err);
  }
};

export const updateComment = async (commentData: updateCommentDto) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/update`,
      {
        method: 'post',
        body: JSON.stringify(commentData),
        next: { tags: ['comment'] },
      },
    );
    return await response.json();
  } catch (err) {
    console.error(`댓글 수정 도중 에러가 발생했습니다.`, err);
  }
};

export const deleteComment = async ({
  commentId,
  feedId,
}: {
  commentId: string;
  feedId: string;
}) => {
  try {
    const propsData = {
      commentId,
      feedId,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/delete`,
      {
        method: 'post',
        body: JSON.stringify(propsData),
        next: { tags: ['comment'] },
      },
    );
    return await response.json();
  } catch (err) {
    console.error(`댓글 삭제 도중 에러가 발생했습니다.`, err);
  }
};
