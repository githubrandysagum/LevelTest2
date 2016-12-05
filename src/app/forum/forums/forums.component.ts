import { Component, OnInit } from '@angular/core';
import { Post } from '../../services/philgo-api/v2/post';
import { MemberService } from '../../services/philgo-api/v2/member';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

type FORUMS = Array< { name: Array<string>} >;

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.sass']
})
export class ForumsComponent implements OnInit {
  forum_names = Array<string>();
  forums : any = [];

  constructor(
    private post : Post,
    private member : MemberService,
    private session : SessionService,
    private router : Router
    ) { 
      this.checkLogged();
      this.session.setBackRoute('');
    }

  ngOnInit() {
  }

  checkLogged(){
    this.session.login = this.member.getLoginData();
    if(!this.session.login) this.router.navigate(['']);
    else this.loadForums();
  }

  getForumNames(forums){
    for(let name in forums){
       
       this.forum_names.push(name);

       let category = {};
       let keyPair = {};
       let postIdData = [];
       for(let key in forums[name]){
           postIdData.push(forums[name][key]);
        }     
        this.forums[name] = postIdData;
    }
  }
  loadForums(){
    this.post.getForums( (forums ) =>{
         this.forums = forums;
         this.getForumNames(forums);
         console.log(forums);
       
    }, error =>{
        console.log(error)
    }) 
  }

  onClickForum( post_id ) {
        console.log('onClickForum() post_id: ', post_id);
        this.router.navigate(['/forums/posts']);
        this.session.backRoute = '/forums';
        localStorage.setItem('forums_postID', post_id);
        localStorage.setItem('forums_postIDX', '');
    }
}
