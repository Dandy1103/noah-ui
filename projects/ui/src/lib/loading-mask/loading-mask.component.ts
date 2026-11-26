import { Component, Input } from '@angular/core';

@Component({
  selector: 'noah-loading-mask',
  standalone: true,
  templateUrl: './loading-mask.component.html',
  styleUrl: './loading-mask.component.scss',
})
export class NoahLoadingMaskComponent {
  @Input() label = '加載中...';
  @Input() phase: 'hidden' | 'visible' | 'leaving' = 'visible';
  @Input() fadeDuration = '150ms';

  get showsDots(): boolean {
    return this.label.endsWith('...');
  }

  get caption(): string {
    return this.showsDots ? this.label.slice(0, -3) : this.label;
  }
}
