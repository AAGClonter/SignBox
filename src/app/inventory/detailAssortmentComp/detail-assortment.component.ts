import { Component, Input, OnInit } from '@angular/core';
import { InventoryService } from '../inventoryService/inventory.service';
import { NgForm } from '@angular/forms';

import { Assortment } from '../models/assortment.model';
import { Item } from '../models/item.model';
import { AssortmentInt } from '../models/assortment.interface';

import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-detail-assortment',
    templateUrl: './detail-assortment.component.html'
})
export class DetailAssortment implements OnInit {

    @Input() assortment: Assortment;
    items: Item[];

    constructor(
        private inventoryService: InventoryService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getAssortment();
        this.getAssItems();
    }

    getAssortment(): void {
        this.route.params
            .switchMap((params: Params) => this.inventoryService.getAssortment(params['id']))
            .subscribe((assortment: Assortment) => {
                this.assortment = assortment['obj'];
                console.log(this.assortment);
            });
    }

    getAssItems() {
        this.inventoryService.getItems(this.assortment).subscribe((items: Item[]) => {
            this.items = items['obj'];
            console.log(this.items);
        });
    }

    onAddNewItem(form: NgForm) {
        let newItem = new Item(
            form.value.assortment,
            form.value.itemNumber,
            form.value.description,
            form.value.quantity
        );

        this.inventoryService.addItem(newItem).subscribe(data => {
            console.log(data);
        })
    }

    goBack() {
        this.location.back();
    }
}