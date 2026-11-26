import { Component, ElementRef, HostListener, Input, forwardRef, inject } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

interface CalendarDay {
  key: string;
  date: number;
  iso: string;
  inCurrentMonth: boolean;
}

let nextId = 0;

@Component({
  selector: 'noah-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NoahDatePickerComponent),
    multi: true,
  }],
})
export class NoahDatePickerComponent implements ControlValueAccessor {
  private readonly host = inject(ElementRef<HTMLElement>);

  @Input() label = '';
  readonly labelId = `noah-date-picker-label-${nextId++}`;
  readonly weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  readonly months = Array.from({ length: 12 }, (_, index) => index + 1);
  readonly years = Array.from(
    { length: new Date().getFullYear() + 21 - 1900 },
    (_, index) => new Date().getFullYear() + 20 - index,
  );
  value = '';
  isOpen = false;
  isDisabled = false;
  panelMode: 'days' | 'months' | 'years' = 'days';
  view = new Date();

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  get shownValue(): string {
    if (!this.value) return '選擇日期';
    const [year, month, day] = this.value.split('-');
    return `${year}/${month}/${day}`;
  }

  get today(): string {
    return this.toIso(new Date());
  }

  get viewLabel(): string {
    return `${this.view.getFullYear()}年${this.view.getMonth() + 1}月`;
  }

  get yearPageStart(): number {
    return Math.floor(this.view.getFullYear() / 10) * 10 - 1;
  }

  get displayedYears(): number[] {
    return Array.from({ length: 12 }, (_, index) => this.yearPageStart + index);
  }

  get yearPageLabel(): string {
    return `${this.yearPageStart + 1}–${this.yearPageStart + 10}年`;
  }

  get days(): CalendarDay[] {
    const year = this.view.getFullYear();
    const month = this.view.getMonth();
    const firstDay = new Date(year, month, 1);
    const firstVisibleDay = new Date(year, month, 1 - firstDay.getDay());

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(firstVisibleDay.getFullYear(), firstVisibleDay.getMonth(), firstVisibleDay.getDate() + index);
      const iso = this.toIso(date);
      return {
        key: iso,
        date: date.getDate(),
        iso,
        inCurrentMonth: date.getMonth() === month,
      };
    });
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(this.value);
    if (!match) return;
    const [, year, month, day] = match;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    if (this.toIso(parsed) === this.value) this.view = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) this.isOpen = false;
  }

  toggle(): void {
    if (this.isDisabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.panelMode = 'days';
    this.onTouched();
  }

  showMonthPicker(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.panelMode = 'months';
  }

  shiftPeriod(offset: number): void {
    if (this.panelMode === 'days') {
      this.view = new Date(this.view.getFullYear(), this.view.getMonth() + offset, 1);
    } else if (this.panelMode === 'months') {
      this.view = new Date(this.view.getFullYear() + offset, this.view.getMonth(), 1);
    } else {
      this.view = new Date(this.view.getFullYear() + offset * 10, this.view.getMonth(), 1);
    }
  }

  showYearPicker(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.panelMode = 'years';
  }

  chooseYear(year: number): void {
    this.view = new Date(year, this.view.getMonth(), 1);
    this.panelMode = 'months';
  }

  chooseMonth(month: number): void {
    this.view = new Date(this.view.getFullYear(), month - 1, 1);
    this.panelMode = 'days';
  }

  pick(iso: string): void {
    const [year, month] = iso.split('-').map(Number);
    this.view = new Date(year, month - 1, 1);
    this.value = iso;
    this.onChange(iso);
    this.onTouched();
    this.isOpen = false;
  }

  @HostListener('focusout', ['$event'])
  closeWhenFocusLeaves(event: FocusEvent): void {
    const nextFocus = event.relatedTarget;
    if (nextFocus instanceof Node && this.host.nativeElement.contains(nextFocus)) return;
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (!this.isOpen) return;
    const target = event.target;
    if (target instanceof Node && this.host.nativeElement.contains(target)) return;
    this.isOpen = false;
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.isOpen = false;
  }

  private toIso(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }
}
