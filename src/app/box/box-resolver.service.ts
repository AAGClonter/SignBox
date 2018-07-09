import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Box } from './box.model';

import { Observable } from 'rxjs';
import { BoxService } from "./box.service";
import { Injectable } from "@angular/core";

@Injectable()
export class BoxResolver implements Resolve<Box[]> {

    constructor(private boxService: BoxService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Box[]> | Promise<Box[]> | Box[] {
        return this.boxService.getBoxes()
    }
}