import { Component, Input, OnInit } from '@angular/core';
import { InventoryService } from '../inventoryService/inventory.service';
import { NgForm } from '@angular/forms';

import { Assortment } from '../models/assortment.model';
import { Item } from '../models/item.model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detail-assortment',
    templateUrl: './detail-assortment.component.html'
})
export class DetailAssortment implements OnInit {

    @Input() assortment: Assortment;

    constructor(
        private inventoryService: InventoryService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getAssortment()
    }

    getAssortment(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.inventoryService.getAssortment(id).subscribe((assortment: Assortment) => {
            this.assortment = assortment['obj'];
        })
    }

    onAddNewItem(form: NgForm, assortment: Assortment) {
        let newItem = new Item(
            form.value.assortment,
            form.value.itemNumber,
            form.value.description,
            form.value.quantity
        );

        this.inventoryService.addItem(newItem, assortment).subscribe(data => {
            console.log(data);
        })
    }

    goBack() {
        this.location.back();
    }
}