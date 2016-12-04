import { Component, OnInit } from '@angular/core';
import { Post , POST_DATA, PAGE_DATA} from '../../services/philgo-api/v2/post';



@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  post : POST_DATA;
  posts : any;
  postId : string;
  postIdx : string;
  constructor(
    private postservice : Post
  ) {
      
   }

  ngOnInit() {
    this.getIDs();
  }


  getIDs(){
    this.postId = localStorage.getItem('forums_postID');
      this.postIdx = localStorage.getItem('forums_postIDX');

      this.loadPosts(this.postId, this.postIdx);
  }
  loadPosts(postID : string, idx : string){
    let data = <PAGE_DATA>{
        post_id:  postID , 
        page_no: 1,
        limit: 10
    };
     this.postservice.page(data, response=>{
        this.posts = response;
         for(let key in response.posts){
              if(response.posts[key].idx == idx){
                this.post = response.posts[key];
                return;
              }
          }
        console.log("Post structured",this.posts);
      
     }, error =>{
        console.log(error);
     });

  }
}
