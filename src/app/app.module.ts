import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { LogoutComponent } from './auth/logout.component';

import { BoxModule } from './box/box.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { UserService } from './auth/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BoxModule,
    AuthModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
