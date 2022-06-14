import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
  LocalStorageService,
  RouteService,
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
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CookieStorageService {
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  cookieValue: any;

  constructor(private cookieService: CookieService) {}

  setValueByName(name: string, value: any) {
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CookiesConstants.ExpiryDays);

    try {
      this.cookieService.set(name, value, expiryDate,'/');
      return {
        code: 200,
        status: true,
        message: name.concat(' saved successfully'),
      };
    } catch (error) {
      return { code: 200, status: true, message: name.concat(error.message) };
    }
  }

  getValueByName(name: string, convertType?: string) {
    var tempValue = this.cookieService.get(name);
    switch (convertType) {
      case DataTypeConstants.Date:
        this.cookieValue = this.pipe.transform(Date.now(), tempValue);
        break;
      case DataTypeConstants.String:
        this.cookieValue = tempValue.toString();
        break;
      case DataTypeConstants.Number:
        this.cookieValue = Number(tempValue);
        break;
      case DataTypeConstants.Boolean:
        
        this.cookieValue = tempValue === 'true'? true: false;
        break;
      default:
        this.cookieValue = tempValue;
        break;
    }

    return this.cookieValue;
  }

  deleteByName(name: string){
    this.cookieService.delete(name,'/');

  }

  bulkDelete(names: string[]){
    names.forEach((item, index) => {
      this.cookieService.delete(item,'/');
    });
  }

  deleteAll(){
    this.cookieService.deleteAll('/');
    
  }
}
