import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

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

    onSubmit(form: NgForm) {
        const newAssortment = new Assortment(
            form.value.assortmentNumber,
            form.value.description
        )
        this.inventoryService.addingAssortments(newAssortment).subscribe(
            data => {
                this.gettingAssortments();
                console.log(data);
            }
        )
        form.reset();
    }

    onItemSubmit(form: NgForm) {

        this.inventoryService.updatingItem(form.value).subscribe(
            (response) => console.log(response)
        )
        form.reset();
    }

    onSubmitNewItem(form: NgForm, assortment: Assortment) {
        const newItem = new Item(
            form.value.assortment, 
            form.value.itemNumber, 
            form.value.description,
            form.value.quantity
            )
            this.inventoryService.addingItems(newItem).subscribe(
                data => {
                    this.gettingAssortments();
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

    onAddItem(item: Item) {
        item.onNewItem = !item.onNewItem;
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
