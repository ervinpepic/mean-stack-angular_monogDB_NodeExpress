import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor() { }

 @Input() posts = [];
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

  ngOnInit() {
  }

}
