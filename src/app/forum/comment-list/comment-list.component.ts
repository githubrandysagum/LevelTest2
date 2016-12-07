import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';
import { HTMLCHARPipe } from '../../pipes/htmlchar.pipe';



@Component({
  selector: 'app-comment-list',
  templateUrl: 'comment-list.component.html',
  styleUrls: ['comment-list.component.scss'],
  inputs : ['comments'],
 
})

export class CommentListComponent implements OnInit {
  this_comments : any;
  commentsOnDisplay = [];
  comments = [];
  showMore = false;
  comment_is_Higher_Than_Five = false;
  constructor( 
    private modalService: NgbModal,
    private post : Post
  ) { }

  ngOnInit() { 
     this.refreshDisplayComments( 3 );
  }


  onClickShow(){
    if(!this.showMore){

      this.showMore = true;
      if(!this.comments.length) return;

     
      this.refreshDisplayComments( this.comments.length );
    } 
    else{

      this.showMore = false;
      this.refreshDisplayComments(3);
    } 
  }


  refreshDisplayComments( number ){

    if(typeof(this.comments) == "undefined") return;

   
     this.comment_is_Higher_Than_Five = this.comments.length > 5;

     let no_of_comments = 5;
     let temp = [];
    
      for(let counter = 0; counter < this.comments.length; counter ++  ){
         
        if((number-1) >= counter){
             let comment = this.comments[counter];
                temp.push(comment);
        }
                  
      }

      this.commentsOnDisplay = temp;
      
  }

  

 




  
  


}
