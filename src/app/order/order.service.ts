import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Order } from './models/order.model';

@Injectable()
export class OrderService {

    url: string = 'http://localhost:3000/order';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {}

    // GET request for Orders
    getOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(this.url);
    }

    // POST request for new order
    addOrder(order: Order): Observable<Order> {
        return this.httpClient.post<Order>(this.url, order, this.httpOptions);
    }
}