import { Component, OnInit } from '@angular/core';
import { MemberService, MEMBER_DATA } from '../philgo-api/v2/member';
import { Router } from '@angular/router';
import { SessionService }  from '../session.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})


export class RegisterComponent implements OnInit {
  form = <MEMBER_DATA>{};

  constructor(
    private member : MemberService, 
    private router : Router,
    private session : SessionService
     ) {
    console.log("RegisterComponent  :: Construct()");
        this.session.login  = this.member.getLoginData();
        this.loadUserData();
   }

  ngOnInit() {
  }

  onClickRegister(){
    
    this.member.register(this.form, login=>{
       console.log(login);
       this.router.navigate([''])
       
    }, error=>{
     console.log("Error"+ error);
    })

  }

  onClickUpdate(){
      this.member.update(this.form, response =>{
        console.log("Success Update", response);
      }, error =>{
        console.error("Error", error)
      })

  }

  loadUserData(){
    if(!this.session.login) return;
    //
    console.log(this.session.login);
    this.member.data(userdata => {

      this.form.id = this.session.login.id;
      this.form.name = userdata.user_name;
      this.form.email = userdata.user_email;
      this.form.mobile = userdata.user_mobile;
      this.form.user_varchar_1 = userdata.user_varchar_1;
       console.log(userdata);
       
    }, error =>{


    })
  }


}
