export const doLike = async ({
  feedId,
  userId,
}: {
  feedId: number;
  userId: string;
}) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/like/doLike`,
      {
        method: 'POST',
        body: JSON.stringify({ feedId: feedId.toString(), userId: userId }),
      },
    );
    if (!resposne.ok) {
      console.error(`좋아요가 실패했습니다.`);
    }
    return await resposne.json();
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};

export const undoLike = async ({
  feedId,
  userId,
}: {
  feedId: number;
  userId: string;
}) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/like/undoLike`,
      {
        method: 'DELETE',
        body: JSON.stringify({ feedId: feedId, userId: userId }),
      },
    );
    if (!resposne.ok) {
      console.error(`좋아요 해제가 실패했습니다.`);
    }

    return await resposne.json();
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};
