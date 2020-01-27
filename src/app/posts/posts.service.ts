import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})

//
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpKlijent: HttpClient) { }

  getPosts() {
    this.httpKlijent.get<{ message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postPodaci) => {
      return postPodaci.posts.map(singlePost => {
        return {
          title: singlePost.title,
          content: singlePost.content,
          id: singlePost._id
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.httpKlijent.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe((risponsPodaci) => {
      console.log(risponsPodaci.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }

}
