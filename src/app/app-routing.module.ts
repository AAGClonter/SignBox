import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BoxComponent } from './box/box.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { BoxDetailComponent } from './box/box-detail.component';
import { BoxNotifyComponent } from './box/box-notify.component';
import { LogoutComponent } from './auth/logout.component';

const routes: Routes = [
    { path: '', redirectTo: 'boxes', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}