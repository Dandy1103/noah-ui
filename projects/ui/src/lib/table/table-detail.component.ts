import { Component, Input, numberAttribute, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tr[noahTableDetail]',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'noah-table-detail' },
  template: `<td [attr.colspan]="colspan"><ng-content /></td>`,
  styleUrl: './table-detail.component.scss',
})
export class NoahTableDetailComponent {
  @Input({ required: true, transform: numberAttribute }) colspan!: number;
}
