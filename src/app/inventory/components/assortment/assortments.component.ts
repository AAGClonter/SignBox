import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { InventoryService } from '../../inventory.service';

import { Assortment } from '../../assortment.model';
import { Item } from '../../item.model';

@Component({
    selector: 'app-inventory-assortments',
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
export class AssortmentsComponent implements OnInit {

    items: Item[];
    assortments: Assortment[];

    checkboxSelected: boolean = false;

    constructor(private inventoryService: InventoryService) {}

    ngOnInit() {
        this.gettingAssortments();
    }
    // Data requests
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
    // Getting Items by Assortment
    gettingItems(assortment: Assortment) {
        this.inventoryService.gettingItems().subscribe(
            items => {
                this.items === assortment.items;
                return this.items;
            }
        );
    }
    // POST new Assortment
    onSubmit(form: NgForm) {
        const newAssortment: Assortment = {
          assortmentNumber: form.value.assortmentNumber,
          description: form.value.description,
          isSelected: false
        }
        this.inventoryService.addingAssortments(newAssortment).subscribe(
            (assortment: Assortment) => {
                this.assortments.push(assortment['obj']);
                console.log(assortment);
            }
        )
        form.reset();
    }
    // Updating item
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
    // Creating new item
    onSubmitNewItem(form: NgForm, assortment: Assortment) {
        const newItem = new Item(
            form.value.assortment,
            form.value.itemNumber,
            form.value.description,
            form.value.quantity,
            Date.now()
            )
            this.inventoryService.addingItem(newItem, assortment).subscribe(
                data => {
                    assortment.items.push(newItem);
                    console.log(data);
                }
            )
        form.reset();
    }
    // Template related code
    activate(assortment: Assortment) {
        assortment.isShown = !assortment.isShown;
    }

    onQuantity(item: Item) {
         item.isShown = !item.isShown;
    }

    onAddItem(assortment: Assortment) {
        assortment.onAddingItem = !assortment.onAddingItem;
    }

    togglePrepared(item: Item) {
        item.prepared = !item.prepared;
        console.log(item.prepared)
    }

    // Deleting assortment
    deleteAssortment(assortment: Assortment) {
        this.inventoryService.deleteAssortment(assortment).subscribe(
            (response) => {
                console.log(response)
            }
        )
    }

    // Deleting an Item
    onDeleteItem(assortment: Assortment, item: Item) {
        this.inventoryService.deleteItem(assortment, item).subscribe(
            (response) => console.log(response)
        )
    }

    onPick(assortment: Assortment) {
      if (this.checkboxSelected) {
        this.inventoryService.onSelectAssortment(assortment)
      }
    }

}
