import type { Meta, StoryObj } from '@storybook/angular';
import { NoahFieldComponent } from './field.component';

const meta: Meta<NoahFieldComponent> = {
  title: '欄位',
  component: NoahFieldComponent,
  render: () => ({
    template: `
      <noah-field>
        姓名
        <input placeholder="鄭丞恩">
        <span class="hint">顯示在清單上的名字</span>
      </noah-field>
    `,
  }),
};

export default meta;
type Story = StoryObj<NoahFieldComponent>;

export const 文字: Story = {};
