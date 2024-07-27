import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/*-------------*/
import { initialPost } from '../../../constants/post.initial';
import { IData } from '../../../models/data.model';
import { IPost } from '../../../models/post.model';
/*-------------*/
import { DataService } from '../../services/data.service';
import { RandomImageService } from '../../services/random-image.service';

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
  ],
})
export class PostComponent {
  @Input() post: IPost = initialPost;

  showComments = false;
  isCommentsLoading = false;
  imageLoaded = false;

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

    if (this.post.comments.length) return;

    this.isCommentsLoading = true;
    this.dataService
      .getPostComments(this.getCurrentUser().user.id, this.post)
      .subscribe({
        complete: () => (this.isCommentsLoading = false),
      });
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
