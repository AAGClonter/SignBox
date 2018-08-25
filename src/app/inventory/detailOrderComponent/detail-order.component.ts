import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from '../../order/models/order.model';
import { OrderService } from '../../order/order.service';
import { Location } from '@angular/common';
import { Item } from '../models/item.model';
import { InventoryService } from '../inventoryService/inventory.service';

@Component({
    selector: 'app-detail-order',
    templateUrl: './detail-order.component.html',
    styles: [`
        .order-class {
            width: 65%;
            margin-top: 20px;
        }
    `]
})
export class DetailOrderComponent implements OnInit {

    @Input() order: Order;

    addItem: boolean = false;
    items: Item[];
    selectedItems: Item[] = [];
    orderItems: Item[];
    itemsSearched: Item[];

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private location: Location,
        private inventoryService: InventoryService
    ) {}

    ngOnInit() {
        // GET items and order before view is loaded
        this.getItems();
        this.getOrder();
    }

    // GET the id of the order
    getOrder(): void {
        this.route.params
            .switchMap((params: Params) => this.orderService.getOrder(params['id']))
            .subscribe((order: Order) => {
                this.order = order['obj']
            });
    }

    // GET all items to populate items of an order
    getItems() {
        this.orderService.getItems().subscribe((items: Item[]) => {
            this.items = items['obj'];
            console.log(this.items);
        }, (error) => {
            console.log(error, "Error from get items")
        })
    }

    // This will add an item to the order loaded
    addItemsToOrder() {
        this.orderService.addItemsToOrder(this.order).subscribe((updatedOrder: Order) => {
            console.log(updatedOrder);
        });
    }

    addItemsToOrderForm(form: NgForm, item: Item) {
        let orderItem: Item = {
            itemNumber: item.itemNumber,
            assortment: item.assortment,
            description: item.description,
            quantity: form.value.qtyToAdd
        }
        item.quantity = item.quantity - form.value.qtyToAdd;
        this.inventoryService.updateItem(item).subscribe((data) => {
            console.log(data);
        });
        this.order.items.push(orderItem);
        console.log(this.selectedItems);
    }

    // Searching through items
    search(term: string) {
        this.itemsSearched = this.items.filter(item => {
            if(item.description.includes(term)) {
                return item;
            }
        });
        console.log(this.itemsSearched);
    }

    // Add item property change method
    settingAddItem() {
        this.addItem = !this.addItem;
    }

    // Navigates back 
    onBack() {
        this.location.back()
    }
}