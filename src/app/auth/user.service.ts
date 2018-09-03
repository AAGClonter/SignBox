import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from './user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json'
        })
    }

    constructor(private httpClient: HttpClient) {}

    signUpUser(user: User) {
        return this.httpClient.post('http://localhost:3000/signup', user, this.httpOptions);
    }

    signinUser(user: User) {
        return this.httpClient.post('http://localhost:3000/signin', user, this.httpOptions);
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

    logout(){
        localStorage.clear();
    }
}