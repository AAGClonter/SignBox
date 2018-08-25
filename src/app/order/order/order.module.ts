import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { OrderService } from '../order.service';
import { SearchComponent } from '../search/search.component';

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