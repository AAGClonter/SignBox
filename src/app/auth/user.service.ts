import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from './user.model';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    signUpUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/signup', body, {headers: headers})
                        .map((response: Response) => response.json())
                        .catch((error: Response) => Observable.throw(error.json()));
    }

    signinUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/signin', body, {headers: headers})
                        .map((response: Response) => response.json())
                        .catch((error: Response) => Observable.throw(error.json()));
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

    logout(){
        localStorage.clear();
    }
}