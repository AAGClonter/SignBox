import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { InventoryService } from '../inventoryService/inventory.service';
import { Assortment } from '../models/assortment.model';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styles: [`
        .panel {
            height: 50px;
            width: 80%;
        }
    `]
})
export class InventoryComponent implements OnInit {

    assortments: Assortment[];
    panelOpenState: boolean = false;

    constructor(private inventoryService: InventoryService) {}

    ngOnInit() {
        this.getAssortment();
    }

    // Get request for all assortments
    getAssortment() {
        this.inventoryService.getAssortments().subscribe((assortments: Assortment[]) => {
            this.assortments = assortments['obj'];
        })
    }

    // Form submit function 
    assortmentSubmit(form: NgForm) {
        let newAssortment = new Assortment(
            form.value.assortment,
            form.value.description
        );

        this.inventoryService.addAssortment(newAssortment).subscribe((data: Assortment) => {
            console.log(data);
        });
    }

    onDelete(assortment: Assortment) {
        this.inventoryService.deleteAssortment(assortment).subscribe(data => {
            console.log(data);
        })
    }

}
