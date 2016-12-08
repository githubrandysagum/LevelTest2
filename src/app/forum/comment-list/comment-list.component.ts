import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';
import { HTMLCHARPipe } from '../../pipes/htmlchar.pipe';
import * as _ from 'lodash';


@Component({
  selector: 'app-comment-list',
  templateUrl: 'comment-list.component.html',
  styleUrls: ['comment-list.component.scss'],
  inputs : ['comments','idxParent','postId'],
  outputs : ['commentDeleted']
})

export class CommentListComponent implements OnInit {
  this_comments : any;
  commentsOnDisplay = [];
  comments = [];
  showMore = false;
  comment_is_Higher_Than_Five = false;
  writeComment = "";
  creatingComment = false;
  idxParent = "";
  postId = "";
  commentDeleted = new EventEmitter();
  commentAdded = new EventEmitter();

  constructor( 
    private modalService: NgbModal,
    private postService : Post
  ) { 

    
  }

  ngOnInit() { 
     this.refreshDisplayComments( this.showMore );
  }

  onCommentDeleted($event){
    let deleteComment = $event;
       _.remove( this.comments, comment => {
                console.log('x:', comment);
                return comment.idx == deleteComment.idx;
            } );
      this.refreshDisplayComments(this.showMore);

        
  }

   
  onEnterWriteComment($event){
   
    if(!($event.key == "Enter")) return;
     this.creatingComment = true;
        let c = <POST_DATA> {};
        c.idx_parent = this.idxParent;
        c.idx = "";
        c.subject = "Subject";
        c.content = this.writeComment;
        this.postService.createComment( c, data => {   

            this.comments.push(data.post); 
            this.refreshDisplayComments(this.showMore);
           console.log("Response",data);
           
            
            this.creatingComment = false;
            this.writeComment = "";
        }, error => {
          this.creatingComment = false;
          this.writeComment = "";
            console.error("Comment update error: " + error );
            alert("There is an error on updating your comment! Philgo says:" + error );
        })
  

  }

  onClickShow(){
    if(!this.showMore){
      this.showMore = true;
      this.refreshDisplayComments(  this.showMore );
    } 
    else{

      this.showMore = false;
      this.refreshDisplayComments( this.showMore);
    } 
  }


  refreshDisplayComments( showmore ){
    let number = 5;

    if(typeof(this.comments) == "undefined") return;
    if(!this.comments.length) return;
    if(showmore) number = this.comments.length;
      this.comment_is_Higher_Than_Five = number > 5;
      this.commentsOnDisplay = _.take(this.comments, number);
  }

  

 




  
  


}