import type { Meta, StoryObj } from '@storybook/angular';
import { NoahPageHeadingComponent } from './page-heading.component';

const meta: Meta<NoahPageHeadingComponent> = {
  title: 'Page heading',
  component: NoahPageHeadingComponent,
  args: {
    title: '客戶關係',
    breadcrumbs: [
      { label: '首頁', href: '/' },
      { label: '客戶關係' },
    ],
  },
};

export default meta;
type Story = StoryObj<NoahPageHeadingComponent>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: { breadcrumbs: [] },
};
