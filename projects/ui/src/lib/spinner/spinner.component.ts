import { Component, Input } from '@angular/core';

@Component({
  selector: 'noah-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class NoahSpinnerComponent {
  @Input() label = '讀取中';
}
