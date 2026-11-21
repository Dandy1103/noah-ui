import { Component, Input } from '@angular/core';

export interface NavbarItem {
  label: string;
  icon: string;
  href: string;
}

@Component({
  selector: 'noah-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NoahNavbarComponent {
  @Input() items: NavbarItem[] = [
    { label: '首頁', icon: 'home', href: '/' },
    { label: '設定', icon: 'settings', href: '/settings' },
    { label: '幫助', icon: 'help', href: '/help' },
  ];
  activeItem: NavbarItem | null = null;

  setActiveItem(item: NavbarItem) {
    this.activeItem = item;
  }

}
