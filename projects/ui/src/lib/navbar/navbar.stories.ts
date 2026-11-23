import type { Meta, StoryObj } from '@storybook/angular';
import { NoahNavbarComponent } from './navbar.component';

const meta: Meta<NoahNavbarComponent> = {
  title: 'Navbar',
  component: NoahNavbarComponent,
  args: {
    currentLabel: '公告',
    groups: [{ label: '公告', sections: [{ title: '公告', links: [{ label: '營運公告', href: '/operations' }] }] }],
  },
};

export default meta;
type Story = StoryObj<NoahNavbarComponent>;

export const Default: Story = {};
