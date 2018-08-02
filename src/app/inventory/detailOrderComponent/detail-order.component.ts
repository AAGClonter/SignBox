import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from '../../order/models/order.model';
import { OrderService } from '../../order/order.service';
import { Location } from '@angular/common';
import { Item } from '../models/item.model';

@Component({
    selector: 'app-detail-order',
    templateUrl: './detail-order.component.html'
})
export class DetailOrderComponent implements OnInit {

    @Input() order: Order;

    addItem: boolean = false;
    items: Item[];
    selectedItems: Item[] = [];

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private location: Location
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
        this.orderService.addItemsToOrder(this.order, this.selectedItems).subscribe((itemsSent: Item[]) => {
            this.order.items = itemsSent;
            console.log(itemsSent);
        })
    }

    addItemsToOrderForm(form: NgForm, item: Item) {
        item.quantity = form.value.qtyToAdd;
        this.selectedItems.push(item);
        console.log(this.selectedItems);
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