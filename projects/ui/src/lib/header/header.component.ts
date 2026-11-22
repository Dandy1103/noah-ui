import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'noah-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class NoahHeaderComponent implements OnInit {
  @Input() productName = '';
  @Input() homeHref = '/';
  @Input() homeLabel = '回首頁';
  @Input() userName = '';
  @Input() profileHref = '';
  @Input() permissionsHref = '';
  @Input() passwordHref = '';
  @Input() linkLabel = '';
  @Input() linkHref = '';
  @Input() showLogout = true;
  @Input() logoutAction = '';

  accountName = '';

  @ViewChild('account') account?: ElementRef<HTMLElement>;

  isMenuOpen = false;

  ngOnInit(): void {
    if (this.userName) return;
    void this.loadAccount();
  }

  shownName(): string {
    return this.userName || this.accountName;
  }

  authHref(given: string, path: string): string {
    return given || this.portalUrl(path);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  pageHref(page: 'profile' | 'permissions'): string {
    const given = page === 'profile' ? this.profileHref : this.permissionsHref;
    return given || this.portalUrl(`/${page}`);
  }

  private async loadAccount(): Promise<void> {
    try {
      const session = await fetch(this.portalUrl('/api/session'), { credentials: 'include' });
      if (!session.ok) return;
      const user = await session.json() as { displayName?: string };
      let name = user.displayName ?? '';
      const employee = await fetch(this.portalUrl('/api/me/employee'), { credentials: 'include' });
      if (employee.ok) {
        const profile = await employee.json() as { displayName?: string };
        if (profile.displayName) name = profile.displayName;
      }
      this.accountName = name;
    } catch {
      this.accountName = '';
    }
  }

  private portalUrl(path: string): string {
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
