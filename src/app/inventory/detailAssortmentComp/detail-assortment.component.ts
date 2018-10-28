import { Component, Input, OnInit } from '@angular/core';
import { InventoryService } from '../inventoryService/inventory.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { Assortment } from '../models/assortment.model';
import { Item } from '../models/item.model';

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
            width: 200px;
            height: 150px;
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
    file;

    itemForm: FormGroup;

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

        this.itemForm = new FormGroup({
            assortment: new FormControl(this.assortment.assortmentNumber),
            itemNumber: new FormControl(''),
            description: new FormControl(''),
            quantity: new FormControl(''),
            image: new FormControl('')
        });
    }

    // Grabbing the image and setting productImage property 
    grabImage(event: Event) {
        let productImage = (event.target as HTMLInputElement).files[0];
        this.file = productImage;
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

    onAddNewItem() {
        let newItem = new Item(
            this.itemForm.get('assortment').value,
            this.itemForm.get('itemNumber').value,
            this.itemForm.get('description').value,
            this.itemForm.get('quantity').value
        );

        let formData = new FormData();
        formData.append('assortment', this.itemForm.get('assortment').value);
        formData.append('itemNumber', this.itemForm.get('itemNumber').value);
        formData.append('description', this.itemForm.get('description').value);
        formData.append('quantity', this.itemForm.get('quantity').value);
        formData.append('image', this.file, this.file.name);

        this.inventoryService.uploadImage(formData).subscribe(data => {
            console.log(data);
        });

        this.getAssortmentItems(); 
        this.itemForm.reset();
    }

    deleteItem(item: Item) {
        this.inventoryService.deleteItem(item).subscribe(data => {
            console.log(data);
        });
    }

    goBack() {
        this.location.back();
    }
}