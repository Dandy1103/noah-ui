import type { Meta, StoryObj } from '@storybook/angular';
import { NoahButtonComponent } from './button.component';

const meta: Meta<NoahButtonComponent> = {
  title: 'Button',
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

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
