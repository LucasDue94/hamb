import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (localStorage.getItem('token') == null) {
            this.router.navigate(['/']);
            return false;
        }

        if (route.firstChild && !this.loginService.hasPermission(route.firstChild.data.permissao)) {
            this.router.navigate(['/error']);
            return false;
        }
        return true;
    }
}
