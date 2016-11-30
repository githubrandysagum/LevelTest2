import { Component, OnInit } from '@angular/core';
import { SessionService} from '../session.service';
import { MemberService } from '../philgo-api/v2/member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  constructor(
    private session : SessionService,
    private member : MemberService,
    private router : Router
  
  ) { }
  
  ngOnInit() {
  }

  onClickLogout(){
    this.member.logout();
    this.session.login = "";
    this.router.navigate(['']);
  }


}
