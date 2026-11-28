import { AfterViewInit, booleanAttribute, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'noah-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NoahInputComponent),
    multi: true,
  }],
})
export class NoahInputComponent implements ControlValueAccessor, AfterViewInit {
  @Input() label = '';
  @Input() hint = '';
  @Input() errorMessage = '';
  @Input() type: 'text' | 'password' | 'email' | 'search' | 'time' = 'text';
  @Input() placeholder = '';
  @Input() autocomplete = '';
  @Input() ariaLabel = '';
  @Input() maxlength: number | string | null = null;
  @Input() minlength: number | string | null = null;
  @Input() step: number | string | null = null;
  @Input() spellcheck: boolean | null = null;
  @Input() rows: number | string = 6;
  @Input({ transform: booleanAttribute }) multiline = false;
  @Input({ transform: booleanAttribute }) required = false;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Input({ transform: booleanAttribute }) autofocus = false;
  @ViewChild('control') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  readonly errorId = `noah-input-error-${nextId++}`;
  text = '';
  private formDisabled = false;
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  @Input()
  set value(next: string | null) {
    this.text = next ?? '';
  }

  get isDisabled(): boolean {
    return this.disabled || this.formDisabled;
  }

  get hasError(): boolean {
    return this.invalid || this.errorMessage.length > 0;
  }

  get describedBy(): string | null {
    if (this.errorMessage) return this.errorId;
    return null;
  }

  writeValue(value: string | null): void {
    this.text = value ?? '';
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled = disabled;
  }

  update(event: Event): void {
    this.text = (event.target as HTMLInputElement).value;
    this.onChange(this.text);
  }

  touch(): void {
    this.onTouched();
  }

  ngAfterViewInit(): void {
    if (!this.autofocus) return;
    this.control?.nativeElement.focus();
  }
}
