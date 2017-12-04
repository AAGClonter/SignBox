import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Box } from './box.model';
import { ErasedBox } from './erasedBox.model';
import { Email } from './email.model';
import { Employee } from './employee.model';

@Injectable()
export class BoxService {
    
     private boxes: Box[] = [];
     private employees: Employee[] = [];

    constructor(private httpClient: HttpClient, private http: Http) {}

    signinBox(box: Box, employee: Employee) {
        const body = JSON.stringify(box);
        const headers = new Headers({'Content-type': 'application/json'});
        const token = localStorage.getItem('token') 
        ? '?token=' + localStorage.getItem('token')
        : '';
        return this.http.post('http://localhost:3000/boxsignin' + token, body, {headers: headers})
                    .map((response: Response) => {
                        const result = response.json();
                        const box = new Box(
                            result.obj.tracking,
                            result.obj.addressedTo,
                            result.obj._id,
                            result.obj.user._id
                        );
                        const employee = new Employee(
                            result.obj.addresssedTo,
                            box,
                            result.obj._id
                        )
                        this.boxes.push(box);
                        this.employees.push(employee);
                        return box && employee;
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
    }
    getBoxes(){
        return this.http.get('http://localhost:3000/boxes')
                .map((response: Response) => response.json().obj)
                .catch((error: Response) => Observable.throw(error.json()));
    }
    // Getting a box
    getBox(id: string) {
        return this.http.get('http://localhost:3000/boxtosignout/' + id)
                        .map((response: Response) => response.json().obj)
                        .catch((error: Response) => Observable.throw(error.json()));
    }

    getEmployee(id: string) {
        return this.http.get('http://localhost:3000/boxtonotify/' + id + '/boxnotify')
                        .map((response: Response) => response.json().obj)
                        .catch((error: Response) => Observable.throw(error.json()));
    }

    patchBox(box: Box) {
        const body = JSON.stringify(box);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.patch('http://localhost:3000/boxes/' + box._id, body, {headers: headers})
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
    }
// NOTE FOR LATER
// CREATE HEADERS OBJECT, CREATE NEW ERASED BOX WITH THE BOX INFORMATION
    deleteBox(box: Box, employee: Employee){
        this.boxes.splice(this.boxes.indexOf(box), 1);
        //const token = localStorage.getItem('token') 
        //? '?token=' + localStorage.getItem('token')
        //: '';
        return this.http.delete('http://localhost:3000/boxtosignout/' + employee._id + '/boxsignout'/*+ token*/)
            .map((response: Response) => response.json().obj)
            .catch((error: Response) => Observable.throw(error.json()));
    }
    
    eraseBox(employee: Employee, erasedBox: ErasedBox){
        const body = JSON.stringify(erasedBox);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/boxtosignout/' + employee._id + '/boxsignout', body, {headers: headers})
                        .map((response: Response) => {
                            const result = response.json();
                            const erasedBox = new ErasedBox(
                                employee.box,
                                result.obj.signedBy,
                                result.obj._id
                            );
                            return erasedBox;
                        })
                        .catch((error: Response) => Observable.throw(error.json()));
    }
    emailBox(employee: Employee){
        const body = JSON.stringify(employee);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/boxtonotify/' + employee._id + '/boxnotify', body, {headers: headers})
                        .map((response: Response) => {
                            const result = response.json();
                            const email = new Email(
                                employee.box.tracking,
                                employee.name
                            )
                            return email;
                        })
                        .catch((error: Response) => Observable.throw(error.json()));
    }
  //EMPLOYEES SECTION
   getEmployees(){
        return this.http.get('http://localhost:3000/employee')
                .map((response: Response) => response.json().obj)
                .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteEmployee(box: Box){
        return this.http.get('http://localhost:3000/boxtosignout/' + box._id + '/boxsignout')
                        .map((response: Response) => response.json().obj)
                        .catch((error: Response) => Observable.throw(error.json()));
    }
}


   