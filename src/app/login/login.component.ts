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
 validation_message : string = "";
 validate_class = "";
 validation_message_type = "";
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
    if( !this.validate( this.form )) return;

    this.member.login(this.form , login=>{
      this.session.login = login;
        this.router.navigate(['']);     
    }, er =>{
      console.log("Error", er);
      this.error(er);
    })
  }


  validate( form : LoginForm) : boolean{
    if(form.id == "" || typeof(form.id)=="undefined")
    {
      this.validation_message = "Username is required";
      this.validate_class = "alert-warning";
      this.validation_message_type = "Warning!";
      return false;
    } 
     if(form.password == "" || typeof(form.password)=="undefined")
    {
      this.validation_message = "Password is required";
      this.validate_class = "alert-warning";
      this.validation_message_type = "Warning!";
      return false;
    } 
      this.validation_message = "";
      this.validate_class = "";
      return true;
  }

    error(error : any){
      if(error == "input id"){
         this.validation_message = "Username is required";
         this.validate_class = "alert-danger";
         this.validation_message_type = "Alert!!!";
         return;
      }
      if(error == "input password"){
         this.validation_message = "Username is required";
         this.validate_class = "alert-danger";
         this.validation_message_type = "Alert!!!";
         return;
      }

       this.validation_message = "Philgo says: " + error;
       this.validate_class = "alert-danger";
       this.validation_message_type = "Alert!!!";

    }
}
