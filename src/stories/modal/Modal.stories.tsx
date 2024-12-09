import CommentInput from '@/components/comment/comment-input';
import { CommentList } from '@/components/comment/comment-list';
import Modal from '@/components/ui/modal';
import { useModalStore } from '@/store/modal/useModalStore';
import { Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const client = new QueryClient();
      useModalStore();

      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof Modal>;

export default meta;

const commentsGroup = [
  {
    id: 1,
    feedId: 1,
    userId: 1,
    userName: '유저1',
    content: '댓글1',
    parentCommentId: 1,
    createdAt: '2024-12-01',
    updatedAt: '2024-12-01',
  },
];

const ButtonWithHooks = () => {
  const { setIsOpen } = useModalStore();
  return (
    <>
      <button onClick={() => setIsOpen(true)}>댓글 열기</button>
      <Modal type="comment">
        <div className="flex-1 flex flex-col justify-start items-center pb-[60px]">
          <CommentList
            comments={commentsGroup}
            mutateFn={() => {}}
          ></CommentList>
          <CommentInput feedId={'1'} />
        </div>
      </Modal>
    </>
  );
};

export const Default = {
  render: () => <ButtonWithHooks />,
};
