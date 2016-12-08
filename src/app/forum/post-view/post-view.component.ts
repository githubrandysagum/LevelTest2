import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';
import { SessionService } from '../../services/session.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
  inputs : ['post'],
  outputs : ['deleted']
 
})
export class PostViewComponent  implements  AfterViewInit {
 
 creatingComment = false;
  post : POST_DATA;
  deleted = new EventEmitter();
 showComments = false;
 writeComment = "";

@ViewChild(CommentListComponent)
  private commentListChild : CommentListComponent;

  constructor(
    private postservice : Post,
    private session : SessionService,
    private router : Router,
   
  ) {
       this.session.setBackRoute("forums/posts");
   }

  ngAfterViewInit() {
    
  }

  onClickShowComment(){

    
    if(this.showComments) this.showComments = false;
    else this.showComments = true;
  }

  onClickEditPost(){
    this.router.navigate(['/forums/post']);
    this.session.setBackRoute('forums/postview');
  }

  onClickDeletePost(idx){
    this.postservice.delete(idx, response=>{
        this.deleted.emit(idx);
    }, e =>{
        alert('Error on deleting:' + e);
    })
  }

 
onEnterWriteComment($event){
     if(typeof(this.post['comments']) == "undefined") this.post['comments'] = [];
    if(!($event.key == "Enter")) return;
     this.creatingComment = true;
        let c = <POST_DATA> {};
        c.idx_parent = this.post.idx;
        c.idx = "";
        c.subject = "Subject";
        c.content = this.writeComment;
        this.postservice.createComment( c, data => {   

            console.log("Response",data);
           
            this.post['comments'].push(data.post); 
            this.showComments = true;
            this.commentListChild.showMore = true;
            this.commentListChild.refreshDisplayComments(true);
           
            this.creatingComment = false;
            this.writeComment = "";

        }, error => {
           this.creatingComment = false;
           this.writeComment = "";
            console.error("Comment update error: " + error );
            alert("There is an error on updating your comment! Philgo says:" + error );
        })
  

  }

 

 
}
