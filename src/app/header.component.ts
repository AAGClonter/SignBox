import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BoxComponent } from './box/box.component';

import { UserService } from './auth/user.service';

@Component({
    selector: 'app-header',
    template: `
    <div class="container">
        <div class="row">
            <nav class="down">
                <ul class="navbar navbar-dark bg-dark">
                    <li class="nav-item"><a class="nav-link" routerLinkActive="inUse" routerLink="/boxes">Boxes to Sign Out</a></li>
                    <li class="nav-item"><a class="nav-link" routerLinkActive="inUse" routerLink="/inventory">Inventory</a></li>
                    <li class="nav-item"><a class="nav-link" routerLinkActive="inUse" routerLink="/signup">Sign Up</a></li>
                    <li class="nav-item" *ngIf="!isLoggedIn()"><a class="nav-link" routerLinkActive="inUse" routerLink="/signin">Login</a></li>
                    <li class="nav-item"><app-logout *ngIf="isLoggedIn()"></app-logout></li>
                </ul>
            </nav>
        </div>
    </div>
    `,
    styles: [`
        .down {
            width: 100%;
            position: sticky;
            overflow: scroll;
            top: 0;
        }

        .right {
            margin-left: 320px;
        }

        ul {
            list-style: none;
        }

        a {
            color: white;
        }

        .inUse {
            color: #737475;
        }
    `]
})
export class HeaderComponent {
    
    constructor(private userService: UserService) {}

    isLoggedIn() {
        return this.userService.isLoggedIn();
    }
}