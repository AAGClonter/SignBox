import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { BoxService } from './box.service';
import { Box } from './box.model';
import { Employee } from './employee.model';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-box-notify',
    templateUrl: './box-notify.component.html'
})
export class BoxNotifyComponent implements OnInit {
     @Input() employee: Employee;

    constructor(private boxService: BoxService,
                private route: ActivatedRoute,
                private location: Location) {}
    
    
    ngOnInit(): void {
        this.route.paramMap
                .switchMap((params: ParamMap) =>
                    this.boxService.getEmployee(params.get('id')))
                                .subscribe( employee => this.employee = employee);
    }

    sendEmail(employee: Employee){
        this.boxService.emailBox(employee).subscribe(
            data => console.log(data),
            error => console.error(error)
        )
    }

    goBack(){
        this.location.back();
    }
}