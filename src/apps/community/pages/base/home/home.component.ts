import { Component, OnInit } from '@angular/core';
import { MemberService, MEMBER_LOGIN_DATA } from '../../../services/philgo-api/v2/member';
import { SessionService } from '../../../services/session.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    private member : MemberService, 
    private session : SessionService) { 
      this.session.setBackRoute('');
  }

  ngOnInit() {

  }

}
