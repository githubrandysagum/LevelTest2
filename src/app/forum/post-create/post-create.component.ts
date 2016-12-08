import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { Post, POST_DATA} from '../../services/philgo-api/v2/post';
import { SessionService } from '../../services/session.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.sass'],
  inputs : ['post','member_id'],
  outputs : ['postAdded']
})
export class PostCreateComponent implements OnInit {
  form = <POST_DATA>{};
  member_id = "";
  postID : string;
  postIDX : string;

  postAdded = new EventEmitter();


  isProcessing = false;
  constructor( 
    private route : ActivatedRoute,
    private post : Post,
    private router : Router,
    private session : SessionService,
    private modal : NgbActiveModal,

     ) {
       this.postID = localStorage.getItem('forums_postID');
       this.postIDX = localStorage.getItem('forums_postIDX');
       this.loadForm();
   }

  ngOnInit() {
  }


  loadForm(){
   if(!this.postIDX) return;

    this.post.get(this.postIDX, post=>{
          console.log("Edit Post: " , post);
          this.form = post.post;
    }, error =>{
          console.log("Edit Post: " , error);
    });
  }


  onClickCreate(){
      this.form.post_id = this.postID;
      this.isProcessing = true;
      this.post.create(this.form, response =>{
          console.log("Success Post", response);
          this.postAdded.emit(response.post);
          this.modal.close();
           this.isProcessing = false;
      }, error =>{
           this.isProcessing = false;
          
          alert("Error on : "+ error);
      })

  }

  onClickSaveChanges(){
     this.post.update(this.form, response=>{
         console.log("Successful update: ",response);
         this.router.navigate([this.session.backRoute]);
     }, error =>{
        alert("Error on update"+ error);
     });

  }

   

}
