import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
    debounceTime, distinctUntilChanged, switchMap
  } from 'rxjs/operators';

import { InventoryService } from '../../inventory.service';

import { Item } from '../../item.model';
import { Assortment } from '../../assortment.model';

@Component({
    selector: 'inventory-prepare',
    templateUrl: './prepare-item.component.html',
    styles: [`
        .down {
            margin-top: 20px;
        }
    `]
})
export class PrepareItemComponent implements OnInit{

    preparedItems$: Observable<Item[]>;
    private searchTerms = new Subject<string>();

    constructor(private inventoryService: InventoryService) {}

    // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.preparedItems$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.inventoryService.searchItems(term)),
    );
  }
}