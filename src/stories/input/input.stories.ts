import FormField from '@/components/ui/inputs/FormField/component';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

export const InputActionData = {
  onChange: fn(),
};

const staticData = {
  labelName: '',
  onFieldChange: () => {},
  errorMsg: '',
};

const meta = {
  title: 'Components/Input',
  component: FormField,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: Object.keys(staticData),
    },
  },
  tags: ['autodocs'],
  args: {
    fieldType: 'text',
    placeholderText: 'Please enter text',
    variant: 'default',
  },
  argTypes: {
    fieldType: {
      control: { type: 'radio' },
      options: ['text', 'password', 'number'],
    },
    placeholderText: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    variant: 'default',
    placeholderText: 'Please enter text',
    fieldType: 'text',
  },
};

export const NumberInput: Story = {
  args: {
    ...TextInput.args,
    fieldType: 'number',
    placeholderText: 'Please enter number',
  },
};

export const PasswordInput: Story = {
  args: {
    ...TextInput.args,
    fieldType: 'password',
    placeholderText: 'Please enter your password',
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

export const Error: Story = {
  args: {
    ...TextInput.args,
    variant: 'error',
    errorMsg: '다시 입력해주세요',
  },
};
