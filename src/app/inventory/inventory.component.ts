import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { InventoryService } from './inventory.service';

import { Assortment } from './assortment.model';
import { Item } from './item.model';

@Component({
    selector: 'app-inv',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

    assortments: Assortment[];

    constructor(private inventoryService: InventoryService) {}

    onSubmit(form: NgForm) {
        const newAssortment = new Assortment(
            form.value.assortmentNumber,
            form.value.description
        )
        this.inventoryService.addingAssortments(newAssortment).subscribe(
            (response) => {
                console.log(response)
            }
        )
    }
}