import { Injectable, ElementRef } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

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
  ModelInterfaceConstants,
  ErrorCode,
  AbisConstant,
} from '@app/shared/constants';

import {
  AuthService,
  ApiService,
  CloudabisV12Service,
  CloudabisV10Service,
  CloudscanrService,
  CookieStorageService,
  LocalStorageService,
  RouteService,
  ScriptService,
  AlertService,
  NotificationService,
} from '@app/shared/services';
import {
  QueryParams,
  ApiQueryParam,
  ServiceModelResponse,
  AuthRequestV12Model,
  BioPluginTokenReponse,
  IsRegRequestV12Model,
  MatchingResultResponse,
  BaseModelResponse,
  BioServiceResponse,
  BioServiceRequest,
  ChangeIdRequestV12Model,
  DeleteRequestV12Model,
  ImgQualityRequestV12Model,
  AuthReqV10Params,
  CommonNonBioReqV10Model,
  UniqueNonBioReqV10Model,
  CommonBioReqV10Model,
  UniqueBioReqV10Model,
  BaseAuthV10ResModel,
  AuthResV10Model,
  BaseBioResV10Model,
  BioResV10Model,
  ResponseMsg,
  CurrentNotification
} from '@app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class CommonHelpersService {
  // private currentNotificationSub: BehaviorSubject<CurrentNotification>;
  // public currentNotification: Observable<CurrentNotification>;
  // private currentNotify: CurrentNotification;
  currentNotify =  new CurrentNotification();
  private currentNotificationSub = new BehaviorSubject<CurrentNotification>(this.currentNotify);
  currentNotification = this.currentNotificationSub.asObservable();

  constructor(
    private cookieService: CookieStorageService,
    private notifyService: NotificationService,
    private spinner: NgxSpinnerService,
    private routeService: RouteService,
    private localDbStore: LocalStorageService
  ) {
    // this.currentNotify =  new CurrentNotification();
    // this.currentNotificationSub = new BehaviorSubject<CurrentNotification>(this.currentNotify);
    //     this.currentNotification = this.currentNotificationSub.asObservable();
  }

  updateCurrentNotification(notifyObject: CurrentNotification){
    debugger
    this.currentNotificationSub.next(notifyObject);
  }

  convertListDateTimeToLocal(utcDate: string) {
    return new Date(utcDate + 'Z');
  }

  getStartingOfTodayToUTC() {
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    return start.toUTCString();
  }

  getStartingOfTodayToUTCAlternate() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toUTCString();
  }

  convertListDateTimeToLocalDateString(utcDate: string) {
    return new Date(utcDate + 'Z').toString();
  }

  convertDateTimeToLocal(utcDate: string) {
    return new Date(utcDate).toLocaleString();
  }

  convertListDateTimeToLocalExtn(utcDate: string) {
    let input = new Date(utcDate);
    return new Date(
      Date.UTC(
        input.getFullYear(),
        input.getMonth(),
        input.getDate(),
        input.getHours(),
        input.getMinutes(),
        input.getSeconds()
      )
    );
  }

  convertLocalDateTimeToUtc(localDate: string) {
    return new Date(new Date(localDate + 'Z')).toUTCString();
  }

  stringConcatenator(arr_names: string[], separator: string) {
    var finalstring = '';
    for (var i = 0; i < arr_names.length; i++) {
      if (!(arr_names.length - 1 === i)) {
        finalstring += arr_names[i].concat(separator);
      } else {
        finalstring += arr_names[i];
      }
      console.log(arr_names[i]);
    }
    return finalstring;
  }

  getName(arr_names: string[], separator: string, isPdf: boolean) {
    var finalstring = '';
    for (var i = 0; i < arr_names.length; i++) {
      if (!(arr_names.length - 1 === i)) {
        finalstring += arr_names[i].concat(separator);
      } else {
        finalstring += arr_names[i];
      }

      console.log(arr_names[i]);
    }
    return isPdf ? finalstring + '.pdf' : finalstring;
  }

  exportExcel(data: any, fileName: string) {
    const worksheet = XLSX.utils.json_to_sheet(data); // Sale Data
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  exportCsv(rows: object[], fileName: string, columns?: string[]): string {
    let CSV_EXTENSION = '.csv';
    let CSV_TYPE = 'text/csv;charset=utf-8';
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]).filter((k) => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell =
                cell instanceof Date
                  ? cell.toLocaleString()
                  : cell.toString().replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join('\n');
    this.saveAsCsvFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }

  private saveAsCsvFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }

  convertJsonArrayToObject(data: any) {
    var result = new Array<Object>();
    for (var i = 0; i < data.length; i++) {
      var object = new Object(JSON.parse(JSON.stringify(data[i])));
      //var object = new Object(JSON.parse(data[i]));
      result.push(object);
    }
    return result;
  }

  // var startDate = new Date().toUTCString();
  // console.log(startDate);
  // var format1 = new Date(new Date(Date.now() - 86400 * 1000).toISOString());
  // var format2 = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  // console.log(format1.toUTCString());
  // console.log(format2.toUTCString());
  getDateTimeOfLast24HoursToUTC() {
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toUTCString();
  }

  getLast7DaysDateTimeToUTC() {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toUTCString();
  }

  getLast30DaysDateTimeToUTC() {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toUTCString();
  }

  getLastMonthDateTimeToUTC() {
    var oneMonthAgoDateTime = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    );
    return oneMonthAgoDateTime.toUTCString();
  }

  getLastYearDateTimeToUTC() {
    var oneYearAgoDateTime = new Date(
      new Date().getFullYear() - 1,
      new Date().getMonth(),
      new Date().getDate()
    );
    return oneYearAgoDateTime.toUTCString();
  }

  isContains(input1: string, input2: string) {
    let count = 0;
    let i = 0;
    let startIndex = 0;

    while (i < input1.length) {
      if (input2[count] === input1[i]) {
        if (count === input2.length - 1) {
          return true;
        }
        count++;
      } else {
        count = 0;
        i = startIndex;
        startIndex++;
      }
      i++;
    }
    return false;
  }

  findGreater = (arr, num) => {
    let isfound = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > num) {
        isfound = true;
        break;
      }
    }
    return isfound;
  };

  isEmpty(str) {
    return !str || str.length === 0;
  }

  isBlank(str) {
    return !str || /^\s*$/.test(str);
  }

  isValid(strValue) {
    const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (strValue === null) {
      return false;
    }

    if (strValue === undefined) {
      return false;
    }
    if (format.test(strValue)) {
      return false;
    }
    if (strValue.length <= 1) {
      return false;
    }
    return true;
  }

  getModuleMenu(url: string) {
    if (url === '/') {
      return 'home';
    } else if (url === '/profile/subscription-activities') {
      return 'home';
    } else if (url === '/enrollments') {
      return 'home';
    } else if (url === '/api-settings') {
      return 'biometric';
    } else if (url === '/api-overview') {
      return 'biometric';
    } else if (url === '/api-details') {
      return 'biometric';
    } else if (url === '/profile/settings') {
      return 'profile';
    } else if (url === '/profile/projects') {
      return 'profile';
    } else if (url === '/profile/billing') {
      return 'profile';
    } else if (url === '/profile/card') {
      return 'profile';
    } else {
      return 'cloudscanr';
    }
  }

  getModuleButtonId(url: string) {
    if (url === '/') {
      return 'home-btn';
    } else if (url === '/profile/subscription-activities') {
      return 'home-btn';
    } else if (url === '/enrollments') {
      return 'home-btn';
    } else if (url === '/api-settings') {
      return 'biometric-btn';
    } else if (url === '/api-overview') {
      return 'biometric-btn';
    } else if (url === '/api-details') {
      return 'biometric-btn';
    } else if (url === '/profile/settings') {
      return 'profile-btn';
    } else if (url === '/profile/projects') {
      return 'profile-btn';
    } else if (url === '/profile/billing') {
      return 'profile-btn';
    } else if (url === '/profile/card') {
      return 'profile-btn';
    } else {
      return 'cloudscanr-btn';
    }
  }

  validData(str: string) {
    if (str === null || str === 'undefined' || this.isEmpty(str)) {
      return false;
    } else {
      return true;
    }
  }

  
}
