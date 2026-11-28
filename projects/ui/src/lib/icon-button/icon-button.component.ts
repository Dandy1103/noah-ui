import { booleanAttribute, Component, Input } from '@angular/core';

export type NoahIconButtonVariant = 'primary' | 'secondary' | 'danger';
export type NoahIconButtonIcon = 'edit' | 'delete' | 'withdraw' | 'send' | 'recall' | 'view';

@Component({
  selector: 'noah-icon-button',
  standalone: true,
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class NoahIconButtonComponent {
  @Input() variant: NoahIconButtonVariant = 'secondary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() icon: NoahIconButtonIcon = 'edit';
  @Input() label = '';
}
