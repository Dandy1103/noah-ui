import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'noah-pager',
  standalone: true,
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss',
})
export class NoahPagerComponent {
  @Input() page = 1;
  @Input() pageCount = 1;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Output() readonly pageChange = new EventEmitter<number>();

  get pages(): number[] {
    const count = Math.max(1, Math.floor(this.pageCount) || 1);
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  get current(): number {
    const page = Math.floor(this.page) || 1;
    return Math.min(Math.max(page, 1), Math.max(1, Math.floor(this.pageCount) || 1));
  }

  get visible(): boolean {
    return this.pageCount >= 1;
  }

  go(page: number): void {
    if (this.disabled) return;
    if (page < 1 || page > this.pageCount || page === this.current) return;
    this.pageChange.emit(page);
  }

  shift(offset: number): void {
    this.go(this.current + offset);
  }
}
