import { Component } from '@angular/core';
/*-------------*/
import { IData } from '../../../../models/data.model';
/*-------------*/
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent {
  imageLoaded = false;

  constructor(private dataService: DataService) {}

  getCurrentUser(): IData {
    return this.dataService.currentActiveUser;
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
