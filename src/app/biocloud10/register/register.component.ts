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
import {
  first,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
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
  BioMiddlewareService,
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
  CaptureMinRequestV12Model,
  CaptureResponseV12Model,
  BioServiceRequest,
  CaptureImages,
  CaptureRequestV10Model,
  CloudScanrV10CaptureResult,
  CloudScanrV10Status,
  CaptureResponseV10Model,
  CommonNonBioReqV10Model,
  UniqueNonBioReqV10Model,
  CommonBioReqV10Model,
  UniqueBioReqV10Model,
  BioResV10Model,
  BaseBioResV10Model,
  CurrentNotification,
} from '@app/shared/models';
import {
  FingerPrintDevices,
  IrisDevices,
  FaceDevices,
  MultimodalDevices,
  BiometricDeviceList,
  CloudVersionList,
  CaptureTypeList,
} from '@app/shared/objects';
import { WhiteSpaceValidator } from '@app/shared/validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  /**V12                V10
   * Matching API URl = API URL
   * Client API Key = APP Key
   * Client Key = Customer Key
   * No Secret  = Secret Key
   */

  public res: any;
  public bioCloudRegisterForm: FormGroup;
  isV12 = true;
  isV12Track = true;
  captureTypeList: Array<any> = [];
  defaultval = null;
  deviceNameList: Array<any> = BiometricDeviceList;
  imageLoader = AnimatedLoaderConstants.SMALL_ROUND_LOADER;
  isCookieSavedOK = false;
  isFormDataOk = false;
  isSubmitOk = false;
  get V10RouteConstants() {
    return CloudABISMatchingRoutesConstants;
  }

  get CommonConstants() {
    return Common;
  }

  captureReqModel: CaptureRequestV10Model;
  captureResModel: CaptureResponseV10Model;

  regReqModel: CommonBioReqV10Model;
  regResModel: BioResV10Model;

  regBtnDisabled = true;
  biometricXml: string;
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
    this.titleService.setTitle(Common.BIOCLOUD_V10_REG_TITLE);
    this.scriptService.enableLayout();
    this.isV12 = this.cookieService.getValueByName(
      CookiesConstants.CLOUD_VERSION,
      DataTypeConstants.Boolean
    );
    this.createForm();
    this.initializeFormData();
    this.defaultval = this.captureTypeList[1].name;
    this.bioMiddlewareService.tokenAuthenticationV10();
    setTimeout(() => this.spinner.hide('spinrAllModules'), 5000);
  }

  createForm() {
    this.bioCloudRegisterForm = this.formBuilder.group({
      captureType: new FormControl('', Validators.required),
      deviceName: new FormControl(''),
      registrationNo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        WhiteSpaceValidator.noWhiteSpace,
      ]),
    });
  }

  initializeFormData() {
    try {
      this.captureTypeList = [];
      CaptureTypeList.forEach((item, index) => {
        this.captureTypeList.push(item);
      });

      if (!this.isV12) {
        const cookieDeviceName = this.cookieService.getValueByName(
          CookiesConstants.FVDeviceName,
          DataTypeConstants.String
        );
        this.bioCloudRegisterForm.get('deviceName').setValue(cookieDeviceName);
      } else {
        this.notifyService.showError(
          MessageConstants.DEVICE_NOT_FOUND_ERROR_MSG,
          MessageConstants.BIOCLOUD_V10_REG_ERROR_TITLE
        );
      }
    } catch (error) {
      this.notifyService.showError(
        error.error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }

  prepareCaptureRequest() {
    let formData = this.bioCloudRegisterForm.value;
    const engine = this.getEngineNameByDevice(
      this.bioCloudRegisterForm.controls['deviceName'].value
    );
    var captureReqModel = {};
    try {
      if (engine === EnumEnginesMapper.FVHT01) {
        captureReqModel = {
          QuickScan: EnumFeatureMode.Disable,
          DeviceName: this.bioCloudRegisterForm.controls['deviceName'].value,
          CaptureTimeOut: 180.0,
          FaceImage: EnumFeatureMode.Disable,
          CaptureType: this.bioCloudRegisterForm.controls['captureType'].value,
          TenPrint: EnumFeatureMode.Disable,
          HideCaptureUI: EnumFeatureMode.Disable,
          RelocateCaptureUI: EnumFeatureMode.Disable,
          RelocatePosition: EnumRelocatePosition.RIGHT_TOP_CORNER,
          CaptureOperationName: EnumCaptureOperationName.ENROLL,
        };
      }

      this.captureReqModel = new CaptureRequestV10Model(captureReqModel);
    } catch (error) {
      this.notifyService.showError(
        error.error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }

  getEngineNameByDevice(selectedDevice: string) {
    //debugger;
    const singleDevice: any = this.deviceNameList.filter((deviceName) => {
      return deviceName.name === selectedDevice;
    });
    return singleDevice[0].engineName; // FVHT01
  }

  prepareRegRequestModel() {
    let formData = this.bioCloudRegisterForm.value;

    const cookieCustomerKey = this.cookieService.getValueByName(
      CookiesConstants.FVCustomerKey,
      DataTypeConstants.String
    );
    const cookieEngineName = this.cookieService.getValueByName(
      CookiesConstants.FVEngineName,
      DataTypeConstants.String
    );

    try {
      const regReqModel = {
        CustomerKey: cookieCustomerKey,
        RegistrationId:
          this.bioCloudRegisterForm.controls['registrationNo'].value,
        BiometricXml: this.biometricXml,
        Format: Common.ISO_FORMAT,
        EngineName: cookieEngineName,
      };
      this.regReqModel = new CommonBioReqV10Model(regReqModel);
    } catch (error) {
      this.notifyService.showError(
        error.error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }

  onSubmit() {
    this.spinner.show('spinrAllModules');
    this.showRegister(false);
    // stop here if form is invalid
    if (this.bioCloudRegisterForm.invalid) {
      return;
    }
    this.prepareCaptureRequest();
    const engine = this.getEngineNameByDevice(
      this.bioCloudRegisterForm.controls['deviceName'].value
    );
    try {
      this.cloudscanrService
        .getLegacyCapturedData(this.captureReqModel, engine)
        .pipe(first())
        .subscribe({
          next: (response: CaptureResponseV10Model) => {
            if (response.isSuccess) {
              this.spinner.hide('spinrAllModules');
              this.alertService.info(response.message);
              this.biometricXml = response.data.TemplateData;
              this.showRegister(true);
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
              MessageConstants.BIOCLOUD_V10_CAPTURE_ERROR_TITLE
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

  register() {
    this.spinner.show('regLoading');
    this.prepareRegRequestModel();
    try {
      this.v10Service
        .register(this.regReqModel)
        .pipe(first())
        .subscribe({
          next: (response: BaseBioResV10Model) => {
            if (response.isSuccess) {
              this.spinner.hide('regLoading');
              this.alertService.info(response.message);
              
            } else {
              this.spinner.hide('regLoading');
              this.alertService.warning(response.message);
              
              return;
            }
          },
          error: (error) => {
            this.spinner.hide('regLoading');
            this.notifyService.showError(
              error.message,
              MessageConstants.BIOCLOUD_V10_REG_ERROR_TITLE
            );
            
            return;
          },
        });
    } catch (error) {
      this.spinner.hide('regLoading');
      this.notifyService.showError(
        error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
      
      return;
    }
  }


  showRegister(isShow: boolean){
    if(isShow){
      this.regBtnDisabled = false;
    }else{
      this.regBtnDisabled = true;
    }

  }
  
  cancel() {
    this.routeService.routeToPage(HomeRoutesConstants.HOME_DASHBOARD_URL);
  }

  removeResult(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
}
