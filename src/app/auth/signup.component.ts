import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

import { UserService } from './user.service';
import { User } from './user.model';

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

    constructor(private userService: UserService) {}

    onSubmit(form: NgForm){
        const user = new User(
            form.value.email,
            form.value.pin
        );
        this.userService.signUpUser(user)
                        .subscribe(
                            data => console.log(data),
                            error => console.error(error)
                        );
    }

    ngOnInit(){
       
    }
}