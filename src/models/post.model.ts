import { SafeUrl } from '@angular/platform-browser';
import { IComment } from './comment.model';

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  image: SafeUrl | null;
  comments: IComment[];
}
