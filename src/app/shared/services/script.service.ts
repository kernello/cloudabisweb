import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
  LocalStorageConstants
} from '@app/shared/constants';

import {
  AuthService,
  ApiService,
  CloudabisV10Service,
  CloudabisV12Service,
  CloudscanrService,
  CookieStorageService,
  LocalStorageService,
  RouteService
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
export class ScriptService {
  loadScripts() {
    const libScripts = [
      'assets/vendors/js/vendor.bundle.base.js',
      'assets/vendors/jquery-bar-rating/jquery.barrating.min.js',
      'assets/vendors/chart.js/Chart.min.js',
      'assets/vendors/flot/jquery.flot.js',
      'assets/vendors/flot/jquery.flot.resize.js',
      'assets/vendors/flot/jquery.flot.categories.js',
      'assets/vendors/flot/jquery.flot.fillbetween.js',
      'assets/vendors/flot/jquery.flot.stack.js',
      'assets/js/jquery.cookie.js',
      'assets/js/off-canvas.js',
      'assets/js/hoverable-collapse.js',
      'assets/js/misc.js',
      'assets/js/settings.js',
      'assets/js/todolist.js',
      'assets/js/dashboard.js',
    ];

    var tags = document.getElementsByTagName('theme-script')[0];
    if (tags.childNodes.length > 0) {
      var nodeLength = tags.childNodes.length;
      var nodeIndex = tags.childNodes.length - 1;
      for (nodeIndex; nodeIndex < nodeLength; nodeIndex--) {
        if (nodeIndex < 0) {
          break;
        } else {
          tags.removeChild(tags.childNodes[nodeIndex]);
        }
        nodeLength -= 1;
      }
    }

    for (let i = 0; i < libScripts.length; i++) {
      const node = document.createElement('script');
      node.src = libScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('theme-script')[0].appendChild(node);
    }
  }

  disableLayout() {
    const sidebar = document.getElementById('sidebarapp') as HTMLElement;
    const settingpanel = document.getElementById(
      'settingpanelapp'
    ) as HTMLElement;
    const navbar = document.getElementById('navbarapp') as HTMLElement;
    const footer = document.getElementById('footerapp') as HTMLElement;

    sidebar.style.display = 'none';
    settingpanel.style.display = 'none';
    navbar.style.display = 'none';
    footer.style.display = 'none';
  }

  enableLayout() {
    const sidebar = document.getElementById('sidebarapp') as HTMLElement;
    const settingpanel = document.getElementById(
      'settingpanelapp'
    ) as HTMLElement;
    const navbar = document.getElementById('navbarapp') as HTMLElement;
    const footer = document.getElementById('footerapp') as HTMLElement;

    sidebar.style.display = 'block';
    settingpanel.style.display = 'block';
    navbar.style.display = 'block';
    footer.style.display = 'block';
  }
}
