import { SafeUrl } from '@angular/platform-browser';

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  image: SafeUrl | null;
}
