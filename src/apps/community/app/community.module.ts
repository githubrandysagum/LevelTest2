import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }from '@angular/router'
import { LayoutComponent } from '../pages/base/layout/layout.component';
import { HomeComponent } from '../pages/base/home/home.component';
import { LoginComponent } from '../pages/user/login/login.component';
import { RegisterComponent } from '../pages/user/register/register.component';
import { PhilgoApiModule } from '../services/philgo-api/v2/philgo-api-module';
import { SessionService} from '../services/session.service';
import { PostListComponent } from '../pages/forum/post-list/post-list.component';
import { ForumsComponent } from '../pages/forum/forum-index/forums.component';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PostCreateComponent } from '../pages/forum/components/post-create/post-create.component';
import { CommentComponent } from '../pages/forum/components/comment/comment.component';
import { CommentEditComponent } from '../pages/forum/components/comment-edit/comment-edit.component';
import { HTMLCHARPipe } from '../pipes/htmlchar.pipe';
import { PostViewComponent } from '../pages/forum/components/post-view/post-view.component';
import { CommentModalComponent } from '../pages/forum/components/comment-modal/comment-modal.component';
import { CommentListComponent } from '../pages/forum/components/comment-list/comment-list.component';
import { CommunityComponent } from '../app/community-base.component';


require('zone.js');

const links : Routes = [
  { path: '',component : HomeComponent },
  { path : 'login', component : LoginComponent },
  { path : 'register',   component : RegisterComponent },
  { path : 'forums', component : ForumsComponent},
  { path : 'forums/posts', component : PostListComponent},
  { path : 'forums/post', component : PostCreateComponent},
  { path : 'forums/post', component : PostCreateComponent},
  { path : 'forums/postview', component : PostViewComponent},
];

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostListComponent,
    ForumsComponent,
    PostCreateComponent,
    CommentComponent,
    CommentEditComponent,
    HTMLCHARPipe,
    PostViewComponent,
    CommentModalComponent,
    CommentListComponent,
    CommunityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PhilgoApiModule,
    RouterModule.forRoot(links),
    NgbModule.forRoot()
  ],
  providers: [SessionService, NgbActiveModal],
  entryComponents : [CommentModalComponent],
  exports : [ CommunityComponent  ]


})

export class CommunityModule { }
