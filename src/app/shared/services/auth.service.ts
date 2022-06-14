import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
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
  LocalStorageConstants,
  LoginApiConstants,
} from '@app/shared/constants';
import {
  ApiService,
  CloudabisV10Service,
  CloudabisV12Service,
  CloudscanrService,
  CookieStorageService,
  LocalStorageService,
  RouteService,
  ScriptService,
} from '@app/shared/services';
import { QueryParams, ApiQueryParam, User } from '@app/shared/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  //sessionUser: any;

  protected httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    params: new HttpParams(),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private routeService: RouteService,
    private localDbStore: LocalStorageService,
    private scriptService: ScriptService
  ) {
    const sessionUser = String(
      this.localDbStore.getData(LocalStorageConstants.CURRENT_USER)
    );
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionUser)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  protected setAuthHeader() {
    debugger;
    this.httpOptions.headers = this.httpOptions.headers.set(
      'X-API-Key',
      'edda3ce0'
    );
  }

  protected getFullApiUrl(url: string) {
    return `${environment.apiUrl}` + url;
  }

  protected setQuerryParams(queryParams: QueryParams[]) {
    let params = new HttpParams();
    queryParams.forEach((param) => {
      params = params.append(param.paramName, param.paramValue);
    });

    this.httpOptions.params = params;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // login1(username: string, password: string) {

  //   return this.http
  //     .post<any>(`${environment.apiUrl}/auth/login`, {
  //       username,
  //       password,
  //     })
  //     .pipe(
  //       map((user) => {
  //         if (user && user.token) {
  //           this.localDbStore.setData(LocalStorageConstants.CURRENT_USER, user);
  //           this.currentUserSubject.next(user);
  //         }

  //         return user;
  //       })
  //     );
  // }

  userLogin(): Observable<any> {
    this.setAuthHeader();
    return this.http.get<any>(
      this.getFullApiUrl(LoginApiConstants.LOGIN_USER_API_URL),
      this.httpOptions
    );
  }

  login(username?: string, password?: string): Observable<User> {
    this.setAuthHeader();
    return this.http
      .get<any>(
        this.getFullApiUrl(LoginApiConstants.LOGIN_USER_API_URL),
        this.httpOptions
      )
      .pipe(
        map((user: User) => {
          if (user) {
            this.localDbStore.setData(LocalStorageConstants.CURRENT_USER, user);
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.localDbStore.removeData(LocalStorageConstants.CURRENT_USER);
    this.localDbStore.removeData(APIConstants.V12_AUTH_DATA);
    this.localDbStore.removeData(APIConstants.TOKEN);
    this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
    this.currentUserSubject.next(null!);
  }
}
