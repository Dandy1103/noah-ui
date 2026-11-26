import { Component, ElementRef, HostListener, forwardRef, inject } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

interface CalendarDay {
  key: string;
  date: number | null;
  iso: string;
}

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

  readonly weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  value = '';
  isOpen = false;
  isDisabled = false;
  view = new Date();

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  get shownValue(): string {
    if (!this.value) return '選擇日期';
    const [year, month, day] = this.value.split('-');
    return `${year}/${month}/${day}`;
  }

  get viewLabel(): string {
    return `${this.view.getFullYear()}年${this.view.getMonth() + 1}月`;
  }

  get today(): string {
    return this.toIso(new Date());
  }

  get days(): CalendarDay[] {
    const year = this.view.getFullYear();
    const month = this.view.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const dayCount = new Date(year, month + 1, 0).getDate();
    const days: CalendarDay[] = [];

    for (let index = 0; index < firstWeekday; index += 1) {
      days.push({ key: `empty-${index}`, date: null, iso: '' });
    }
    for (let date = 1; date <= dayCount; date += 1) {
      const iso = this.toIso(new Date(year, month, date));
      days.push({ key: iso, date, iso });
    }
    return days;
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
    this.onTouched();
  }

  shiftMonth(offset: number): void {
    this.view = new Date(this.view.getFullYear(), this.view.getMonth() + offset, 1);
  }

  pick(iso: string): void {
    this.value = iso;
    this.onChange(iso);
    this.onTouched();
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
