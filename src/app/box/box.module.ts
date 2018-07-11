import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BoxesComponent } from './boxes.component';
import { BoxNotifyComponent } from './box-notify.component';
import { BoxComponent } from './box.component';
import { BoxDetailComponent } from './box-detail.component';
import { CommonModule } from '@angular/common';

import { BoxService } from './box.service';
import { BoxRoutingModule } from './box-routing.module';

// Angular Material Components
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { BoxResolver } from './box-resolver.service';
import { BoxDetailResolver } from './resolvers/box-detail-resolver.service';
import { BoxNotifyResolver } from './resolvers/box-notify-resolver.service';

@NgModule({
    declarations: [
        BoxesComponent,
        BoxComponent,
        BoxNotifyComponent,
        BoxDetailComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BoxRoutingModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatTableModule
    ],
    providers: [
        BoxService,
        BoxResolver,
        BoxDetailResolver,
        BoxNotifyResolver
    ]
})
export class BoxModule {}