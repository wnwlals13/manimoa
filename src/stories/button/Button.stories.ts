import { Button } from '@/components/ui/button/button';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {} from '@storybook/nextjs';

export const BtnActionsData = {
  onClick: fn(),
};

const staticData = { iconColor: 'white' };

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: Object.keys(staticData),
    },
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: { isIcon: false, icon: 'unlike' },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'outline', 'secondary', 'accent', 'none'],
    },
    icon: {
      control: { type: 'radio' },
      options: ['unlike', 'like', 'comment', 'message', 'plus'],
    },
    isIcon: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Click Me',
    size: 'md',
    variant: 'primary',
    isIcon: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};

export const Accent: Story = {
  args: {
    ...Primary.args,
    variant: 'accent',
  },
};

export const Outline: Story = {
  args: {
    ...Primary.args,
    variant: 'outline',
  },
};

export const None: Story = {
  args: {
    ...Primary.args,
    variant: 'none',
  },
};

export const IconButton: Story = {
  args: {
    ...Primary.args,
    icon: 'unlike',
    iconPosition: 'left',
  },
};
