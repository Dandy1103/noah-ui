import type { Meta, StoryObj } from '@storybook/angular';
import { NoahSelectComponent } from './select.component';

const meta: Meta<NoahSelectComponent> = {
  title: 'Select',
  component: NoahSelectComponent,
  args: {
    value: 'all',
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
        <noah-select [value]="value" [options]="options" (valueChange)="value = $event"></noah-select>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<NoahSelectComponent>;

export const Default: Story = {};
