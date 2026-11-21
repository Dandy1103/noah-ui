import type { Meta, StoryObj } from '@storybook/angular';
import { NoahNavbarComponent } from './navbar.component';

const meta: Meta<NoahNavbarComponent> = {
  title: 'Navbar',
  component: NoahNavbarComponent,
  render: () => ({
    template: `<noah-navbar></noah-navbar>`,
  }),
};

export default meta;
type Story = StoryObj<NoahNavbarComponent>;

export const Default: Story = {};
