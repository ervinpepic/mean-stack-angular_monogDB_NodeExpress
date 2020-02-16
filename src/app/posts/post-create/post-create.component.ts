import { Post } from './../post.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {

  constructor(
    public postServcie: PostsService,
    public activatedRoute: ActivatedRoute
  ) { }


  enteredTitle = '';
  enteredContent = '';
  singlePost: Post;
  isLoading = false;
  private formMode = 'create';
  private postId: string;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((parametriMape: ParamMap) => {
      if (parametriMape.has('postId')) {
        this.formMode = 'edit';
        this.postId = parametriMape.get('postId');
        this.isLoading = true;
        this.postServcie.getPost(this.postId).subscribe(postPodaci => {
          this.isLoading = false;
          this.singlePost = {id: postPodaci._id, title: postPodaci.title, content: postPodaci.content };
        });
      } else {
        this.formMode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.formMode == 'create') {
      this.postServcie.addPost(form.value.title, form.value.content);
    } else {
      this.postServcie.updatePost(this.postId, form.value.title, form.value.content);
    }
    
    form.resetForm();
  }

}
