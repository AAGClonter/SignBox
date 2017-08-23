import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoxComponent } from './box/box.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { BoxDetailComponent } from './box/box-detail.component';
import { BoxInputComponent } from './box/box-input.component';
import { BoxNotifyComponent } from './box/box-notify.component';
import { LogoutComponent } from './auth/logout.component';

const routes: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'boxsignin', component: BoxInputComponent },
    { path: 'boxtosignout/:id', component: BoxDetailComponent },
    { path: 'boxtonotify/:id', component: BoxNotifyComponent },
    { path: 'boxes', component: BoxComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}