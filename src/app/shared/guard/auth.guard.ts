import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import {
  AuthRoutesConstants,
  HomeRoutesConstants,
  CloudABISMatchingRoutesConstants,
  CloudABISMatchingMenuTextConstants,
  CloudScanrAPIURLsConstants,
  CloudABISV12APIURLsConstants,
  CloudABISV10APIURLsConstants,
  CookiesConstants,
  DataTypeConstants,
  APIConstants,
  OptionalParamConstants,
  LocalStorageConstants
} from '@app/shared/constants';
import {
  ApiService,
  CloudabisV10Service,
  CloudabisV12Service,
  CloudscanrService,
  CookieStorageService,
  RouteService,
  ScriptService,
  LocalStorageService,
  AuthService,
} from '@app/shared/services';
import { QueryParams, ApiQueryParam, User } from '@app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private scriptService: ScriptService) {}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):| Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree {
    const currentUser = this.authService.currentUserValue;
    //debugger;
    if (currentUser) {
      return true;
    }else{
      if(!state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)){
        this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL], { queryParams: { returnUrl: state.url } });
      }else{
        this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
      }
      
      //this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
      this.scriptService.disableLayout();
      return false;
    }

    
  }
}


// export class AuthGuard implements CanActivate {
//   constructor(private router: Router, private authService: AuthService, private scriptService: ScriptService) {}

//   checkUserAuthentication(state: RouterStateSnapshot) {
//     const currentUser = this.authService.currentUserValue;
//     if (currentUser) {
//       return true;
//     } else {
//       this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL], { queryParams: { returnUrl: state.url } });
//       this.scriptService.disableLayout();
//       return false;
//     }
//   }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     return this.checkUserAuthentication(state);
//   }

//   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     return this.checkUserAuthentication(state);
//   }
// }