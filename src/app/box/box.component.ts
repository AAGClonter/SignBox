import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
     
     boxes: Box[];
     employees: Employee[];

    constructor(private boxService: BoxService,
                private route: Router){}

    ngOnInit(){
        this.getBoxes();
        this.getEmployees();
    }

     getBoxes() {
        this.boxService.getBoxes().subscribe(
            (boxes: Box[]) => {
                this.boxes = boxes;
            }
        );
    }

    getEmployees(){
        this.boxService.getEmployees().subscribe(
            (employees: Employee[]) => {
                this.employees = employees;
            }
        );
    }

    onSubmit(form: NgForm) {
            const box = new Box(form.value.tracking, form.value.addressedTo);
            this.boxService.signinBox(box).subscribe(
            box => {
                this.boxes.push(box);
            },
            error => console.error(error)
        );
        
        form.resetForm();
    }
    
}


