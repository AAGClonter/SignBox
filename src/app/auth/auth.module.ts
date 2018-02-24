import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';

import { UserService } from './user.service';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent,
        LogoutComponent
    ],
    imports: [
        FormsModule
    ],
    providers: [
        UserService
    ]
})
export class AuthModule {}