import { Component } from '@angular/core';

import { InventoryService } from '../../inventory.service';

import { Item } from '../../item.model';
import { Assortment } from '../../assortment.model';

@Component({
    selector: 'inventory-prepare',
    templateUrl: './prepare-item.component.html'
})
export class PrepareItemComponent {

    preparedItems: Item[];

    constructor(private inventoryService: InventoryService) {}
}