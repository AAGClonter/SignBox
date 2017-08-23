import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Box } from './box.model';
import { ErasedBox } from './erasedBox.model';
import { Email } from './email.model';

@Injectable()
export class BoxService {
    
    private boxes: Box[] = [];

    constructor(private httpClient: HttpClient, private http: Http) {}

    signinBox(box: Box) {
        const body = JSON.stringify(box);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/boxsignin', body, {headers: headers})
                    .map((response: Response) => {
                        const result = response.json();
                        const box = new Box(
                            result.obj.tracking,
                            result.obj.addressedTo,
                            result.obj.signedBy,
                            result.obj._id
                        );
                        this.boxes.push(box);
                        return box;
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
    }
    getBoxes() {
        return this.http.get('http://localhost:3000/boxes')
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }

    getBox(id: string) {
        return this.http.get('http://localhost:3000/boxtosignout/' + id)
                        .map((response: Response) => response.json())
                        .catch((error: Response) => Observable.throw(error.json()));
    }

    patchBox(box: Box) {
        const body = JSON.stringify(box);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.patch('http://localhost:3000/boxes/' + box.id, body, {headers: headers})
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteBox(box: Box){
        this.boxes.splice(this.boxes.indexOf(box), 1);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.delete('http://localhost:3000/boxtosignout/' + box.id, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    eraseBox(box: Box, erasedBox: ErasedBox){
        const body = JSON.stringify(box);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/boxtosignout/' + box.id, {headers: headers})
                        .map((response: Response) => {
                            const result = response.json();
                            const erasedBox = new ErasedBox(
                                box.tracking,
                                box.addressedTo,
                                result.obj.signedBy,
                                result.obj._id
                            );
                            return erasedBox;
                        })
                        .catch((error: Response) => Observable.throw(error.json()));
    }

    emailBox(box: Box){
        const body = JSON.stringify(box);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/boxtonotify/' + box.id, body, {headers: headers})
                        .map((response: Response) => {
                            const result = response.json();
                            const email = new Email(
                                result.obj.boxTracking,
                                result.obj.boxEmployee
                            )
                            return email;
                        })
                        .catch((error: Response) => Observable.throw(error.json()));
    }
  
}