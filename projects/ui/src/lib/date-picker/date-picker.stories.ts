import type { Meta, StoryObj } from '@storybook/angular';
import { NoahDatePickerComponent } from './date-picker.component';

const meta: Meta<NoahDatePickerComponent> = {
  title: 'Date Picker',
  component: NoahDatePickerComponent,
  render: () => ({
    template: '<div style="width: 300px"><noah-date-picker /></div>',
  }),
};

export default meta;
type Story = StoryObj<NoahDatePickerComponent>;

export const Default: Story = {};
