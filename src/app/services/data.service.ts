import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*-------------*/
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
/*-------------*/
import { initialData } from '../../constants/data.initial';
import { IComment } from '../../models/comment.model';
import { IData } from '../../models/data.model';
import { IPost } from '../../models/post.model';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

  public cache = new Map<number, IData>();
  public currentActiveUser: IData = initialData;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const cachedUsers = this.cache.size;
    if (cachedUsers) {
      return of(cachedUsers);
    }

    return this.http.get<IUser[]>(this.usersUrl).pipe(
      tap((data) => {
        data.forEach((e) => {
          e.posts = [];

          this.cache.set(e.id, {
            user: e,
            isActive: false,
          });
        });
      }),
      catchError(this.handleError<any[]>('getUsers', []))
    );
  }

  getUserPosts(userId: number): Observable<any> {
    const url = `${this.postsUrl}?userId=${userId}`;
    const cachedPosts = this.cache.get(userId);

    if (cachedPosts?.user.posts.length) {
      return of(cachedPosts);
    }

    return this.http.get<IPost[]>(url).pipe(
      tap((data) => {
        const temp = this.cache.get(userId);

        if (temp) {
          temp.user.posts = data.map((post) => ({ ...post, comments: [] }));
        }
      }),
      catchError(this.handleError<any[]>('getUserPosts', []))
    );
  }

  getPostComments(post: IPost): Observable<any> {
    const url = `${this.commentsUrl}?postId=${post.id}`;
    const cachedComments = post?.comments;

    if (cachedComments?.length) {
      return of(cachedComments);
    }

    return this.http.get<IComment[]>(url).pipe(
      tap((data) => {
        if (post) post.comments = data;
      }),
      catchError(this.handleError<any[]>('getPostComments', []))
    );
  }

  setCurrentUser(userId: number) {
    const temp = this.cache.get(userId);

    if (temp) {
      this.currentActiveUser.isActive = false;
      temp.isActive = true;
      this.currentActiveUser = temp;
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
