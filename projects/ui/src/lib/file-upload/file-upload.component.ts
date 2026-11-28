import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

export interface NoahFileUploadItem {
  name: string;
  displayName?: string;
}

let nextUploadId = 0;

@Component({
  selector: 'noah-file-upload',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class NoahFileUploadComponent<T extends NoahFileUploadItem = NoahFileUploadItem> {
  @Input() label = '';
  @Input() title = '選擇附件';
  @Input() hint = '可一次選擇多個檔案';
  @Input() accept = '';
  @Input({ transform: booleanAttribute }) multiple = true;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() files: readonly T[] = [];
  @Input() editingFile: T | null = null;
  @Input() fileNameEditor: TemplateRef<{ $implicit: T }> | null = null;
  @Input() fileActions: TemplateRef<{ $implicit: T; editing: boolean }> | null = null;
  @Output() readonly filesSelected = new EventEmitter<File[]>();
  @Output() readonly remove = new EventEmitter<number>();
  readonly inputId = `noah-file-upload-${++nextUploadId}`;

  onPick(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    input.value = '';
    if (!files.length) return;
    this.filesSelected.emit(files);
  }
}
