import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Assortment } from '../models/assortment.model';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class InventoryService {

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
 }
