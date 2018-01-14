import { Component, OnInit } from '@angular/core';

import { InventoryService } from '../../inventory.service';

import { Assortment } from '../../assortment.model';
import { Item } from '../../item.model';

@Component({
    selector: 'inventory-assortments',
    templateUrl: './assortments.component.html'
})
export class AssortmentsComponent implements OnInit{
    
    assortments: Assortment[];
    items: Item[];

    constructor(private inventoryService: InventoryService) {}

    ngOnInit() {
        this.gettingAssortments();
    }

    gettingAssortments() {
        this.inventoryService.getAssortments().subscribe(
           assortments => this.assortments = assortments);
    }
}