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
  EnumOperationName,
  EnumOperationStatus,
  ResponseOperationName,
  ResponseOperationStatus,
  EnumOperationalResponseStatus,
  EnumTypeOfTemplate,
} from '@app/shared/enums';

// export class ServiceModelResponse<T> {
//   public isSuccess: boolean;
//   public message: string;
//   public responseCode: string;
//   public responseData: T;

//   //mapping baser data service response to service response
//   constructor(response: BaseModelResponse<T>) {
//     this.isSuccess = response.status===ModelInterfaceConstants.Success? true: false;
//     this.message = response.message ? response.message : '';
//     this.responseCode = response.responseCode ? response.responseCode : '';
//     if (response.responseData) {
//       this.responseData = response.responseData;
//     }
//   }
// }
export class ServiceModelResponse<T> {
  public isSuccess: boolean;
  public message: string;
  public code: string;
  public data: T;

  
  constructor(response: BaseModelResponse<T>) {
    debugger;
    if (response.status && response.status === ModelInterfaceConstants.Success) {
      this.isSuccess = true;
    } else {
      this.isSuccess = false;
    }
    this.message = response.message ? response.message : '';
    this.code = response.responseCode ? response.responseCode : '';
    if (response.responseData) {
      this.data = response.responseData;
    }
  }
}


export class BaseModelResponse<T> {
  status: string;
  message: string;
  responseCode: string;
  responseData: T;
}

export interface BioPluginTokenReponse {
  accessToken: number;
  expiresIn: number;
  tokenType: string;
  error: string;
  errorDescription: string;
}


export class BioServiceResponse{
  public isSuccess: boolean;
  public message: string;
  public code: string;
  public data: MatchingResultResponse;
  constructor(response: MatchingResultResponse){
    this.isSuccess = response.operationStatus === ResponseOperationStatus.SUCCESS? true:false;
    this.message = response.message;
    this.code = response.operationStatus? response.operationStatus:'';
    this.data = response;
  }

}


export interface MatchingResultResponse {
  instanceId: number;
  sequenceNo: number;
  operationName: string;
  operationStatus: string;
  operationResult: string;
  message: string;
  bestResult: ResultScore;
  detailResult: ResultScoreItem[];
  templateBase64: string;
  clientKey: string;
}


export interface ResultScore {
  score: number;
  id: string;
}

export interface ResultScoreItem {
  fingersScore?: number;
  matchedFingers: ScoreIndex[];
  irisesScore?: number;
  matchedIrises: ScoreIndex[];
  facesScore?: number;
  facesMatchedIndex?: number;
  matchedFaces: ScoreIndex[];
}

export interface ScoreIndex {
  score: number;
  matchedIndex?: number;
}
