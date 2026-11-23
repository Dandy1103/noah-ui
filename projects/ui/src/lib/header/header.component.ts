import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

export interface NoahHeaderAction {
  label: string;
  href: string;
  method?: 'post';
}

@Component({
  selector: 'noah-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class NoahHeaderComponent {
  @Input() userName = '';
  @Input() homeHref = '/';
  @Input() actions: readonly NoahHeaderAction[] = [];
  @Output() submitted = new EventEmitter<SubmitEvent>();

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
