import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }from '@angular/router'
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PhilgoApiModule } from './philgo-api/v2/philgo-api-module';
import {SessionService} from './session.service';
import { PostListComponent } from './post-list/post-list.component';
import { ForumsComponent } from './forums/forums.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const links : Routes = [
  { path: '',component : HomeComponent },
  {  path : 'login', component : LoginComponent },
  {   path : 'register',   component : RegisterComponent },
  { path : 'forums', component : ForumsComponent},
  { path : 'forums/:id', component : PostListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostListComponent,
    ForumsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PhilgoApiModule,
    RouterModule.forRoot(links),
    NgbModule.forRoot()
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
