import { booleanAttribute, Component, Input } from '@angular/core';

export type NoahButtonVariant = 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'noah-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class NoahButtonComponent {
  @Input() variant: NoahButtonVariant = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ transform: booleanAttribute }) disabled = false;
}
