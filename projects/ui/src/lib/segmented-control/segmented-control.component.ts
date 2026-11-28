import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoahButtonComponent } from '../button/button.component';
import type { NoahSelectOption } from '../select/select.component';

@Component({
  selector: 'noah-segmented-control',
  standalone: true,
  imports: [NoahButtonComponent],
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.scss',
})
export class NoahSegmentedControlComponent {
  @Input() label = '';
  @Input() options: readonly NoahSelectOption[] = [];
  @Input() value = '';
  @Output() readonly valueChange = new EventEmitter<string>();

  select(value: string): void {
    if (value === this.value) return;
    this.valueChange.emit(value);
  }
}
