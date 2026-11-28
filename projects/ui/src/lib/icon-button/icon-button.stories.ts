import type { Meta, StoryObj } from '@storybook/angular';
import { NoahIconButtonComponent } from './icon-button.component';

const meta: Meta<NoahIconButtonComponent> = {
  title: 'IconButton',
  component: NoahIconButtonComponent,
  args: {
    label: '修改',
    icon: 'edit',
    variant: 'secondary',
    type: 'button',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'danger'],
    },
    icon: {
      control: 'radio',
      options: ['edit', 'delete', 'withdraw', 'send', 'recall', 'view'],
    },
  },
  render: (args) => ({
    props: args,
    template: `<noah-icon-button [label]="label" [icon]="icon" [variant]="variant" [type]="type" [disabled]="disabled" />`,
  }),
};

export default meta;
type Story = StoryObj<NoahIconButtonComponent>;

export const Edit: Story = {};

export const Delete: Story = {
  args: { icon: 'delete', label: '刪除', variant: 'danger' },
};

export const Withdraw: Story = {
  args: { icon: 'withdraw', label: '下架', variant: 'danger' },
};

export const Send: Story = {
  args: { icon: 'send', label: '送出', variant: 'primary' },
};

export const Recall: Story = {
  args: { icon: 'recall', label: '回收', variant: 'secondary' },
};

export const View: Story = {
  args: { icon: 'view', label: '查看', variant: 'primary' },
};

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
