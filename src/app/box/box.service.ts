import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable, Subject } from 'rxjs';

import { Box } from './box.model';
import { ErasedBox } from './erasedBox.model';
import { Email } from './email.model';
import { Employee } from './employee.model';
import { Shipment } from './shipment.model';

@Injectable()
export class BoxService {

    boxIsErased = new Subject<Box>();
    token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json'
        })
    }

     private boxes: Box[] = [];
     private employees: Employee[] = [];

    constructor(private httpClient: HttpClient, private http: Http) {}

    // POST request with httpClient
    signinBox(box: Box): Observable<Box> {
        return this.httpClient.post<Box>('http://localhost:3000/boxes' + this.token, box, this.httpOptions);
    }

    getBoxes(): Observable<Box[]> {
        return this.httpClient.get<Box[]>('http://localhost:3000/boxes' + this.token);
    }
    // Getting a box
    getBoxSignOut(id: string): Observable<Box> {
        return this.httpClient.get<Box>('http://localhost:3000/boxtosignout/' + id + '/boxsignout' + this.token);
    }

    getBoxNotify(id: string): Observable<Box> {
        return this.httpClient.get<Box>('http://localhost:3000/boxtonotify/' + id + '/boxnotify' + this.token);
    }

    patchBox(box: Box) {
        return this.httpClient.patch('http://localhost:3000/boxes/' + box._id + this.token, box, this.httpOptions)
    }

// NOTE FOR LATER
// CREATE HEADERS OBJECT, CREATE NEW ERASED BOX WITH THE BOX INFORMATION
    deleteBox(box: Box) {
        return this.httpClient.delete('http://localhost:3000/boxtosignout/' + box._id + '/boxsignout' + this.token);
    }

    eraseBox(box: Box, erasedBox: ErasedBox) {
        return this.httpClient.post('http://localhost:3000/boxtosignout/' + box._id + '/boxsignout' + this.token, erasedBox, this.httpOptions);
    }

    emailBox(box: Box) {
        const body = JSON.stringify(box);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/boxtonotify/' + box._id + '/boxnotify', body, {headers: headers})
                        .map((response: Response) => {
                            const result = response.json();
                            const email = new Email(
                                box.tracking,
                                box.addressed
                            )
                            return email;
                        })
                        .catch((error: Response) => Observable.throw(error.json()));
    }
  // EMPLOYEES SECTION
   getEmployees() {
        return this.httpClient.get('http://localhost:3000/employee');
    }

    createEmployee(employee: Employee) {
        return this.httpClient.post('http://localhost:3000/employees', employee, this.httpOptions)
    }

    deleteEmployee(box: Box) {
        return this.httpClient.get('http://localhost:3000/boxtosignout/' + box._id + '/boxsignout');
    }

    //// SHIPMENT NEW SECTION ////

    // POST request new shipment creation
    addShipment(shipment: Shipment) {
        return this.httpClient.post('http://localhost:3000/shipment' + this.token, shipment, this.httpOptions);
    }

    getShipments(): Observable<Shipment[]>{
        return this.httpClient.get<Shipment[]>('http://localhost:3000/shipment' + this.token);
    }

    getBoxesFromShipment(shipment: Shipment): Observable<Box[]> {
        return this.httpClient.get<Box[]>('http://localhost:3000/shipment/' + shipment.masterTracking + this.token);
    }
}
