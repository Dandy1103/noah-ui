import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, signal } from '@angular/core';
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
})
export class NoahSelectComponent implements OnDestroy {
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

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly menuState: NoahMenuStateService,
  ) {}

  get currentLabel(): string {
    return this.options.find((option) => option.value === this.value)?.label ?? this.placeholder;
  }

  toggle(): void {
    if (this.open()) {
      this.closeMenu();
      return;
    }
    this.menuState.open(this, () => this.open.set(false));
    this.open.set(true);
  }

  choose(value: string): void {
    this.valueChange.emit(value);
    this.closeMenu();
  }

  ngOnDestroy(): void {
    this.closeMenu();
  }

  private closeMenu(): void {
    this.open.set(false);
    this.menuState.close(this);
  }

  @HostListener('document:click', ['$event'])
  closeFromOutside(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof Node) || this.host.nativeElement.contains(target)) return;
    this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  closeFromKeyboard(): void {
    this.closeMenu();
  }
}
