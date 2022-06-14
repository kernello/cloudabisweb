import { Injectable } from '@angular/core';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
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
  CookieStorageService,
  LocalStorageService,
  RouteService,
  ScriptService,
  AlertService,
  NotificationService,
  CommonHelpersService,
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
} from '@app/shared/enums';
import {
  QueryParams,
  ApiQueryParam,
  CaptureMinRequestV12Model,
  CaptureResponseV12Model,
  CaptureResponseV12Interface,
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
  CaptureRequestV10Model,
  CaptureResponseV10Model,
  CloudScanrV10CaptureResult,
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
} from '@app/shared/models';
import {
  FingerPrintDevices,
  IrisDevices,
  FaceDevices,
  MultimodalDevices,
  FingerVeinDevices,
} from '@app/shared/objects';

@Injectable({
  providedIn: 'root',
})
export class CloudscanrService {
  res: any;

  get CaptureType() {
    return EnumCaptureType;
  }

  get CaptureOperationName() {
    return EnumCaptureOperationName;
  }

  get MatchingOperationName() {
    return EnumMatchingOperationName;
  }

  get FeatureMode() {
    return EnumFeatureMode;
  }

  get SingleCaptureMode() {
    return EnumSingleCaptureMode;
  }

  get Devices() {
    return EnumDevices;
  }

  get FingerPosition() {
    return EnumFingerPosition;
  }

  get DuelFingerPosition() {
    return EnumDuelFingerPosition;
  }

  get Engines() {
    return EnumEngines;
  }

  get EnginesMapper() {
    return EnumEnginesMapper;
  }

  get BiometricImageFormat() {
    return EnumBiometricImageFormat;
  }

  get FaceImageFormat() {
    return EnumFaceImageFormat;
  }

  apiQueryParams: ApiQueryParam[] = [];
  apiQueryParam: ApiQueryParam;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieStorageService,
    private routeService: RouteService,
    private scriptService: ScriptService
  ) {
    /*
     * Set base API
     */
    debugger;
    // this.apiService.baseUrl = null;
    // this.apiService.initializeBaseURL(
    //   CloudScanrAPIURLsConstants.CLOUDABISSCANR_BASE_API_URL
    // );
  }

  /*
   * Finds engine name against device name
   */
  getEngineName(deviceName: string) {
    let resultEngineName = '';
    if (FingerPrintDevices.indexOf(deviceName) >= 0) {
      resultEngineName = EnumEnginesMapper.FingerPrint;
    } else if (IrisDevices.indexOf(deviceName) >= 0) {
      resultEngineName = EnumEnginesMapper.Iris;
    } else if (FaceDevices.indexOf(deviceName) >= 0) {
      resultEngineName = EnumEnginesMapper.Face;
    } else if (MultimodalDevices.indexOf(deviceName) >= 0) {
      resultEngineName = EnumEnginesMapper.MultiModal;
    } else if (FingerVeinDevices.indexOf(deviceName) >= 0) {
      resultEngineName = EnumEnginesMapper.FingerVein;
    } else {
      resultEngineName = '';
    }
    return resultEngineName;
  }

  // postRequest(apiEndPoint: string, requestBody: any) {
  //   this.apiService
  //     .post(apiEndPoint, requestBody, false)
  //     .subscribe((response) => {
  //       this.res = response;
  //     });
  // }

  // postRequest(apiEndPoint: string, requestBody: any) {
  //   return this.apiService
  //     .post(apiEndPoint, requestBody, false)
  //     .subscribe((data: {}) => {
  //       this.res = data;

  //     });
  // }

  /*
   *Will be performed finger print biometric capture
   */
  //CaptureResponseV12Interface

  setBaseUrl() {
    this.apiService.initializeBaseURL(
      CloudScanrAPIURLsConstants.CLOUDABISSCANR_BASE_API_URL
    );
  }

  getCaptureData(
    captureReqModel: CaptureMinRequestV12Model,
    engineName: string
  ): Observable<CaptureResponseV12Model> {
    this.setBaseUrl();
    debugger;
    var modifiedReqModel = this.createModels(captureReqModel, engineName);
    var apiCaptureEndPoint =
      engineName === EnumEnginesMapper.FingerPrint
        ? CloudScanrAPIURLsConstants.CLOUDABISSCANR_FP_CAPTURE_API_PATH
        : engineName === EnumEnginesMapper.Iris
        ? CloudScanrAPIURLsConstants.CLOUDABISSCANR_IRIS_CAPTURE_API_PATH
        : engineName === EnumEnginesMapper.MultiModal
        ? CloudScanrAPIURLsConstants.CLOUDABISSCANR_MULTI_MODEL_CAPTURE_API_PATH
        : CloudScanrAPIURLsConstants.CLOUDABISSCANR_FACE_CAPTURE_API_PATH;

    return this.apiService
      .post(apiCaptureEndPoint, modifiedReqModel, false)
      .pipe(
        map((response: CaptureResponseV12Interface) => {
          if (response) {
            const captureResponse = new CaptureResponseV12Model(response);
            return captureResponse;
          }
        })
      );
  }

  getLegacyCapturedData(captureReqModel: CaptureRequestV10Model, engineName: string): Observable<CaptureResponseV10Model> {
    this.setBaseUrl();
    var reqModel = this.createModels(captureReqModel, engineName);
    debugger;
    var apiCaptureEndPoint =
      engineName === EnumEnginesMapper.FVHT01? CloudScanrAPIURLsConstants.CLOUDABISSCANR_FV_CAPTURE_API_PATH: '';

      return this.apiService
      .post(apiCaptureEndPoint, reqModel, false)
      .pipe(
        map((response: CloudScanrV10CaptureResult) => {
          if (response) {
            const captureResponse = new CaptureResponseV10Model(response);
            return captureResponse;
          }
        })
      );
  }

  createModels(captureParam: any, engineName: string) {
    var requestBody: any = {};
    switch (engineName) {
      case EnumEnginesMapper.FingerPrint:
        if (
          captureParam.DeviceName !== null &&
          captureParam.DeviceName !== undefined
        ) {
          requestBody.DeviceName = captureParam.DeviceName;
        }

        if (
          captureParam.QuickScan !== null &&
          captureParam.QuickScan !== undefined
        ) {
          requestBody.QuickScan = captureParam.QuickScan;
        }

        if (
          captureParam.CaptureType !== null &&
          captureParam.CaptureType !== undefined
        ) {
          requestBody.CaptureType = captureParam.CaptureType;
        }

        if (
          captureParam.SingleCaptureMode !== null &&
          captureParam.SingleCaptureMode !== undefined
        ) {
          requestBody.SingleCaptureMode = captureParam.SingleCaptureMode;
        }

        if (
          captureParam.CaptureTimeOut !== null &&
          captureParam.CaptureTimeOut !== undefined
        ) {
          requestBody.CaptureTimeOut = captureParam.CaptureTimeOut;
        }

        if (
          captureParam.CaptureOperationName !== null &&
          captureParam.CaptureOperationName !== undefined
        ) {
          requestBody.CaptureOperationName = captureParam.CaptureOperationName;
        }

        if (
          captureParam.TenPrint !== null &&
          captureParam.TenPrint !== undefined
        ) {
          requestBody.TenPrint = captureParam.TenPrint;
        }

        if (
          captureParam.DuelFingerPosition !== null &&
          captureParam.DuelFingerPosition !== undefined
        ) {
          requestBody.DuelFingerPosition = captureParam.DuelFingerPosition;
        }

        if (
          captureParam.LeftFingerPosition !== null &&
          captureParam.LeftFingerPosition !== undefined
        ) {
          requestBody.LeftFingerPosition = captureParam.LeftFingerPosition;
        }

        if (
          captureParam.RightFingerPosition !== null &&
          captureParam.RightFingerPosition !== undefined
        ) {
          requestBody.RightFingerPosition = captureParam.RightFingerPosition;
        }

        if (
          captureParam.FaceImage !== null &&
          captureParam.FaceImage !== undefined
        ) {
          requestBody.FaceImage = captureParam.FaceImage;
        }
        break;

      case EnumEnginesMapper.Iris:
        if (
          captureParam.DeviceName !== null &&
          captureParam.DeviceName !== undefined
        ) {
          requestBody.DeviceName = captureParam.DeviceName;
        }
        if (
          captureParam.QuickScan !== null &&
          captureParam.QuickScan !== undefined
        ) {
          requestBody.QuickScan = captureParam.QuickScan;
        }

        if (
          captureParam.CaptureTimeOut !== null &&
          captureParam.CaptureTimeOut !== undefined
        ) {
          requestBody.CaptureTimeOut = captureParam.CaptureTimeOut;
        }
        if (
          captureParam.CaptureOperationName !== null &&
          captureParam.CaptureOperationName !== undefined
        ) {
          requestBody.CaptureOperationName = captureParam.CaptureOperationName;
        }
        if (
          captureParam.FaceImage !== null &&
          captureParam.FaceImage !== undefined
        ) {
          requestBody.FaceImage = captureParam.FaceImage;
        }
        break;

      case EnumEnginesMapper.FVHT01:
        if (
          captureParam.QuickScan !== null &&
          captureParam.QuickScan !== undefined
        ) {
          requestBody.QuickScan = captureParam.QuickScan;
        }
        if (
          captureParam.DeviceName !== null &&
          captureParam.DeviceName !== undefined
        ) {
          requestBody.DeviceName = captureParam.DeviceName;
        }

        if (
          captureParam.CaptureTimeOut !== null &&
          captureParam.CaptureTimeOut !== undefined
        ) {
          requestBody.CaptureTimeOut = captureParam.CaptureTimeOut;
        }

        if (
          captureParam.FaceImage !== null &&
          captureParam.FaceImage !== undefined
        ) {
          requestBody.FaceImage = captureParam.FaceImage;
        }
        if (
          captureParam.CaptureType !== null &&
          captureParam.CaptureType !== undefined
        ) {
          requestBody.CaptureType = captureParam.CaptureType;
        }

        if (
          captureParam.TenPrint !== null &&
          captureParam.TenPrint !== undefined
        ) {
          requestBody.TenPrint = captureParam.TenPrint;
        }

        if (
          captureParam.HideCaptureUI !== null &&
          captureParam.HideCaptureUI !== undefined
        ) {
          requestBody.HideCaptureUI = captureParam.HideCaptureUI;
        }

        if (
          captureParam.RelocateCaptureUI !== null &&
          captureParam.RelocateCaptureUI !== undefined
        ) {
          requestBody.RelocateCaptureUI = captureParam.RelocateCaptureUI;
        }

        if (
          captureParam.RelocatePosition !== null &&
          captureParam.RelocatePosition !== undefined
        ) {
          requestBody.RelocatePosition = captureParam.RelocatePosition;
        }

        if (
          captureParam.CaptureOperationName !== null &&
          captureParam.CaptureOperationName !== undefined
        ) {
          requestBody.CaptureOperationName = captureParam.CaptureOperationName;
        }
        
        break;

      case EnumEnginesMapper.MultiModal:
        if (
          captureParam.DeviceName !== null &&
          captureParam.DeviceName !== undefined
        ) {
          requestBody.DeviceName = captureParam.DeviceName;
        }
        if (
          captureParam.QuickScan !== null &&
          captureParam.QuickScan !== undefined
        ) {
          requestBody.QuickScan = captureParam.QuickScan;
        }

        if (
          captureParam.CaptureTimeOut !== null &&
          captureParam.CaptureTimeOut !== undefined
        ) {
          requestBody.CaptureTimeOut = captureParam.CaptureTimeOut;
        }
        if (
          captureParam.CaptureOperationName !== null &&
          captureParam.CaptureOperationName !== undefined
        ) {
          requestBody.CaptureOperationName = captureParam.CaptureOperationName;
        }

        //Face
        if (
          captureParam.BioPluginFaceCaptureRequest.DeviceName !== null &&
          captureParam.BioPluginFaceCaptureRequest.DeviceName !== undefined
        ) {
          requestBody.BioPluginFaceCaptureRequest.DeviceName =
            captureParam.BioPluginFaceCaptureRequest.DeviceName;
        }
        if (
          captureParam.BioPluginFaceCaptureRequest.QuickScan !== null &&
          captureParam.BioPluginFaceCaptureRequest.QuickScan !== undefined
        ) {
          requestBody.BioPluginFaceCaptureRequest.QuickScan =
            captureParam.BioPluginFaceCaptureRequest.QuickScan;
        }

        if (
          captureParam.BioPluginFaceCaptureRequest.CaptureTimeOut !== null &&
          captureParam.BioPluginFaceCaptureRequest.CaptureTimeOut !== undefined
        ) {
          requestBody.BioPluginFaceCaptureRequest.CaptureTimeOut =
            captureParam.BioPluginFaceCaptureRequest.CaptureTimeOut;
        }
        if (
          captureParam.BioPluginFaceCaptureRequest.CaptureOperationName !==
            null &&
          captureParam.BioPluginFaceCaptureRequest.CaptureOperationName !==
            undefined
        ) {
          requestBody.BioPluginFaceCaptureRequest.CaptureOperationName =
            captureParam.BioPluginFaceCaptureRequest.CaptureOperationName;
        }
        if (
          captureParam.BioPluginFaceCaptureRequest.IsFaceDetailsIncluded !==
            null &&
          captureParam.BioPluginFaceCaptureRequest.IsFaceDetailsIncluded !==
            undefined
        ) {
          requestBody.BioPluginFaceCaptureRequest.IsFaceDetailsIncluded =
            captureParam.BioPluginFaceCaptureRequest.IsFaceDetailsIncluded;
        }
        if (
          captureParam.BioPluginFaceCaptureRequest.FaceImageFormat !== null &&
          captureParam.BioPluginFaceCaptureRequest.FaceImageFormat !== undefined
        ) {
          requestBody.BioPluginFaceCaptureRequest.FaceImageFormat =
            captureParam.BioPluginFaceCaptureRequest.FaceImageFormat;
        }
        if (
          captureParam.BioPluginFaceCaptureRequest.HasFaceSkip !== null &&
          captureParam.BioPluginFaceCaptureRequest.HasFaceSkip !== undefined
        ) {
          requestBody.BioPluginFaceCaptureRequest.HasFaceSkip =
            captureParam.BioPluginFaceCaptureRequest.HasFaceSkip;
        }
        if (
          captureParam.BioPluginFaceCaptureRequest.IsLiveness !== null &&
          captureParam.BioPluginFaceCaptureRequest.IsLiveness !== undefined
        ) {
          requestBody.BioPluginFaceCaptureRequest.IsLiveness =
            captureParam.BioPluginFaceCaptureRequest.IsLiveness;
        }

        //Iris

        if (
          captureParam.BioPluginIrisCaptureRequest.DeviceName !== null &&
          captureParam.BioPluginIrisCaptureRequest.DeviceName !== undefined
        ) {
          requestBody.BioPluginIrisCaptureRequest.DeviceName =
            captureParam.BioPluginIrisCaptureRequest.DeviceName;
        }
        if (
          captureParam.BioPluginIrisCaptureRequest.QuickScan !== null &&
          captureParam.BioPluginIrisCaptureRequest.QuickScan !== undefined
        ) {
          requestBody.BioPluginIrisCaptureRequest.QuickScan =
            captureParam.BioPluginIrisCaptureRequest.QuickScan;
        }

        if (
          captureParam.BioPluginIrisCaptureRequest.CaptureTimeOut !== null &&
          captureParam.BioPluginIrisCaptureRequest.CaptureTimeOut !== undefined
        ) {
          requestBody.BioPluginIrisCaptureRequest.CaptureTimeOut =
            captureParam.BioPluginIrisCaptureRequest.CaptureTimeOut;
        }
        if (
          captureParam.BioPluginIrisCaptureRequest.CaptureOperationName !==
            null &&
          captureParam.BioPluginIrisCaptureRequest.CaptureOperationName !==
            undefined
        ) {
          requestBody.BioPluginIrisCaptureRequest.CaptureOperationName =
            captureParam.BioPluginIrisCaptureRequest.CaptureOperationName;
        }
        if (
          captureParam.BioPluginIrisCaptureRequest.FaceImage !== null &&
          captureParam.BioPluginIrisCaptureRequest.FaceImage !== undefined
        ) {
          requestBody.BioPluginIrisCaptureRequest.FaceImage =
            captureParam.BioPluginIrisCaptureRequest.FaceImage;
        }

        //Fingerprint

        if (
          captureParam.BioPluginFingerPrintCaptureRequest.DeviceName !== null &&
          captureParam.BioPluginFingerPrintCaptureRequest.DeviceName !==
            undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.DeviceName =
            captureParam.BioPluginFingerPrintCaptureRequest.DeviceName;
        }

        if (
          captureParam.BioPluginFingerPrintCaptureRequest.QuickScan !== null &&
          captureParam.BioPluginFingerPrintCaptureRequest.QuickScan !==
            undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.QuickScan =
            captureParam.BioPluginFingerPrintCaptureRequest.QuickScan;
        }

        if (
          captureParam.BioPluginFingerPrintCaptureRequest.CaptureType !==
            null &&
          captureParam.BioPluginFingerPrintCaptureRequest.CaptureType !==
            undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.CaptureType =
            captureParam.BioPluginFingerPrintCaptureRequest.CaptureType;
        }

        if (
          captureParam.BioPluginFingerPrintCaptureRequest.SingleCaptureMode !==
            null &&
          captureParam.BioPluginFingerPrintCaptureRequest.SingleCaptureMode !==
            undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.SingleCaptureMode =
            captureParam.BioPluginFingerPrintCaptureRequest.SingleCaptureMode;
        }

        if (
          captureParam.BioPluginFingerPrintCaptureRequest.CaptureTimeOut !==
            null &&
          captureParam.BioPluginFingerPrintCaptureRequest.CaptureTimeOut !==
            undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.CaptureTimeOut =
            captureParam.BioPluginFingerPrintCaptureRequest.CaptureTimeOut;
        }

        if (
          captureParam.BioPluginFingerPrintCaptureRequest
            .CaptureOperationName !== null &&
          captureParam.BioPluginFingerPrintCaptureRequest
            .CaptureOperationName !== undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.CaptureOperationName =
            captureParam.BioPluginFingerPrintCaptureRequest.CaptureOperationName;
        }

        if (
          captureParam.BioPluginFingerPrintCaptureRequest.TenPrint !== null &&
          captureParam.BioPluginFingerPrintCaptureRequest.TenPrint !== undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.TenPrint =
            captureParam.BioPluginFingerPrintCaptureRequest.TenPrint;
        }

        if (
          captureParam.BioPluginFingerPrintCaptureRequest.DuelFingerPosition !==
            null &&
          captureParam.BioPluginFingerPrintCaptureRequest.DuelFingerPosition !==
            undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.DuelFingerPosition =
            captureParam.BioPluginFingerPrintCaptureRequest.DuelFingerPosition;
        }

        if (
          captureParam.BioPluginFingerPrintCaptureRequest.LeftFingerPosition !==
            null &&
          captureParam.BioPluginFingerPrintCaptureRequest.LeftFingerPosition !==
            undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.LeftFingerPosition =
            captureParam.BioPluginFingerPrintCaptureRequest.LeftFingerPosition;
        }

        if (
          captureParam.BioPluginFingerPrintCaptureRequest
            .RightFingerPosition !== null &&
          captureParam.BioPluginFingerPrintCaptureRequest
            .RightFingerPosition !== undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.RightFingerPosition =
            captureParam.BioPluginFingerPrintCaptureRequest.RightFingerPosition;
        }
        if (
          captureParam.BioPluginFingerPrintCaptureRequest.FaceImage !== null &&
          captureParam.BioPluginFingerPrintCaptureRequest.FaceImage !==
            undefined
        ) {
          requestBody.BioPluginFingerPrintCaptureRequest.FaceImage =
            captureParam.BioPluginFingerPrintCaptureRequest.FaceImage;
        }
        break;

      default:
        if (
          captureParam.DeviceName !== null &&
          captureParam.DeviceName !== undefined
        ) {
          requestBody.DeviceName = captureParam.DeviceName;
        }
        if (
          captureParam.QuickScan !== null &&
          captureParam.QuickScan !== undefined
        ) {
          requestBody.QuickScan = captureParam.QuickScan;
        }

        if (
          captureParam.CaptureTimeOut !== null &&
          captureParam.CaptureTimeOut !== undefined
        ) {
          requestBody.CaptureTimeOut = captureParam.CaptureTimeOut;
        }
        if (
          captureParam.CaptureOperationName !== null &&
          captureParam.CaptureOperationName !== undefined
        ) {
          requestBody.CaptureOperationName = captureParam.CaptureOperationName;
        }
        if (
          captureParam.IsFaceDetailsIncluded !== null &&
          captureParam.IsFaceDetailsIncluded !== undefined
        ) {
          requestBody.IsFaceDetailsIncluded =
            captureParam.IsFaceDetailsIncluded;
        }
        if (
          captureParam.FaceImageFormat !== null &&
          captureParam.FaceImageFormat !== undefined
        ) {
          requestBody.FaceImageFormat = captureParam.FaceImageFormat;
        }
        if (
          captureParam.HasFaceSkip !== null &&
          captureParam.HasFaceSkip !== undefined
        ) {
          requestBody.HasFaceSkip = captureParam.HasFaceSkip;
        }
        if (
          captureParam.IsLiveness !== null &&
          captureParam.IsLiveness !== undefined
        ) {
          requestBody.IsLiveness = captureParam.IsLiveness;
        }
        break;
    }

    return requestBody;
  }

  //   fingerPrintCapture(apiEndPoint: string, captureParam: any) {
  //     var requestBody:any = {};
  //     if (captureParam.DeviceName !== null && captureParam.DeviceName !== undefined) {
  //       requestBody.DeviceName = captureParam.DeviceName;
  //     }

  //     if (captureParam.QuickScan !== null && captureParam.QuickScan !== undefined) {
  //       requestBody.QuickScan = captureParam.QuickScan;
  //     }

  //     if (captureParam.CaptureType !== null && captureParam.CaptureType !== undefined) {
  //       requestBody.CaptureType = captureParam.CaptureType;
  //     }

  //     if (captureParam.SingleCaptureMode !== null && captureParam.SingleCaptureMode !== undefined) {
  //       requestBody.SingleCaptureMode = captureParam.SingleCaptureMode;
  //     }

  //     if (captureParam.CaptureTimeOut !== null && captureParam.CaptureTimeOut !== undefined) {
  //       requestBody.CaptureTimeOut = captureParam.CaptureTimeOut;
  //     }

  //     if (captureParam.CaptureOperationName !== null && captureParam.CaptureOperationName !== undefined) {
  //       requestBody.CaptureOperationName = captureParam.CaptureOperationName;
  //     }

  //     if (captureParam.TenPrint !== null && captureParam.TenPrint !== undefined) {
  //       requestBody.TenPrint = captureParam.TenPrint;
  //     }

  //     if (captureParam.DuelFingerPosition !== null && captureParam.DuelFingerPosition !== undefined) {
  //       requestBody.DuelFingerPosition = captureParam.DuelFingerPosition;
  //     }

  //     if (captureParam.LeftFingerPosition !== null && captureParam.LeftFingerPosition !== undefined) {
  //       requestBody.LeftFingerPosition = captureParam.LeftFingerPosition;
  //     }

  //     if (captureParam.RightFingerPosition !== null && captureParam.RightFingerPosition !== undefined) {
  //       requestBody.RightFingerPosition = captureParam.RightFingerPosition;
  //     }

  //     if (captureParam.FaceImage !== null && captureParam.FaceImage !== undefined) {
  //       requestBody.FaceImage = captureParam.FaceImage;
  //     }

  //     this.postRequest(apiEndPoint, requestBody);
  //   }

  //   /*
  //   *Will be performed Iris biometric capture
  //   */
  //   irisCapture(apiEndPoint: string, captureParam: any) {
  //     var requestBody:any = {};
  //     if (captureParam.DeviceName !== null && captureParam.DeviceName !== undefined) {
  //       requestBody.DeviceName = captureParam.DeviceName;
  //     }
  //     if (captureParam.QuickScan !== null && captureParam.QuickScan !== undefined) {
  //       requestBody.QuickScan = captureParam.QuickScan;
  //     }

  //     if (captureParam.CaptureTimeOut !== null && captureParam.CaptureTimeOut !== undefined) {
  //       requestBody.CaptureTimeOut = captureParam.CaptureTimeOut;
  //     }
  //     if (captureParam.CaptureOperationName !== null && captureParam.CaptureOperationName !== undefined) {
  //       requestBody.CaptureOperationName = captureParam.CaptureOperationName;
  //     }
  //     if (captureParam.FaceImage !== null && captureParam.FaceImage !== undefined) {
  //       requestBody.FaceImage = captureParam.FaceImage;
  //     }
  //     return this.postRequest(apiEndPoint, requestBody);
  //   }

  //   /*
  //   *Will be performed Iris biometric capture
  //   */
  //   faceCapture(apiEndPoint: string, captureParam: any) {

  //     var requestBody:any = {};
  //     if (captureParam.DeviceName !== null && captureParam.DeviceName !== undefined) {
  //       requestBody.DeviceName = captureParam.DeviceName;
  //     }
  //     if (captureParam.QuickScan !== null && captureParam.QuickScan !== undefined) {
  //       requestBody.QuickScan = captureParam.QuickScan;
  //     }

  //     if (captureParam.CaptureTimeOut !== null && captureParam.CaptureTimeOut !== undefined) {
  //       requestBody.CaptureTimeOut = captureParam.CaptureTimeOut;
  //     }
  //     if (captureParam.CaptureOperationName !== null && captureParam.CaptureOperationName !== undefined) {
  //       requestBody.CaptureOperationName = captureParam.CaptureOperationName;
  //     }
  //     if (captureParam.IsFaceDetailsIncluded !== null && captureParam.IsFaceDetailsIncluded !== undefined) {
  //       requestBody.IsFaceDetailsIncluded = captureParam.IsFaceDetailsIncluded;
  //     }
  //     if (captureParam.FaceImageFormat !== null && captureParam.FaceImageFormat !== undefined) {
  //       requestBody.FaceImageFormat = captureParam.FaceImageFormat;
  //     }
  //     if (captureParam.HasFaceSkip !== null && captureParam.HasFaceSkip !== undefined) {
  //       requestBody.HasFaceSkip = captureParam.HasFaceSkip;
  //     }
  //     if (captureParam.IsLiveness !== null && captureParam.IsLiveness !== undefined) {
  //       requestBody.IsLiveness = captureParam.IsLiveness;
  //     }
  //     this.postRequest(apiEndPoint, requestBody);
  //   }

  //   /*
  //  *Will be performed Iris biometric capture
  //  */
  //   multiModelCapture(apiEndPoint: string, captureParam: any) {

  //     var requestBody:any = {};
  //     if (captureParam.DeviceName !== null && captureParam.DeviceName !== undefined) {
  //       requestBody.DeviceName = captureParam.DeviceName;
  //     }
  //     if (captureParam.QuickScan !== null && captureParam.QuickScan !== undefined) {
  //       requestBody.QuickScan = captureParam.QuickScan;
  //     }

  //     if (captureParam.CaptureTimeOut !== null && captureParam.CaptureTimeOut !== undefined) {
  //       requestBody.CaptureTimeOut = captureParam.CaptureTimeOut;
  //     }
  //     if (captureParam.CaptureOperationName !== null && captureParam.CaptureOperationName !== undefined) {
  //       requestBody.CaptureOperationName = captureParam.CaptureOperationName;
  //     }

  //     //Face
  //     if (captureParam.BioPluginFaceCaptureRequest.DeviceName !== null && captureParam.BioPluginFaceCaptureRequest.DeviceName !== undefined) {
  //       requestBody.BioPluginFaceCaptureRequest.DeviceName = captureParam.BioPluginFaceCaptureRequest.DeviceName;
  //     }
  //     if (captureParam.BioPluginFaceCaptureRequest.QuickScan !== null && captureParam.BioPluginFaceCaptureRequest.QuickScan !== undefined) {
  //       requestBody.BioPluginFaceCaptureRequest.QuickScan = captureParam.BioPluginFaceCaptureRequest.QuickScan;
  //     }

  //     if (captureParam.BioPluginFaceCaptureRequest.CaptureTimeOut !== null && captureParam.BioPluginFaceCaptureRequest.CaptureTimeOut !== undefined) {
  //       requestBody.BioPluginFaceCaptureRequest.CaptureTimeOut = captureParam.BioPluginFaceCaptureRequest.CaptureTimeOut;
  //     }
  //     if (captureParam.BioPluginFaceCaptureRequest.CaptureOperationName !== null && captureParam.BioPluginFaceCaptureRequest.CaptureOperationName !== undefined) {
  //       requestBody.BioPluginFaceCaptureRequest.CaptureOperationName = captureParam.BioPluginFaceCaptureRequest.CaptureOperationName;
  //     }
  //     if (captureParam.BioPluginFaceCaptureRequest.IsFaceDetailsIncluded !== null && captureParam.BioPluginFaceCaptureRequest.IsFaceDetailsIncluded !==undefined) {
  //       requestBody.BioPluginFaceCaptureRequest.IsFaceDetailsIncluded = captureParam.BioPluginFaceCaptureRequest.IsFaceDetailsIncluded;
  //     }
  //     if (captureParam.BioPluginFaceCaptureRequest.FaceImageFormat !== null && captureParam.BioPluginFaceCaptureRequest.FaceImageFormat !== undefined) {
  //       requestBody.BioPluginFaceCaptureRequest.FaceImageFormat = captureParam.BioPluginFaceCaptureRequest.FaceImageFormat;
  //     }
  //     if (captureParam.BioPluginFaceCaptureRequest.HasFaceSkip !== null && captureParam.BioPluginFaceCaptureRequest.HasFaceSkip !== undefined) {
  //       requestBody.BioPluginFaceCaptureRequest.HasFaceSkip = captureParam.BioPluginFaceCaptureRequest.HasFaceSkip;
  //     }
  //     if (captureParam.BioPluginFaceCaptureRequest.IsLiveness !== null && captureParam.BioPluginFaceCaptureRequest.IsLiveness !== undefined) {
  //       requestBody.BioPluginFaceCaptureRequest.IsLiveness = captureParam.BioPluginFaceCaptureRequest.IsLiveness;
  //     }

  //     //Iris

  //     if (captureParam.BioPluginIrisCaptureRequest.DeviceName !== null && captureParam.BioPluginIrisCaptureRequest.DeviceName !== undefined) {
  //       requestBody.BioPluginIrisCaptureRequest.DeviceName =captureParam.BioPluginIrisCaptureRequest.DeviceName;
  //     }
  //     if (captureParam.BioPluginIrisCaptureRequest.QuickScan !== null &&captureParam.BioPluginIrisCaptureRequest.QuickScan !== undefined) {
  //       requestBody.BioPluginIrisCaptureRequest.QuickScan = captureParam.BioPluginIrisCaptureRequest.QuickScan;
  //     }

  //     if (captureParam.BioPluginIrisCaptureRequest.CaptureTimeOut !== null && captureParam.BioPluginIrisCaptureRequest.CaptureTimeOut !== undefined) {
  //       requestBody.BioPluginIrisCaptureRequest.CaptureTimeOut = captureParam.BioPluginIrisCaptureRequest.CaptureTimeOut;
  //     }
  //     if (captureParam.BioPluginIrisCaptureRequest.CaptureOperationName !== null && captureParam.BioPluginIrisCaptureRequest.CaptureOperationName !== undefined) {
  //       requestBody.BioPluginIrisCaptureRequest.CaptureOperationName = captureParam.BioPluginIrisCaptureRequest.CaptureOperationName;
  //     }
  //     if (captureParam.BioPluginIrisCaptureRequest.FaceImage !== null && captureParam.BioPluginIrisCaptureRequest.FaceImage !== undefined) {
  //       requestBody.BioPluginIrisCaptureRequest.FaceImage = captureParam.BioPluginIrisCaptureRequest.FaceImage;
  //     }

  //     //Fingerprint

  //     if (captureParam.BioPluginFingerPrintCaptureRequest.DeviceName !== null && captureParam.BioPluginFingerPrintCaptureRequest.DeviceName !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.DeviceName = captureParam.BioPluginFingerPrintCaptureRequest.DeviceName;
  //     }

  //     if (captureParam.BioPluginFingerPrintCaptureRequest.QuickScan !== null && captureParam.BioPluginFingerPrintCaptureRequest.QuickScan !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.QuickScan = captureParam.BioPluginFingerPrintCaptureRequest.QuickScan;
  //     }

  //     if ( captureParam.BioPluginFingerPrintCaptureRequest.CaptureType !== null && captureParam.BioPluginFingerPrintCaptureRequest.CaptureType !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.CaptureType = captureParam.BioPluginFingerPrintCaptureRequest.CaptureType;
  //     }

  //     if (captureParam.BioPluginFingerPrintCaptureRequest.SingleCaptureMode !== null && captureParam.BioPluginFingerPrintCaptureRequest.SingleCaptureMode !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.SingleCaptureMode = captureParam.BioPluginFingerPrintCaptureRequest.SingleCaptureMode;
  //     }

  //     if (captureParam.BioPluginFingerPrintCaptureRequest.CaptureTimeOut !== null && captureParam.BioPluginFingerPrintCaptureRequest.CaptureTimeOut !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.CaptureTimeOut = captureParam.BioPluginFingerPrintCaptureRequest.CaptureTimeOut;
  //     }

  //     if (captureParam.BioPluginFingerPrintCaptureRequest.CaptureOperationName !== null && captureParam.BioPluginFingerPrintCaptureRequest.CaptureOperationName !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.CaptureOperationName = captureParam.BioPluginFingerPrintCaptureRequest.CaptureOperationName;
  //     }

  //     if (captureParam.BioPluginFingerPrintCaptureRequest.TenPrint !== null && captureParam.BioPluginFingerPrintCaptureRequest.TenPrint !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.TenPrint =  captureParam.BioPluginFingerPrintCaptureRequest.TenPrint;
  //     }

  //     if (captureParam.BioPluginFingerPrintCaptureRequest.DuelFingerPosition !== null && captureParam.BioPluginFingerPrintCaptureRequest.DuelFingerPosition !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.DuelFingerPosition = captureParam.BioPluginFingerPrintCaptureRequest.DuelFingerPosition;
  //     }

  //     if (captureParam.BioPluginFingerPrintCaptureRequest.LeftFingerPosition !== null && captureParam.BioPluginFingerPrintCaptureRequest.LeftFingerPosition !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.LeftFingerPosition = captureParam.BioPluginFingerPrintCaptureRequest.LeftFingerPosition;
  //     }

  //     if (captureParam.BioPluginFingerPrintCaptureRequest.RightFingerPosition !== null && captureParam.BioPluginFingerPrintCaptureRequest.RightFingerPosition !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.RightFingerPosition = captureParam.BioPluginFingerPrintCaptureRequest.RightFingerPosition;
  //     }
  //     if (captureParam.BioPluginFingerPrintCaptureRequest.FaceImage !== null && captureParam.BioPluginFingerPrintCaptureRequest.FaceImage !== undefined) {
  //       requestBody.BioPluginFingerPrintCaptureRequest.FaceImage = captureParam.BioPluginFingerPrintCaptureRequest.FaceImage;
  //     }

  //     this.postRequest(apiEndPoint, requestBody);
  //   }

  //   /*
  //    *Will be performed Iris biometric capture
  //    */
  //   multiModalBiometricMatchingOperation(apiEndPoint: string, requestBody: any) {
  //     this.postRequest(apiEndPoint, requestBody);
  //   }

  //   postRequest(apiEndPoint: string, requestBody: any): Observable<any> {
  //     return this.apiService
  //       .post(apiEndPoint, requestBody, false)
  //       .pipe(retry(1), catchError(this.processError));
  //   }

  //   processError(err: any) {
  //     let message = '';
  //     if (err.error instanceof ErrorEvent) {
  //       message = err.error.message;
  //     } else {
  //       message = `Error Code: ${err.status}\nMessage: ${err.message}`;
  //     }
  //     console.log(message);
  //     return throwError(() => {
  //       message;
  //     });
  //   }
}
