import type { Meta, StoryObj } from '@storybook/angular';
import { NoahHeaderComponent } from './header.component';

const meta: Meta<NoahHeaderComponent> = {
  tags: ['autodocs'],
  title: 'Header',
  component: NoahHeaderComponent,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    userName: '王小明',
  },
};

export default meta;
type Story = StoryObj<NoahHeaderComponent>;

export const Default: Story = {};
