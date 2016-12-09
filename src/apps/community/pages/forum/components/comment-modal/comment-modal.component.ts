import {Component, Input, EventEmitter} from '@angular/core';
import { Post, POST_DATA } from '../../../../services/philgo-api/v2/post';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment-modal',
  templateUrl : 'comment-modal.component.html',
  inputs : ['comment','idx','idx_parent','post_id','subject','content','member_id'],
  outputs : ['updateSave']
})


export class CommentModalComponent {
  idx = "";
  idx_parent = "";
  post_id = "";
  subject = "";
  content = "";
  member_id = "";
  updating = false;


  updateSave = new EventEmitter();


  constructor(
    private modal : NgbActiveModal,
    private postService : Post
    ) {
      
  }


  onClickSave(){
    this.updating = true;
        console.log("updateComment()");
        let comment = <POST_DATA> {};
            comment.idx = this.idx;
            comment.post_id = this.post_id;
            comment.idx_parent = this.idx_parent;
            comment.subject = this.subject;
            comment.content = this.content;


        this.postService.update( comment, data => {

            this.updating = false;
            console.log("updateComment() success: ", data);     
            this.updateSave.emit(comment);
            this.modal.close();

        }, error => {
            this.updating = false;            
            console.error("comment update error: " + error );
            alert( error );
        })
  }



  onClickCancel(){
    this.modal.close('Close');
  }


  onClickDismiss(){
    this.modal.dismiss('dismiss');
  }


}
