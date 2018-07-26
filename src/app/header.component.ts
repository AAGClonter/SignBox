import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BoxComponent } from './box/box.component';

import { UserService } from './auth/user.service';

@Component({
    selector: 'app-header',
    template: `
    <mat-toolbar color="primary">
        <mat-toolbar-row>
            SignBox
            <a class="right" mat-button routerLinkActive="inUse" routerLink="/boxes">Boxes to Sign Out</a>
            <a class="right" mat-button routerLinkActive="inUse" routerLink="/inventory">Inventory</a>
            <a class="right" mat-button routerLinkActive="inUse" routerLink="/signup" *ngIf="!isLoggedIn()">Sign Up</a>
            <a class="right" mat-button routerLinkActive="inUse" routerLink="/signin" *ngIf="!isLoggedIn()">Login</a>
            <app-logout class="logOut" *ngIf="isLoggedIn()"></app-logout>
        </mat-toolbar-row>
    </mat-toolbar>
    `,
    styles: [`
        .down {
            width: 100%;
            position: sticky;
            overflow: scroll;
            top: 0;
        }

        .logOut {
            margin-left: 400px;
        }

        .right {
            margin-left: 60px;
        }

        a {
            color: white;
        }

        mat-toolbar {
            position: sticky;
            overflow: scroll;
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