import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoxComponent } from './box/box.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { BoxDetailComponent } from './box/box-detail.component';
import { BoxNotifyComponent } from './box/box-notify.component';
import { LogoutComponent } from './auth/logout.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
    { path: '', redirectTo: 'boxes', pathMatch: 'full' },
    { path: 'boxtosignout/:id/boxsignout', component: BoxDetailComponent },
    { path: 'boxtonotify/:id/boxnotify', component: BoxNotifyComponent },
    { path: 'boxes', component: BoxComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}