import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { NgForm } from '@angular/forms';

import { InventoryService } from '../inventoryService/inventory.service';
import { Assortment } from '../models/assortment.model';
import { Order } from '../../order/models/order.model';
import { OrderService } from '../../order/order.service';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {

    assortment: Assortment;
    order: Order;
    assortments: Assortment[];
    panelOpenState: boolean = false;
    orders: Order[];
    isActive: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private inventoryService: InventoryService,
        private router: Router,
        private orderService: OrderService
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            this.assortments = data['assortments'].obj;
        });
        
        this.getOrders();
    }

    // GET all orders
    getOrders() {
        this.orderService.getOrders().subscribe((orders: Order[]) => {
            this.orders = orders['obj']
            console.log(orders);
        });
    }

    // Form submit function 
    assortmentSubmit(form: NgForm) {
        if (this.assortment) {
            this.assortment.assortmentNumber = form.value.assortment
            this.assortment.description = form.value.description

            this.inventoryService.updateAssortment(this.assortment).subscribe(
                data => console.log(data)
            );
        } else {
            let newAssortment = new Assortment(
                form.value.assortment,
                form.value.description
            );
            this.inventoryService.addAssortment(newAssortment).subscribe((data: Assortment) => {
                this.assortments.push(data['obj']);
                console.log(data);
            });
        }
    }

    orderSubmit(form: NgForm) {
        let newOrder: Order = {
            orderNumber: form.value.orderNumber,
            requestedBy: form.value.requestedBy,
            retailer: form.value.retailer,
            boxWidth: form.value.boxWidth,
            boxLength: form.value.boxLength,
            boxHeight: form.value.boxHeight
        }

        this.orderService.addOrder(newOrder).subscribe((order: Order) => {
            this.orders.push(order['obj']);
            console.log(order);
        });

        form.reset()
    }

    // Delete an assortment
    onDelete(assortment: Assortment) {
        this.inventoryService.deleteAssortment(assortment).subscribe(data => {
            this.assortments.splice(this.assortments.indexOf(assortment), 1);
            console.log(data);
        })
    }

    onDeleteOrder(ordertem: Order) {
        this.orderService.deleteOrder(ordertem._id).subscribe((order: Order) => {
            this.orders.splice(this.orders.indexOf(ordertem), 1);
            console.log(order);
        })
    }

    // Update an assortment
    onUpdate(assortment: Assortment) {
        this.assortment = assortment;
    }

    // Click event to navigate to Detail View of the assortment
    onGoToDetail(assortment: Assortment) {
        this.router.navigate(['assortment', assortment._id, 'detail']);
    }

    goToOrder(order: Order) {
        this.router.navigate(['order', order._id, 'order']);
    }

    onUpdateOrder(order: Order) {
        this.isActive = true;
        this.order = order;
    }

    addItem() {
        this.isActive = !this.isActive;
    }

    cancelEdit() {
        this.assortment = null;
    }

    cancelOrderEdit() {
        this.order = null;
        this.isActive = false;
    }

}
