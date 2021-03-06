import { Component, OnInit } from '@angular/core';
 
import { Observable, Subject } from 'rxjs';
 
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { OrderService } from '../order.service';
import { Item } from '../../inventory/models/item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  items$: Observable<Item[]>; // check the async pipe
  private searchTerms = new Subject<string>();
 
  constructor(private orderService: OrderService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.items$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.orderService.searchItems(term))
    )
  }
}
