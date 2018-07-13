import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@NgModule({
    declarations: [
        InventoryComponent,
        DetailAssortment,
        OrderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        InventoryRoutingModule,
        MatTableModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule
    ],
    providers: [
        InventoryService,
        AssortmentResolver
    ]
})
export class InventoryModule { }
