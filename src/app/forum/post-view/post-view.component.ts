import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';
import { SessionService } from '../../services/session.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { CommentListComponent } from '../comment-list/comment-list.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PostCreateComponent } from '../post-create/post-create.component';

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
  isOwnByUser = false;
@ViewChild(CommentListComponent)
  private commentListChild : CommentListComponent;

  constructor(
    private postservice : Post,
    private session : SessionService,
    private router : Router,
    private modalService: NgbModal,

   
  ) {
      this.checkUser();
   }

checkUser(){

  setTimeout(()=>{
    if(this.session){
    if(this.session.login){
      this.isOwnByUser = this.session.login.id == this.post['member']['id'];
    }
  } 
  },2000);
  
}
  ngAfterViewInit() {
  }

 onClickEditPost(){
     let modalRef = this.modalService.open(PostCreateComponent);
         modalRef.componentInstance.member_id = this.session.login.id;
         modalRef.componentInstance.form.idx = this.post.idx;
         modalRef.componentInstance.form.content = this.post.content;
         modalRef.componentInstance.form.post_id = this.post.post_id;
         modalRef.componentInstance.form.subject = this.post.subject;
         

         modalRef.componentInstance.postUpdated.subscribe(post => {
                        this.post.content = post.content;
                        this.post.subject = post.subject;
                  });
  }


  onClickShowComment(){

    
    if(this.showComments) this.showComments = false;
    else this.showComments = true;
  }

  

  onClickDeletePost(idx){
    this.postservice.delete(idx, response=>{
        this.deleted.emit(idx);
    }, e =>{
        alert('Error on deleting:' + e);
    })
  }


onCommentDeleted($event){
  this.post.no_of_comment--;
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
            this.post.no_of_comment++;

        }, error => {
           this.creatingComment = false;
           this.writeComment = "";
            console.error("Comment update error: " + error );
            alert("There is an error on updating your comment! Philgo says:" + error );
        })
  

  }

 

 
}
