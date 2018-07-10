import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Assortment } from '../models/assortment.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InventoryService } from '../inventoryService/inventory.service';

@Injectable()
export class AssortmentsResolver implements Resolve<Assortment[]> {

    constructor(private inventoryService: InventoryService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Assortment[]> | Promise<Assortment[]> | Assortment[] {
        return this.inventoryService.getAssortments()
    }
}