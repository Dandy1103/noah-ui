import { AfterViewInit, Component, DestroyRef, ElementRef, HostListener, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild, inject, signal } from '@angular/core';
import { applyNav, CatalogGroup, fallbackGroups, loadCatalog, NavCatalog, NavGroup } from './nav-catalog';

export type { CatalogGroup, NavCatalog } from './nav-catalog';

@Component({
  selector: 'noah-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NoahNavbarComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() repo = '';
  @Input() fallbackLabel = '';
  @Input() preview: CatalogGroup[] | null = null;
  @Input() revision = 0;

  currentLabel = '';
  readonly opened = signal<string | null>(null);
  readonly moreOpen = signal(false);
  readonly visibleCount = signal(20);
  groups: NavGroup[] = [];

  private saved: NavCatalog | null = null;
  private observer?: ResizeObserver;
  private closeTimer = 0;
  private readonly loadAbort = new AbortController();
  private readonly zone = inject(NgZone);

  @ViewChild('bar') private bar?: ElementRef<HTMLElement>;
  @ViewChild('measure') private measureRow?: ElementRef<HTMLElement>;
  @ViewChild('more') private more?: ElementRef<HTMLElement>;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.loadAbort.abort();
      this.observer?.disconnect();
      window.clearTimeout(this.closeTimer);
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const revision = changes['revision'];
    if (revision && !revision.firstChange) {
      this.fetch();
      return;
    }
    if (changes['preview']) this.showSaved();
  }

  ngAfterViewInit(): void {
    this.measure();
    const bar = this.bar?.nativeElement;
    if (!bar) return;
    this.observer = new ResizeObserver(() => this.zone.run(() => this.measure()));
    this.observer.observe(bar);
  }

  open(label: string): void {
    this.cancelHide();
    this.opened.set(label);
  }

  openFromBar(label: string): void {
    this.cancelHide();
    this.moreOpen.set(false);
    this.opened.set(label);
  }

  cancelHide(): void {
    window.clearTimeout(this.closeTimer);
  }

  scheduleHide(): void {
    window.clearTimeout(this.closeTimer);
    this.closeTimer = window.setTimeout(() => this.hide(), 120);
  }

  toggleMore(): void {
    this.moreOpen.update((open) => !open);
    this.opened.set(null);
  }

  overflowCurrent(): boolean {
    return this.groups.slice(this.visibleCount()).some((group) => group.label === this.currentLabel);
  }

  @HostListener('document:click', ['$event'])
  closeMoreFromOutside(event: MouseEvent): void {
    if (!this.moreOpen()) return;
    const root = this.more?.nativeElement;
    const target = event.target;
    if (root && target instanceof Node && root.contains(target)) return;
    this.moreOpen.set(false);
    this.opened.set(null);
  }

  @HostListener('document:keydown.escape')
  closeMoreFromKeyboard(): void {
    this.moreOpen.set(false);
    this.hide();
  }

  close(event: FocusEvent): void {
    const next = event.relatedTarget;
    const current = event.currentTarget;
    if (next instanceof Node && current instanceof Node && current.contains(next)) return;
    this.opened.set(null);
  }

  hide(): void {
    window.clearTimeout(this.closeTimer);
    this.opened.set(null);
  }

  private fetch(): void {
    if (this.preview && this.saved) {
      this.showSaved();
      return;
    }
    void loadCatalog(this.loadAbort.signal).then((catalog) => {
      if (this.preview) return;
      if (!catalog) {
        if (!this.saved) this.useCatalog(null);
        return;
      }
      this.saved = catalog;
      this.showSaved();
    });
  }

  private showSaved(): void {
    if (!this.saved) return;
    const groups = this.preview ?? this.saved.groups;
    this.useCatalog({ ...this.saved, groups });
  }

  private useCatalog(catalog: NavCatalog | null): void {
    if (!catalog) {
      this.groups = fallbackGroups(this.repo);
      this.currentLabel = this.fallbackLabel;
      requestAnimationFrame(() => this.measure());
      return;
    }
    this.groups = applyNav(catalog, this.repo);
    const mine = catalog.groups.find((group) => group.app === this.repo);
    const named = catalog.systems.find((system) => system.repo === mine?.app);
    if (mine) this.currentLabel = named?.name || mine.label;
    requestAnimationFrame(() => this.measure());
  }

  private measure(): void {
    const bar = this.bar?.nativeElement;
    const measure = this.measureRow?.nativeElement;
    if (!bar || !measure) return;
    const probes = Array.from(measure.querySelectorAll<HTMLElement>('[data-item]'));
    const more = measure.querySelector<HTMLElement>('[data-more]');
    if (!probes.length || !more) {
      this.visibleCount.set(this.groups.length);
      return;
    }
    const style = getComputedStyle(bar);
    const available = bar.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const gap = 4;
    const widths = probes.map((probe) => probe.offsetWidth);
    const total = widths.reduce((sum, width) => sum + width, 0) + gap * Math.max(widths.length - 1, 0);
    if (total <= available) {
      this.visibleCount.set(widths.length);
      return;
    }
    const budget = available - more.offsetWidth - gap;
    let used = 0;
    let count = 0;
    for (const width of widths) {
      const next = used + width + (count > 0 ? gap : 0);
      if (next > budget) break;
      used = next;
      count += 1;
    }
    this.visibleCount.set(count);
  }
}
