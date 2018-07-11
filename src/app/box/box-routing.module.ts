import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoxDetailComponent } from './box-detail.component';
import { BoxComponent } from './box.component';
import { BoxNotifyComponent } from './box-notify.component';
import { BoxResolver } from './box-resolver.service';
import { BoxDetailResolver } from './resolvers/box-detail-resolver.service';
import { BoxNotifyResolver } from './resolvers/box-notify-resolver.service';

const boxRoutes: Routes = [
    { path: 'boxtosignout/:id/boxsignout', component: BoxDetailComponent, resolve: {box: BoxDetailResolver} },
    { path: 'boxtonotify/:id/boxnotify', component: BoxNotifyComponent, resolve: {box: BoxNotifyResolver} },
    { path: 'boxes', component: BoxComponent, resolve: {boxes: BoxResolver} },
];

@NgModule({
    imports: [RouterModule.forChild(boxRoutes)],
    exports: [RouterModule]
})
export class BoxRoutingModule {}