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
  CaptureMinRequestV12Model,
  CaptureResponseV12Model,
  BioServiceRequest,
  CaptureImages,
  CurrentNotification
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
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  /**V12                V10
   * Matching API URl = API URL
   * Client API Key = APP Key
   * Client Key = Customer Key
   * No Secret  = Secret Key
   */

  public res: any;
  public bioCloudVerificationForm: FormGroup;
  isV12 = true;
  isV12Track = true;
  captureTypeList: Array<any> = [];
  deviceNameList: Array<any> = BiometricDeviceList;
  loading = false;
  imageLoader = AnimatedLoaderConstants.SMALL_ROUND_LOADER;
  isCookieSavedOK = false;
  isFormDataOk = false;
  isSubmitOk = false;
  get V12RouteConstants() {
    return CloudABISMatchingRoutesConstants;
  }

  get CommonConstants() {
    return Common;
  }

  authReqModel: AuthRequestV12Model;
  authResModel: BioPluginTokenReponse;
  captureReqModel: CaptureMinRequestV12Model;
  captureResModel: CaptureResponseV12Model;
  verifyReqModel: BioServiceRequest;
  verifyResModel: MatchingResultResponse;
  v12authdata: any = null;

  verifyBtnDisabled = true;
  bioImages: CaptureImages;
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
    this.titleService.setTitle(Common.BIOCLOUD_V12_VERIFY_TITLE);
    this.scriptService.enableLayout();
    this.isV12 = this.cookieService.getValueByName(
      CookiesConstants.CLOUD_VERSION,
      DataTypeConstants.Boolean
    );
    this.createForm();
    this.initializeFormData();
    this.bioMiddlewareService.tokenAuthenticationV12();
    setTimeout(() => this.spinner.hide('spinrAllModules'), 5000);
  }

  createForm() {
    this.bioCloudVerificationForm = this.formBuilder.group({
      captureType: new FormControl('', Validators.required),
      deviceName: new FormControl(''),
      registrationNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
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

      if (this.isV12) {
        const cookieDeviceName = this.cookieService.getValueByName(
          CookiesConstants.CABDeviceName,
          DataTypeConstants.String
        );
        this.bioCloudVerificationForm
          .get('deviceName')
          .setValue(cookieDeviceName);
      } else {
        this.notifyService.showError(
          MessageConstants.DEVICE_NOT_FOUND_ERROR_MSG,
          MessageConstants.BIOCLOUD_V12_REG_ERROR_TITLE
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
    let formData = this.bioCloudVerificationForm.value;
    const engine = this.getEngineNameByDevice(
      this.bioCloudVerificationForm.controls['deviceName'].value
    );
    var captureReqModel = {};
    try {
      if (engine === EnumEnginesMapper.FingerPrint) {
        captureReqModel = {
          CaptureType:
            this.bioCloudVerificationForm.controls['captureType'].value,
          SingleCaptureMode: EnumSingleCaptureMode.LeftFingerCapture,
          QuickScan: EnumFeatureMode.Disable,
          CaptureOperationName: EnumCaptureOperationName.VERIFY,
          DeviceName:
            this.bioCloudVerificationForm.controls['deviceName'].value,
          CaptureTimeOut: 180.0,
        };
      } else if (engine === EnumEnginesMapper.Iris) {
        captureReqModel = {
          DeviceName:
            this.bioCloudVerificationForm.controls['deviceName'].value,
          QuickScan: EnumFeatureMode.Disable,
          FaceImage: EnumFeatureMode.Disable,
          CaptureTimeOut: 180.0,
          CaptureOperationName: EnumCaptureOperationName.VERIFY,
        };
      } else if (engine === EnumEnginesMapper.Face) {
        captureReqModel = {
          DeviceName:
            this.bioCloudVerificationForm.controls['deviceName'].value,
          QuickScan: EnumFeatureMode.Disable,
          HasFaceSkip: EnumFeatureMode.Disable,
          FaceImageFormat: EnumFaceImageFormat.Jpeg,
          CaptureTimeOut: 180.0,
          CaptureOperationName: EnumCaptureOperationName.VERIFY,
        };
      } else if (engine == EnumEnginesMapper.MultiModal) {
        const v12BaseAPI = this.cookieService.getValueByName(
          CookiesConstants.CABBaseURL,
          DataTypeConstants.String
        );
        const v12ClientKey = this.cookieService.getValueByName(
          CookiesConstants.CABClientKey,
          DataTypeConstants.String
        );
        const v12ClientAPIKey = this.cookieService.getValueByName(
          CookiesConstants.CABClientAPIKey,
          DataTypeConstants.String
        );

        const fvBaseAPI = this.cookieService.getValueByName(
          CookiesConstants.FVBaseURL,
          DataTypeConstants.String
        );
        const fvAppKey = this.cookieService.getValueByName(
          CookiesConstants.FVAppKey,
          DataTypeConstants.String
        );
        const fvSecretKey = this.cookieService.getValueByName(
          CookiesConstants.FVSecretKey,
          DataTypeConstants.String
        );
        const fvCustomerKey = this.cookieService.getValueByName(
          CookiesConstants.FVCustomerKey,
          DataTypeConstants.String
        );

        captureReqModel = {
          RegistrationId:
            this.bioCloudVerificationForm.controls['registrationNo'].value,
          OperationName: EnumMatchingOperationName.Register,
          CloudABISV12APICredential: {
            ClientKey: v12ClientKey,
            ClientAPIKey: v12ClientAPIKey,
            BaseAPIURL: v12BaseAPI,
          },
          CloudABISFingerVeinCredentials: {
            APIURL: fvBaseAPI,
            AppKey: fvAppKey,
            SecretKey: fvSecretKey,
            CustomerKey: fvCustomerKey,
          },
        };
      }

      this.captureReqModel = new CaptureMinRequestV12Model(captureReqModel);
    } catch (error) {
      this.notifyService.showError(
        error.error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }

  getEngineNameByDevice(selectedDevice: string) {
    const singleDevice: any = this.deviceNameList.filter((deviceName) => {
      return deviceName.name === selectedDevice;
    });
    return singleDevice[0].engineName;
  }

  prepareVerifyRequestModel() {
    let formData = this.bioCloudVerificationForm.value;
    const clientKey = this.cookieService.getValueByName(
      CookiesConstants.CABClientKey
    );

    try {
      const verifyReqModel = {
        ClientKey: this.cookieService.getValueByName(
          CookiesConstants.CABClientKey
        ),
        SequenceNo: null,
        RegistrationId:
          this.bioCloudVerificationForm.controls['registrationNo'].value,
        Images: this.bioImages,
      };
      this.verifyReqModel = new BioServiceRequest(verifyReqModel);
    } catch (error) {
      this.notifyService.showError(
        error.error.message,
        MessageConstants.GENERAL_ERROR_TITLE
      );
    }
  }

  onSubmit() {
    this.spinner.show('spinrAllModules');
    this.showVerify(false);

    // stop here if form is invalid
    if (this.bioCloudVerificationForm.invalid) {
      return;
    }
    this.prepareCaptureRequest();
    const engine = this.getEngineNameByDevice(
      this.bioCloudVerificationForm.controls['deviceName'].value
    );
    try {
      this.cloudscanrService
        .getCaptureData(this.captureReqModel, engine)
        .pipe(first())
        .subscribe({
          next: (response: CaptureResponseV12Model) => {
            debugger;

            if (response.isSuccess) {
              this.spinner.hide('spinrAllModules');
              this.alertService.info(response.message);
              this.bioImages = response.data.Images;
              this.showVerify(true);
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
              MessageConstants.BIOCLOUD_V12_CAPTURE_ERROR_TITLE
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

  verify() {
    this.spinner.show('spinrAllModules');
    this.prepareVerifyRequestModel();
    try {
      this.v12Service
        .verify(this.verifyReqModel)
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
              MessageConstants.BIOCLOUD_V12_VERIFY_ERROR_TITLE
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

  showVerify(isShow: boolean){
    if(isShow){
      this.verifyBtnDisabled = false;
    }else{
      this.verifyBtnDisabled = true;
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
