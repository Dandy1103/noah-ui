import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'noah-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NoahCheckboxComponent),
    multi: true,
  }],
})
export class NoahCheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() description = '';
  @Input({ transform: booleanAttribute }) disabled = false;

  readonly controlId = `noah-checkbox-${nextId++}`;
  checked = false;

  private onChange: (value: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: boolean | null): void {
    this.checked = value ?? false;
  }

  registerOnChange(onChange: (value: boolean) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  toggle(event: Event): void {
    if (this.disabled) return;
    this.checked = (event.target as HTMLInputElement).checked;
    this.onChange(this.checked);
    this.onTouched();
  }
}
