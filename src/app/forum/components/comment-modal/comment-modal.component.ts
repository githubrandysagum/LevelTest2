import {Component, Input, EventEmitter} from '@angular/core';
import { Post, POST_DATA } from '../../../services/philgo-api/v2/post';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment-modal',
  templateUrl : 'comment-modal.component.html',
  inputs : ['content', 'idx', 'subject'],
  outputs : ['updateSave']
})


export class CommentModalComponent {
  idx = ''
  subject = "";
  content : "";
  updateSave = new EventEmitter();


  constructor(
    private modal : NgbActiveModal,
    private postService : Post
    ) {
      
  }


  onClickSave(){
        console.log("updateComment()");
        let c = <POST_DATA> {};
        c.idx = this.idx;
        c.subject =this.subject;
        c.content = this.content;
        this.postService.update( c, data => {
            console.log("updateComment() success: ", data);     
            this.updateSave.emit(this.content);
            this.modal.close();
        }, error => {
            console.error("comment update error: " + error );
            alert( error );
        })
  }


  onClickDismiss(){
    alert('You were dismissing this modal')
  }


}
