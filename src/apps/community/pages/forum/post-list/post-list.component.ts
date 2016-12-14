import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Post } from '../../../services/philgo-api/v2/post';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { PostCreateComponent } from '../components/post-create/post-create.component';
import { MemberService } from '../../../services/philgo-api/v2/member';
import { PAGE_DATA, POSTS, POST_DATA, POST_RESPONSE } from '../../../services/philgo-api/v2/philgo-api-interface';
import { SessionService } from '../../../services/session.service';
import { HTMLCHARPipe } from '../../../pipes/htmlchar.pipe';
import * as _ from 'lodash';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  showComments = "";
  postId : string;
  data =  <POSTS>{};
  isEdit = "";
  deletedPost = "";
  
  constructor(
    private post: Post,
    private member : MemberService,
    private route : ActivatedRoute,
    private router : Router,
    private session : SessionService,
    private modalService: NgbModal,

    ) {
          this.route.params.subscribe( param =>{
            this.postId = param['post_id'];
             this.loadPosts(this.postId);
          })

         
     }

  ngOnInit() {
  }


  onClickAddPost(){
     let modalRef = this.modalService.open(PostCreateComponent);
         modalRef.componentInstance.member_id = this.session.login.id;
         modalRef.componentInstance.form.post_id =  this.postId;
         modalRef.componentInstance.postAdded.subscribe(post => {
                       this.data.posts.unshift(post);        
                  });
  }


  onClickEdit(idx){
     this.router.navigate(['/forums/post']);   
     localStorage.setItem("forums_postIDX", idx);
  }

  onPostDeleted($event){
    let idx = $event;

        _.remove( this.data.posts, post => {
                return post.idx == idx;
            } );

  }

  loadPosts(postID : string){
    let data = <PAGE_DATA>{
        post_id:  postID , 
        page_no: 1,
        limit: 10
    };
     this.post.page(data, response =>{
        this.data = response;
        console.log("Post structured",this.data);
        


     }, error =>{
        console.log(error);
     });

  }

  
}
