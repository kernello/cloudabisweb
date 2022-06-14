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
export class CaptureResponseV12Model {
  public isSuccess: boolean = false;
  public message: string;
  public code: string;
  public data: CaptureResponseV12Interface;

  constructor(response: CaptureResponseV12Interface){
    this.isSuccess = response.CloudScanrStatus.Success;
    this.message = response.CloudScanrStatus.Message? response.CloudScanrStatus.Message: '';
    this.code = response.CloudScanrStatus.ResponseCode? response.CloudScanrStatus.ResponseCode: '';
    this.data = response;
  }
}

export interface CaptureResponseV12Interface {
  CloudScanrStatus: CloudScanrV12StatusInterface;
  Images: CaptureImages;
  CaptureID: string;
  MachineKey: string;
}
export interface CloudScanrV12StatusInterface {
  CloudScanrAPIVersion: string;
  Success: boolean;
  Message: string;
  ResponseCode: string;
  NumOfItemCount: number;
  ElapsedTimeInSeconds: number;
}
export interface CaptureImages {
  Fingerprint?: CaptureFingerImage[] | null;
  Iris?: CaptureIrisImage [] | null;
  Face?: CaptureFaceImage[] | null;
  Fingervein?: CaptureFingervein[] | EnumTypeOfTemplate.NONE;
}
export interface CaptureFingerImage  {
  Position: number;
  Base64Image: string;
}
export interface CaptureIrisImage  {
    Position: number;
    Base64Image: string;
  }

  export interface CaptureFaceImage  {
    Position: number;
    Base64Image: string;
  }

  export interface CaptureFingervein   {
    TypeOfTemplate: string;
  }
