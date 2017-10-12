import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';

import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import 'rxjs/add/operator/switchMap';

import { Box } from './box.model';
import { ErasedBox } from './erasedBox.model';
import { BoxService } from './box.service';

@Component({
    selector: 'app-box-detail',
    templateUrl: 'box-detail.component.html'
})
export class BoxDetailComponent implements OnInit {
   
    constructor(private boxService: BoxService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {}

    @Input() box: Box;

    ngOnInit() {
         this.route.params
            .switchMap((params: Params) => this.boxService.getBox(params['id']))
            .subscribe(box => this.box = box);
    }
    
    goBack(): void {
        this.location.back();
    }
   
   deleteBox(box: Box){
        this.boxService.deleteBox(box)
                .subscribe((response: Response) => {
                    result => console.log(result);
                });
            this.router.navigateByUrl('/boxes');
   }
   /*
   onSubmit(form: NgForm){
        this.boxService.deleteBox(box)
                        .subscribe((response: Response) => {
                            result => console.log(result);
                        })
   }
   */
}
   
