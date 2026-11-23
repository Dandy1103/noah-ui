import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface NoahBreadcrumb {
  label: string;
  href?: string;
  route?: string;
}

@Component({
  selector: 'noah-page-heading',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-heading.component.html',
  styleUrl: './page-heading.component.scss',
})
export class NoahPageHeadingComponent {
  @Input({ required: true }) title = '';
  @Input() breadcrumbs: readonly NoahBreadcrumb[] = [];
}
