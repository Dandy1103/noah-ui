import { Component, Input } from '@angular/core';

export interface NoahTableDetailAttachment {
  name: string;
  url: string;
}

@Component({
  selector: 'noah-table-detail-content',
  standalone: true,
  template: `
    <h3>{{ bodyLabel }}</h3>
    <p class="noah-table-detail__body">{{ body }}</p>
    @if (attachments?.length) {
      <section class="noah-prose">
        <h3>{{ attachmentsLabel }}</h3>
        <ul>
          @for (attachment of attachments; track attachment.url) {
            <li><a [href]="attachment.url" [attr.download]="attachment.name">{{ attachment.name }}</a></li>
          }
        </ul>
      </section>
    }
    <ng-content />
  `,
})
export class NoahTableDetailContentComponent {
  @Input({ required: true }) body!: string;
  @Input() bodyLabel = '內文';
  @Input() attachments: NoahTableDetailAttachment[] | null | undefined;
  @Input() attachmentsLabel = '附件';
}
