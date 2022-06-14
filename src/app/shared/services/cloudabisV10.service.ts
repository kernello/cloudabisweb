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
  Common,
  MessageConstants,
  AnimatedLoaderConstants,
  ModelInterfaceConstants,
  ErrorCode,
  AbisConstant,
} from '@app/shared/constants';

import {
  AuthService,
  ApiService,
  CloudscanrService,
  CookieStorageService,
  LocalStorageService,
  RouteService,
  ScriptService,
  AlertService,
  NotificationService,
  CommonHelpersService,
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
  EnumRelocatePosition,
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
  ImgQualityRequestV12Model,
  AuthReqV10Params,
  CommonNonBioReqV10Model,
  UniqueNonBioReqV10Model,
  CommonBioReqV10Model,
  UniqueBioReqV10Model,
  BaseAuthV10ResModel,
  AuthResV10Model,
  BaseBioResV10Model,
  BioResV10Model,
  ResponseMsg,
} from '@app/shared/models';
import {
  FingerPrintDevices,
  IrisDevices,
  FaceDevices,
  MultimodalDevices,
} from '@app/shared/objects';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CloudabisV10Service {
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
    private scriptService: ScriptService,
    private helperService: CommonHelpersService
  ) {
    // const apiBaseUrl = this.cookieService.getValueByName(CookiesConstants.CABBaseURL, DataTypeConstants.String);
    // this.apiService.initializeBaseURL(apiBaseUrl);
  }

  setBaseUrl() {
    const apiBaseUrl = this.cookieService.getValueByName(
      CookiesConstants.FVBaseURL,
      DataTypeConstants.String
    );

    this.apiService.initializeBaseURL(apiBaseUrl);
  }

  getBody(authReqParams: AuthReqV10Params) {
    let body = new URLSearchParams();
    body.set('grant_type', authReqParams.grant_type);
    body.set('username', authReqParams.username);
    body.set('password', authReqParams.password);
    return body;
  }

  authToken(authReqParams: AuthReqV10Params): Observable<BaseAuthV10ResModel> {
    this.setBaseUrl();
    let body = this.getBody(authReqParams);
    return this.apiService
      .postwithparams(
        CloudABISV10APIURLsConstants.CloudABIS_V10_AUTH_TOKEN_API_URL,
        body
      )
      .pipe(
        map((response: AuthResV10Model) => {
          if (response) {
            let msgContent = this.extractResponseMessages(
              EnumOperationName.None,
              response,
              null
            );
            const authResponse = new BaseAuthV10ResModel(response, msgContent);
            return authResponse;
          }
        })
      );
  }

  isRegister(
    isRegReqModel: CommonNonBioReqV10Model
  ): Observable<BaseBioResV10Model> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV10APIURLsConstants.CloudABIS_V10_IS_REGISTER_API_URL,
        isRegReqModel,
        true
      )
      .pipe(
        map((response: BioResV10Model) => {
          if (response) {
            let msgContent = this.extractResponseMessages(
              EnumOperationName.IsRegistered,
              null,
              response
            );
            const isRegResponse = new BaseBioResV10Model(response, msgContent);
            return isRegResponse;
          }
        })
      );
  }

  register(regReqModel: CommonBioReqV10Model): Observable<BaseBioResV10Model> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV10APIURLsConstants.CloudABIS_V10_REGISTER_API_URL,
        regReqModel,
        true
      )
      .pipe(
        map((response: BioResV10Model) => {
          if (response) {
            let msgContent = this.extractResponseMessages(
              EnumOperationName.Register,
              null,
              response
            );
            const regResponse = new BaseBioResV10Model(response, msgContent);
            return regResponse;
          }
        })
      );
  }

  changeId(
    changeIdReqModel: UniqueNonBioReqV10Model
  ): Observable<BaseBioResV10Model> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV10APIURLsConstants.CloudABIS_V10_CHANGEID_API_URL,
        changeIdReqModel,
        true
      )
      .pipe(
        map((response: BioResV10Model) => {
          if (response) {
            let msgContent = this.extractResponseMessages(
              EnumOperationName.ChangeID,
              null,
              response
            );
            const changeIdResponse = new BaseBioResV10Model(
              response,
              msgContent
            );
            return changeIdResponse;
          }
        })
      );
  }

  deleteId(
    delReqModel: CommonNonBioReqV10Model
  ): Observable<BaseBioResV10Model> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV10APIURLsConstants.CloudABIS_V10_DELETEID_API_URL,
        delReqModel,
        true
      )
      .pipe(
        map((response: BioResV10Model) => {
          if (response) {
            let msgContent = this.extractResponseMessages(
              EnumOperationName.DeleteID,
              null,
              response
            );
            const delResponse = new BaseBioResV10Model(response, msgContent);
            return delResponse;
          }
        })
      );
  }

  

  identify(
    identifyReqModel: UniqueBioReqV10Model
  ): Observable<BaseBioResV10Model> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV10APIURLsConstants.CloudABIS_V10_IDENTITY_API_URL,
        identifyReqModel,
        true
      )
      .pipe(
        map((response: BioResV10Model) => {
          if (response) {
            let msgContent = this.extractResponseMessages(
              EnumOperationName.Identify,
              null,
              response
            );
            const identifyResponse = new BaseBioResV10Model(
              response,
              msgContent
            );
            return identifyResponse;
          }
        })
      );
  }

  verify(verifyReqModel: CommonBioReqV10Model): Observable<BaseBioResV10Model> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV10APIURLsConstants.CloudABIS_V10_VERIFY_API_URL,
        verifyReqModel,
        true
      )
      .pipe(
        map((response: BioResV10Model) => {
          if (response) {
            let msgContent = this.extractResponseMessages(
              EnumOperationName.Verify,
              null,
              response
            );
            const verifyResponse = new BaseBioResV10Model(response, msgContent);
            return verifyResponse;
          }
        })
      );
  }

  update(updateReqModel: CommonBioReqV10Model): Observable<BaseBioResV10Model> {
    this.setBaseUrl();
    return this.apiService
      .post(
        CloudABISV10APIURLsConstants.CloudABIS_V10_UPDATE_API_URL,
        updateReqModel,
        true
      )
      .pipe(
        map((response: BioResV10Model) => {
          if (response) {
            let msgContent = this.extractResponseMessages(
              EnumOperationName.Update,
              null,
              response
            );
            const updateResponse = new BaseBioResV10Model(response, msgContent);
            return updateResponse;
          }
        })
      );
  }

  extractResponseMessages(
    operationName: EnumOperationName,
    authResModel?: AuthResV10Model,
    bioResModel?: BioResV10Model
  ) {
    debugger;
    let res = new ResponseMsg();

    switch (operationName) {
      case EnumOperationName.None:
        if (this.helperService.validData(authResModel.error)) {
          res.code = authResModel.error;
          res.message = this.helperService.isContains(
            AbisConstant.Invalid_Grant,
            authResModel.error
          )
            ? authResModel.error
            : 'unsupported attribute';
        }
        break;
      case EnumOperationName.IsRegistered:
        if (bioResModel.OperationResult === AbisConstant.IsRegisterSuccess) {
          res.code = ErrorCode.CS0202;
          res.message = ErrorCode.CS0202_MESSAGE;
        } else if (
          bioResModel.OperationResult === AbisConstant.IsRegisterFailed
        ) {
          res.code = ErrorCode.CS0203;
          res.message = ErrorCode.CS0203_MESSAGE;
        } else {
          this.getMsgContentByOtherStatus(bioResModel);
        }
        break;
      case EnumOperationName.Register:
        if (
          bioResModel.OperationResult === AbisConstant.RegisterOrUpdateSuccess
        ) {
          res.code = ErrorCode.CS0205;
          res.message = ErrorCode.CS0205_MESSAGE;
        } else if (
          bioResModel.OperationResult === AbisConstant.RegisterOrUpdateFailed
        ) {
          res.code = ErrorCode.CS0206;
          res.message = ErrorCode.CS0206_MESSAGE;
        }else if (bioResModel.OperationResult === AbisConstant.MatchFound) {
          res.code = ErrorCode.CS0209;
          res.message = ErrorCode.CS0209_MESSAGE.concat(bioResModel.BestResult.ID);
        }else {
          this.getMsgContentByOtherStatus(bioResModel);
        }
        break;
      case EnumOperationName.Identify:
        if (bioResModel.OperationResult === AbisConstant.MatchFound) {
          res.code = ErrorCode.CS0209;
          res.message = ErrorCode.CS0209_MESSAGE.concat(
            bioResModel.BestResult.ID
          );
        } else if (
          bioResModel.OperationResult === AbisConstant.RegisterOrUpdateFailed
        ) {
          res.code = ErrorCode.CS0210;
          res.message = ErrorCode.CS0210_MESSAGE;
        } else {
          this.getMsgContentByOtherStatus(bioResModel);
        }
        break;
      case EnumOperationName.Verify:
        if (bioResModel.OperationResult === AbisConstant.VerifySuccess) {
          res.code = ErrorCode.CS0211;
          res.message = ErrorCode.CS0211_MESSAGE;
        } else if (bioResModel.OperationResult === AbisConstant.VerifyFailed) {
          res.code = ErrorCode.CS0212;
          res.message = ErrorCode.CS0212_MESSAGE;
        } else if (bioResModel.OperationResult === AbisConstant.IdNotExist) {
          res.code = ErrorCode.CS0213;
          res.message = ErrorCode.CS0213_MESSAGE;
        } else {
          this.getMsgContentByOtherStatus(bioResModel);
        }
        break;
      case EnumOperationName.Update:
        if (
          bioResModel.OperationResult === AbisConstant.RegisterOrUpdateSuccess
        ) {
          res.code = ErrorCode.CS0214;
          res.message = ErrorCode.CS0214_MESSAGE;
        } else if (
          bioResModel.OperationResult === AbisConstant.RegisterOrUpdateFailed
        ) {
          res.code = ErrorCode.CS0215;
          res.message = ErrorCode.CS0215_MESSAGE;
        } else if (bioResModel.OperationResult === AbisConstant.IdNotExist) {
          res.code = ErrorCode.CS0216;
          res.message = ErrorCode.CS0216_MESSAGE;
        }else if (bioResModel.OperationResult === AbisConstant.MatchFound) {
          res.code = ErrorCode.CS0209;
          res.message = ErrorCode.CS0209_MESSAGE.concat(bioResModel.BestResult.ID);
        } else {
          this.getMsgContentByOtherStatus(bioResModel);
        }
        break;
      case EnumOperationName.ChangeID:
        if (bioResModel.OperationResult === AbisConstant.ChangeIDSuccess) {
          res.code = ErrorCode.CS0217;
          res.message = ErrorCode.CS0217_MESSAGE;
        } else if (
          bioResModel.OperationResult === AbisConstant.ChangeIDFailed
        ) {
          res.code = ErrorCode.CS0218;
          res.message = ErrorCode.CS0218_MESSAGE;
        } else if (bioResModel.OperationResult === AbisConstant.IdNotExist) {
          res.code = ErrorCode.CS0219;
          res.message = ErrorCode.CS0219_MESSAGE;
        } else {
          this.getMsgContentByOtherStatus(bioResModel);
        }
        break;
      case EnumOperationName.DeleteID:
        if (bioResModel.OperationResult === AbisConstant.DeleteSuccess) {
          res.code = ErrorCode.CS0220;
          res.message = ErrorCode.CS0220_MESSAGE;
        } else if (bioResModel.OperationResult === AbisConstant.DeleteFailed) {
          res.code = ErrorCode.CS0221;
          res.message = ErrorCode.CS0221_MESSAGE;
        } else if (bioResModel.OperationResult === AbisConstant.IdNotExist) {
          res.code = ErrorCode.CS0222;
          res.message = ErrorCode.CS0222_MESSAGE;
        } else {
          this.getMsgContentByOtherStatus(bioResModel);
        }
        break;
      default:
        break;
    }
    return res;
  }

  getMsgContentByOtherStatus(bioResModel?: BioResV10Model) {
    debugger
    let res = new ResponseMsg();
    switch (bioResModel.OperationResult) {
      case AbisConstant.PoorImageQuality:
      case AbisConstant.ExtractionFailed:
        res.code = ErrorCode.CS0224;
        res.message = ErrorCode.CS0224_MESSAGE;
        break;

      case AbisConstant.InvalidRequest:
      case AbisConstant.InvalidParameter:
      case AbisConstant.BadRequest:
        res.code = ErrorCode.CS0225;
        res.message = ErrorCode.CS0225_MESSAGE;
        break;

      case AbisConstant.ClientNotFound:
      case AbisConstant.ClientNotSetYet:
        res.code = ErrorCode.CS0226;
        res.message = ErrorCode.CS0226_MESSAGE;
        break;

      case AbisConstant.InternalError:
      case AbisConstant.ServerException:
      case AbisConstant.ApiError:
        res.code = ErrorCode.CS0227;
        res.message = ErrorCode.CS0227_MESSAGE;
        break;

      case AbisConstant.LicenseError:
        res.code = ErrorCode.CS0229;
        res.message = ErrorCode.CS0229_MESSAGE;
        break;

      case AbisConstant.UCSUnreachable:
        res.code = ErrorCode.CSC503;
        res.message = ErrorCode.CSC503_MESSAGE;
        break;

      case AbisConstant.UCSUnAuthorize:
        res.code = ErrorCode.CSC401;
        res.message = ErrorCode.CSC401_MESSAGE;
        break;

      default:
        break;
    }
    return res;
  }
}
