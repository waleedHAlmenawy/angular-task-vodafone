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
        if (data.length) {
          this.onCompeleteFetching.emit(true);
        } else {
          this.onCompeleteFetching.emit(false);
        }
      },
      complete: () => {
        this.isUsersLoading = false;
      },
    });
  }

  onOpenMenu() {
    this.isExpanded = 'true';
  }

  onCloseMenu() {
    this.isExpanded = 'false';
  }

  onSelectUser(userId: number) {
    this.onSelect.emit(userId);
    this.isExpanded = 'false';
  }

  getCurrentUser(): IData {
    return this.dataService.currentActiveUser;
  }

  getAllUsers() {
    return this.dataService.cache;
  }
}
