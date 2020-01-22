import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {

  constructor(public postServcie: PostsService) { }

  enteredTitle = '';
  enteredContent = '';

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postServcie.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
