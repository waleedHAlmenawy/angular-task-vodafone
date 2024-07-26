import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { IUser } from '../../../models/user.model';
import { IData } from '../../../models/data.model';

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

    setTimeout(() => {
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

        error: () => {
          console.log('error');
        },
      });
    }, 5000);
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
