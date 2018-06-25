import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailAssortment } from './detailAssortmentComp/detail-assortment.component';

const invRoutes: Routes = [
    { path: 'assortment/:id/detail', component: DetailAssortment}
];

@NgModule({
    imports: [RouterModule.forChild(invRoutes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
