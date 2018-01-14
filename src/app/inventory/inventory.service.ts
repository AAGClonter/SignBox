import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from './item.model';
import { Assortment } from './assortment.model';

@Injectable()
export class InventoryService {
    
    private items: Item[] = [];
    private assortments: Assortment[] = [];
    
    constructor(private httpClient: HttpClient) {}

    //Getting all assortments
    getAssortments(): Observable<Assortment[]> {
        return this.httpClient.get<Assortment[]>('http://localhost:3000/inventory/assortments')
                            .map(
                                (assortments) => {
                                    return assortments['assortments'];
                                }
                            )
    }
}