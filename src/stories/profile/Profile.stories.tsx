import Profile from '@/components/ui/profile';
import { Meta, StoryObj } from '@storybook/react';

const staticData = { src: '' };

const meta = {
  title: 'Components/Profile',
  component: Profile,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: Object.keys(staticData),
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          height: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xlg'],
    },
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '',
    size: 'md',
  },
};

export const Sizes = () => (
  <>
    <Profile size="sm" src="" />
    <Profile size="md" src="" />
    <Profile size="lg" src="" />
    <Profile size="xlg" src="" />
  </>
);

export const WithImage: Story = {
  args: {
    src: `feed/defaultImage.png`,
    size: 'md',
  },
};
