import { Injectable } from '@angular/core';
import { MemberService } from './philgo-api/v2/member';
import { Router } from '@angular/router';

@Injectable()
export class SessionService {
  login : any;
  constructor(
    private member : MemberService,
    private router : Router
    
    ) { 
    this.login = this.member.getLoginData();
    this.checkLogin();
  } 

  checkLogin(){
    console.log("SessionService checkLogin()::")
      if(!this.login) this.router.navigate(['']);
  }
}
