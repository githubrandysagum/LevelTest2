import { Component, OnInit } from '@angular/core';
import {Post } from '../philgo-api/v2/post';
import { MemberService } from '../philgo-api/v2/member';
import { PAGE_DATA, POSTS, POST_DATA, POST_RESPONSE } from '../philgo-api/v2/philgo-api-interface';



@Component({
  selector: 'app-forum-create',
  templateUrl: './forum-create.component.html',
  styleUrls: ['./forum-create.component.sass']
})


export class ForumCreateComponent implements OnInit {

  form = <POST_DATA>{};
  constructor(private post: Post, private member : MemberService) { }

  ngOnInit() {
  }

  onClickCreatePost(){
     
      this.post.create(this.form, post_response =>{
          console.log(post_response)
      }, error =>{
          console.log(error);
      });

  }
}
