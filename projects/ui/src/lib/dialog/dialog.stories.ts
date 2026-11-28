import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NoahButtonComponent } from '../button/button.component';
import { NoahCheckboxComponent } from '../checkbox/checkbox.component';
import { NoahDialogComponent } from './dialog.component';

const meta: Meta<NoahDialogComponent> = {
  title: 'Dialog',
  component: NoahDialogComponent,
  decorators: [moduleMetadata({ imports: [NoahButtonComponent, NoahCheckboxComponent] })],
  args: {
    open: true,
    mode: 'content',
    eyebrow: '權限管理',
    title: '編輯權限',
    message: '',
    size: 'medium',
    closeOnBackdrop: true,
    showClose: true,
  },
  render: (args) => ({
    props: { ...args, closeDialog: () => undefined },
    template: `<noah-dialog [open]="open" [mode]="mode" [eyebrow]="eyebrow" [title]="title" [message]="message" [size]="size" [closeOnBackdrop]="closeOnBackdrop" [showClose]="showClose" (closed)="closeDialog()">
      <div style="display:grid;gap:8px"><noah-checkbox label="公告管理" /><noah-checkbox label="公告審核" /></div>
      <noah-button noahDialogActions message="儲存" (click)="closeDialog()" /><noah-button noahDialogActions variant="secondary" message="取消" (click)="closeDialog()" />
    </noah-dialog>`,
  }),
};

export default meta;
type Story = StoryObj<NoahDialogComponent>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'small', title: '確認操作' } };
export const Large: Story = { args: { size: 'large', title: '編輯權限' } };
export const Alert: Story = {
  args: { mode: 'alert', eyebrow: '', title: '已儲存', message: '員工資料已成功更新。', showClose: false },
};
export const AlertWithoutTitle: Story = {
  args: { mode: 'alert', eyebrow: '', title: '', message: '員工資料已成功更新。', showClose: false },
};
export const Confirm: Story = {
  args: { mode: 'confirm', eyebrow: '', title: '刪除公告？', message: '刪除後無法復原，確定要繼續嗎？', confirmVariant: 'danger', showClose: false },
};
