import { Component } from '@angular/core';
import { BoxComponent } from './box/box.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    template: `
    <div class="container">
        <nav class="down">
            <ul class="nav nav-pills nav-fill">
                <li class="nav-item"><a routerLink="/boxsignin">Sign In Boxes</a></li>
                <li class="nav-item"><a routerLink="/boxes">Boxes to Sign Out</a></li>
                <li class="nav-item"><a routerLink="/signup">Sign Up</a></li>
                <li class="nav-item"><a routerLink="/signin">Login</a></li>
                <div class="justify-content-end">
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </ul>
            <app-logout></app-logout>
        </nav>
    </div>
    `,
    styles: [`
        .down {
            margin-top: 40px;
        }
    `]
})
export class HeaderComponent {
    
}