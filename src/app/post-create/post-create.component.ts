import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { Post, POST_DATA} from '../philgo-api/v2/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.sass']
})
export class PostCreateComponent implements OnInit {
  form = <POST_DATA>{};
  postID : string;
  postIDX : string;
  constructor( 
    private route : ActivatedRoute,
    private post : Post,
    private router : Router
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
      this.post.create(this.form, response =>{
          console.log("Success Post", response);
          this.router.navigate(['/forums/posts']);
      }, error =>{
          console.log("Error on : ", error);
      })

  }


  onClickSaveChanges(){
     this.post.update(this.form, response=>{
         console.log("Successful update: ",response);
         this.router.navigate(['/forums/posts']);
     }, error =>{
        console.log("Error on update", error);
     });

  }

   onClickBack(){
     this.router.navigate(['/forums/posts']);  
   }

}
