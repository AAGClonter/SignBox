import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from './item.model';
import { Assortment } from './assortment.model';
import { HttpResponse } from '@angular/common/http/src/response';

@Injectable()
export class InventoryService {

    private items: Item[] = [];
    private assortments: Assortment[] = [];
    selectedAssortments: Assortment[] = [];
    selectedItems: Item[] = [];

    private inventoryUrl: string = 'http://localhost:3000/inventory';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

    itemIsEdit = new EventEmitter<Item>();

    constructor(private httpClient: HttpClient) {}

    // Getting all assortments
    getAssortments(): Observable<Assortment[]> {
        return this.httpClient.get<Assortment[]>(this.inventoryUrl + '/assortments')
                            .map(
                                (assortments) => {
                                    this.assortments = assortments['assortments'];
                                    return assortments['assortments'];
                                }
                            ).pipe(
                                catchError(this.handleError('getAssortments', []))
                            )
    }
    // Getting the items
    gettingItems(): Observable<Item[]> {
        return this.httpClient.get<Item[]>(this.inventoryUrl + '/items')
                            .map(
                                (items) => {
                                    this.items = items['items']
                                    return items;
                                }
                            )
                            .pipe(
                                catchError(this.handleError('gettingItems', []))
                            )
    }

    // Adding more items
    addingItems(item: Item, assortment: Assortment): Observable<Item> {
        const body = JSON.stringify(item);
        return this.httpClient
                    .post<Item>(this.inventoryUrl + '/newItem', body, this.httpOptions)
                    .map(
                        data => {
                            return data;
                        }
                    )
                    .pipe(
                        catchError(this.handleError<Item>('addingItems', item))
                    )
    }

    // Adding an assortment
    addingAssortments(assortment: Assortment): Observable<Assortment> {
        const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
        return this.httpClient
                    .post<Assortment>(this.inventoryUrl + '/assortments' + token, assortment, this.httpOptions)
                    .pipe(
                        catchError(this.handleError<Assortment>('addingAssortments'))
                    )
    }

    // Updating the quantity of a particular item
    updatingItem(item: Item): Observable<Item> {
        return this.httpClient
            .patch<Item>(this.inventoryUrl + '/assortments', item, this.httpOptions)
            .pipe(
                catchError(this.handleError<any>('updatingItem'))
            )
    }

    editItem(item: Item) {
        this.itemIsEdit.emit(item);
    }

    // Deleting an assormtent
    deleteAssortment(assortment: Assortment): Observable<Assortment>{
        this.assortments.splice(this.assortments.indexOf(assortment), 1)
        return this.httpClient
                    .delete<Assortment>(this.inventoryUrl + '/assortments/' + assortment._id, this.httpOptions)
                    .pipe(
                        catchError(this.handleError<Assortment>('deleteAssortment'))
                    )
    }

    // Deleting an item
    deleteItem(assortment: Assortment, item: Item): Observable<any>{
        assortment.items.splice(assortment.items.indexOf(item), 1)
        return this.httpClient.post<any>(this.inventoryUrl + '/assortments/' + item._id, item, this.httpOptions)

    }

    // Searching Items for the SignOut
    /* GET item whose description contains search term */
searchItems(term: string): Observable<Item[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('description', term) } : {};

    return this.httpClient.get<Item[]>(this.inventoryUrl + '/preparedItems', options).pipe(
      catchError(this.handleError<Item[]>('searchItems', []))
    );
  }

  onSelectAssortment(assorment: Assortment) {
    this.selectedAssortments.push(assorment);
  }
}
