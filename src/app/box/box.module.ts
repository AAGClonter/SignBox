import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BoxesComponent } from './boxes.component';
import { BoxNotifyComponent } from './box-notify.component';
import { BoxComponent } from './box.component';
import { BoxDetailComponent } from './box-detail.component';
import { CommonModule } from '@angular/common';

import { BoxService } from './box.service';
import { BoxRoutingModule } from './box-routing.module';

@NgModule({
    declarations: [
        BoxesComponent,
        BoxComponent,
        BoxNotifyComponent,
        BoxDetailComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        BoxRoutingModule
    ],
    providers: [
        BoxService
    ]
})
export class BoxModule {}