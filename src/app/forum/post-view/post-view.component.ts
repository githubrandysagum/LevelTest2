import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';
import { SessionService } from '../../services/session.service';



@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
  inputs : ['post']
})
export class PostViewComponent implements OnInit {

  post : POST_DATA;
 
  constructor(
    private postservice : Post,
    private session : SessionService,
    private router : Router
  ) {
       this.session.setBackRoute("forums/posts");
   }

  ngOnInit() {
   
  }

  // onEditEvent($event){
  //   this.loadPosts(this.postId, this.postIdx);
  // }

  // getIDs(){
  //   this.postId = localStorage.getItem('forums_postID');
  //     this.postIdx = localStorage.getItem('forums_postIDX');
  //     this.loadPosts(this.postId, this.postIdx);
  // }

  onClickEditPost(){
    this.router.navigate(['/forums/post']);
    this.session.setBackRoute('forums/postview');
  }

  onClickDeletePost(idx){

    this.postservice.delete(idx, reponse=>{
        this.router.navigate(['forums/posts']);
    }, e =>{
        alert('Error on deleting:'+ e);
    })
  }

  // onClickAddComment( ){
    
  //       console.log("createComment()");
  //       let c = <POST_DATA> {};
  //       c.idx_parent = this.postIdx;
  //       c.subject = "Comment title";
  //       c.content = this.message;
    
  //       this.postservice.createComment( c, data => {     
  //           this.message = "";         
  //           this.loadPosts(this.postId, this.postIdx);
  //       }, error => {
  //           alert("An error occured on submitting your comment! Philgo says:" + error)
  //           console.error("create comment error: " + error );     
  //       } );
  //   }



  onClickEditComment(){
    // this.router.navigate(['/forums/post']);
    // this.session.setBackRoute('forums/postview');
  }

  // onClickDeleteComment(idx){

  //   this.postservice.delete(idx, reponse=>{
  //      this.loadPosts(this.postId, this.postIdx);
  //   }, e =>{
  //       alert('Error on deleting comment:'+ e);
  //   })
  // }



  // loadPosts(postID : string, idx : string){
  //   let data = <PAGE_DATA>{
  //       post_id:  postID , 
  //       page_no: 1,
  //       limit: 10
  //   };
  //    this.postservice.page(data, response=>{
  //       this.posts = response;
  //        for(let key in response.posts){
  //             if(response.posts[key].idx == idx){
  //               this.post = response.posts[key];
  //               return;
  //             }
  //         }
  //       console.log("Post structured",this.posts);
      
  //    }, error =>{
  //       console.log(error);
  //    });

  // }
}
