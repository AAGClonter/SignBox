import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, Params, Data } from '@angular/router';

import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import 'rxjs/add/operator/switchMap';

import { Employee } from './employee.model';

import { ErasedBox } from './erasedBox.model';
import { BoxService } from './box.service';
import { Shipment } from './shipment.model';

@Component({
    selector: 'app-box-detail',
    templateUrl: 'box-detail.component.html',
    styles: [`
        .down {
            margin-top: 40px;
        }
    `]
})
export class BoxDetailComponent implements OnInit {
   
    constructor(private boxService: BoxService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {}

    @Input() shipment: Shipment;

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            this.shipment = data['box']['obj']
        });
    }
    
    goBack(): void {
        this.location.back();
    }

//    onSubmit(form: NgForm){
//        const erasedBox = new ErasedBox(this.box, form.value.signedBy);
//         this.boxService.eraseBox(this.box, erasedBox)
//                         .subscribe(
//                             result => console.log(result)
//                         );
//         this.boxService.deleteBox(this.box)
//                         .subscribe(
//                             result => {
//                                 this.boxService.boxIsErased.next(this.box);
//                                 console.log(result)
//                             }
//                         );
//         this.router.navigateByUrl('/boxes');
//    }
}
   
