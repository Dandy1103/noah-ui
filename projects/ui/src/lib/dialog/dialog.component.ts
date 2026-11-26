import { booleanAttribute, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NoahButtonComponent, type NoahButtonVariant } from '../button/button.component';

let nextId = 0;

@Component({
  selector: 'noah-dialog',
  standalone: true,
  imports: [NoahButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class NoahDialogComponent {
  @Input({ transform: booleanAttribute }) open = false;
  @Input() mode: 'alert' | 'confirm' | 'content' = 'content';
  @Input() title = '';
  @Input() message = '';
  @Input() eyebrow = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input({ transform: booleanAttribute }) closeOnBackdrop = true;
  @Input({ transform: booleanAttribute }) showClose = true;
  @Input() closeLabel = '關閉';
  @Input() confirmLabel = '確認';
  @Input() cancelLabel = '取消';
  @Input() confirmVariant: NoahButtonVariant = 'primary';
  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly confirmed = new EventEmitter<void>();
  @Output() readonly cancelled = new EventEmitter<void>();

  readonly titleId = `noah-dialog-title-${nextId++}`;
  readonly messageId = `noah-dialog-message-${nextId++}`;

  close(): void {
    if (!this.open) return;
    this.closed.emit();
  }

  confirm(): void {
    if (!this.open) return;
    this.confirmed.emit();
    this.closed.emit();
  }

  cancel(): void {
    if (!this.open) return;
    this.cancelled.emit();
    this.closed.emit();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) this.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
