import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { UserService } from "./auth/user.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
       if (this.userService.isLoggedIn()) {
           return true;
       } else {
            this.router.navigate(['/'])
       }
    }
}