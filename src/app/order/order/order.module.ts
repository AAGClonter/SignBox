import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { OrderService } from '../order.service';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule
    ],
    providers: [
        OrderService
    ]
})
export class OrderModule {

}