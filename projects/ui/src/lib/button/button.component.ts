import { booleanAttribute, Component, Input } from '@angular/core';
export type NoahButtonVariant = 'primary' | 'secondary' | 'danger';
export type NoahButtonSize = 'large' | 'small';

@Component({
  selector: 'noah-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class NoahButtonComponent {
  @Input() variant: NoahButtonVariant = 'primary';
  @Input() size: NoahButtonSize = 'large';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() message = '';
}
