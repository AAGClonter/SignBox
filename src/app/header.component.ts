import { Component } from '@angular/core';
import { BoxComponent } from './box/box.component';
import { Router } from '@angular/router';

import { UserService } from './auth/user.service';

@Component({
    selector: 'app-header',
    template: `
    <div class="container">
        <div class="row">
            <nav class="down">
                <ul class="nav nav-tabs">
                    <li class="nav-item"><a class="nav-link" routerLink="/boxes">Boxes to Sign Out</a></li>
                    <li class="nav-item"><a class="nav-link" routerLink="/inventory/assortments">Inventory</a></li>
                    <li class="nav-item"><a class="nav-link" routerLink="/signup">Sign Up</a></li>
                    <li class="nav-item" *ngIf="!isLoggedIn()"><a class="nav-link" routerLink="/signin">Login</a></li>
                    <div class="justify-content-end">
                        <form class="form-inline right">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                    <li class="nav-item"><app-logout *ngIf="isLoggedIn()"></app-logout></li>
                </ul>
            </nav>
        </div>
    </div>
    `,
    styles: [`
        .down {
            margin-top: 40px;
        }

        .right {
            margin-left: 320px;
        }
    `]
})
export class HeaderComponent {
    
    constructor(private userService: UserService) {}

    isLoggedIn() {
        return this.userService.isLoggedIn();
    }
}