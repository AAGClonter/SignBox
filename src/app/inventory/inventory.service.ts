import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from './item.model';
import { Assortment } from './assortment.model';

@Injectable()
export class InventoryService {
    
    private items: Item[] = [];
    private assortments: Assortment[] = [];
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };

    itemIsEdit = new EventEmitter<Item>();
    
    constructor(private httpClient: HttpClient) {}

    //Getting all assortments
    getAssortments(): Observable<Assortment[]> {
        return this.httpClient.get<Assortment[]>('http://localhost:3000/inventory/assortments')
                            .map(
                                (assortments) => {
                                    this.assortments = assortments['assortments'];
                                    return assortments['assortments'];
                                }
                            )
    }

    //Adding more items
    addingItems(item: Item): Observable<Item> {
        return this.httpClient.post<Item>('http://localhost:3000/inventory/newItem', item, this.httpOptions)
    }

    //Adding an assortment
    addingAssortments(assortment: Assortment): Observable<Assortment> {
        return this.httpClient.post<Assortment>('http://localhost:3000/inventory/assortments', assortment, this.httpOptions)
                              .map((assortment) => {
                                  this.assortments.push(assortment);
                                  return assortment;
                              })
    }
    //Updating the quantity of a particular item
    updatingItem(item: Item): Observable<Item> {
        return this.httpClient.patch<Item>('http://localhost:3000/inventory/assortments', item, this.httpOptions)
    }

    editItem(item: Item) {
        this.itemIsEdit.emit(item);
    }
}