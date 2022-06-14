import { Injectable } from '@angular/core';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
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
  User
} from '@app/shared/models';
import {
  FingerPrintDevices,
  IrisDevices,
  FaceDevices,
  MultimodalDevices,
} from '@app/shared/objects';
@Injectable({ providedIn: 'root' })
export class MiddlewareAuthService {
  res: any;

  get CaptureType() {
    return EnumCaptureType;
  }

  get CaptureOperationName() {
    return EnumCaptureOperationName;
  }

  get MatchingOperationName() {
    return EnumMatchingOperationName;
  }

  get FeatureMode() {
    return EnumFeatureMode;
  }

  get SingleCaptureMode() {
    return EnumSingleCaptureMode;
  }

  get Devices() {
    return EnumDevices;
  }

  get FingerPosition() {
    return EnumFingerPosition;
  }

  get DuelFingerPosition() {
    return EnumDuelFingerPosition;
  }

  get Engines() {
    return EnumEngines;
  }

  get EnginesMapper() {
    return EnumEnginesMapper;
  }

  get BiometricImageFormat() {
    return EnumBiometricImageFormat;
  }

  get FaceImageFormat() {
    return EnumFaceImageFormat;
  }
  constructor(
    private cookieService: CookieStorageService,
    private routeService: RouteService,
    private scriptService: ScriptService,
    private authService: AuthService
  ) {}

  userLogin(username: string, password: string): Observable<User> {
    return this.authService.userLogin().pipe(
      map((response: User) => {
        if (response) {
          const user = response;
          return user;
        }
      })
    );
  }
  
}
