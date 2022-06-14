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
  LocalStorageConstants
} from '@app/shared/constants';

import {
  AuthService,
  ApiService,
  CloudabisV10Service,
  CloudabisV12Service,
  CloudscanrService,
  CookieStorageService,
  LocalStorageRefService,
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
import { QueryParams, ApiQueryParam } from '@app/shared/models';
import {
  FingerPrintDevices,
  IrisDevices,
  FaceDevices,
  MultimodalDevices,
} from '@app/shared/objects';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  _localStorage: Storage;

  constructor(private localStorageRefService: LocalStorageRefService) {
    this._localStorage = localStorageRefService.localStorage;
  }

  setData(key: string, data: any) {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem(key, jsonData);
  }

  getData(key: string) {
    const data: any = this._localStorage.getItem(key);
    return data;
  }

  removeData(key: string) {
    this._localStorage.removeItem(key);
  }
}
