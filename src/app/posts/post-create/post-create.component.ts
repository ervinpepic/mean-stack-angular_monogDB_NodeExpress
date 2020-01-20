import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost() {
    const postCreate: Post = { title: this.enteredTitle, content: this.enteredContent };
    console.log('Post Added');
    this.postCreated.emit(postCreate);
  }

}
