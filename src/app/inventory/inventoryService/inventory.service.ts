import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Assortment } from '../models/assortment.model';
import { Item } from '../models/item.model';

import 'rxjs/Rx';
import { Observable, Subject } from "rxjs";

@Injectable()
export class InventoryService {

    //assortmentEdit = new Subject<Assortment>();

    url: string = 'http://localhost:3000/inventory/';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

    httpOptionsUpload = {
        headers: new HttpHeaders({
            'Content-type': 'multipart/form-data'
        })
    };

    constructor(private httpClient: HttpClient) {}

    // POST request for Assortment
    addAssortment(assortment: Assortment) {
        return this.httpClient.post(this.url + 'newAssortment', assortment, this.httpOptions);
    }

    // GET request for Assortment
    getAssortments(): Observable<Assortment[]> {
        return this.httpClient.get<Assortment[]>(this.url + 'assortments');
    }

    // DELETE request for an Assortment
    deleteAssortment(assortment: Assortment) {
        return this.httpClient.delete(this.url + 'assortments/' + assortment._id);
    }

    // UPDATE request for an Assortment
    updateAssortment(assortment: Assortment) {
        return this.httpClient.put(this.url + 'assortments/' + assortment._id, assortment, this.httpOptions);
    }

    // Getting assortment by id 
    getAssortment(id: string): Observable<Assortment> {
        return this.httpClient.get<Assortment>(this.url + 'assortments/' + id + '/detail');
    }

    // Calling next on Assortment Subject
    /*
    editAssortment(assortment: Assortment) {
        this.assortmentEdit.next(assortment);
    }
    */

    /////////////////////////////////////////////////////////////////////////////////////////////////

    // POST request for Item
    addItem(item: Item): Observable<Item> {
        return this.httpClient.post<Item>(this.url + 'newItem', item, this.httpOptions);
    }

    // GET items per assortment
    getItems(id: string) {
        return this.httpClient.get(this.url + 'assortments/' + id + '/details');
    }

    updateItem(item: Item): Observable<Item> {
        return this.httpClient.put<Item>(this.url + 'items/' + item._id + '/update', item, this.httpOptions);
    }

    uploadImage(image: FormData): Observable<FormData> {
        return this.httpClient.post<FormData>(this.url + 'newItem', image);
    }
 }
