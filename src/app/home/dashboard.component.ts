import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { window } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
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
  Advertisements
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
  AlertService,
  NotificationService,
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
  BiometricDeviceList,
  CloudVersionList,
} from '@app/shared/objects';
import { WhiteSpaceValidator } from '@app/shared/validations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  get advertisements() {
    return Advertisements;
  }

  constructor(private spinner: NgxSpinnerService, private titleService: Title, private scriptService: ScriptService, private routeService: RouteService) { 
    //this.scriptService.loadScripts();
    this.spinner.show('spinrAllModules');
  }

  ngOnInit(): void {
    this.titleService.setTitle(Common.HOME_TITLE);
    this.scriptService.enableLayout();
    setTimeout(() => (this.spinner.hide('spinrAllModules')), 1000);
  }

  open(url:string){
    this.routeService.openUrlInNewTab(url);
  }

}
