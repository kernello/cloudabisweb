import {
  AuthService,
  ApiService,
  CloudscanrService,
  CookieStorageService,
  LocalStorageService,
  RouteService,
  ScriptService,
  AlertService,
  NotificationService,
  CommonHelpersService,
} from '@app/shared/services';
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
  Common,
  MessageConstants,
  AnimatedLoaderConstants,
  ModelInterfaceConstants,
  ErrorCode,
  AbisConstant,
} from '@app/shared/constants';

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
  EnumTypeOfTemplate,
  EnumRelocatePosition,
  EnumOperationName,
  EnumOperationStatus,
  EnumOperationalResponseStatus,
  ResponseOperationName,
  ResponseOperationStatus,
} from '@app/shared/enums';

export class BaseAuthV10ResModel {
  public isSuccess: boolean;
  public code: string;
  public message: string;
  public data: AuthResV10Model;

  constructor(response: AuthResV10Model, msgContent: any) {
    this.isSuccess = response.access_token ? true : false;
    this.code = msgContent.code ? msgContent.code : '';
    this.message = msgContent.message ? msgContent.message : '';
    this.data = response;
  }
}

export interface AuthResV10Model {
  access_token: string;
  token_type: string;
  expires_in: number;
  error: string;
  error_description: string;
}

export class BaseBioResV10Model {
    public isSuccess: boolean;
    public code: string;
    public message: string;
    public data: BioResV10Model;
  constructor(response: BioResV10Model, msgContent: any) {
    this.isSuccess = response.Status === EnumOperationStatus.SUCCESS? true: false;
    this.code = msgContent.code ? msgContent.code : '';
    this.message = msgContent.message ? msgContent.message : '';
    this.data = response;
  }
}

export interface BioResV10Model {
  CustomerID: string;
  OperationName: number;
  Status: number;
  OperationResult: string;
  BestResult: BestResult;
  DetailResult: DetailResult[];
  MatchCount: number;
}

export interface BestResult {
  Score: number;
  ID: string;
  FingerPosition: number;
}

export interface DetailResult {
  Score: number;
  ID: string;
  FingerPosition: number;
}

export class ResponseMsg{
    message: string;
    code: string;
    constructor(){
        
    }
}
