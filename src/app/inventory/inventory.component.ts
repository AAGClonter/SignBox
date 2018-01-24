import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { InventoryService } from './inventory.service';

import { Assortment } from './assortment.model';
import { Item } from './item.model';

@Component({
    selector: 'app-inv',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {    
}