import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';
import { HTMLCHARPipe } from '../../pipes/htmlchar.pipe';
import { CommentModalComponent } from '../components/comment-modal/comment-modal.component';


@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss'],
  inputs : [ 'content' , 'subject', 'idx', 'postGroupId', 'postIdx' ]
 
})

export class CommentComponent implements OnInit {
  idx = "";
  content = "";
  subject = "";
  postIdx = "";
  postGroupId = "";
  constructor( 
    private modalService: NgbModal,
    private activeModal : NgbActiveModal,
    private postService : Post
  ) { }

  ngOnInit() { 

  }


  onClickEdit(){

     let modalRef = this.modalService.open(CommentModalComponent);
            modalRef.componentInstance.content = this.content;
            modalRef.componentInstance.idx = this.idx;
            modalRef.componentInstance.updateSave 
                    .subscribe(content => {
                     this.content = content;
                    
                  });

  }

  refreshlocalStorage(){
     let posts = {};
    try{
      posts = JSON.parse(localStorage.getItem(this.postGroupId));
     
    }catch(e){
      console.log('Error on parsing object from local storage');
      return;
    }

    try{

    }catch(e){

    }
      
                    
  }


}
