import type { Meta, StoryObj } from '@storybook/angular';
import { NoahLoadingMaskComponent } from './loading-mask.component';

const meta: Meta<NoahLoadingMaskComponent> = {
  title: 'Loading mask',
  component: NoahLoadingMaskComponent,
  args: { label: '加載中...' },
};

export default meta;
type Story = StoryObj<NoahLoadingMaskComponent>;

export const Default: Story = {};
