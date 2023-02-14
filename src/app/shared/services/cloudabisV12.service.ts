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
  ScriptService,
  AlertService,
  NotificationService,
  CommonHelpersService
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
  EnumOperationName,
  EnumOperationStatus,
  ResponseOperationName,
  ResponseOperationStatus,
  EnumOperationalResponseStatus,
  EnumTypeOfTemplate,
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
  BioServiceResponse,
  BioServiceRequest,
  ChangeIdRequestV12Model,
  DeleteRequestV12Model,
  ImgQualityRequestV12Model
} from '@app/shared/models';
import {
  FingerPrintDevices,
  IrisDevices,
  FaceDevices,
  MultimodalDevices,
} from '@app/shared/objects';

@Injectable({
  providedIn: 'root',
})
export class CloudabisV12Service {
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

  apiQueryParams: ApiQueryParam[] = [];
  apiQueryParam: ApiQueryParam;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieStorageService,
    private routeService: RouteService,
    private scriptService: ScriptService
  ) {
    // this.apiService.baseUrl = null;
    // const apiBaseUrl = this.cookieService.getValueByName(
    //   CookiesConstants.CABBaseURL,
    //   DataTypeConstants.String
    // );
    
    // this.apiService.initializeBaseURL(apiBaseUrl);
  }

  setBaseUrl() {
    const apiBaseUrl = this.cookieService.getValueByName(
      CookiesConstants.CABBaseURL,
      DataTypeConstants.String
    );
    
    this.apiService.initializeBaseURL(apiBaseUrl);
  }

  authToken(
    authReqModel: AuthRequestV12Model
  ): Observable<ServiceModelResponse<BioPluginTokenReponse>> {

    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV12APIURLsConstants.CloudABIS_V12_AUTH_TOKEN_API_URL,
        authReqModel,
        false
      )
      .pipe(
        map((response: BaseModelResponse<BioPluginTokenReponse>) => {
          //debugger;
          if (response) {
            const authResponse =
              new ServiceModelResponse<BioPluginTokenReponse>(response);
            return authResponse;
          }
        })
      );
  }

  isRegister(
    isReqModel: IsRegRequestV12Model
  ): Observable<BioServiceResponse> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV12APIURLsConstants.CloudABIS_V12_IS_REGISTER_API_URL,
        isReqModel,
        true
      )
      .pipe(
        map((response: MatchingResultResponse) => {
          debugger;
          if (response) {
            const isRegResponse =
              new BioServiceResponse(response);
            return isRegResponse;
          }
        })
      );
  }

  register(regReqModel: BioServiceRequest): Observable<BioServiceResponse> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV12APIURLsConstants.CloudABIS_V12_REGISTER_API_URL,
        regReqModel,
        true
      )
      .pipe(
        map((response: MatchingResultResponse) => {
          if (response) {
            const regResponse =
              new BioServiceResponse(response);
            return regResponse;
          }
        })
      );
  }

  identify(identifyReqModel: BioServiceRequest): Observable<BioServiceResponse> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV12APIURLsConstants.CloudABIS_V12_IDENTITY_API_URL,
        identifyReqModel,
        true
      )
      .pipe(
        map((response: MatchingResultResponse) => {
          if (response) {
            const identifyResponse =
              new BioServiceResponse(response);
            return identifyResponse;
          }
        })
      );
  }

  verify(verifyReqModel: BioServiceRequest): Observable<BioServiceResponse> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV12APIURLsConstants.CloudABIS_V12_VERIFY_API_URL,
        verifyReqModel,
        true
      )
      .pipe(
        map((response: MatchingResultResponse) => {
          if (response) {
            const verifyResponse =
              new BioServiceResponse(response);
            return verifyResponse;
          }
        })
      );
  }

  update(updateReqModel: BioServiceRequest): Observable<BioServiceResponse> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV12APIURLsConstants.CloudABIS_V12_UPDATE_API_URL,
        updateReqModel,
        true
      )
      .pipe(
        map((response: MatchingResultResponse) => {
          if (response) {
            const updateResponse =
              new BioServiceResponse(response);
            return updateResponse;
          }
        })
      );
  }

  changeId(changeIdReqModel: ChangeIdRequestV12Model): Observable<BioServiceResponse> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV12APIURLsConstants.CloudABIS_V12_CHANGEID_API_URL,
        changeIdReqModel,
        true
      )
      .pipe(
        map((response: MatchingResultResponse) => {
          if (response) {
            const changeIdResponse =
              new BioServiceResponse(response);
            return changeIdResponse;
          }
        })
      );
  }


  deleteId(
    delReqModel: DeleteRequestV12Model
  ): Observable<BioServiceResponse> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV12APIURLsConstants.CloudABIS_V12_DELETEID_API_URL,
        delReqModel,
        true
      )
      .pipe(
        map((response: MatchingResultResponse) => {
          debugger;
          if (response) {
            const delResponse =
              new BioServiceResponse(response);
            return delResponse;
          }
        })
      );
  }
  

  imageQuality(imgQualityReqModel: ImgQualityRequestV12Model): Observable<BioServiceResponse> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV12APIURLsConstants.CloudABIS_V12_IMAGEQUALITY_API_URL,
        imgQualityReqModel,
        true
      )
      .pipe(
        map((response: MatchingResultResponse) => {
          if (response) {
            const imgQualityResponse =
              new BioServiceResponse(response);
            return imgQualityResponse;
          }
        })
      );
  }
}
