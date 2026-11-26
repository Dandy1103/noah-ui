import type { Meta, StoryObj } from '@storybook/angular';
import { NoahCheckboxComponent } from './checkbox.component';

const meta: Meta<NoahCheckboxComponent> = {
  title: 'Checkbox',
  component: NoahCheckboxComponent,
  args: { label: '平台管理員', description: '管理員預設擁有所有權限', disabled: false },
};

export default meta;
type Story = StoryObj<NoahCheckboxComponent>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
