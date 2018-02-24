import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';

import { InventoryComponent } from './inventory/inventory.component';
import { AssortmentsComponent } from './inventory/components/assortment/assortments.component';
import { ItemComponent } from './inventory/components/item/item.component';
import { PrepareItemComponent } from './inventory/components/prepare-item/prepare-item.component';
import { InventoryService } from './inventory/inventory.service';
import { BoxModule } from './box/box.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,
    InventoryComponent,
    AssortmentsComponent,
    ItemComponent,
    PrepareItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    BoxModule,
    AuthModule
  ],
  providers: [InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
