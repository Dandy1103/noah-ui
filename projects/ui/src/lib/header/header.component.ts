import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'noah-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class NoahHeaderComponent {
  @Input() productName = '';
  @Input() homeHref = '/';
  @Input() userName = '';
  @Input() passwordHref = '/auth/change-password';
  @Input() linkLabel = '';
  @Input() linkHref = '';
  @Input() showLogout = true;

  logoutAction = '/auth/logout';

  @ViewChild('account') account?: ElementRef<HTMLElement>;

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeMenuOnOutsideClick(event: MouseEvent): void {
    if (!this.isMenuOpen) {
      return;
    }
    const target = event.target;
    const account = this.account?.nativeElement;
    if (target instanceof Node && account?.contains(target)) {
      return;
    }
    this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  closeMenuOnEscape(): void {
    this.closeMenu();
  }
}
