import type { Meta, StoryObj } from '@storybook/angular';
import { NoahPagerComponent } from './pager.component';

const meta: Meta<NoahPagerComponent> = {
  title: 'Pager',
  component: NoahPagerComponent,
  args: {
    page: 1,
    pageCount: 5,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<noah-pager [page]="page" [pageCount]="pageCount" [disabled]="disabled" (pageChange)="page = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<NoahPagerComponent>;

export const Default: Story = {};
