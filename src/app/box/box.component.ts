import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { BoxService } from './box.service';
import { Box } from './box.model';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css'],
})
export class BoxComponent implements OnInit{
    boxes: Box[];

    constructor(private boxService: BoxService, 
                private router: Router,
                private location: Location){}
   
    ngOnInit(){
        this.getBoxes();
    }

    getBoxes() {
        this.boxService.getBoxes().subscribe(
            data => this.boxes = data
        );
    }
}


