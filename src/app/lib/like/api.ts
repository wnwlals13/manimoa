export const doLike = async ({ feedId }: { feedId: number }) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/like/doLike`,
      { method: 'post', body: feedId.toString() },
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

export const undoLike = async ({ feedId }: { feedId: number }) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/like/undoLike`,
      { method: 'post', body: feedId.toString() },
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
