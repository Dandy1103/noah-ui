import { booleanAttribute, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnDestroy, Output, signal } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NoahMenuStateService } from '../menu/menu-state.service';

let nextId = 0;

export interface NoahSelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'noah-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NoahSelectComponent),
    multi: true,
  }],
})
export class NoahSelectComponent implements ControlValueAccessor, OnDestroy {
  @Input() label = '';
  @Input() hint = '';
  @Input() errorMessage = '';
  @Input() placeholder = '請選擇';
  @Input() emptyLabel = '';
  @Input() options: readonly NoahSelectOption[] = [];
  @Input({ transform: booleanAttribute }) required = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Output() readonly valueChange = new EventEmitter<string>();

  readonly controlId = `noah-select-${nextId++}`;
  readonly labelId = `${this.controlId}-label`;
  readonly valueId = `${this.controlId}-value`;
  readonly errorId = `${this.controlId}-error`;
  readonly open = signal(false);
  readonly openUp = signal(false);

  private current = '';
  private formDisabled = false;
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly menuState: NoahMenuStateService,
  ) {}

  @Input()
  set value(next: string | null) {
    this.current = next ?? '';
  }

  get value(): string {
    return this.current;
  }

  get isDisabled(): boolean {
    return this.disabled || this.formDisabled;
  }

  get choices(): readonly NoahSelectOption[] {
    if (!this.emptyLabel) return this.options;
    return [{ value: '', label: this.emptyLabel }, ...this.options.filter((option) => option.value !== '')];
  }

  get currentLabel(): string {
    return this.choices.find((option) => option.value === this.value)?.label ?? this.placeholder;
  }

  toggle(): void {
    if (this.isDisabled) return;
    if (this.open()) {
      this.closeMenu();
      this.onTouched();
      return;
    }
    this.menuState.open(this, () => this.closeMenu());
    this.openUp.set(this.shouldOpenUp());
    this.open.set(true);
    document.addEventListener('pointerdown', this.onOutsidePointer, true);
  }

  choose(value: string): void {
    if (this.isDisabled) return;
    this.current = value;
    this.valueChange.emit(value);
    this.onChange(value);
    this.onTouched();
    this.closeMenu();
  }

  writeValue(value: string | null): void {
    this.current = value ?? '';
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled = disabled;
    if (disabled) this.closeMenu();
  }

  ngOnDestroy(): void {
    this.closeMenu();
  }

  private shouldOpenUp(): boolean {
    const control = this.host.nativeElement.querySelector('.noah-select__control');
    if (!(control instanceof HTMLElement)) return false;
    const rect = control.getBoundingClientRect();
    const estimated = Math.min(240, Math.max(this.choices.length, 1) * 40);
    const spaceBelow = window.innerHeight - rect.bottom;
    return spaceBelow < estimated && rect.top > spaceBelow;
  }

  private readonly onOutsidePointer = (event: PointerEvent): void => {
    if (!this.open()) return;
    const target = event.target;
    if (target instanceof Node && this.host.nativeElement.contains(target)) return;
    this.closeMenu();
    this.onTouched();
  };

  private closeMenu(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.openUp.set(false);
    document.removeEventListener('pointerdown', this.onOutsidePointer, true);
    this.menuState.close(this);
  }

  @HostListener('document:keydown.escape')
  closeFromKeyboard(): void {
    if (!this.open()) return;
    this.closeMenu();
    this.onTouched();
  }
}
