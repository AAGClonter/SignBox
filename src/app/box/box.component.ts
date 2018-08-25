import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { NgForm, FormControl, Validators } from '@angular/forms';
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

    box: Box;
    boxForm: FormGroup; // Form property
    group: FormGroup; // Form group that will be added
    boxes: Box[]; // Array of boxes already saved 
    employees: Employee[]; // Array of active employees

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
            this.boxes = data['boxes']['obj'];
        });

        this.getEmployees(); // Getting existing Employees

        // Creating the form 
        this.boxForm = this.formBuilder.group({
            'boxData': new FormGroup({
                'tracking': new FormControl(null, Validators.required),
                'addressedTo': new FormControl(null, Validators.required)
            }),
            'boxes': new FormArray([])
        });
    }

    // Getting all employees, a resolver will be used in the future
    getEmployees() {
        this.boxService.getEmployees().subscribe(
            (employees: Employee[]) => {
                this.employees = employees;
            }
        );
    }

    onSubmit() {
        const box = new Box(this.boxForm.get('boxData').value.tracking, this.boxForm.get('boxData').value.addressedTo);
        this.boxService.signinBox(box).subscribe(data => {
            this.boxes.push(data['obj']);
            console.log(data);
            console.log(this.boxForm.get('boxes'));
        }, error => {
            console.log(error);
        });
        this.boxForm.reset();
        console.log(this.boxForm.value.addressedTo);
    }

    onSubmitEmployee(form: NgForm) {
        const employee = new Employee(form.value.name, form.value.email)
        this.boxService.createEmployee(employee).subscribe(
            data => { this.employees.push(data) },
            error => { console.error(error) }
        )
    }

    onAddBoxes() {
        let control = new FormControl(null, Validators.required);
        (<FormArray>this.boxForm.get('boxes')).push(control);
    }

    editBox(boxToEdit: Box) {
        this.box = boxToEdit;
    }
}


