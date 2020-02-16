import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})

//
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpKlijent: HttpClient, private ruter: Router) { }

  getPosts() {
    this.httpKlijent.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
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
  getPost(id: string) {
    return this.httpKlijent.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id);
  }
  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }


  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.httpKlijent.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((risponsPodaci) => {
        const id = risponsPodaci.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.ruter.navigate(["/"]);
      });

  }
  updatePost(paramId: string, paramTitle: string, paramContent: string) {
    const postToUpdate: Post = { id: paramId, title: paramTitle, content: paramContent }
    this.httpKlijent.put('http://localhost:3000/api/posts/' + paramId, postToUpdate)
      .subscribe(rispons => {
        const aptejtovaniPost = [...this.posts];
        const oldPostIndex = aptejtovaniPost.findIndex(pst => pst.id === postToUpdate.id);
        aptejtovaniPost[oldPostIndex] = postToUpdate;
        this.posts = aptejtovaniPost;
        this.postsUpdated.next([...this.posts]);
        this.ruter.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.httpKlijent.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPost = this.posts.filter(filterPost => filterPost.id !== postId);
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }

}
