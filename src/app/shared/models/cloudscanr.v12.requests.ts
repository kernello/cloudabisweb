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

export class CaptureRequestV12Model {
  CaptureType: string;
  SingleCaptureMode: string;
  QuickScan: string;
  CaptureOperationName: string;
  DeviceName: string;
  TenPrint: string;
  DualFingerPosition: string;
  CaptureTimeOut: number;
  LeftFingerPosition: string;
  RightFingerPosition: string;
  BioMetricImageFormat: string;
  IsFourFourTwoEnabled: string;
  TemplateExtraction: boolean;
  CheckAllTogether: boolean;
  TenPrintCaptureMode: string;

  constructor(reqModel?: any) {
    this.CaptureType = reqModel.CaptureType
      ? String(reqModel.CaptureType)
      : EnumCaptureType.SingleCapture;
    this.SingleCaptureMode = reqModel.SingleCaptureMode
      ? String(reqModel.SingleCaptureMode)
      : EnumSingleCaptureMode.LeftFingerCapture;
    this.QuickScan = reqModel.QuickScan
      ? reqModel.QuickScan
      : EnumFeatureMode.Disable;
    this.CaptureOperationName = reqModel.CaptureOperationName
      ? reqModel.CaptureOperationName
      : EnumCaptureOperationName.ENROLL;
    this.DeviceName = reqModel.DeviceName ? reqModel.DeviceName : '';
    this.TenPrint = reqModel.TenPrint ? reqModel.TenPrint : '';
    this.DualFingerPosition = reqModel.DualFingerPosition
      ? reqModel.DualFingerPosition
      : '';
    this.CaptureTimeOut = reqModel.CaptureTimeOut
      ? reqModel.CaptureTimeOut
      : 180.0;
    this.LeftFingerPosition = reqModel.LeftFingerPosition
      ? reqModel.LeftFingerPosition
      : this.CaptureType === EnumCaptureType.SingleCapture
      ? EnumFingerPosition.LeftIndex
      : EnumDuelFingerPosition.LeftIndexMiddle;
    this.RightFingerPosition = reqModel.RightFingerPosition
      ? reqModel.RightFingerPosition
      : this.CaptureType === EnumCaptureType.SingleCapture
      ? EnumFingerPosition.RightIndex
      : EnumDuelFingerPosition.RightIndexMiddle;
    this.BioMetricImageFormat = reqModel.BioMetricImageFormat
      ? reqModel.BioMetricImageFormat
      : EnumBiometricImageFormat.JPEG;
    this.IsFourFourTwoEnabled = reqModel.IsFourFourTwoEnabled
      ? reqModel.IsFourFourTwoEnabled
      : '';
    this.TemplateExtraction = reqModel.TemplateExtraction
      ? reqModel.TemplateExtraction
      : '';
    this.CheckAllTogether = reqModel.CheckAllTogether
      ? reqModel.CheckAllTogether
      : false;
    this.TenPrintCaptureMode = reqModel.TenPrintCaptureMode
      ? reqModel.TenPrintCaptureMode
      : '';
  }
}

export class CaptureMinRequestV12Model {
  CaptureType?: string;
  SingleCaptureMode?: string;
  QuickScan: string;
  CaptureOperationName: string;
  DeviceName?: string;
  CaptureTimeOut: number;
  FaceImage?: string;
  HasFaceSkip?: string;
  FaceImageFormat?: string;
  RegistrationId?: string;
  OperationName?: string;
  CloudABISV12APICredential?: CloudABISV12APICredential
  CloudABISFingerVeinCredentials?: CloudABISFingerVeinCredentials

  constructor(reqModel?: any) {
    this.CaptureType = reqModel.CaptureType
      ? String(reqModel.CaptureType)
      : EnumCaptureType.SingleCapture;
    this.SingleCaptureMode = reqModel.SingleCaptureMode
      ? String(reqModel.SingleCaptureMode)
      : EnumSingleCaptureMode.LeftFingerCapture;
    this.QuickScan = reqModel.QuickScan
      ? reqModel.QuickScan
      : EnumFeatureMode.Disable;
    this.CaptureOperationName = reqModel.CaptureOperationName
      ? reqModel.CaptureOperationName
      : EnumCaptureOperationName.ENROLL;
    this.DeviceName = reqModel.DeviceName ? reqModel.DeviceName : '';
    this.CaptureTimeOut = reqModel.CaptureTimeOut
      ? reqModel.CaptureTimeOut
      : 180.0;
    this.FaceImage = reqModel.FaceImage ? EnumFeatureMode.Disable :  null;
    this.HasFaceSkip = reqModel.HasFaceSkip ? EnumFeatureMode.Disable :  null;
    this.FaceImageFormat = reqModel.FaceImageFormat ? EnumFaceImageFormat.Jpeg :  null;
    this.RegistrationId = reqModel.RegistrationId ? reqModel.RegistrationId :  '';
    this.OperationName = reqModel.OperationName ? reqModel.OperationName :  null;
    this.CloudABISV12APICredential = reqModel.CloudABISV12APICredential ? reqModel.CloudABISV12APICredential :  null;
    this.CloudABISFingerVeinCredentials = reqModel.CloudABISFingerVeinCredentials ? reqModel.CloudABISFingerVeinCredentials :  null;
  }
}

export class CloudABISV12APICredential{
  ClientKey?: string;
  ClientAPIKey?: string;
  BaseAPIURL?: string;

  constructor(ClientKey: string, ClientAPIKey: string, BaseAPIURL: string){
    this.ClientKey = ClientKey ? ClientKey :  '';
    this.ClientAPIKey = ClientAPIKey ? ClientAPIKey :  '';
    this.BaseAPIURL = BaseAPIURL ? BaseAPIURL :  '';
  }
}

export class CloudABISFingerVeinCredentials{
  CustomerKey?: string;
  AppKey?: string;
  APIURL?: string;
  SecretKey?: string;
  

  constructor(CustomerKey: string, AppKey: string, APIURL: string, SecretKey: string){
    this.CustomerKey = CustomerKey ? CustomerKey :  '';
    this.AppKey = AppKey ? AppKey :  '';
    this.APIURL = APIURL ? APIURL :  '';
    this.SecretKey = SecretKey ? SecretKey :  '';
  }
}
