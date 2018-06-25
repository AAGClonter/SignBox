import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventoryComponents/inventory.component';
import { InventoryService } from './inventoryService/inventory.service';
import { DetailAssortment } from './detailAssortmentComp/detail-assortment.component';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        InventoryComponent,
        DetailAssortment
    ],
    imports: [
        CommonModule,
        FormsModule,
        InventoryRoutingModule,
        MatTableModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    providers: [
        InventoryService
    ]
})
export class InventoryModule { }
