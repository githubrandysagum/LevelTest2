import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';
import { HTMLCHARPipe } from '../../pipes/htmlchar.pipe';
import { CommentModalComponent } from '../components/comment-modal/comment-modal.component';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss'],
  inputs : [ 'comment'],
  outputs : ['deleted']
 
})

export class CommentComponent implements OnInit {
 comment = {};
 deleted = new EventEmitter();
 deleting = "";
 isOwnByUser = false;
  constructor( 
    private modalService: NgbModal,
    private activeModal : NgbActiveModal,
    private postService : Post,
    private session : SessionService
  ) {

   

  }

  ngOnInit() { 
     this.checkUser();
  }

  checkUser(){
    if(this.session.login && this.comment){
     
        if(this.session.login['id'] == this.comment['member']['id']){
         // console.log(this.comment['member']['id']);
          this.isOwnByUser = true;
        }

    }

  }

  onClickEdit(){
    console.log('Editing this comment:', this.comment)
     let modalRef = this.modalService.open(CommentModalComponent);
            modalRef.componentInstance.comment = this.comment;
           
            modalRef.componentInstance.updateSave 
                    .subscribe(comment => {
                     this.comment = comment;          
                  });

  }

  onClickDelete(){
     if(!confirm("Do you really want to delete this?")) return
    this.deleting = "delete";
   
    this.postService.delete(this.comment['idx'], re =>{
      console.log("response", re);
       this.deleted.emit(this.comment)
    }, error =>{
      console.log("error", error);
    })



  }



  refreshlocalStorage(){
     let posts = {};
    try{
      posts = JSON.parse(localStorage.getItem(this.comment['post_id']));
     
    }catch(e){
      console.log('Error on parsing object from local storage');
      return;
    }

    try{

      posts['posts'].forEach(post => {


      });

    }catch(e){

    }
      
                    
  }


}
