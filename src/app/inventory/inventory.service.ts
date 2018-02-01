import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from './item.model';
import { Assortment } from './assortment.model';

@Injectable()
export class InventoryService {
    
    private items: Item[] = [];
    private assortments: Assortment[] = [];
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

    //Getting all assortments
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
    //Getting the items
    gettingItems(assortment: Assortment) {
        return this.httpClient.get<Item[]>(this.inventoryUrl + '/item/' + assortment.assortmentNumber)
                            .map(
                                (items) => {
                                    this.items = items['items']
                                    return items['items']
                                }
                            ).pipe(
                                catchError(this.handleError('gettingItems', []))
                            )
    }
    
    getAllItems(){
        return this.httpClient.get<Item[]>(this.inventoryUrl + '/items')
                                .map(
                                    (items) => {
                                        this.items = items['items']
                                        return items['items']
                                    }
                                )
    }

    //Adding more items
    addingItems(item: Item): Observable<Item> {
        return this.httpClient
                    .post<Item>(this.inventoryUrl + '/newItem', item, this.httpOptions)
                    .pipe(
                        catchError(this.handleError<Item>('addingItems'))
                    )
    }

    //Adding an assortment
    addingAssortments(assortment: Assortment): Observable<Assortment> {
        return this.httpClient
                    .post<Assortment>(this.inventoryUrl + '/assortments', assortment, this.httpOptions)
                    .pipe(
                        catchError(this.handleError<Assortment>('addingAssortments'))
                    )
    }

    //Updating the quantity of a particular item
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

    //Deleting an assormtent
    deleteAssortment(assortment: Assortment): Observable<Assortment>{
        this.assortments.splice(this.assortments.indexOf(assortment), 1)
        return this.httpClient
                    .delete<Assortment>(this.inventoryUrl + '/assortments/' + assortment._id, this.httpOptions)
                    .pipe(
                        catchError(this.handleError<Assortment>('deleteAssortment'))
                    )
    }

    //Deleting an item
    deleteItem(assortment: Assortment, item: Item): Observable<any>{
        assortment.items.splice(assortment.items.indexOf(item), 1)
        return this.httpClient.post<any>(this.inventoryUrl + '/assortments/' + item._id, item, this.httpOptions)
            
    }

    //Searching Items for the SignOut
    /* GET heroes whose name contains search term */
searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<Item[]>(this.inventoryUrl + `/?description=${term}`).pipe(
      catchError(this.handleError<Item[]>('searchHeroes', []))
    );
  }
}