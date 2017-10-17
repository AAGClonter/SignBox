import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BoxService } from './box.service';
import { Box } from './box.model';

@Component({
    selector: 'app-box-input',
    templateUrl: './box-input.component.html',
    styleUrls: ['./box-input.component.css']
})
export class BoxInputComponent {

    constructor(private boxService: BoxService) {}

    onSubmit(form: NgForm) {
        const box = new Box(form.value.tracking, form.value.addressedTo);
        this.boxService.signinBox(box).subscribe(
            data => {
                console.log(data)
            },
            error => console.error(error)
        );
        form.resetForm();
    }
}