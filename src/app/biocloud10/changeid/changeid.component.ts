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
  CloudabisV10Service,
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
  CommonNonBioReqV10Model,
  UniqueNonBioReqV10Model,
  CommonBioReqV10Model,
  UniqueBioReqV10Model,
  BioResV10Model,
  BaseBioResV10Model,
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
 public bioCloudChangeIdForm: FormGroup;
 isV12 = true;
 isV12Track = true;
 deviceNameList: Array<any> = [];
 loading = false;
 imageLoader = AnimatedLoaderConstants.SMALL_ROUND_LOADER;
 isCookieSavedOK = false;
 isFormDataOk = false;
 isSubmitOk = false;
 get V10RouteConstants() {
   return CloudABISMatchingRoutesConstants;
 }

 changeIdReqModel: UniqueNonBioReqV10Model;
 changeIdResModel: BioResV10Model;
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
  private routeService: RouteService,
  private v10Service: CloudabisV10Service,
  private helperService: CommonHelpersService,
  private bioMiddlewareService: BioMiddlewareService
 ) {
    //this.scriptService.loadScripts();
    this.spinner.show('spinrAllModules');
    this.bioMiddlewareService.appConfigVersionV10Check();
    this.helperService.currentNotification.subscribe(
      (notify) => (this.currNotify = notify)
    );
    if (this.currNotify.version === VersionType.V10 && !this.currNotify.isOk && this.currNotify.scopeType === ScopeType.AppConfig) {
      this.spinner.hide('spinrAllModules');
      this.notifyService.showError(this.currNotify.message, this.currNotify.title);
      this.bioMiddlewareService.asyncRouteToConfigPage();
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle(Common.BIOCLOUD_V10_CHANGE_ID_TITLE);
    this.scriptService.enableLayout();
    debugger;
    this.isV12 = this.cookieService.getValueByName(
      CookiesConstants.CLOUD_VERSION,
      DataTypeConstants.Boolean
    );

    this.createForm();
    this.initializeFormData();
    this.bioMiddlewareService.tokenAuthenticationV10();
    
    setTimeout(() => (this.spinner.hide('spinrAllModules')), 5000);
  }

  createForm() {
    this.bioCloudChangeIdForm = this.formBuilder.group({
      customerKey: new FormControl(''),
      engineName: new FormControl(''),
      registrationNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      newRegistrationNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        WhiteSpaceValidator.noWhiteSpace,
      ])
    });
  }

  initializeFormData() {
    try {
      if (!this.isV12) {
        
        const cookieCustomerKey = this.cookieService.getValueByName(
          CookiesConstants.FVCustomerKey,
          DataTypeConstants.String
        );
        const cookieEngineName = this.cookieService.getValueByName(
          CookiesConstants.FVEngineName,
          DataTypeConstants.String
        );
        this.bioCloudChangeIdForm.get('customerKey').setValue(cookieCustomerKey);
        this.bioCloudChangeIdForm.get('engineName').setValue(cookieEngineName);
      } else {
        this.notifyService.showError(
          MessageConstants.CUST_KEY_ENGINE_NOT_FOUND_ERROR_MSG,
          MessageConstants.BIOCLOUD_V10_IS_REG_ERROR_TITLE
        );
      }
    } catch (error) {
      this.notifyService.showError(
        error.error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }

  prepareChangeIdRequestModel() {
    
    let formData = this.bioCloudChangeIdForm.value;
    try {
      const isReqdata = new UniqueNonBioReqV10Model(
        formData.customerKey,
        formData.registrationNo,
        formData.newRegistrationNo,
        formData.engineName
      );
      this.changeIdReqModel = isReqdata;
    } catch (error) {
      this.notifyService.showError(
        error.error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }


  onSubmit() {
    this.spinner.show('changeIdLoading');
    // stop here if form is invalid
    if (this.bioCloudChangeIdForm.invalid) {
      return;
    }
    
    this.prepareChangeIdRequestModel();
    try {
      this.v10Service
        .changeId(this.changeIdReqModel)
        .pipe(first())
        .subscribe({
          next: (response: BaseBioResV10Model) => {
            
            if (response.isSuccess) {
              this.spinner.hide('changeIdLoading');
              this.alertService.info(response.message);
            } else {
              this.spinner.hide('changeIdLoading');
              this.alertService.warning(response.message);
              return;
            }
          },
          error: (error) => {
            this.spinner.hide('changeIdLoading');
            this.notifyService.showError(
              error.message,
              MessageConstants.BIOCLOUD_V10_CHANGEID_ERROR_TITLE
            );
            return;
          },
        });
    } catch (error) {
      this.spinner.hide('changeIdLoading');
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

    this.bioCloudChangeIdForm.setValue(reqData);
    
  }

  cancel() {
    this.routeService.routeToPage(HomeRoutesConstants.HOME_DASHBOARD_URL);
  }

   removeResult(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

  ngOnDestroy() {}
}
