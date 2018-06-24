import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventoryComponents/inventory.component';
import { InventoryService } from './inventoryService/inventory.service';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [
        InventoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        InventoryRoutingModule,
        MatTableModule
    ],
    providers: [
        InventoryService
    ]
})
export class InventoryModule { }
