import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { InventoryService } from '../inventoryService/inventory.service';
import { Assortment } from '../models/assortment.model';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {

    dataSource: AssortmentInt[];

    constructor(private inventoryService: InventoryService) {}

    ngOnInit() {
        this.getAssortment();
    }

    getAssortment() {
        this.inventoryService.getAssortments().subscribe((assortments: AssortmentInt[]) => {
            this.dataSource = assortments;
        })
    }

}
