import { FeedItem } from '@/components/feed/feed-item';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const staticData = { id: '1', userId: '1', feedId: '1', updatedAt: '1' };

const meta = {
  title: 'Components/Feed',
  component: FeedItem,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: Object.keys(staticData),
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  excludeStories: ['staticData'],
  decorators: [
    (Story: StoryFn) => {
      const client = new QueryClient();
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof FeedItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeedItem: Story = {
  args: {
    ...staticData,
    userName: '유저1',
    commentCount: 0,
    createdAt: '2024-10-30',
    content: '유저1의 테스트 피드입니다',
    likeCount: 0,
    isUserDoLike: 0,
    price: '1000',
    priceOption: 1,
  },
};
