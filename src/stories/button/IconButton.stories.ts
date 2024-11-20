import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from '../../components/ui/button/IconButton';
import { BtnActionsData } from './Button.stories';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...BtnActionsData,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    icon: 'unlike',
    children: 'Number',
    size: 'md',
    variant: 'primary',
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
