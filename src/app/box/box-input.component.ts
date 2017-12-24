import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BoxService } from './box.service';
import { Box } from './box.model';
import { Employee } from './employee.model';

@Component({
    selector: 'app-box-input',
    templateUrl: './box-input.component.html',
    styleUrls: ['./box-input.component.css']
})
export class BoxInputComponent {

    employees: Employee[];
    boxes: Box[];

    constructor(private boxService: BoxService) {}

    getEmployees(){
        this.boxService.getEmployees().subscribe(
            (employees: Employee[]) => {
                this.employees = employees;
            }
        );
    }

    ngOnInit(){
        this.getEmployees();
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