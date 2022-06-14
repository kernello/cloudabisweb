import { Injectable, ElementRef } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  first,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

import {
  AuthRoutesConstants,
  HomeRoutesConstants,
  APPConfigRoutesConstants,
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
import { AlertType, ScopeType, VersionType } from '@app/shared/enums';

import {
  AuthService,
  ApiService,
  CloudabisV12Service,
  CloudabisV10Service,
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
  CurrentNotification,
} from '@app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class BioMiddlewareService {
  isV12Track = true;
  v12authdata: any = null;
  v10authdata: any = null;

  // v12 auth req/res models
  authReqV12Model: AuthRequestV12Model;
  authResV12Model: BioPluginTokenReponse;

  // v10 auth req/res models
  authReqParamsV10Model: AuthReqV10Params;
  authResV10Model: BaseAuthV10ResModel;

  currNotify: CurrentNotification;

  constructor(
    private cookieService: CookieStorageService,
    private notifyService: NotificationService,
    private spinner: NgxSpinnerService,
    private routeService: RouteService,
    private v12Service: CloudabisV12Service,
    private v10Service: CloudabisV10Service,
    private localDbStore: LocalStorageService,
    private helperService: CommonHelpersService
  ) {
    this.authReqV12Model = new AuthRequestV12Model();
  }

  appConfigVersionV12Check() {
    this.isV12Track =
      this.cookieService.getValueByName(
        CookiesConstants.TRACK_DEFAULT_VERSION,
        DataTypeConstants.String
      ) === Common.V12
        ? true
        : false;
    try {
      if (this.isV12Track === false) {
        this.emitNotification(
          false,
          MessageConstants.BIOCLOUD_V10_BUT_ROUTE_12_ERROR_MSG,
          MessageConstants.BIOCLOUD_WRONG_PAGE_MSG_TITLE,
          AlertType.Error,
          ScopeType.AppConfig,
          VersionType.V12
        );
        // this.spinner.hide('spinrAllModules');

        // setTimeout(() => {
        //   this.routeService.routeToPage(
        //     APPConfigRoutesConstants.APP_CONFIG_URL
        //   );
        // }, 1000);
        // this.notifyService.showError(
        //   MessageConstants.BIOCLOUD_V10_BUT_ROUTE_12_ERROR_MSG,
        //   MessageConstants.BIOCLOUD_WRONG_PAGE_MSG_TITLE
        // );
      } else {
        if (!this.checkAppConfigEmptiness(true)) {
          this.emitNotification(
            false,
            MessageConstants.APP_CONFIG_FIELD_NOT_SET_MSG,
            MessageConstants.APP_CONFIG_FIELD_NOT_SET_TITLE,
            AlertType.Error,
            ScopeType.AppConfig,
            VersionType.V12
          );
          // this.spinner.hide('spinrAllModules');

          // setTimeout(() => {
          //   this.routeService.routeToPage(
          //     APPConfigRoutesConstants.APP_CONFIG_URL
          //   );
          // }, 1000);
          // this.notifyService.showError(
          //   MessageConstants.APP_CONFIG_FIELD_NOT_SET_MSG,
          //   MessageConstants.APP_CONFIG_FIELD_NOT_SET_TITLE
          // );
        }
      }
    } catch (error) {
      this.emitNotification(
        false,
        error.message,
        MessageConstants.GENERAL_ERROR_TITLE,
        AlertType.Error,
        ScopeType.AppConfig,
        VersionType.V12
      );
      // this.spinner.hide('spinrAllModules');
      // this.notifyService.showError(
      //   error.message,
      //   MessageConstants.GENERAL_ERROR_TITLE
      // );
      // setTimeout(() => {
      //   this.routeService.routeToPage(APPConfigRoutesConstants.APP_CONFIG_URL);
      // }, 1000);
    }
  }

  appConfigVersionV10Check() {
    debugger;
    this.isV12Track =
      this.cookieService.getValueByName(
        CookiesConstants.TRACK_DEFAULT_VERSION,
        DataTypeConstants.String
      ) === Common.V12
        ? true
        : false;
    try {
      if (this.isV12Track) {
        this.emitNotification(
          false,
          MessageConstants.BIOCLOUD_V12_BUT_ROUTE_10_ERROR_MSG,
          MessageConstants.BIOCLOUD_WRONG_PAGE_MSG_TITLE,
          AlertType.Error,
          ScopeType.AppConfig,
          VersionType.V10
        );
        // this.spinner.hide('spinrAllModules');

        // this.notifyService.showError(
        //   MessageConstants.BIOCLOUD_V12_BUT_ROUTE_10_ERROR_MSG,
        //   MessageConstants.BIOCLOUD_WRONG_PAGE_MSG_TITLE
        // );
        // setTimeout(() => {
        //   this.routeService.routeToPage(
        //     APPConfigRoutesConstants.APP_CONFIG_URL
        //   );
        // }, 1000);
      } else {
        if (!this.checkAppConfigEmptiness(false)) {
          this.emitNotification(
            false,
            MessageConstants.APP_CONFIG_FIELD_NOT_SET_MSG,
            MessageConstants.APP_CONFIG_FIELD_NOT_SET_TITLE,
            AlertType.Error,
            ScopeType.AppConfig,
            VersionType.V10
          );
          // this.spinner.hide('spinrAllModules');
          // this.notifyService.showError(
          //   MessageConstants.APP_CONFIG_FIELD_NOT_SET_MSG,
          //   MessageConstants.APP_CONFIG_FIELD_NOT_SET_TITLE
          // );
          // setTimeout(() => {
          //   this.routeService.routeToPage(
          //     APPConfigRoutesConstants.APP_CONFIG_URL
          //   );
          // }, 1000);
        }
      }
    } catch (error) {
      this.emitNotification(
        false,
        error.message,
        MessageConstants.GENERAL_ERROR_TITLE,
        AlertType.Error,
        ScopeType.AppConfig,
        VersionType.V10
      );
      // this.spinner.hide('spinrAllModules');
      // this.notifyService.showError(
      //   error.message,
      //   MessageConstants.GENERAL_ERROR_TITLE
      // );
      // setTimeout(() => {
      //   this.routeService.routeToPage(APPConfigRoutesConstants.APP_CONFIG_URL);
      // }, 1000);
    }
  }

  emitNotification(
    isOk: boolean,
    msg: string,
    title: string,
    type: string,
    scopeType: string,
    version: string
  ) {
    debugger
    this.currNotify = new CurrentNotification();
    this.currNotify.isOk = isOk;
    this.currNotify.message = msg;
    this.currNotify.title = title;
    this.currNotify.alertType = type;
    this.currNotify.scopeType = scopeType;
    this.currNotify.version = version;
    this.helperService.updateCurrentNotification(this.currNotify);
  }

  asyncRouteToConfigPage() {
    setTimeout(() => {
      this.routeService.routeToPage(APPConfigRoutesConstants.APP_CONFIG_URL);
    }, 1000);
  }

  tokenAuthenticationV12() {
    this.v12authdata = this.localDbStore.getData(APIConstants.V12_AUTH_DATA);

    if (this.helperService.validData(this.v12authdata)) {
      let token = JSON.parse(this.v12authdata).data.accessToken; //JSON.parse(this.v12authdata).data.expiresIn
      if (this.isTokenValid(token)) {
        this.localDbStore.setData(APIConstants.TOKEN, token);
      } else {
        this.prepareAuthV12RequestModel();
        this.preparaAuthV12Response(this.authReqV12Model);
      }
    } else {
      this.prepareAuthV12RequestModel();
      this.preparaAuthV12Response(this.authReqV12Model);
    }
  }

  prepareAuthV12RequestModel() {
    const clientApiKey = this.cookieService.getValueByName(
      CookiesConstants.CABClientAPIKey
    );
    const clientKey = this.cookieService.getValueByName(
      CookiesConstants.CABClientKey
    );

    try {
      this.authReqV12Model.clientAPIKey = clientApiKey;
      this.authReqV12Model.clientKey = clientKey;
    } catch (error) {
      this.notifyService.showError(
        error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }

  preparaAuthV12Response(authReqModel: AuthRequestV12Model) {
    try {
      this.v12Service
        .authToken(authReqModel)
        .pipe(debounceTime(300))
        .subscribe({
          next: (response: ServiceModelResponse<BioPluginTokenReponse>) => {
            debugger;
            if (response.isSuccess) {
              this.localDbStore.setData(APIConstants.V12_AUTH_DATA, response);
              this.localDbStore.setData(
                APIConstants.TOKEN,
                response.data.accessToken
              );
            } else {
              this.notifyService.showError(
                MessageConstants.BIOCLOUD_AUTH_FAILED_MSG,
                MessageConstants.GENERAL_ERROR_TITLE
              );
              return;
            }
          },
          error: (error) => {
            this.notifyService.showError(
              error.message,
              MessageConstants.GENERAL_ERROR_TITLE
            );
            return;
          },
        });
    } catch (error) {
      this.notifyService.showError(
        error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
      return;
    }
  }

  checkAppConfigEmptiness(v12: boolean) {
    debugger;
    if (v12) {
      const clientApiKey = this.cookieService.getValueByName(
        CookiesConstants.CABClientAPIKey
      );
      const clientKey = this.cookieService.getValueByName(
        CookiesConstants.CABClientKey
      );

      if (
        this.helperService.isValid(clientApiKey) &&
        this.helperService.isValid(clientKey)
      ) {
        return true;
      }
    } else {
      const username = this.cookieService.getValueByName(
        CookiesConstants.FVAppKey
      );
      const password = this.cookieService.getValueByName(
        CookiesConstants.FVSecretKey
      );
      if (
        this.helperService.isValid(username) &&
        this.helperService.isValid(password)
      ) {
        return true;
      }
    }
    return false;
  }

  tokenAuthenticationV10() {
    debugger;
    // this.v10authdata = this.localDbStore.getData(APIConstants.V10_AUTH_DATA);
    // if (!this.helperService.validData(this.v10authdata)) {
    //   this.prepareAuthV10RequestModel();
    //   this.preparaAuthV10Response(this.authReqParamsV10Model, isLoader);
    // }
    this.prepareAuthV10RequestModel();
    this.preparaAuthV10Response(this.authReqParamsV10Model);
  }

  prepareAuthV10RequestModel() {
    debugger;
    const grantType = Common.GRANT_TYPE;
    const username = this.cookieService.getValueByName(
      CookiesConstants.FVAppKey
    );
    const password = this.cookieService.getValueByName(
      CookiesConstants.FVSecretKey
    );

    try {
      this.authReqParamsV10Model = new AuthReqV10Params(
        username,
        password,
        grantType
      );
    } catch (error) {
      this.notifyService.showError(
        error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }

  preparaAuthV10Response(authReqModel: AuthReqV10Params) {
    try {
      this.v10Service
        .authToken(authReqModel)
        .pipe(debounceTime(300))
        .subscribe({
          next: (response: BaseAuthV10ResModel) => {
            debugger;
            if (response.isSuccess) {
              this.localDbStore.setData(APIConstants.V10_AUTH_DATA, response);
              this.localDbStore.setData(
                APIConstants.TOKEN,
                response.data.access_token
              );
            } else {
              this.notifyService.showError(
                MessageConstants.BIOCLOUD_AUTH_FAILED_MSG,
                MessageConstants.GENERAL_ERROR_TITLE
              );
              return;
            }
          },
          error: (error) => {
            this.notifyService.showError(
              error.message,
              MessageConstants.GENERAL_ERROR_TITLE
            );
            return;
          },
        });
    } catch (error) {
      this.notifyService.showError(
        error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
      return;
    }
  }

  isTokenValid(token: string) {
    // check if token is expired
    const jwtToken = JSON.parse(atob(token.split('.')[1]));
    const tokenExpired = Date.now() > jwtToken.exp * 1000;
    if (tokenExpired) return false;

    return true;
  }
}
