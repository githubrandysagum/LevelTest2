import { Component, OnInit } from '@angular/core';
import { MemberService } from '../philgo-api/v2/member';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';


export class LoginForm{
  id : string;
  password : string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
 form = <LoginForm>{};
  constructor(
    private member : MemberService,
     private session : SessionService,
      private router : Router
     ) {
         this.session.login  = this.member.getLoginData();
      }

  ngOnInit() {
  }

  onClickLogin(){
    this.member.login(this.form , login=>{
      this.session.login = login;
        this.router.navigate(['']);     
    }, er =>{
      console.log("Error", er);
    })
  }
}
