import { Component, OnInit } from '@angular/core';

import { InventoryService } from '../../inventory.service';

import { Item } from '../../item.model';

@Component({
    selector: 'inventory-item',
    templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {

    items: Item[];

    constructor(private inventoryService: InventoryService) {}

    ngOnInit() {
        this.gettingItems()
    }

    gettingItems() {
        this.inventoryService.gettingItems().subscribe(
            items => this.items = items
        )
    }
}