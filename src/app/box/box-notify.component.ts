import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { BoxService } from './box.service';
import { Box } from './box.model';

@Component({
    selector: 'app-box-notify',
    templateUrl: './box-notify.component.html'
})
export class BoxNotifyComponent implements OnInit {
    @Input() box: Box;

    constructor(private boxService: BoxService,
                private route: ActivatedRoute,
                private location: Location) {}
    ngOnInit(): void {
       this.route.paramMap.switchMap((params: ParamMap) => 
            this.boxService.getBox(params.get('id')))
                    .subscribe(box => this.box = box); 
    }

    sendEmail(box: Box){
        this.boxService.emailBox(box).subscribe(
            data => console.log(data),
            error => console.error(error)
        )
    }

    goBack(){
        this.location.back();
    }
}