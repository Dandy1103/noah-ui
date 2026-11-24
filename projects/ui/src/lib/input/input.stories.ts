import type { Meta, StoryObj } from '@storybook/angular';
import { NoahInputComponent } from './input.component';

const meta: Meta<NoahInputComponent> = {
  title: 'Input',
  component: NoahInputComponent,
  args: {
    label: '帳號',
    errorMessage: '',
    type: 'text',
    placeholder: '帳號',
    value: '',
    disabled: false,
    invalid: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px">
        <noah-input
          [label]="label"
          [errorMessage]="errorMessage"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [invalid]="invalid">
        </noah-input>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<NoahInputComponent>;

export const Text: Story = {};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: '帳號或密碼錯誤' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
