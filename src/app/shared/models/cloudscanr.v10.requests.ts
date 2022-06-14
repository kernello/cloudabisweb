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


  export class CaptureRequestV10Model{
    QuickScan?: string;
    DeviceName?:  string;
    CaptureTimeOut:  number;
    FaceImage?:  string;
    CaptureType?:  string;
    TenPrint?:  string;
    HideCaptureUI?:  string;
    RelocateCaptureUI?:  string;
    RelocatePosition?:  string;
    CaptureOperationName?:  string;

    constructor(reqModel: any){
        this.QuickScan = reqModel.QuickScan? reqModel.QuickScan: EnumFeatureMode.Disable;
        this.DeviceName = reqModel.DeviceName? reqModel.DeviceName: '';
        this.CaptureTimeOut = reqModel.CaptureTimeOut? reqModel.CaptureTimeOut: 180.0;
        this.FaceImage = reqModel.FaceImage? EnumFeatureMode.Disable :  null;
        this.CaptureType = reqModel.CaptureType? String(reqModel.CaptureType): EnumCaptureType.SingleCapture;
        this.TenPrint = reqModel.TenPrint ? reqModel.TenPrint : EnumFeatureMode.Disable;
        this.HideCaptureUI = reqModel.HideCaptureUI? reqModel.HideCaptureUI: EnumFeatureMode.Disable;
        this.RelocateCaptureUI = reqModel.RelocateCaptureUI? reqModel.RelocateCaptureUI: EnumFeatureMode.Disable;
        this.RelocatePosition = reqModel.RelocatePosition? reqModel.RelocatePosition: EnumRelocatePosition.RIGHT_TOP_CORNER;
        this.CaptureOperationName = reqModel.CaptureOperationName? reqModel.CaptureOperationName: EnumCaptureOperationName.ENROLL;
    }

    
  }