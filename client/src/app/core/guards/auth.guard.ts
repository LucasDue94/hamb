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
      console.log('opa');

        if (route.firstChild && !this.loginService.hasPermission(route.firstChild.data.permissao)) {
            // this.router.navigate(['/erro']);
          console.log('Sem permissão pra acessar a página');
            return false;
        }
        return true;
    }
}
