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

    constructor(private httpClient: HttpClient) {}

    // POST request for Assortment
    addAssortment(assortment: Assortment) {
        return this.httpClient.post(this.url + 'newAssortment', assortment, this.httpOptions);
    }

    // GET request for Assortment
    getAssortments() {
        return this.httpClient.get(this.url + 'assortment');
    }

    // DELETE request for an Assortment
    deleteAssortment(assortment: Assortment) {
        return this.httpClient.delete(this.url + 'assortment/' + assortment._id);
    }

    // UPDATE request for an Assortment
    updateAssortment(assortment: Assortment) {
        return this.httpClient.put(this.url + 'assortment/' + assortment._id, assortment, this.httpOptions);
    }

    // Getting assortment by id 
    getAssortment(id: string) {
        return this.httpClient.get(this.url + 'assortment/' + id);
    }

    // Calling next on Assortment Subject
    /*
    editAssortment(assortment: Assortment) {
        this.assortmentEdit.next(assortment);
    }
    */

    /////////////////////////////////////////////////////////////////////////////////////////////////

    // POST request for Item
    addItem(item: Item, assortment: Assortment) {
        return this.httpClient.post(this.url + 'assortment/' + assortment._id +  '/newItem', item, this.httpOptions);
    }
 }
