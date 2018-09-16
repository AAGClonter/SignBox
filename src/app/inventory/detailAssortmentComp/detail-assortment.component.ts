import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InventoryService } from '../inventoryService/inventory.service';
import { NgForm } from '@angular/forms';

import { Assortment } from '../models/assortment.model';
import { Item } from '../models/item.model';
import { AssortmentInt } from '../models/assortment.interface';

import { Location } from '@angular/common';
import { ActivatedRoute, Params, Data } from '@angular/router';

@Component({
    selector: 'app-detail-assortment',
    templateUrl: './detail-assortment.component.html',
    styles: [`
        .container {
            display: flex;
            flex-direction: column;
        }

        .item-card {
            width: 65%;
            margin-top: 20px;
        }

        img {
            width: 100%;
        }

        .backButton {
            flex: none;
            margin: auto;
        }

        .separator {
            flex: 1 1 auto;
            height: 10px;
        }

        input[type="file"] {
            visibility: hidden;
        }
    `]
})
export class DetailAssortment implements OnInit {

    @Input() assortment: Assortment;
    items: Item[];
    imagePreview: string;

    constructor(
        private inventoryService: InventoryService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            this.assortment = data['assortment'].obj
            console.log(this.assortment);
        });
        this.getAssortmentItems();
    }

    // Grabbing the image and setting productImage property 
    grabImage(event: Event) {
        let productImage = (event.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        }
        reader.readAsDataURL(productImage);
        console.log(productImage);
        console.log(event);
    }

    // Getting Assortment
    getAssortment(): void {
        this.route.params
            .switchMap((params: Params) => this.inventoryService.getAssortment(params['id']))
            .subscribe((assortment: Assortment) => {
                this.assortment = assortment['obj'];
                this.getAssortmentItems();
            });
    }

    // Getting assortment's items
    getAssortmentItems() {
        this.inventoryService.getItems(this.assortment._id).subscribe(
            (items: Item[]) => {
               this.items = items['obj'];
        });
    }

    onAddNewItem(form: NgForm) {
        let newItem = new Item(
            form.value.assortment,
            form.value.itemNumber,
            form.value.description,
            form.value.quantity,
            form.value.image
        );

        this.inventoryService.addItem(newItem).subscribe(data => {
            this.items.push(newItem);
            console.log(data);
            console.log(newItem);
        });
    }

    goBack() {
        this.location.back();
    }
}