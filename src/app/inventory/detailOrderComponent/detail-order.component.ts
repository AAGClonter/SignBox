import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from '../../order/models/order.model';
import { OrderService } from '../../order/order.service';

@Component({
    selector: 'app-detail-order',
    templateUrl: './detail-order.component.html'
})
export class DetailOrderComponent implements OnInit {

    @Input() order: Order;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService
    ) {}

    ngOnInit() {
        this.getOrder();
    }

    getOrder(): void {
        this.route.params
            .switchMap((params: Params) => this.orderService.getOrder(params['id']))
            .subscribe((order: Order) => {
                this.order = order;
            });
    }
}