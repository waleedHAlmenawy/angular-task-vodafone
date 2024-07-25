import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavItemComponent } from './components/navbar/nav-item/nav-item.component';
import { PostComponent } from './components/post/post.component';
import { UserDataComponent } from './components/post/user-data/user-data.component';
import { CommentComponent } from './components/post/comment/comment.component';
import { MessageComponent } from './components/message/message.component';
import { TruncatePipe } from './pipes/truncate.pipe';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
