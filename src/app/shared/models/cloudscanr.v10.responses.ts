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
    EnumRelocatePosition
  } from '@app/shared/enums';

  export class CaptureResponseV10Model {
    public isSuccess: boolean = false;
    public message: string;
    public code: string;
    public data: CloudScanrV10CaptureResult;
  
    constructor(response: CloudScanrV10CaptureResult){
      this.isSuccess = response.CloudScanrStatus.Success;
      this.message = response.CloudScanrStatus.Message? response.CloudScanrStatus.Message: '';
      this.code = response.CloudScanrStatus.ResponseCode? response.CloudScanrStatus.ResponseCode: '';
      this.data = response;
    }
  }


  export interface CloudScanrV10CaptureResult {
    CloudScanrStatus: CloudScanrV10Status;
    TemplateData : string;
    BioImageData : string;
    FaceImageData : string;
    CaptureID : string;
    MachineKey : string;
    Message: string
  }

  export interface CloudScanrV10Status {
    CloudScanrAPIVersion: string;
    Success : boolean;
    Message : string;
    ResponseCode : string;
    NumOfItemCount : number;
    ElapsedTimeInSeconds: number;
  }