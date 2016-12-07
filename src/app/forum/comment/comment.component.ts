import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';
import { HTMLCHARPipe } from '../../pipes/htmlchar.pipe';
import { CommentModalComponent } from '../components/comment-modal/comment-modal.component';


@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss'],
  inputs : [ 'comment'],
  outputs : ['deleted']
 
})

export class CommentComponent implements OnInit {
 comment = {};
  constructor( 
    private modalService: NgbModal,
    private activeModal : NgbActiveModal,
    private postService : Post
  ) { }

  ngOnInit() { 

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
    this.comment['idx'] = "";
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
