import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    template: `
        <button type="button" class="btn btn-danger" (click)="onLogOut()">Log Out</button>
    `,
    styles: [`
        button {
            margin-left: 15px;
        }
    `]
})
export class LogoutComponent {

    constructor(private userService: UserService, private router: Router) {}

    isLoggedIn() {
        return this.userService.isLoggedIn();
    }

    onLogOut(){
        this.userService.logout();
        this.router.navigateByUrl('/boxes');
    }
}