import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
    debounceTime, distinctUntilChanged, switchMap
  } from 'rxjs/operators';

import { InventoryService } from '../../inventory.service';

import { Item } from '../../item.model';
import { Assortment } from '../../assortment.model';

@Component({
    selector: 'app-inventory-prepare',
    templateUrl: './prepare-item.component.html',
    styles: [`
        .down {
            margin-top: 20px;
        }
    `]
})
export class PrepareItemComponent implements OnInit {

  applicationID = 'Y35L6PLLI4';
  searchOnlyAPIKey = '2b6a13f64374f092fd09da75977fb25e';
  adminAPIKey = '2b68d36f76f36617e8777d4c18c59fdc';

  items: Item[];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.getItems();
    /*
    this.preparedItems$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.inventoryService.searchItems(term))
    );
    */
  }

  search(searchTerm: string) {
    if (searchTerm) {
      this.inventoryService.searchItems(searchTerm)
        .subscribe(items => this.items = items);
    }
  }

  getItems() {
    this.inventoryService.gettingItems().subscribe(
      items => this.items = items
    )
  }
}
