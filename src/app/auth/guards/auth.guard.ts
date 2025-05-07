import { inject } from '@angular/core';
import {
    CanActivateFn,
    Router,
    UrlTree,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean | UrlTree => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.isLoggedIn()) {
        // todo OK, puede entrar
        return true;
      }
  
    if (!auth.isLoggedIn()) {
      return router.parseUrl('/auth/login');
    }

    return true;
};
