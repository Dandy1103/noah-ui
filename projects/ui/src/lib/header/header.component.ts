import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'noah-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class NoahHeaderComponent {
  @Input() userName = '';

  @ViewChild('account') account?: ElementRef<HTMLElement>;

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  link(path: string): string {
    const host = location.hostname;
    const local = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
    if (local && (location.port === '4200' || location.port === '3000')) return path;
    if (host === 'noahportal.dandy-cheng.com') return path;
    const origin = local ? 'http://localhost:4200' : 'https://noahportal.dandy-cheng.com';
    return `${origin}${path}`;
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
