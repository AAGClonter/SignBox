import { Component } from '@angular/core';

@Component({
    selector: 'app-boxes',
    template: `
        <h1>Welcome to our Box Signer</h1>
        <div class="row">
            <app-box-input></app-box-input>
        </div>
        <div class="row">
            <app-box></app-box>
        </div>
    `
})
export class BoxesComponent {

}