import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/*-------------*/
import { IData } from '../models/data.model';
/*-------------*/
import { DataService } from './services/data.service';
import { RandomImageService } from './services/random-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-task-vodafone';
  isPostsLoading = false;
  message = '';

  constructor(
    private dataService: DataService,
    private randomImageService: RandomImageService,
    private sanitizer: DomSanitizer
  ) {}

  getCurrentUser(): IData {
    return this.dataService.currentActiveUser;
  }

  userSelected(userId: number) {
    this.isPostsLoading = true;
    this.dataService.setCurrentUser(userId);
    this.dataService.getUserPosts(userId).subscribe({
      next: (data) => {
        if (!data.length)
          this.message =
            'Sorry no posts to show from ' +
            this.getCurrentUser().user.username;
      },
      complete: () => (this.isPostsLoading = false),
    });

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

  fetchedData(isSucceeded: boolean) {
    if (isSucceeded) {
      this.message =
        'Please select a username from the navbar to view their posts';
    } else {
      this.message = 'Sorry unexpected error happened';
    }
  }
}
