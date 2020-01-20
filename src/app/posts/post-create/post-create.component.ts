import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',

})
export class PostCreateComponent {
  newPost = 'unesite tekst';
  entryData = '';
  onAddPost() {
    this.newPost = this.entryData;
    console.log('Post Added');
  }

}
