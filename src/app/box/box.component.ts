import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { BoxService } from './box.service';
import { Box } from './box.model';
import { Employee } from './employee.model';

import 'rxjs/Rx';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/switchMap';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Shipment } from './shipment.model';

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
export class BoxComponent implements OnInit, OnDestroy {

    box: Box;
    boxForm: FormGroup; // Form property
    group: FormGroup; // Form group that will be added
    boxes: Box[]; // Array of boxes already saved 
    employees: Employee[]; // Array of active employees
    shipments: Shipment[];

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
        console.log(this.boxes);
        this.getEmployees(); // Getting existing Employees

        // Creating the form 
        this.boxForm = this.formBuilder.group({
            from: this.formBuilder.control(''),
            addressedTo: this.formBuilder.control(''),
            numberOfBoxes: this.formBuilder.control(''),
            masterTracking: this.formBuilder.control(''),
            tracking: this.formBuilder.array([
                this.formBuilder.control('')
            ]),
            addressed: this.formBuilder.array([
                this.formBuilder.control('')
            ])
        });

        this.boxSubscription = this.boxService.boxIsErased.subscribe(erasedBox => {
            let boxToErase = this.boxes.filter(box => {
                return box._id === erasedBox._id;
            });
            this.boxes.splice(this.boxes.indexOf(boxToErase[0]), 1);
        });

        this.boxService.getShipments().subscribe(data => {
            this.shipments = data;
            console.log(this.shipments);
        });
    }

    ngOnDestroy() {
        this.boxSubscription.unsubscribe();
    }
    // Getting all employees, a resolver will be used in the future
    getEmployees() {
        this.boxService.getEmployees().subscribe(
            (employees: Employee[]) => {
                this.employees = employees['obj'];
            }
        );
    }

    onSubmit() {
        let from = this.boxForm.get('from').value;
        let addressedTo = this.boxForm.get('addressedTo').value;
        let numberOfBoxes = this.boxForm.get('numberOfBoxes').value;
        let masterTracking = this.boxForm.get('masterTracking').value;

        let trackings = this.boxForm.get('tracking').value;
        let people = this.boxForm.get('addressed').value;
        
        for (let i = 0, j = 0; i < trackings.length, j < people.length; i++, j++) {
            let box = new Box(trackings[i], people[j], this.boxForm.get('masterTracking').value);
            this.boxService.signinBox(box).subscribe((data: Box) => {
                console.log(data);
            });
        }

        let newShipment: Shipment = {
            from: from,
            addressedTo: addressedTo,
            numberOfBoxes: numberOfBoxes,
            masterTracking: masterTracking
        }

        this.boxService.addShipment(newShipment).subscribe(data => {
            console.log(data);
            console.log(masterTracking);
        });
    }

    onSubmitEmployee(form: NgForm) {
        const employee = new Employee(form.value.name, form.value.email)
        this.boxService.createEmployee(employee).subscribe(
            data => { this.employees.push(data['obj']) },
            error => { console.error(error) }
        )
    }

    onAddBoxes() {
        let trackingControl = new FormControl(null);
        let addressedToControl = new FormControl(null);
        (<FormArray>this.boxForm.get('tracking')).push(trackingControl);
        (<FormArray>this.boxForm.get('addressed')).push(addressedToControl);
    }

    editBox(boxToEdit: Box) {
        this.box = boxToEdit;
    }

    getBoxesFromShipment(shipment: Shipment) {
        this.boxService.getBoxesFromShipment(shipment).subscribe(data => {
            console.log(data);
        });
    }
}


