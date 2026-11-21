import type { Meta, StoryObj } from '@storybook/angular';
import { NoahButtonComponent } from './button.component';

const meta: Meta<NoahButtonComponent> = {
  title: '按鈕',
  component: NoahButtonComponent,
  args: {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<noah-button [variant]="variant" [type]="type" [disabled]="disabled">儲存</noah-button>`,
  }),
};

export default meta;
type Story = StoryObj<NoahButtonComponent>;

export const 主要: Story = {};

export const 次要: Story = {
  args: { variant: 'secondary' },
};

export const 危險: Story = {
  args: { variant: 'danger' },
};

export const 停用: Story = {
  args: { disabled: true },
};
