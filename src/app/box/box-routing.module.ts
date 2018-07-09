import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoxDetailComponent } from './box-detail.component';
import { BoxComponent } from './box.component';
import { BoxNotifyComponent } from './box-notify.component';
import { BoxResolver } from './box-resolver.service';

const boxRoutes: Routes = [
    { path: 'boxtosignout/:id/boxsignout', component: BoxDetailComponent },
    { path: 'boxtonotify/:id/boxnotify', component: BoxNotifyComponent },
    { path: 'boxes', component: BoxComponent, resolve: {boxes: BoxResolver} },
];

@NgModule({
    imports: [RouterModule.forChild(boxRoutes)],
    exports: [RouterModule]
})
export class BoxRoutingModule {}