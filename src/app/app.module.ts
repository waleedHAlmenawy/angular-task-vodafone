import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavItemComponent } from './components/navbar/nav-item/nav-item.component';
import { PostComponent } from './components/post/post.component';
import { UserDataComponent } from './components/post/user-data/user-data.component';
import { CommentComponent } from './components/post/comment/comment.component';
import { MessageComponent } from './components/message/message.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { SkeletonPostComponent } from './components/loaders/skeleton-post/skeleton-post.component';
import { SkeletonCommentComponent } from './components/loaders/skeleton-comment/skeleton-comment.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavItemComponent,
    PostComponent,
    UserDataComponent,
    CommentComponent,
    MessageComponent,
    TruncatePipe,
    SkeletonPostComponent,
    SkeletonCommentComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
