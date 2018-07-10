import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Observable } from 'rxjs';
import { Assortment } from '../models/assortment.model';
import { InventoryService } from "../inventoryService/inventory.service";

@Injectable()
export class AssortmentResolver implements Resolve<Assortment> {

    constructor(private inventoryService: InventoryService) {}

    resolve(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Assortment> | Promise<Assortment> | Assortment {
        return this.inventoryService.getAssortment(router.params['id'])
    }
}