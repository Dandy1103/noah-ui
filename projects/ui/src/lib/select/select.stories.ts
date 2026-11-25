import type { Meta, StoryObj } from '@storybook/angular';
import { NoahSelectComponent } from './select.component';

const meta: Meta<NoahSelectComponent> = {
  title: 'Select',
  component: NoahSelectComponent,
  args: {
    label: '對象',
    errorMessage: '',
    placeholder: '請選擇',
    value: '',
    options: [
      { value: 'all', label: '全部' },
      { value: 'staff', label: '全員' },
      { value: 'unit', label: '部門' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px">
        <noah-select
          [label]="label"
          [errorMessage]="errorMessage"
          [placeholder]="placeholder"
          [value]="value"
          [options]="options"
          (valueChange)="value = $event" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<NoahSelectComponent>;

export const Default: Story = {};

export const WithError: Story = {
  args: { value: '', errorMessage: '請選擇對象' },
};
