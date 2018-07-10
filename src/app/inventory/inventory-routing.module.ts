import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailAssortment } from './detailAssortmentComp/detail-assortment.component';
import { AuthGuard } from '../auth-guard.service';
import { InventoryComponent } from './inventoryComponents/inventory.component';
import { AssortmentResolver } from './resolvers/assortment-resolver.service';

const invRoutes: Routes = [
    { path: 'assortment/:id/detail', component: DetailAssortment, resolve: {assortment: AssortmentResolver}}
];

@NgModule({
    imports: [RouterModule.forChild(invRoutes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
