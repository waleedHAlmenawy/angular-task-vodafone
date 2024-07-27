import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockUsers } from '../../mock/users.mock';
import { mockPosts } from '../../mock/posts.mock';
import { mockComments } from '../../mock/comments.mock';
import { IPost } from '../../models/post.model';

describe('DataService', () => {
  let data: DataService;
  let testController: HttpTestingController;
  const url = 'https://jsonplaceholder.typicode.com/';
  const userId = 1;
  const postId = 1;
  const post = {
    userId: userId,
    id: postId,
    title: 'Post Title 1',
    body: 'Post body content 1',
    image: '',
    comments: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    data = TestBed.inject(DataService);
    testController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    testController.verify();
  });

  it('data service should be created', () => {
    expect(data).toBeTruthy();
  });

  it('data service should get all users and cache them', () => {
    data.getUsers().subscribe({
      next: (users: any) => {
        expect(users).toBeTruthy();
        expect(users.length).toBe(5);

        const user = users.find((user: any) => user.id == 1);
        expect(user.name).toBe('Leanne Graham');
      },

      complete: () => {
        expect(data.cache.size).toBe(5);
      },
    });

    const mockReq = testController.expectOne(url + 'users');
    mockReq.flush(Object.values(mockUsers));
  });

  it('data service should get all posts made by a specific user and cache them', () => {
    data.getUsers().subscribe({
      complete: () => {
        data.getUserPosts(userId).subscribe({
          next: (posts: any) => {
            expect(posts).toBeTruthy();
            expect(posts.length).toBe(1);

            const post = posts.find((post: any) => post.userId == userId);
            expect(post.title).toBe('Post Title ' + userId);
          },

          complete: () => {
            expect(data.cache.get(userId)?.user.posts.length).toBe(1);
          },
        });

        const mockPostsReq = testController.expectOne(
          url + 'posts?userId=' + userId
        );

        mockPostsReq.flush(
          Object.values(mockPosts.filter((post) => post.userId == userId))
        );
      },
    });

    const mockUsersReq = testController.expectOne(url + 'users');
    mockUsersReq.flush(Object.values(mockUsers));
  });

  it('data service should get all comments for a specific post and cache them', () => {
    data.getUsers().subscribe({
      complete: () => {
        data.getUserPosts(userId).subscribe({
          complete: () => {
            data
              .getPostComments(userId, data.cache.get(userId)!.user.posts[0])
              .subscribe({
                next: (comments) => {
                  expect(comments).toBeTruthy();
                  expect(comments.length).toBe(5);

                  const comment = comments.find(
                    (comment: any) => comment.postId == postId
                  );

                  expect(comment.body).toBe('Comment body content 1');
                },
                complete: () => {
                  console.log(data.cache.get(userId));
                  expect(
                    data.cache.get(userId)?.user.posts[0].comments.length
                  ).toBe(5);
                },
              });

            const mockCommentsReq = testController.expectOne(
              url + 'comments?postId=' + postId
            );

            mockCommentsReq.flush(
              Object.values(
                mockComments.filter((comment) => comment.postId == postId)
              )
            );
          },
        });

        const mockPostsReq = testController.expectOne(
          url + 'posts?userId=' + userId
        );
        mockPostsReq.flush(
          Object.values(mockPosts.filter((post) => post.userId == userId))
        );
      },
    });

    const mockUsersReq = testController.expectOne(url + 'users');
    mockUsersReq.flush(Object.values(mockUsers));
  });

  it('data service should get data once and not make another request', () => {
    const tempPost = { ...post };

    data.getUsers().subscribe();
    data.getUserPosts(userId).subscribe();
    data.getPostComments(userId, tempPost).subscribe();

    const mockUsersReq = testController.expectOne(url + 'users');
    const mockPostsReq = testController.expectOne(
      url + 'posts?userId=' + userId
    );
    const mockCommentsReq = testController.expectOne(
      url + 'comments?postId=' + postId
    );

    mockUsersReq.flush(Object.values(mockUsers));
    mockPostsReq.flush(
      Object.values(mockPosts.filter((post) => post.userId == userId))
    );
    mockCommentsReq.flush(
      Object.values(mockComments.filter((comment) => comment.postId == postId))
    );

    data.getUsers().subscribe();
    data.getUserPosts(userId).subscribe();
    data.getPostComments(userId, tempPost).subscribe();

    testController.expectNone(url + 'users');
    testController.expectNone(url + 'posts?userId=' + userId);
    testController.expectNone(url + 'comments?postId=' + postId);
  });

  it('data service should handle errors', () => {
    data.getUsers().subscribe({
      next: (users: any) => {
        expect(users).toBeTruthy();
        expect(users.length).toBe(0);
      },

      complete: () => {
        expect(data.cache.size).toBe(0);
      },
    });

    const mockReq = testController.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    mockReq.flush('', { status: 404, statusText: 'error' });
  });
});
