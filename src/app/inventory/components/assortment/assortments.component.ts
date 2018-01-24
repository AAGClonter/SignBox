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

    item: Item;

    showForm: boolean = false;
    buttonActive = "See Items";
    formActive: boolean = false;

    assortments: Assortment[];

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
            (assortment) => {
                this.assortments.push(assortment),
                console.log(assortment)
            }
        )
    }

    onItemSubmit(form: NgForm) {

        this.inventoryService.updatingItem(form.value).subscribe(
            (response) => console.log(response)
        )
        /*
        const newItem = new Item(
            form.value.assortment, 
            form.value.itemNumber, 
            form.value.description,
            form.value.quantity
            )
        this.inventoryService.addingItems(newItem).subscribe(
            (response) => console.log(response)
        )
        this.assortments.filter(
            assortment => {
                assortment.assortmentNumber = newItem.assortment;
                assortment.items.push(newItem);
            }
        )
        */
    }
    //Template related code
    activate(assortment: Assortment) {
        assortment.isShown = !assortment.isShown;
    }

    onQuantity(item: Item) {
         item.isShown = !item.isShown;
         this.inventoryService.editItem(item)
    }

    //Deleting assortment
    deleteAssortment(assortment: Assortment) {
        this.inventoryService.deleteAssortment(assortment).subscribe(
            (response) => console.log(response)
        )
    }

    //Deleting an Item
    onDeleteItem(item: Item) {
        this.inventoryService.deleteItem(item).subscribe(
            (response) => console.log(response)
        )
    }

}
