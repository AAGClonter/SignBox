import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BoxComponent } from './box/box.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { BoxDetailComponent } from './box/box-detail.component';
import { BoxNotifyComponent } from './box/box-notify.component';
import { LogoutComponent } from './auth/logout.component';
import { InventoryComponent } from './inventory/inventoryComponents/inventory.component';
import { DetailAssortment } from './inventory/detailAssortmentComp/detail-assortment.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'boxes', pathMatch: 'full' },
    { path: 'inventory', canActivate: [AuthGuard], component: InventoryComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}