import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-info-component',
  templateUrl: './info.component.html',
})

export class InfoContentComponent {
  @HostBinding('class')
  public hostClass = 'hidden';

  private skipClick = false;

  constructor() {}

  @HostListener('click', ['$event'])
  hostClick(event: Event) {
    event.stopPropagation();
  }

  show() {
    this.hostClass = '';
    this.skipClick = true;
  }

  @HostListener('window:click')
  hide() {
    if (this.skipClick) {
      this.skipClick = false;
      return;
    }
    this.hostClass = 'hidden';
  }
}
