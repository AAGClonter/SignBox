import { Component, Input } from '@angular/core';
import { InventoryService } from '../inventoryService/inventory.service';

import { Assortment } from '../models/assortment.model';

@Component({
    selector: 'app-detail-assortment',
    templateUrl: './detail-assortment.component.html'
})
export class DetailAssortment {

    @Input() assortment: Assortment;

    constructor(private inventoryService: InventoryService) {}

    
}