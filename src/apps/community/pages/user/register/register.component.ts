import { Component, OnInit } from '@angular/core';
import { MemberService, MEMBER_DATA } from '../../../services/philgo-api/v2/member';
import { Router } from '@angular/router';
import { SessionService }  from '../../../services/session.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})


export class RegisterComponent implements OnInit {
  loading : boolean = false;
  userAlert : string = "";
  form = <MEMBER_DATA>{};

  constructor(
    private member : MemberService, 
    private router : Router,
    private session : SessionService
     ) {
    console.log("RegisterComponent  :: Construct()");
        this.session.setBackRoute('');
        this.session.login  = this.member.getLoginData();
        this.loadUserData();
   }

  ngOnInit() {
  }

  onClickRegister(){
    
    if(!this.validate(this.form)) return;
    this.member.register(this.form, login=>{
       this.session.login = login;
       this.router.navigate(['']);   
    }, error=>{ 
      console.log("Server says: " + error);
      this.userAlert = "Philgo says: " + error;      
    })

  }

  onClickUpdate(){
      this.member.update(this.form, response =>{
        console.log("Success Update", response);
        alert('Update Success!')
      }, error =>{
        this.userAlert = "Philgo says: " + error; 
        console.log("Server says" + error);
      })

  }

  loadUserData(){
    if(!this.session.login) return;
    //
    this.loading = true;
    this.member.data(userdata => {
      console.log(userdata);
      this.form.id = this.session.login.id;
      this.form.name = userdata.user_name;
      this.form.email = userdata.email;
      this.form.mobile = userdata.mobile;
      this.form.user_varchar_1 = userdata.user_varchar_1;
      this.loading = false;
       
    }, error =>{
      this.loading = false;
      this.userAlert = "Philgo says: " + error; 
    })
  }

  validate(data : MEMBER_DATA){
      if(data.id == "" || typeof(data.id) == "undefined") { this.userAlert = "Id is required"; return false; }
      if(data.password == "" || typeof(data.password) == "undefined") { this.userAlert = "Password is required"; return false; }
      if(data.email == "" || typeof(data.email) == "undefined") { this.userAlert = "Email is required"; return false; }
      if(data.mobile == "" || typeof(data.mobile) == "undefined") { this.userAlert = "Mobile is required"; return false; }
      if(data.name == "" || typeof(data.name) == "undefined") { this.userAlert = "Name is required"; return false; }
      
      this.userAlert = ""; return true;
  }


}
