import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { BoxService } from './box.service';
import { Box } from './box.model';
import { Employee } from './employee.model';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css'],
})
export class BoxComponent implements OnInit{
     
     employees: Employee[];

    constructor(private boxService: BoxService,
                private route: Router){}
   
    getBoxes() {
        this.boxService.getBoxes().subscribe(
            (employees: Employee[]) => {
                this.employees = employees;
            }
        );
    }

    ngOnInit(){
        this.getBoxes();
    }
    
}


