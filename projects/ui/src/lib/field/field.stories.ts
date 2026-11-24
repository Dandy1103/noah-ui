import type { Meta, StoryObj } from '@storybook/angular';
import { NoahInputComponent } from '../input/input.component';
import { NoahFieldComponent } from './field.component';

const meta: Meta<NoahFieldComponent> = {
  title: 'Field',
  component: NoahFieldComponent,
  render: () => ({
    moduleMetadata: {
      imports: [NoahInputComponent],
    },
    template: `
      <noah-field>
        姓名
        <noah-input placeholder="鄭丞恩"></noah-input>
        <span class="hint">顯示在清單上的名字</span>
      </noah-field>
    `,
  }),
};

export default meta;
type Story = StoryObj<NoahFieldComponent>;

export const Text: Story = {};
