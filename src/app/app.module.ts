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
import { PhilgoApiModule } from './services/philgo-api/v2/philgo-api-module';
import {SessionService} from './services/session.service';
import { PostListComponent } from './forum/post-list/post-list.component';
import { ForumsComponent } from './forum/forums/forums.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PostCreateComponent } from './forum/post-create/post-create.component';
import { CommentComponent } from './forum/comment/comment.component';



const links : Routes = [
  { path: '',component : HomeComponent },
  {  path : 'login', component : LoginComponent },
  {   path : 'register',   component : RegisterComponent },
  { path : 'forums', component : ForumsComponent},
  { path : 'forums/posts', component : PostListComponent},
  { path : 'forums/post', component : PostCreateComponent},
  { path : 'forums/post', component : PostCreateComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostListComponent,
    ForumsComponent,
    PostCreateComponent,
    CommentComponent,
    
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
