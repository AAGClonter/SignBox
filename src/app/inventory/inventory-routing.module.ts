import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const invRoutes: Routes = [
    
];

@NgModule({
    imports: [RouterModule.forChild(invRoutes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
