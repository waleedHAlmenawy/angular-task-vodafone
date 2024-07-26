import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { RandomImageService } from '../../services/random-image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IPost } from '../../../models/post.model';
import { initialPost } from '../../../constants/post.initial';
import { DataService } from '../../services/data.service';
import { IData } from '../../../models/data.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(200, style({ opacity: 1 }))]),
      transition(':leave', [animate(200, style({ opacity: 0 }))]),
    ]),
    trigger('scaleInOut', [
      state('void', style({ transform: 'scale(0.9)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'scale(0.9)' })),
      ]),
    ]),
  ],
})
export class PostComponent {
  @Input() post: IPost = initialPost;

  showComments = false;
  isCommentsLoading = false;

  constructor(
    private dataService: DataService,
    private randomImageService: RandomImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.post.image) return;

    this.randomImageService.fetchImage('nature').subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.post.image = this.sanitizer.bypassSecurityTrustUrl(url);
      },

      error: (error) => {
        console.error('Error fetching image:', error);
      },
    });
  }

  getCurrentUser(): IData {
    return this.dataService.currentActiveUser;
  }

  toggleComments() {
    this.showComments = !this.showComments;

    if (!this.post.comments.length) {
      this.isCommentsLoading = true;
      this.dataService
        .getPostComments(this.getCurrentUser().user.id, this.post.id)
        .subscribe({
          complete: () => (this.isCommentsLoading = false),
        });
    }
  }
}
