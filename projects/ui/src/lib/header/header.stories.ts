import type { Meta, StoryObj } from '@storybook/angular';
import { NoahHeaderComponent } from './header.component';

const meta: Meta<NoahHeaderComponent> = {
  title: 'Header',
  component: NoahHeaderComponent,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    productName: 'Noah Portal',
    homeHref: '#',
    userName: '王小明',
    passwordHref: '#',
  },
};

export default meta;
type Story = StoryObj<NoahHeaderComponent>;

export const Default: Story = {};
