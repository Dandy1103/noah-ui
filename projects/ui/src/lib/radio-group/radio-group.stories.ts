import type { Meta, StoryObj } from '@storybook/angular';
import { NoahRadioGroupComponent } from './radio-group.component';

const meta: Meta<NoahRadioGroupComponent> = {
  title: 'Radio Group',
  component: NoahRadioGroupComponent,
  args: {
    label: '雇用型態',
    options: [
      { value: 'regular', label: '正職' },
      { value: 'part_time', label: '部分工時' },
      { value: 'intern', label: '實習' },
    ],
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<NoahRadioGroupComponent>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
