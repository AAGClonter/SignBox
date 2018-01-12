import { Component } from '@angular/core';

@Component({
    selector: 'app-inventory-child',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li><a>Add Assortment</a></li>
                    <li><a>Add Item</a></li>
                    <li><a>Prepare Items</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})
export class InventoryChildComponent {

}