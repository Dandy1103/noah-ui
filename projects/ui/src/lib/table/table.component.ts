import { booleanAttribute, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NoahPagerComponent } from '../pager/pager.component';

@Component({
  selector: 'noah-table',
  standalone: true,
  imports: [NoahPagerComponent],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'u-min-w-0' },
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class NoahTableComponent {
  @Input() variant: 'default' | 'list' = 'default';
  @Input({ transform: booleanAttribute }) pager = false;
  @Input() page = 1;
  @Input() pageCount = 1;
  @Output() readonly pageChange = new EventEmitter<number>();
}
