import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';

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
})
export class NoahSelectComponent {
  @Input() label = '';
  @Input() errorMessage = '';
  @Input() placeholder = '請選擇';
  @Input() value = '';
  @Input() options: readonly NoahSelectOption[] = [];
  @Output() readonly valueChange = new EventEmitter<string>();

  readonly controlId = `noah-select-${nextId++}`;
  readonly labelId = `${this.controlId}-label`;
  readonly valueId = `${this.controlId}-value`;
  readonly errorId = `${this.controlId}-error`;
  readonly open = signal(false);

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  get currentLabel(): string {
    return this.options.find((option) => option.value === this.value)?.label ?? this.placeholder;
  }

  toggle(): void {
    this.open.update((open) => !open);
  }

  choose(value: string): void {
    this.valueChange.emit(value);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  closeFromOutside(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof Node) || this.host.nativeElement.contains(target)) return;
    this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  closeFromKeyboard(): void {
    this.open.set(false);
  }
}
