import { Routes } from '@angular/router';

import { AssortmentsComponent } from './components/assortment/assortments.component';
import { ItemComponent } from './components/item/item.component';
import { PrepareItemComponent } from './components/prepare-item/prepare-item.component';

export const INV_ROUTES: Routes = [
    { path: '', redirectTo: 'assortments', pathMatch: 'full' },
    { path: 'assortments/:id/items', component: AssortmentsComponent },
    { path: 'assortments', component: AssortmentsComponent },
    { path: 'newItem', component: ItemComponent },
    { path: 'prepareItem', component: PrepareItemComponent }
];
