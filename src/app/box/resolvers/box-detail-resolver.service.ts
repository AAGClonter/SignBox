import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Box } from "../box.model";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';
import { BoxService } from "../box.service";
import { Shipment } from "../shipment.model";

@Injectable()
export class BoxDetailResolver implements Resolve<Shipment> {

    constructor(private boxService: BoxService) {}

    resolve(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Shipment> | Promise<Shipment> | Shipment {
        return this.boxService.getShipment(router.params['id']);
    }
}