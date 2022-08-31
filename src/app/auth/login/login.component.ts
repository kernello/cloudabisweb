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
  Common
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
  AlertService
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  flag = true;
  public userLoginForm: FormGroup;
  res: any;
  loading = false;
  submitted = false;
  resmessage: string;
  isLoginLoad: boolean;
  returnUrl: string;

  constructor(
    private spinner: NgxSpinnerService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private scriptService: ScriptService,
    private alertService: AlertService,
    private authService: AuthService,
    private localDbStore: LocalStorageService) {
    //this.scriptService.loadScripts();
    this.spinner.show('spinrRoot');
    // if (!(this.authService.currentUserValue === null) || !(this.authService.currentUserValue === undefined)) {
    //   this.router.navigate([HomeRoutesConstants.HOME_URL]);
    // } else {
    //   const users = [
    //     {
    //       id: 1,
    //       username: 'aswinburn0',
    //       password: 'Dz5yGSz1cSl',
    //       firstName: 'Anatollo',
    //       lastName: 'Swinburn'
    //     },
    //   ];
    //   this.localDbStore.setData(LocalStorageConstants.USERS, users);
    // }
    const users = [
      {
        id: 1,
        username: 'aswinburn0',
        password: 'Dz5yGSz1cSl',
        firstName: 'Anatollo',
        lastName: 'Swinburn'
      },
    ];
    this.localDbStore.setData(LocalStorageConstants.USERS, users);

  }

  ngOnInit(): void {
    this.titleService.setTitle(Common.LOGIN_TITLE);
    this.scriptService.disableLayout();
    this.createForm();
    // this.returnUrl =
    //   this.route.snapshot.queryParams[Common.RETURN_URL] ||
    //   HomeRoutesConstants.HOME_URL;
      setTimeout(() => (this.spinner.hide('spinrRoot')), 1000);
  }

  createForm() {
    this.userLoginForm = this.formBuilder.group({
      username: new FormControl('admin', Validators.required),
      password: new FormControl('admin', Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userLoginForm.invalid) {
      return;
    }
    const model = {
      username: this.userLoginForm.controls[Common.CONTROL_USER_NAME].value,
      password: this.userLoginForm.controls[Common.CONTROL_PASSWORD].value,
    };
    this.loading = true;
    this.authService.login().pipe(first()).subscribe({
        next: data => {
          //this.router.navigate([this.returnUrl]);
          this.router.navigateByUrl(HomeRoutesConstants.HOME_URL);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
    })
  }
}
