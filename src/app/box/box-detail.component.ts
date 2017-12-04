import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';

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

    @Input() employee: Employee;

    ngOnInit() {
         this.route.params
            .switchMap((params: Params) => this.boxService.getEmployee(params['id']))
            .subscribe(employee => this.employee = employee);
    }
    
    goBack(): void {
        this.location.back();
    }

   onSubmit(form: NgForm){
       const erasedBox = new ErasedBox(this.employee.box, form.value.signedBy);
       this.boxService.eraseBox(this.employee, erasedBox)
                        .subscribe(
                            result => console.log(result)
                        );
        this.boxService.deleteBox(this.employee.box, this.employee)
                        .subscribe(
                            result => console.log(result)
                        );
        this.router.navigateByUrl('/boxes');
   }
}
   
