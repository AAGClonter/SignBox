import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { LogoutComponent } from './auth/logout.component';

import { BoxModule } from './box/box.module';
import { InventoryModule } from './inventory/inventory.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order/order.module';
import { UserService } from './auth/user.service';

// Angular Material Components
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthGuard } from './auth-guard.service';
import { AssortmentsResolver } from './inventory/resolvers/assortments-resolver.service';

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
    InventoryModule,
    AuthModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    OrderModule
  ],
  providers: [UserService, AuthGuard, AssortmentsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
