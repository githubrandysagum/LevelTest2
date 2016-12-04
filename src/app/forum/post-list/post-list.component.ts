import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Post } from '../../services/philgo-api/v2/post';

import { MemberService } from '../../services/philgo-api/v2/member';
import { PAGE_DATA, POSTS, POST_DATA, POST_RESPONSE } from '../../services/philgo-api/v2/philgo-api-interface';
import { SessionService } from '../../services/session.service';
import { HTMLCHARPipe } from '../../pipes/htmlchar.pipe';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  showComments = "";
  postId : string;
  posts =  <POSTS>{};
  isEdit = "";
  constructor(
    private post: Post,
    private member : MemberService,
    private route : ActivatedRoute,
    private router : Router
   
    ) {
          this.postId = localStorage.getItem('forums_postID'); 
          this.loadPosts(this.postId);
     }

  ngOnInit() {
  }



  onClickAddPost(){
    this.router.navigate(['/forums/post']);
    localStorage.setItem("forums_postIDX", '');
  }

  onClickEdit(idx){
     this.router.navigate(['/forums/post']);   
     localStorage.setItem("forums_postIDX", idx);
  }

  onClickDeletePost(idx){
     if(confirm("Are you sure to delete this Post"))
     {
        this.post.delete(idx, response =>{
            console.log("Success delete post" + response);
            this.loadPosts(this.postId);
            
        }, error =>{
            console.log("Error on deleting post" + error)
        });
     }
  }

  onClickAddComment($event){
    console.log("From Post Parent Add Comment result: ",$event);
    this.showComments = $event;
    this.loadPosts(this.postId);
  }

  

  edit(idx){
    if(this.isEdit == idx) return "hasvalue"; 
    return "";
  }


  loadPosts(postID : string){
    let data = <PAGE_DATA>{
        post_id:  postID , 
        page_no: 1,
        limit: 10
    };
     this.post.page(data, response =>{
        this.posts = response;

        console.log("Post structured",this.posts);
      
     }, error =>{
        console.log(error);
     });

  }

  onClickViewPost(postidx){

      localStorage.setItem('forums_postIDX', postidx);
      this.router.navigate(['/forums/postview'])
  }

}
