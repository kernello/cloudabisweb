import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

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
  CloudabisV12Service,
  CloudscanrService,
  CookieStorageService,
  LocalStorageService,
  RouteService,
  ScriptService,
  NotificationService
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit  {
  title = 'Home';
  isLoginLoad: boolean;
  isLoggedin: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private titleService: Title,
    private scriptService: ScriptService,
    private router: Router,
    private authService:AuthService
  ) {
    this.spinner.show('spinrRoot');
    // if (this.authService.currentUserValue) {
    //   this.router.navigate([HomeRoutesConstants.HOME_URL]);
    // }
  }

  ngOnInit() {
    
    this.isLoggedin = Boolean(localStorage.getItem('isSignedIn'));
    if (this.isLoggedin) {
      this.scriptService.enableLayout();
    } else {
      this.scriptService.disableLayout();
    }
    setTimeout(() => (this.spinner.hide('spinrRoot')), 2000);
  }
}
