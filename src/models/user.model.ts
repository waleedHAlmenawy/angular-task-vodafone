import { SafeUrl } from '@angular/platform-browser';
import { IPost } from './post.model';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  image: SafeUrl | null;
  website: string;
  address: null;
  company: null;
  posts: IPost[];
}
