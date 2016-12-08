import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';
import { SessionService } from '../../services/session.service';



@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
  inputs : ['post'],
  outputs : ['deleted']
})
export class PostViewComponent implements OnInit {

  post : POST_DATA;
  deleted = new EventEmitter();
  constructor(
    private postservice : Post,
    private session : SessionService,
    private router : Router
  ) {
       this.session.setBackRoute("forums/posts");
   }

  ngOnInit() {
   
  }

  

  onClickEditPost(){
    this.router.navigate(['/forums/post']);
    this.session.setBackRoute('forums/postview');
  }

  onClickDeletePost(idx){
    this.postservice.delete(idx, response=>{
        this.deleted.emit(idx);
    }, e =>{
        alert('Error on deleting:' + e);
    })
  }

 


 

 
}
