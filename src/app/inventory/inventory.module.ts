import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventoryComponents/inventory.component';
import { InventoryService } from './inventoryService/inventory.service';
import { DetailAssortment } from './detailAssortmentComp/detail-assortment.component';
import { AssortmentResolver } from './resolvers/assortment-resolver.service';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { OrderComponent } from '../order/order/order.component';
import { DetailOrderComponent } from './detailOrderComponent/detail-order.component';
import { MatListModule } from '@angular/material/list';
import { SearchComponent } from '../order/search/search.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    declarations: [
        InventoryComponent,
        DetailAssortment,
        OrderComponent,
        DetailOrderComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InventoryRoutingModule,
        MatTableModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDialogModule
    ],
    providers: [
        InventoryService,
        AssortmentResolver
    ]
})
export class InventoryModule { }
