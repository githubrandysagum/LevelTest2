import { Component, OnInit } from '@angular/core';
import { MemberService, MEMBER_LOGIN_DATA } from '../philgo-api/v2/member';
import { SessionService } from '../session.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  login : MEMBER_LOGIN_DATA;
  constructor(private member : MemberService, private session : SessionService) { 
      this.session.login  = this.member.getLoginData();
      console.log(this.session.login);
  }

  ngOnInit() {

  }

}
