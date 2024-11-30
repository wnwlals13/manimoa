import { CarouselComponent } from '@/components/ui/carousel/carousel';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Carousel',
  component: CarouselComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CarouselComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoImage: Story = {
  args: {},
};

export const DefaultImage: Story = {
  args: {
    images: ['test.png', ''],
  },
};
