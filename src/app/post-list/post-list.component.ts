import { Component, OnInit } from '@angular/core';
import {Post } from '../philgo-api/v2/post';
import { MemberService } from '../philgo-api/v2/member';
import { PAGE_DATA, POSTS, POST_DATA, POST_RESPONSE } from '../philgo-api/v2/philgo-api-interface';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  posts =  <POSTS>{};

  constructor(
    private post: Post,
    private member : MemberService,
    private session : SessionService
    ) {
        this.session.login = member.getLoginData();
        this.loadPosts();
     }

  ngOnInit() {
  }


  loadPosts(){
    let data = <PAGE_DATA>{
        post_id: "QnA",
        page_no: 1,
        limit: 10
    };
     this.post.page(data, response =>{
        this.posts = response;
     }, error =>{
        console.log(error);
     });

  }


}
