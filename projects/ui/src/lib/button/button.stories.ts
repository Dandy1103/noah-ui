import type { Meta, StoryObj } from '@storybook/angular';
import { NoahButtonComponent } from './button.component';

const meta: Meta<NoahButtonComponent> = {
  title: 'Button',
  component: NoahButtonComponent,
  args: {
    message: '確認',
    variant: 'primary',
    size: 'large',
    type: 'button',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: '主要按鈕用於搜尋、提交、確認。次要按鈕用於取消、返回、清除。',
    },
  },
  render: (args) => ({
    props: args,
    template: `<noah-button [message]="message" [variant]="variant" [size]="size" [type]="type" [disabled]="disabled" />`,
  }),
};

export default meta;
type Story = StoryObj<NoahButtonComponent>;

export const Primary: Story = {};

export const Small: Story = {
  args: { size: 'small' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', message: '取消' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
