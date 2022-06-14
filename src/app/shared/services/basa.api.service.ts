import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
} from '@app/shared/constants';

import {
  AuthService,
  ApiService,
  CloudabisV10Service,
  CloudscanrService,
  CookieStorageService,
  LocalStorageService,
  RouteService,
  ScriptService,
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
  EnumOperationalResponseStatus,
} from '@app/shared/enums';

import {
  QueryParams,
  ApiQueryParam,
  ServiceModelResponse,
  AuthRequestV12Model,
  BioPluginTokenReponse,
  IsRegRequestV12Model,
  MatchingResultResponse,
  BaseModelResponse,
} from '@app/shared/models';
import {
  FingerPrintDevices,
  IrisDevices,
  FaceDevices,
  MultimodalDevices,
} from '@app/shared/objects';

@Injectable({ providedIn: 'root' })
export class BaseApiService {
  protected baseUrl: string;

  protected httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': '*'
    }),
    params: new HttpParams()
  };

  constructor(private cookieService: CookieStorageService,protected storageService: LocalStorageService) {
    const apiBaseUrl = this.cookieService.getValueByName(
      CookiesConstants.CABBaseURL,
      DataTypeConstants.String
    );
    this.baseUrl = apiBaseUrl;

  }

  protected setAuthHeader() {
    debugger;
    const token = JSON.parse(this.storageService.getData(APIConstants.TOKEN));
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + token);
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
}
