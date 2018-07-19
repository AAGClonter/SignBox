import { Component, Input, OnInit } from '@angular/core';
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
    items: Item[];

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private location: Location
    ) {}

    ngOnInit() {
        this.getOrder();
        this.getItems();
    }

    getOrder(): void {
        this.route.params
            .switchMap((params: Params) => this.orderService.getOrder(params['id']))
            .subscribe((order: Order) => {
                this.order = order['obj']
            });
    }

    getItems() {
        this.orderService.getItems().subscribe((items: Item[]) => {
            this.items = items['obj'];
        })
    }

    onBack() {
        this.location.back()
    }
}