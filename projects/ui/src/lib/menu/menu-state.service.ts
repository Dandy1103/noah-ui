import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NoahMenuStateService {
  private activeMenu: { owner: object; close: () => void } | null = null;

  open(owner: object, close: () => void): void {
    if (this.activeMenu?.owner === owner) return;

    const previousMenu = this.activeMenu;
    this.activeMenu = { owner, close };
    previousMenu?.close();
  }

  close(owner: object): void {
    if (this.activeMenu?.owner === owner) this.activeMenu = null;
  }
}
