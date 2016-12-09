import { Component, OnInit } from '@angular/core';
import { SessionService} from '../../../services/session.service';
import { MemberService } from '../../../services/philgo-api/v2/member';
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
  
  ) { 


  }
  
  ngOnInit() {
    this.session.setBackRoute(localStorage.getItem('backRoute'));
  }

  onClickLogout(){
    this.member.logout();
    this.session.login = "";
    this.router.navigate(['']);
  }

  onClickBackArrow(){

    this.router.navigate([this.session.backRoute]);
  }

}
