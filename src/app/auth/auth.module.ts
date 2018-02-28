import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';

import { AuthRoutesModule } from './auth-routes.module';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutesModule
    ]
})
export class AuthModule {}