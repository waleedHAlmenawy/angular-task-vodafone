import { Component, EventEmitter, OnInit, Output } from '@angular/core';
/*-------------*/
import { IData } from '../../../models/data.model';
/*-------------*/
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() onSelect = new EventEmitter<number>();
  @Output() onCompeleteFetching = new EventEmitter<any>();

  isUsersLoading = false;
  isExpanded = 'false';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.isUsersLoading = true;

    this.dataService.getUsers().subscribe({
      next: (data) => {
        /**!SECTION
         * Emits an event to the parent component (app.component).
         * with the fetch data state if it was successfully fetched or not.
         */

        if (data.length) {
          this.onCompeleteFetching.emit(true);
        } else {
          this.onCompeleteFetching.emit(false);
        }
      },
      complete: () => (this.isUsersLoading = false),
    });
  }

  onOpenMenu() {
    this.isExpanded = 'true';
  }

  onCloseMenu() {
    this.isExpanded = 'false';
  }

  /**
   * Emits an event to the parent component (app.component).
   * with the select user id to fetch his posts.
   *
   * @param userId
   */

  onSelectUser(userId: number) {
    this.onSelect.emit(userId);
    this.onCloseMenu();
  }

  getCurrentUser(): IData {
    return this.dataService.currentActiveUser;
  }

  getAllUsers() {
    return this.dataService.cache;
  }
}
