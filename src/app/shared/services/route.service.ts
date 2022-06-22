import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
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
} from '@app/shared/constants';

import {
  AuthService,
  ApiService,
  CloudabisV10Service,
  CloudabisV12Service,
  CloudscanrService,
  CookieStorageService,
  LocalStorageRefService,
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
export class RouteService {
  constructor(public router: Router) {}

  routeFromMenuToPage(event: any) {
    
    let text: string = event.target.text;
    switch (text) {
      case Common.HOME_TEXT:
        this.router.navigateByUrl(HomeRoutesConstants.HOME_URL);
        break;
      case Common.APPCONFIG_TEXT:
        this.router.navigateByUrl(APPConfigRoutesConstants.APP_CONFIG_URL);
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V12_HOME_TEXT:
          this.router.navigateByUrl(
            CloudABISMatchingRoutesConstants.BIOCLOUD_V12_HOME_ROUTE
          );
          break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V12_IS_REGISTER_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V12_IS_REG_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V12_REGISTER_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V12_REGISTER_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V12_IDENTIFY_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V12_IDENTIFY_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V12_VERIFY_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V12_VERIFY_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V12_UPDATE_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V12_UPDATE_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V12_CHANGEID_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V12_CHANGEID_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V12_DELETEID_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V12_DELETEID_ROUTE
        );
        break;


        case CloudABISMatchingMenuTextConstants.BIOCLOUD_V10_HOME_TEXT:
          this.router.navigateByUrl(
            CloudABISMatchingRoutesConstants.BIOCLOUD_V10_HOME_ROUTE
          );
          break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V10_IS_REGISTER_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V10_IS_REG_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V10_REGISTER_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V10_REGISTER_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V10_IDENTIFY_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V10_IDENTIFY_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V10_VERIFY_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V10_VERIFY_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V10_UPDATE_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V10_UPDATE_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V10_CHANGEID_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V10_CHANGEID_ROUTE
        );
        break;
      case CloudABISMatchingMenuTextConstants.BIOCLOUD_V10_DELETEID_TEXT:
        this.router.navigateByUrl(
          CloudABISMatchingRoutesConstants.BIOCLOUD_V10_DELETEID_ROUTE
        );
        break;


      default:
        this.router.navigateByUrl(HomeRoutesConstants.HOME_URL);
        break;
    }
  }

  routeToPage(redirectTo: string) {
    
    this.router.navigateByUrl(redirectTo);
  }

  openUrlInNewTab(url:string) {
    window.open(url, '_blank').focus();
  }
  

  
}
