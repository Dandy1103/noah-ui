import type { Meta, StoryObj } from '@storybook/angular';
import { NoahDatePickerComponent } from './date-picker.component';

const meta: Meta<NoahDatePickerComponent> = {
  title: 'Date Picker',
  component: NoahDatePickerComponent,
  args: { label: '日期' },
  render: (args) => ({ props: args, template: '<div style="width: 300px"><noah-date-picker [label]="label" /></div>' }),
};

export default meta;
type Story = StoryObj<NoahDatePickerComponent>;

export const Default: Story = {};
