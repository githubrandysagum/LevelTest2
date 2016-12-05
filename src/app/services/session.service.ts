import { Injectable } from '@angular/core';
import { MemberService } from './philgo-api/v2/member';
import { Router } from '@angular/router';

@Injectable()
export class SessionService {
  login : any;
  backRoute : string;
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

  setBackRoute(route){   
    this.backRoute = route ;
    localStorage.setItem('backRoute', route);
  }

  
}
