import { Injectable } from '@angular/core';

/*
/* Specifies whether a single biometric capture, or two biometric captures are performed. Default CaptureType is SingleCapture.
/* Applicable only M2-EasyScan, M2-EasyScan Pro(Secugen) and M2-S(Digital Persona) devices.
*/
export enum EnumCaptureType {
  SingleCapture = 'SingleCapture',
  DoubleCapture = 'DoubleCapture',
}

/*
/* Identify, Verify, Enroll, Update
*/
export enum EnumCaptureOperationName {
  IDENTIFY = 'IDENTIFY',
  VERIFY = 'VERIFY',
  ENROLL = 'ENROLL',
  UPDATE = 'UPDATE',
}

/*
/* Identify, Verify, Enroll, Update
*/
export enum EnumMatchingOperationName {
  Identify = 'Identify',
  Register = 'Register',
  Verify = 'Verify',
  Update = 'Update',
  DeleteId = 'DeleteId',
  IsRegistered = 'IsRegistered',
  ChangeId = 'ChangeId',
}

/*
/* Feature enable or disable. Like hidden capture enable
*/
export enum EnumFeatureMode {
  Disable = 'Disable',
  Enable = 'Enable',
}
/*
/* Specifies whether a left single biometric capture or right single biometric captures are performed. Default SingleCaptureMode is LeftFingerCapture.
/* Applicable only M2-EasyScan, M2-EasyScan Pro(Secugen) and M2-S(Digital Persona) devices.
*/
export enum EnumSingleCaptureMode {
  LeftFingerCapture = 'LeftFingerCapture',
  RightFingerCapture = 'RightFingerCapture',
}

/*
 * Supported device name
 */
export enum EnumDevices {
  NONE = '0',
  TwoPrintFutronic = 'TwoPrintFutronic',
  TenPrintFutronic = 'TenPrintFutronic',
  Secugen = 'Secugen',
  DigitalPersona = 'DigitalPersona',
  TwoPrintWatsonMini = 'TwoPrintWatsonMini',
  TenPrintWatsonMini = 'TenPrintWatsonMini',
  Kojak = 'Kojak',
  RealScanG10 = 'RealScanG10',
  EMX30 = 'EMX30',
  TD100 = 'TD100',
  EF45 = 'EF45',
  IriTechBinocular = 'IriTechBinocular',
  Face = 'Face',
}

/*
/* LeftThumb, LeftIndex, LeftMiddle, LeftPing, LeftRing, RightThumb, RightIndex, RightMiddle, RightPing, RightRing
*/
export enum EnumFingerPosition {
  LeftThumb = 'LeftThumb',
  LeftIndex = 'LeftIndex',
  LeftMiddle = 'LeftMiddle',
  LeftPing = 'LeftPing',
  LeftRing = 'LeftRing',
  RightThumb = 'RightThumb',
  RightIndex = 'RightIndex',
  RightMiddle = 'RightMiddle',
  RightPing = 'RightPing',
  RightRing = 'RightRing',
}

/*LeftIndexMiddle, LeftRingPing, LeftMiddlePing, RightIndexMiddle, RightRingPing, RightMiddleRing
/* Applicable only TwoPrintWatsonMini and TenPrintWatsonMini.
*/
export enum EnumDuelFingerPosition {
  LeftIndexMiddle = 'LeftIndexMiddle',
  LeftRingPing = 'LeftRingPing',
  LeftMiddleRing = 'LeftMiddleRing',
  RightIndexMiddle = 'RightIndexMiddle',
  RightRingPing = 'RightRingPing',
  RightMiddleRing = 'RightMiddleRing',
}

/*
 * Supported engine name
 */
export enum EnumEngines {
  FingerPrint = 'FPFF02',
  FingerVein = 'FVHT01',
  Iris = 'IRIS01',
  Face = 'FACE01',
  MultiModal = 'MultiModal',
}
/*
 * Supported engine name
 */
export enum EnumEnginesMapper {
  FingerPrint = 'FingerPrint',
  FingerVein = 'FingerVein',
  FVHT01 = 'FVHT01',
  Iris = 'Iris',
  Face = 'Face',
  MultiModal = 'MultiModal',
}
/*
/* Format of the generated biometric image. Default format is WSQ.
*/
export enum EnumBiometricImageFormat {
  WSQ = 'WSQ',
  JPEG = 'JPEG',
  TIFF = 'TIFF',
  BMP = 'BMP',
  GIF = 'GIF',
  JPEG2000 = 'JPEG2000',
  PNG = 'PNG',
}

/*Face Image Format. Default value is JPEG.
 *
 */
export enum EnumFaceImageFormat {
  Jpeg = 'Jpeg',
  Bmp = 'Bmp',
  Png = 'Png',
  Tiff = 'Tiff',
}

export enum EnumTypeOfTemplate {
  NONE = 'NONE',
  CaptureTemplate = 'CaptureTemplate',
  EnrollTemplate = 'EnrollTemplate',
}

export enum EnumRelocatePosition {
  RIGHT_TOP_CORNER = 'RIGHT_TOP_CORNER',
  LEFT_TOP_CORNER = 'LEFT_TOP_CORNER',
  LEFT_BOTTOM_CORNER = 'LEFT_BOTTOM_CORNER',
  RIGHT_BOTTOM_CORNER = 'RIGHT_BOTTOM_CORNER',
  CENTER = 'CENTER'

}
