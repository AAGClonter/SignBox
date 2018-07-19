import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Order } from './models/order.model';
import { InventoryService } from '../inventory/inventoryService/inventory.service';
import { Item } from '../inventory/models/item.model';

@Injectable()
export class OrderService {

    itemsUrl: string = 'http://localhost:3000/inventory/items'
    url: string = 'http://localhost:3000/order';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

    constructor(private httpClient: HttpClient, private inventoryService: InventoryService) {}

    // GET request for Orders
    getOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(this.url);
    }

    // POST request for new order
    addOrder(order: Order): Observable<Order> {
        return this.httpClient.post<Order>(this.url, order, this.httpOptions);
    }

    getOrder(id: string): Observable<Order> {
        return this.httpClient.get<Order>(this.url + '/' + id + '/order');
    }

    getItems(): Observable<Item[]> {
        return this.httpClient.get<Item[]>(this.itemsUrl);
    }
}