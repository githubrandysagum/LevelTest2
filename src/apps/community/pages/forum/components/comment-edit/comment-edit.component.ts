import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Post , POST_DATA, PAGE_DATA} from '../../../../services/philgo-api/v2/post';
import { HTMLCHARPipe } from '../../../../pipes/htmlchar.pipe';



@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss'],
  inputs : ['idx', 'comment','postIdx'],
  outputs : [ 'edited'],
})

export class CommentEditComponent implements OnInit {
    idx;
    comment = "";
    postIdx = "";
    edited = new EventEmitter();
    deleted = new EventEmitter();
  constructor( 
    private modalService: NgbModal,
    private post : Post
  ) { }

  ngOnInit() { 

  }

   open(content) {
        this.modalService.open(content).result.then((result) => {
          if(result == "save"){
           this.updateComment( this.idx, this.comment, ()=>{
              alert("Changes saved !");
              this.edited.emit('data saved');
           });
          }
      }, (reason) => {
        alert('Error modal close! changes not save'+ reason);
      });
    }




   private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }


    

 
   private updateComment( idx, data, success) {
        console.log("updateComment()");
        let c = <POST_DATA> {};
        c.idx = idx;
        c.subject = "Subject";
        c.content = data;
        this.post.update( c, data => {        
            success(data);
        }, error => {
            console.error("Comment update error: " + error );
            alert("There is an error on updating your comment! Philgo says:" + error );
        })
    }

   
   
     
  


}
