import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Order } from './models/order.model';
import { InventoryService } from '../inventory/inventoryService/inventory.service';
import { Item } from '../inventory/models/item.model';
import { of } from '../../../node_modules/rxjs/observable/of';
import { catchError } from '../../../node_modules/rxjs/operators';

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

    addItemsToOrder(order: Order): Observable<Order> {
        return this.httpClient.put<Order>(this.url + '/' + order._id + '/order', order, this.httpOptions);
    }

    deleteOrder(id: string): Observable<Order> {
        return this.httpClient.delete<Order>(this.url + '/' + id + '/order', this.httpOptions);
    }

    // Searching items 
    searchItems(term: string): Observable<Item[]> {
        if (!term.trim()) {
            return of([]);
        }

        return this.httpClient.get<Item[]>(`${this.itemsUrl}/?description=${term}`).pipe(
            catchError(this.handleError<Item[]>('searchItems', []))
        );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}
