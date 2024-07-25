import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isExpanded = 'false';

  onOpenMenu() {
    this.isExpanded = 'true';
  }

  onCloseMenu() {
    this.isExpanded = 'false';
  }
}
