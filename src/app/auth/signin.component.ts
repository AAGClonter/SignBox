import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user.model';
import { UserService } from './user.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styles: [`
        .down {
            margin-top: 40px;
        }
        
        .another {
            margin-top: 25px;
        }
    `]
})
export class SigninComponent {

    constructor(private userService: UserService, private router: Router) {}

    onSubmit(form: NgForm){
        const user = new User(form.value.email, form.value.pin);
        this.userService.signinUser(user)
                        .subscribe(
                            data => {
                                localStorage.setItem('token', data.token);
                                localStorage.setItem('userId', data.userId);
                                this.router.navigateByUrl('/boxes');
                            },
                            error => console.error(error)
                        )
    }
}