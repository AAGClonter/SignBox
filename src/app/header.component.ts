import { Component } from '@angular/core';
import { BoxComponent } from './box/box.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-4">
                
                <ul class="nav nav-pills">
                    <li><a routerLink="/boxsignin">Sign In Boxes</a></li>
                    <li><a routerLink="/boxes">Boxes to Sign Out</a></li>
                    <li><a routerLink="/signup">Sign Up</a></li>
                    <li><a routerLink="/signin">Login</a></li>
                    <li><app-logout></app-logout></li>
                </ul>
            </nav>
        </header>
    `
})
export class HeaderComponent {
    
}