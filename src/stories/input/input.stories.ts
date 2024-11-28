import FormField from '@/components/ui/inputs/FormField/component';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

export const InputActionData = {
  onChange: fn(),
};

const meta = {
  title: 'Components/Input',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  //   args: {
  //     ...InputActionData,
  //   },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    variant: 'default',
    placeholderText: 'placeholder',
    fieldType: 'text',
  },
};

export const NumberInput: Story = {
  args: {
    ...TextInput.args,
    fieldType: 'number',
  },
};

export const PasswordInput: Story = {
  args: {
    ...TextInput.args,
    fieldType: 'password',
  },
};

export const InputWithLabel: Story = {
  args: {
    ...TextInput.args,
    fieldType: 'text',
    labelName: 'text',
    labelText: 'label',
  },
};
