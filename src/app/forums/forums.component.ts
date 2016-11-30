import { Component, OnInit } from '@angular/core';
import { Post } from '../philgo-api/v2/post';
import { MemberService } from '../philgo-api/v2/member';
import { SessionService } from '../session.service';
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
           postIdData.push(key);
        }     

        this.forums[name] = postIdData;

    }

    

  }
  loadForums(){
    this.post.getForums( (forums ) =>{
         this.forums = forums;
         this.getForumNames(forums);
         
       
    }, error =>{
        console.log(error)
    }) 
  }

  onClickForum( post_id ) {
        console.log('onClickForum() post_id: ', post_id);
        this.router.navigate(['/forums', post_id]);
    }
}
