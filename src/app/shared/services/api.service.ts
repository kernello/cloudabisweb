import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
// import {
//   CloudScanrAPIURLsConstants,
//   APIConstants,
//   OptionalParamConstants
// } from '../constants/common.constants';
// import { EnumCaptureType } from '../enums/cloudscanr.enum';
// import { QueryParams, ApiQueryParam } from '../models/api.data.model';
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
  CloudabisV10Service,
  CloudabisV12Service,
  CloudscanrService,
  CookieStorageService,
  LocalStorageService,
  RouteService,
  ScriptService
} from '@app/shared/services';

import {
  EnumCaptureType,
  EnumCaptureOperationName,
  EnumMatchingOperationName,
  EnumFeatureMode,
  EnumSingleCaptureMode,
  EnumDevices,
  EnumFingerPosition,
  EnumDuelFingerPosition,
  EnumEngines,
  EnumEnginesMapper,
  EnumBiometricImageFormat,
  EnumFaceImageFormat,
} from '@app/shared/enums';
import { QueryParams, ApiQueryParam, IsRegRequestV12Model } from '@app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl: string = '';

  protected httpOptions = {
    headers: new HttpHeaders({
      Accept: APIConstants.APPLICATION_JSON,
      'Content-Type': APIConstants.APPLICATION_JSON,
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': '*'
    }),
    params: new HttpParams(),
  };

  constructor(private http: HttpClient, private storageService: LocalStorageService) {}

  initializeBaseURL(inputUrl: string) {
    //debugger;
    this.baseUrl = inputUrl;
  }

  protected setAuthHeader() {
    //debugger;
    const token = JSON.parse(this.storageService.getData(APIConstants.TOKEN));
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      `Bearer ${token}`
    );
  }

  protected getParamHeader(){
    let headers = new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
       Accept: '*/*',
    });

    let options = {headers: headers};
    return options;

  }

  protected getFullApiUrl(url: string) {
    return this.baseUrl + url;
  }

  protected setQuerryParams(queryParams: QueryParams[]) {
    let params = new HttpParams();
    queryParams.forEach(param => {
      params = params.append(param.paramName, param.paramValue);
    });

    this.httpOptions.params = params;
  }

  createQueryParams(inputParamArr: ApiQueryParam[]) {
    let params = new HttpParams();
    inputParamArr.forEach(param => {
      params = params.append(param.paramName, param.paramValue);
    });
    this.httpOptions.params = params;
  }

  getAll(apiEndPoint: string, includeToken: boolean): Observable<any[]> {
    const apiUrl = this.getFullApiUrl(apiEndPoint);
    if(includeToken){
      this.setAuthHeader();
    }
    
    return this.http.get<any[]>(apiUrl, this.httpOptions);
  }

  getAllById(apiEndPoint: string, id: string, isQueryParam: boolean, includeToken: boolean,paramName?: any): Observable<any[]> {
    let apiUrl = '';
    if (isQueryParam) {
      this.setQuerryParams([new QueryParams(paramName, id ? id : '')]);
      apiUrl = this.getFullApiUrl(apiEndPoint);
    } else {
      apiUrl = this.getFullApiUrl(apiEndPoint) + '/' + id;
    }

    if(includeToken){
      this.setAuthHeader();
    }
    return this.http.get<any[]>(apiUrl, this.httpOptions);
  }

  getAllByParamList(apiEndPoint: string, isQueryParam: boolean, includeToken: boolean, params?: any): Observable<any[]> {
    const apiUrl = this.getFullApiUrl(apiEndPoint);
    if (isQueryParam) {
      this.createQueryParams(params);
    }
    
    if(includeToken){
      this.setAuthHeader();
    }

    return this.http.get<any[]>(apiUrl, this.httpOptions);
  }

  getById(apiEndPoint: string, id: string, includeToken: boolean): Observable<any> {
    const apiUrl = this.getFullApiUrl(apiEndPoint);
    this.setQuerryParams([new QueryParams('id', id ? id : '')]);
    if(includeToken){
      this.setAuthHeader();
    }

    return this.http.get(apiUrl, this.httpOptions);
  }

  postwithparams(apiEndPoint: string, body: URLSearchParams): Observable<any> {
    const apiUrl = this.getFullApiUrl(apiEndPoint);
    let options =  this.getParamHeader();
    return this.http.post<any>(apiUrl, body, options);
  }


  post(apiEndPoint: string, model: any, includeToken: boolean): Observable<any> {
    let modelBody = '';
    const apiUrl = this.getFullApiUrl(apiEndPoint);

    if(includeToken){
      this.setAuthHeader();
    }
    
    if (typeof model !== 'undefined' && typeof model !== null) {
      modelBody = JSON.stringify(model);
    }
   
    
    return this.http.post<any>(apiUrl, model, this.httpOptions);
  }

  
  put(apiEndPoint: string, model: any, includeToken: boolean): Observable<any> {
    const apiUrl = this.getFullApiUrl(apiEndPoint);

    if(includeToken){
      this.setAuthHeader();
    }

    return this.http.put<any>(apiUrl, model, this.httpOptions);
  }

  deleteById(apiEndPoint: string, id: string, includeToken: boolean, keyWord?: string): Observable<any> {

    let name = '', apiUrl;
    if (typeof keyWord !== 'undefined') {
      name = keyWord;
     apiUrl = this.getFullApiUrl(apiEndPoint) + '?' + name + '=' + id;
    }else{
      apiUrl = this.getFullApiUrl(apiEndPoint);
    }
    
    if(includeToken){
      this.setAuthHeader();
    }

    return this.http.delete<any>(apiUrl, this.httpOptions);
  }

  deleteByParams(apiEndPoint: string, isQueryParam: boolean, includeToken: boolean, params?: any): Observable<any> {
    const apiUrl = this.getFullApiUrl(apiEndPoint);
    if (isQueryParam) {
      this.createQueryParams(params);
    }
    
    if(includeToken){
      this.setAuthHeader();
    }

    return this.http.delete<any>(apiUrl, this.httpOptions);
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
