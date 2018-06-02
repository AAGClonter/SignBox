import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

import { UserService } from './user.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styles: [`
        button {
            margin-top: 15px;
        }
        .down {
            margin-top: 40px;
        }
    `]
})
export class SignupComponent implements OnInit{
    signUpForm: FormGroup;

    constructor(private userService: UserService, private router: Router) {}

    onSubmit(form: NgForm){
        const user = new User(
            form.value.email,
            form.value.pin
        );
        this.userService.signUpUser(user)
                        .subscribe(
                            data => {
                                localStorage.setItem('token', data.token);
                                localStorage.setItem('userId', data.userId);
                                this.router.navigateByUrl('/boxes');
                            },
                            error => console.error(error)
                        );

        this.userService.signinUser(user).subscribe(
            data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                this.router.navigateByUrl('/boxes');
            }
        )
    }

    ngOnInit(){
       
    }
}