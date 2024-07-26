import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/*-------------*/
import { IComment } from '../../../../models/comment.model';
import { initialComment } from '../../../../constants/comment.initial';
/*-------------*/
import { RandomImageService } from '../../../services/random-image.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment: IComment = initialComment;

  imageLoaded = false;

  constructor(
    private randomImageService: RandomImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.comment.image) return;

    this.randomImageService.fetchImage('food').subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.comment.image = this.sanitizer.bypassSecurityTrustUrl(url);
      },

      error: (error) => {
        console.error('Error fetching image:', error);
      },
    });
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
