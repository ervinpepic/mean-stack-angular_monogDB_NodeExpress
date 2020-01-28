import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(public postService: PostsService) { }
  posts: Post[] = [];
  private postSbuscription: Subscription;

  ngOnInit() {
    this.postService.getPosts();
    this.postSbuscription = this.postService.getPostsUpdatedListener().subscribe((prikupljeniPostovi: Post[]) => {
      this.posts = prikupljeniPostovi;
    });
  }

  ngOnDestroy() {
    this.postSbuscription.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  //   posts = [
  //   {
  //     title: 'Naslov 1',
  //     content: 'Sadrzaj 1'
  //   },
  //   {
  //     title: 'Naslov 2',
  //     content: 'Sadrzaj 2',
  //   },
  //   {
  //     title: 'Naslov 3',
  //     content: 'Sadrzaj 3'
  //   }
  // ];


}
