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
            margin-left: 120px;
            width: 100px;
            font-weight: 100;
        }
        .down {
            margin-top: 40px;
        }

        .signUpHeader {
            margin-left: 120px;
            font-weight: 100;
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
                                localStorage.setItem('token', data['token']);
                                localStorage.setItem('userId', data['userId']);
                                this.router.navigateByUrl('/boxes');
                            },
                            error => console.error(error)
                        );
    }

    ngOnInit(){
       
    }
}