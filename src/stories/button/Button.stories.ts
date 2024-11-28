import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '../../components/ui/button/button';

export const BtnActionsData = {
  onClick: fn(),
};

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...BtnActionsData,
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
