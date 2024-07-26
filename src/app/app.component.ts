import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { IData } from '../models/data.model';
import { RandomImageService } from './services/random-image.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-task-vodafone';

  constructor(
    private dataService: DataService,
    private randomImageService: RandomImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getCurrentUser(): IData {
    return this.dataService.currentActiveUser;
  }

  userSelected(userId: number) {
    this.dataService.setCurrentUser(userId);
    this.dataService.getUserPosts(userId).subscribe();

    if (!this.getCurrentUser().user.image) {
      this.fetchUserImage();
    }
  }

  fetchUserImage() {
    if (this.getCurrentUser().user.image) return;

    this.randomImageService.fetchImage('wildlife').subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.getCurrentUser().user.image =
          this.sanitizer.bypassSecurityTrustUrl(url);
      },

      error: (error) => {
        console.error('Error fetching image:', error);
      },
    });
  }
}
