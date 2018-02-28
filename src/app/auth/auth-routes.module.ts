import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { LogoutComponent } from './logout.component';

const authRoutes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
]
@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutesModule {}