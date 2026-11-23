import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NoahSidebarSection {
  title: string;
  links: readonly { label: string; path: string; exact?: boolean }[];
}

@Component({
  selector: 'noah-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class NoahSidebarComponent {
  @Input({ required: true }) sections: readonly NoahSidebarSection[] = [];
}
