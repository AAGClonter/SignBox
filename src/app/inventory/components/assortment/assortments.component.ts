import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Params } from '@angular/router';

import { InventoryService } from '../../inventory.service';

import { Assortment } from '../../assortment.model';
import { Item } from '../../item.model';

@Component({
    selector: 'inventory-assortments',
    templateUrl: './assortments.component.html',
    styles: [`
        .grow-down {
            height: 500px;
        }

        .right {
            margin-left: 50px;
        }

        .down {
            margin-top: 20px;
        }
    `]
})
export class AssortmentsComponent {

    items: Item[];
    assortments: Assortment[];

    showForm: boolean = false;
    buttonActive = "See Items";
    formActive: boolean = false;

    constructor(private inventoryService: InventoryService) {}

    ngOnInit() {
        this.gettingAssortments();
    }
    //Data requests 
    gettingAssortments() {
        this.inventoryService.getAssortments().subscribe(
           assortments => this.assortments = assortments
           );
    }
    getAllItems() {
        this.inventoryService.gettingItems().subscribe(
            items => this.items = items
        )
    }
    //Getting Items by Assortment
    gettingItems(assortment: Assortment) {
        this.inventoryService.gettingItems().subscribe(
            items => {
                this.items === assortment.items;
                return this.items;
            }
        );
    }
    //POST new Assortment
    onSubmit(form: NgForm) {
        const newAssortment = new Assortment(
            form.value.assortmentNumber,
            form.value.description
        )
        this.inventoryService.addingAssortments(newAssortment).subscribe(
            data => {
                this.assortments.push(data['obj']);
                console.log(data);
            }
        )
        form.reset();
    }
    //Updating item
    /*
    onItemSubmit(form: NgForm) {
        this.inventoryService.updatingItem(form.value).subscribe(
            (response) => {
                console.log(response);
            }
            
        )
        form.reset();
    }
    */
    //Creating new item
    onSubmitNewItem(form: NgForm, assortment: Assortment) {
        const newItem = new Item(
            form.value.assortment, 
            form.value.itemNumber, 
            form.value.description,
            form.value.quantity
            )
            this.inventoryService.addingItems(newItem, assortment).subscribe(
                data => {
                    assortment.items.push(data['obj']);
                    console.log(data);
                }
            )
        form.reset();
    }
    //Template related code
    activate(assortment: Assortment) {
        assortment.isShown = !assortment.isShown;
    }

    onQuantity(item: Item) {
         item.isShown = !item.isShown;
         this.inventoryService.editItem(item);
    }

    onAddItem(assortment: Assortment) {
        assortment.onAddingItem = !assortment.onAddingItem;
    }

    togglePrepared(item: Item) {
        item.prepared = !item.prepared;
        console.log(item.prepared)
    }

    //Deleting assortment
    deleteAssortment(assortment: Assortment) {
        this.inventoryService.deleteAssortment(assortment).subscribe(
            (response) => {
                console.log(response)
            }
        )
    }

    //Deleting an Item
    onDeleteItem(assortment: Assortment, item: Item) {
        this.inventoryService.deleteItem(assortment, item).subscribe(
            (response) => console.log(response)
        )
    }

}
