import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        // :enter is alias to 'void => *'
        animate(200, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(200, style({ opacity: 0 })),
      ]),
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
  showComments = false;

  toggleComments() {
    this.showComments = !this.showComments;
  }
}
