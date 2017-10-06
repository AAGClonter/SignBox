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
     box$: Observable<Box>;
     id: string;

    constructor(private boxService: BoxService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {}

    ngOnInit(): void {
        
       this.box$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.boxService.getBox(params.get('id')));
      
      /*
      this.route.params
                .subscribe(
                    (params: Params) => {
                       this.box = this.boxService.getBox(params['id']);
                    }
                );
                */
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
       const erasedBox = new ErasedBox(this.box.tracking, this.box.addressedTo, form.value.signedBy);
       this.boxService.eraseBox(this.box, erasedBox)
                      .subscribe(
                          data => console.log(data),
                          error => console.error(error)
                      );
        this.boxService.deleteBox(this.box)
                        .subscribe((response: Response) => {
                            result => console.log(result);
                        })
   }
   */
}
   
