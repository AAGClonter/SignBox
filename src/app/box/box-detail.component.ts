import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, Params, Data } from '@angular/router';

import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import 'rxjs/add/operator/switchMap';

import { Box } from './box.model';
import { Employee } from './employee.model';

import { ErasedBox } from './erasedBox.model';
import { BoxService } from './box.service';

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

    @Input() box: Box;

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            this.box = data['box']
        });
    }
    
    goBack(): void {
        this.location.back();
    }

   onSubmit(form: NgForm){
       const erasedBox = new ErasedBox(this.box, form.value.signedBy);
        this.boxService.eraseBox(this.box, erasedBox)
                        .subscribe(
                            result => console.log(result)
                        );
        this.boxService.deleteBox(this.box)
                        .subscribe(
                            result => console.log(result)
                        );
        this.router.navigateByUrl('/boxes');
   }
}
   
