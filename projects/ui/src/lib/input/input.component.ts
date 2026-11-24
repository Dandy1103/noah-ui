import { booleanAttribute, Component, Input } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'noah-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class NoahInputComponent {
  @Input() label = '';
  @Input() errorMessage = '';
  @Input() type: 'text' | 'password' | 'email' | 'search' = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;

  readonly errorId = `noah-input-error-${nextId++}`;

  get hasError(): boolean {
    return this.invalid || this.errorMessage.length > 0;
  }
}
