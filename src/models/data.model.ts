import { IComment } from './comment.model';
import { IPost } from './post.model';
import { IUser } from './user.model';

export interface IData {
  user: IUser;
  isActive: boolean;
}
