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
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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
} from '@app/shared/constants';

import {
  AuthService,
  ApiService,
  CloudabisV12Service,
  CloudscanrService,
  CookieStorageService,
  LocalStorageService,
  RouteService,
  ScriptService,
  AlertService,
  NotificationService,
  CommonHelpersService,
  BioMiddlewareService
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
  AlertType,
  ScopeType,
  VersionType
} from '@app/shared/enums';
import {
  QueryParams,
  ApiQueryParam,
  ServiceModelResponse,
  AuthRequestV12Model,
  BioPluginTokenReponse,
  IsRegRequestV12Model,
  MatchingResultResponse,
  BioServiceResponse,
  ChangeIdRequestV12Model,
  CurrentNotification
} from '@app/shared/models';
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
  selector: 'app-changeid',
  templateUrl: './changeid.component.html',
  styleUrls: ['./changeid.component.css']
})
export class ChangeidComponent implements OnInit {
/**V12                V10
   * Matching API URl = API URL
   * Client API Key = APP Key
   * Client Key = Customer Key
   * No Secret  = Secret Key
   */
 public res: any;
 public bioCloudChangeIDForm: FormGroup;
 isV12Track = true;
 deviceNameList: Array<any> = [];
 loading = false;
 imageLoader = AnimatedLoaderConstants.SMALL_ROUND_LOADER;
 isCookieSavedOK = false;
 isFormDataOk = false;
 isSubmitOk = false;
 get V12RouteConstants() {
   return CloudABISMatchingRoutesConstants;
 }

 authReqModel: AuthRequestV12Model;
 authResModel: BioPluginTokenReponse;
 changeIdReqModel: ChangeIdRequestV12Model;
 changeIdResModel: MatchingResultResponse;
 v12authdata: any =  null;
 currNotify: CurrentNotification;

 constructor(
   private spinner: NgxSpinnerService,
   private titleService: Title,
   private formBuilder: FormBuilder,
   private router: Router,
   private route: ActivatedRoute,
   private scriptService: ScriptService,
   private alertService: AlertService,
   private authService: AuthService,
   private localDbStore: LocalStorageService,
   private cloudscanrService: CloudscanrService,
   private cookieService: CookieStorageService,
   private notifyService: NotificationService,
   private cabV12Service: CloudabisV12Service,
   private routeService: RouteService,
   private v12Service: CloudabisV12Service,
   private helperService: CommonHelpersService,
   private bioMiddlewareService: BioMiddlewareService
 ) {
    //this.scriptService.loadScripts();
    this.spinner.show('spinrAllModules');
    this.bioMiddlewareService.appConfigVersionV12Check();
    this.helperService.currentNotification.subscribe(
      (notify) => (this.currNotify = notify)
    );
    if (this.currNotify.version === VersionType.V12 && !this.currNotify.isOk && this.currNotify.scopeType === ScopeType.AppConfig) {
      this.spinner.hide('spinrAllModules');
      this.notifyService.showError(this.currNotify.message, this.currNotify.title);
      this.bioMiddlewareService.asyncRouteToConfigPage();
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle(Common.BIOCLOUD_V12_CHANGE_ID_TITLE);
    this.scriptService.enableLayout();
    this.createForm();
    this.bioMiddlewareService.tokenAuthenticationV12();
    setTimeout(() => (this.spinner.hide('spinrAllModules')), 5000);
  }

  createForm() {
    this.bioCloudChangeIDForm = this.formBuilder.group({
      registrationNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      newRegistrationNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        WhiteSpaceValidator.noWhiteSpace,
      ]),
    });
  }

  prepareChangeIdRequestModel() {
    let formData = this.bioCloudChangeIDForm.value;
    const clientKey = this.cookieService.getValueByName(
      CookiesConstants.CABClientKey
    );

    try {
      const reqData = new ChangeIdRequestV12Model(
        clientKey,
        formData.registrationNo,
        formData.newRegistrationNo
      );
      this.changeIdReqModel = reqData;
    } catch (error) {
      this.notifyService.showError(
        error.error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }


  onSubmit() {
    this.spinner.show('spinrAllModules');
    // stop here if form is invalid
    if (this.bioCloudChangeIDForm.invalid) {
      return;
    }
    
    this.prepareChangeIdRequestModel();
    try {
      this.v12Service
        .changeId(this.changeIdReqModel)
        .pipe(first())
        .subscribe({
          next: (response: BioServiceResponse) => {
            if (response.isSuccess) {
              this.spinner.hide('spinrAllModules');
              this.alertService.info(response.message);
            } else {
              this.spinner.hide('spinrAllModules');
              this.alertService.warning(response.message);
              return;
            }
          },
          error: (error) => {
            this.spinner.hide('spinrAllModules');
            this.notifyService.showError(
              error.message,
              MessageConstants.BIOCLOUD_V12_CHANGEID_ERROR_TITLE
            );
            return;
          },
        });
    } catch (error) {
      this.spinner.hide('spinrAllModules');
      this.notifyService.showError(
        error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
      return;
    }
  }


  reset() {
    
    const registrationNo = '';
    const newRegistrationNo = '';
    let reqData = {
      registrationNo: registrationNo,
      newRegistrationNo: newRegistrationNo
    };

    this.bioCloudChangeIDForm.setValue(reqData);
    
  }

  cancel() {
    this.routeService.routeToPage(CloudABISMatchingRoutesConstants.BIOCLOUD_V10_HOME_ROUTE);
  }

   removeResult(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

  ngOnDestroy() {}
}
