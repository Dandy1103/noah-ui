import type { Meta, StoryObj } from '@storybook/angular';
import { NoahSpinnerComponent } from './spinner.component';

const meta: Meta<NoahSpinnerComponent> = {
  title: 'Spinner',
  component: NoahSpinnerComponent,
  args: {
    label: '讀取中',
  },
  render: (args) => ({
    props: args,
    template: `<noah-spinner [label]="label" />`,
  }),
};

export default meta;
type Story = StoryObj<NoahSpinnerComponent>;

export const Default: Story = {};
