import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { BoxService } from './box.service';
import { Box } from './box.model';
import { Employee } from './employee.model';
import { BoxForm } from './box.model';

import 'rxjs/Rx';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/switchMap';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css'],
    animations: [
        trigger('boxEnter', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100px)'
                }),
                animate(500)
            ])
        ])
    ]
})
export class BoxComponent implements OnInit {

    boxForm = this.formBuilder.group({
        tracking: new FormControl(),
        addressedTo: new FormControl(),
        anotherBox: this.formBuilder.array([
             this.formBuilder.control('')
         ])
    });

    box: Box;
    boxes: Box[];
    employees: Employee[];

    boxSubscription: Subscription;
    displayedColumns: string[] = ['number', 'tracking', 'employee', 'actions'];

    constructor(private boxService: BoxService,
                private route: Router,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute
            ) {
            }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data: Data) => {
            this.boxes = data['boxes'];
        })
        this.getEmployees();
    }


    get anotherBox(): FormArray {
        return this.boxForm.get('anotherBox') as FormArray;
    }

    addFormBox() {
        this.anotherBox.push(this.formBuilder.control(''))
    }
    
     getBoxes() {
        this.boxService.getBoxes().subscribe(
            (boxes: Box[]) => {
                this.boxes = boxes;
            }
        );
    }

    getEmployees() {
        this.boxService.getEmployees().subscribe(
            (employees: Employee[]) => {
                this.employees = employees;
            }
        );
    }

    onSubmit(form: NgForm) {
        // if (this.box) {
        //     this.box.tracking = form.value.tracking;
        //     this.box.addressedTo = form.value.addressedTo;
        //     this.boxService.patchBox(this.box).subscribe(
        //         data => console.log(data),
        //         error => console.error(error)
        //     );
        // } else {
        //     const box = new Box(form.value.tracking, form.value.addressedTo);
        //     this.boxService.signinBox(box).subscribe(
        //         data => {
        //             this.boxes.push(data);
        //         },
        //         error => console.error(error)
        //     );
        //     form.resetForm();
        // }
        console.log(form.value);
    }

    onSubmitEmployee(form: NgForm) {
        const employee = new Employee(form.value.name, form.value.email)
        this.boxService.createEmployee(employee).subscribe(
            data => { this.employees.push(data) },
            error => { console.error(error) }
        )
    }

    editBox(boxToEdit: Box) {
        this.box = boxToEdit;
    }
}


