import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  inputs : ['idx', 'comments','show','postId'],
  outputs : [ 'onAdd'],
 
})

export class CommentComponent implements OnInit {
    idx;
    comments : Array<any>;
    commentsdisplay = [];
    show = "";
    updateIdx = "";
    onAdd = new EventEmitter();
    focus =false;
    comment = "";
    postId = "";
  
  constructor( 
    private modalService: NgbModal,
    private post : Post
  ) { }

  ngOnInit() { 

  }

  onClickToggleComment(){
      
      if(this.show == "" ){ this.show = "show"; }
      else{ this.show = ""; }
  }

  onClickUpdateComment(idx, data){
      this.updateIdx = idx;
      this.comment = data;
  }

  onClickSaveUpdate(){
    this.updateComment(this.updateIdx, this.comment, ()=>{
      this.updateIdx = "";
      this.comment = "";
    });
    this.focus = true;
  }


  onClickCancelUpdate(){
    this.updateIdx = "";
      this.comment = "";
  }

  onClickDelete(idx){
    this.post.delete(idx, response=>{
        this.refreshComments(this.postId, this.idx);
    }, error=>{
        alert("Delete comment error: " +error);
    })

  }
    
  onClickCreate( ){
    this.createComment(this.idx, this.comment);
  }

   open(content) {
        this.modalService.open(content).result.then((result) => {
      }, (reason) => {
        alert('Error modal close'+ reason);
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
            this.refreshComments(this.postId, this.idx);
            success(data);
        }, error => {
            console.error("Comment update error: " + error );
            alert("There is an error on updating your comment! Philgo says:" + error );
        })
    }

    private createComment( idx_parent, data ) {
        console.log("createComment()");
        let c = <POST_DATA> {};
        c.idx_parent = idx_parent;
        c.subject = "Comment title";
        c.content = data;
    
        this.post.createComment( c, data => {              
            this.refreshComments(this.postId, this.idx);
        }, error => {
            alert("An error occured on submitting your comment! Philgo says:" + error)
            console.error("create comment error: " + error );     
        } );
    }

    private refreshComments(postID : string, idx : string){
      let data = <PAGE_DATA>{
          post_id:  postID , 
          page_no: 1,
          limit: 10
      };
      this.post.page(data, response =>{
          
          for(let key in response.posts){
              if(response.posts[key].idx == idx){
                console.log("Result",response.posts[key].comments)
                this.comments = response.posts[key].comments;
                return;
              }
          }

      }, error =>{
          console.log("Error refreshing comments",error);
      });
    }
  


}
