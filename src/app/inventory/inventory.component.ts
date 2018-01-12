import { Component, OnInit } from '@angular/core';

import { InventoryService } from './inventory.service';

import { Assortment } from './assortment.model';
import { Item } from './item.model';

@Component({
    selector: 'app-inv',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

    assortments: Assortment[];

    constructor(private inventoryService: InventoryService) {}

    ngOnInit() {
        this.gettingAssortments();
    }

    gettingAssortments() {
        this.inventoryService.getAssortments().subscribe(
           assortments => this.assortments = assortments);
    }
}