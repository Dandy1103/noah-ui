import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { NoahSelectOption } from '../select/select.component';

let nextId = 0;

@Component({
  selector: 'noah-radio-group',
  standalone: true,
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NoahRadioGroupComponent),
    multi: true,
  }],
})
export class NoahRadioGroupComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: readonly NoahSelectOption[] = [];
  @Input({ transform: booleanAttribute }) disabled = false;

  readonly groupId = `noah-radio-group-${nextId++}`;
  value = '';

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  choose(value: string): void {
    if (this.disabled) return;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
