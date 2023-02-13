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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy  {
/**V12                V10
   * Matching API URl = API URL
   * Client API Key = APP Key
   * Client Key = Customer Key
   * No Secret  = Secret Key
   */

 public bioCloudConfigForm: FormGroup;
 isV12 = true;
 deviceNameList: Array<any> = [];
 loading = false;
 imageLoader = AnimatedLoaderConstants.SMALL_ROUND_LOADER;
 isCookieSavedOK = false;
 isFormDataOk = false;
 isSubmitOk = false;

 get CommonConstants() {
   return Common;
 }

 constructor(
  private spinner: NgxSpinnerService, 
   private titleService: Title,
   private formBuilder: FormBuilder,
   private router: Router,
   private route: ActivatedRoute,
   private scriptService: ScriptService,
   private alertService: AlertService,
   private authService: AuthService,
   private localStorageService: LocalStorageService,
   private cloudscanrService: CloudscanrService,
   private cookieService: CookieStorageService,
   private notifyService: NotificationService,
   private bioMiddlewareService: BioMiddlewareService
 ) {
   //this.scriptService.loadScripts();
   this.spinner.show('spinrAllModules');
 }

 ngOnInit(): void {
   
   this.titleService.setTitle(Common.APPCONFIG_TITLE);
   this.scriptService.enableLayout();
   this.isV12 = this.cookieService.getValueByName(
     CookiesConstants.CLOUD_VERSION,
     DataTypeConstants.Boolean
   );
   this.createForm();
   this.initializeFormData();
   this.setDefaultFormData();
   setTimeout(() => (this.spinner.hide('spinrAllModules')), 1000);
 }


 createForm() {
   this.bioCloudConfigForm = this.formBuilder.group({
     deviceName: new FormControl('', Validators.required),
     engineName: new FormControl('', [
       Validators.required,
       WhiteSpaceValidator.noWhiteSpace,
     ]),
     apiBaseUrl: new FormControl('', [
       Validators.required,
       Validators.minLength(10),
       WhiteSpaceValidator.noWhiteSpace,
     ]),
     clientApiKey: new FormControl('', Validators.required),
     clientKey: new FormControl('', Validators.required),
     secretKey: new FormControl(''),
   });
 }

 initializeFormData() {
   
   this.deviceNameList = [];
   if (this.isV12) {
     BiometricDeviceList.forEach((item, index) => {
       if (item.engineName !== Common.FINGER_VEIN_FVHT01) { //item.engineName !== Common.FINGER_VEIN && 
         this.deviceNameList.push(item);
       }
     });
   } else {
     BiometricDeviceList.forEach((item, index) => {
       if (item.engineName === Common.FINGER_VEIN_FVHT01) {
         this.deviceNameList.push(item);
       }
     });
   }
 }

 setDefaultFormData() {
   
   const deviceName = this.getDeviceName()? this.getDeviceName(): this.isV12? Common.V12_DEFAULT_DEVICE_NAME: Common.V10_DEFAULT_DEVICE_NAME;
   const engineName = this.getEngineName()? this.getEngineName(): this.isV12? Common.V12_DEFAULT_ENGINE_NAME: Common.V10_DEFAULT_ENGINE_NAME_1;
   const apiBaseUrl = this.getBaseUrl() ? this.getBaseUrl() : '';
   const clientApiAppKey = this.getClientApiAppKey() ? this.getClientApiAppKey() : '';
   const clientCustKey = this.getClientCustKey() ? this.getClientCustKey() : '';
   const secretKey = this.getSecretKey() ? this.getSecretKey() : '';

   let appconfig = {
     deviceName: deviceName,
     engineName: engineName,
     apiBaseUrl: apiBaseUrl,
     clientApiKey: clientApiAppKey,
     clientKey: clientCustKey,
     secretKey: secretKey,
   };

   this.bioCloudConfigForm.setValue(appconfig);
 }

 getDeviceName() {
   let deviceName = this.isV12? this.cookieService.getValueByName(
    CookiesConstants.CABDeviceName,
    DataTypeConstants.String
  ): this.cookieService.getValueByName(
    CookiesConstants.FVDeviceName,
    DataTypeConstants.String);
  
    return deviceName;
 }

 getEngineName() {

  let engineName = this.isV12? this.cookieService.getValueByName(
    CookiesConstants.CABEngineName,
    DataTypeConstants.String
    ): this.cookieService.getValueByName(
      CookiesConstants.FVEngineName,
      DataTypeConstants.String);
      return engineName;
 }

 getBaseUrl() {
  let baseUrl = this.isV12? this.cookieService.getValueByName(
    CookiesConstants.CABBaseURL,
    DataTypeConstants.String
  ): this.cookieService.getValueByName(
    CookiesConstants.FVBaseURL,
    DataTypeConstants.String);
    return baseUrl;
 }

 getClientApiAppKey() {
  let clientapiOrAppKey = this.isV12? this.cookieService.getValueByName(
    CookiesConstants.CABClientAPIKey,
    DataTypeConstants.String
  ): this.cookieService.getValueByName(
    CookiesConstants.FVAppKey,
    DataTypeConstants.String);
    return clientapiOrAppKey;
 }

 getClientCustKey() {
  let clientOrCustKey = this.isV12? this.cookieService.getValueByName(
    CookiesConstants.CABClientKey,
    DataTypeConstants.String
  ): this.cookieService.getValueByName(
    CookiesConstants.FVCustomerKey,
    DataTypeConstants.String);
    return clientOrCustKey;
 }

 getSecretKey() {
  let noSectOrSecKey = this.isV12? this.cookieService.getValueByName(
     CookiesConstants.CABSecretKey,
     DataTypeConstants.String
   ): this.cookieService.getValueByName(
     CookiesConstants.FVSecretKey,
     DataTypeConstants.String
   );
   return noSectOrSecKey;
 }

 changeVersion(event?: any) {
   if (event.target.checked) {
     this.isV12 = event.target.checked;
     this.initializeFormData();
     this.setDefaultFormData();
   } else {
     this.isV12 = event.target.checked;
     this.initializeFormData();
     this.setDefaultFormData();
   }
 }

 changeDevice(event?: any) {
   const selectedDeviceName =
     this.bioCloudConfigForm.controls['deviceName'].value;
   const singleDevice: any = this.deviceNameList.filter((deviceName) => {
     return deviceName.name === selectedDeviceName;
   });
   this.bioCloudConfigForm
     .get('engineName')
     .setValue(singleDevice[0].engineName);
 }

 onSubmit() {
   
   this.loading = true;
   if (this.bioCloudConfigForm.invalid) {
     return;
   }
   let formData = this.bioCloudConfigForm.value;

   try {
     if (formData) {
       this.isFormDataOk = true;
       const isV12Ok = this.isV12 ? 'true' : 'false';
       let currentWorkingVersion = '';
       if(this.isV12){
        currentWorkingVersion = Common.V12;
       }else{
        currentWorkingVersion = Common.V10;
       }
      //  const isCookieVersionV12 = this.cookieService.getValueByName(
      //    CookiesConstants.CLOUD_VERSION,
      //    DataTypeConstants.Boolean
      //  );
      //  if (isCookieVersionV12) {
      //    this.cookieService.bulkDelete(CookiesConstants.V12_COOKIE_NAMES);
      //  } else {
      //    this.cookieService.bulkDelete(CookiesConstants.V10_COOKIE_NAMES);
      //  }

       this.isCookieSavedOK =
         this.cookieService.setValueByName(
           this.isV12? CookiesConstants.CABDeviceName: CookiesConstants.FVDeviceName,
           formData.deviceName
         ).status == false
           ? false
           : this.cookieService.setValueByName(
            this.isV12? CookiesConstants.CABEngineName: CookiesConstants.FVEngineName,
               formData.engineName
             ).status == false
           ? false
           : this.cookieService.setValueByName(
            this.isV12? CookiesConstants.CABBaseURL: CookiesConstants.FVBaseURL,
               formData.apiBaseUrl
             ).status == false
           ? false
           : this.cookieService.setValueByName(
            this.isV12? CookiesConstants.CABClientAPIKey: CookiesConstants.FVAppKey,
               formData.clientApiKey
             ).status == false
           ? false
           : this.cookieService.setValueByName(
            this.isV12? CookiesConstants.CABClientKey: CookiesConstants.FVCustomerKey,
               formData.clientKey
             ).status == false
           ? false
           : this.cookieService.setValueByName(
            this.isV12? CookiesConstants.CABSecretKey: CookiesConstants.FVSecretKey,
               formData.secretKey
             ).status == false
           ? false
           : this.cookieService.setValueByName(
               CookiesConstants.CLOUD_VERSION,
               isV12Ok
             ).status == false
           ? false
           : this.cookieService.setValueByName(
            CookiesConstants.TRACK_DEFAULT_VERSION,
            currentWorkingVersion
          ).status == false
        ? false
           : true;
     }

     setTimeout(() => {
       this.loading = false;
     }, 1000);
     if (!this.isFormDataOk) {
       this.notifyService.showError(
         MessageConstants.APP_CONFIG_FORM_DATA_ERROR_MSG,
         MessageConstants.APP_CONFIG_FORM_DATA_ERROR_TITLE
       );
     }

     if (this.isCookieSavedOK) {
       this.notifyService.showSuccess(
         MessageConstants.APP_CONFIG_SAVE_SUCCESS_MSG,
         MessageConstants.APP_CONFIG_SAVE_SUCCESS_TITLE
       );
     } else {
       this.notifyService.showError(
         MessageConstants.APP_CONFIG_SAVE_FAILED_MSG,
         MessageConstants.APP_CONFIG_SAVE_FAILED_TITLE
       );
     }
     //create token
     this.isV12? this.bioMiddlewareService.V12CreateTokenFromAppConfig():
      this.bioMiddlewareService.V10CreateTokenFromAppConfig();

   } catch (error) {
     setTimeout(() => {
       this.loading = false;
     }, 1000);
     this.notifyService.showError(
       error.error.message,
       MessageConstants.APP_CONFIG_SUBMIT_ERROR_TITLE
     );
   }
 }

 cancel() {
   this.setDefaultFormData();
 }

//  resetForm() {
   
//    const isCookieVersionV12 = this.cookieService.getValueByName(
//      CookiesConstants.CLOUD_VERSION,
//      DataTypeConstants.Boolean
//    );
//    if (!isCookieVersionV12 && !this.isV12) {
//      this.setDefaultFormData();
    
//    } else if (isCookieVersionV12 && this.isV12) {
//      this.setDefaultFormData();
//    } else {
//      this.bioCloudConfigForm.get('apiBaseUrl').setValue('');
//      this.bioCloudConfigForm.get('clientApiKey').setValue('');
//      this.bioCloudConfigForm.get('clientKey').setValue('');
//      this.bioCloudConfigForm.get('secretKey').setValue('');
//    }
//  }

 ngOnDestroy() {}
}
