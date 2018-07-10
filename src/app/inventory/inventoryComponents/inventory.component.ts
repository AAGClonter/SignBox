import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { NgForm } from '@angular/forms';

import { InventoryService } from '../inventoryService/inventory.service';
import { Assortment } from '../models/assortment.model';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styles: [`
        .panel {
            width: 80%;
        }
    `]
})
export class InventoryComponent implements OnInit {

    assortment: Assortment;
    assortments: Assortment[];
    panelOpenState: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private inventoryService: InventoryService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            this.assortments = data['assortments'].obj;
        });
    }

    // Get request for all assortments
    getAssortment() {
        this.inventoryService.getAssortments().subscribe((assortments: Assortment[]) => {
            this.assortments = assortments['obj'];
        })
    }

    // Form submit function 
    assortmentSubmit(form: NgForm) {
        if (this.assortment) {
            this.assortment.assortmentNumber = form.value.assortment
            this.assortment.description = form.value.description

            this.inventoryService.updateAssortment(this.assortment).subscribe(
                data => console.log(data)
            );
        } else {
            let newAssortment = new Assortment(
                form.value.assortment,
                form.value.description
            );
            this.inventoryService.addAssortment(newAssortment).subscribe((data: Assortment) => {
                console.log(data);
            });
        }
    }

    // Delete an assortment
    onDelete(assortment: Assortment) {
        this.inventoryService.deleteAssortment(assortment).subscribe(data => {
            console.log(data);
        })
    }

    // Update an assortment
    onUpdate(assortment: Assortment) {
        this.assortment = assortment;
    }

    // Click event to navigate to Detail View of the assortment
    onGoToDetail(assortment: Assortment) {
        this.router.navigate(['assortment', assortment._id, 'detail']);
    }

}
