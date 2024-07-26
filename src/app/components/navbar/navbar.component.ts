import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() onSelect = new EventEmitter<number>();

  isExpanded = 'false';
  users: IUser[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
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
  }
}
