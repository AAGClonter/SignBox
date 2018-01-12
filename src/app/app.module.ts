import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoxComponent } from './box/box.component';
import { BoxInputComponent } from './box/box-input.component';
import { BoxesComponent } from './box/boxes.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';

import { BoxService } from './box/box.service';
import { UserService } from './auth/user.service';

import { BoxNotifyComponent } from './box/box-notify.component';
import { BoxDetailComponent } from './box/box-detail.component';

import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';

import { InventoryComponent } from './inventory/inventory.component';
import { InventoryChildComponent } from './inventory/inventory.child.component';
import { AssortmentsComponent } from './inventory/components/assortment/assortments.component';
import { ItemComponent } from './inventory/components/item/item.component';
import { PrepareItemComponent } from './inventory/components/prepare-item/prepare-item.component';
import { InventoryService } from './inventory/inventory.service';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    BoxInputComponent,
    BoxesComponent,
    AuthenticationComponent,
    HeaderComponent,
    BoxNotifyComponent,
    BoxDetailComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent,
    InventoryComponent,
    InventoryChildComponent,
    AssortmentsComponent,
    ItemComponent,
    PrepareItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BoxService, UserService, InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
