import { Injectable } from '@angular/core';

/*
 * Fingerprint supported devices
 */
export const FingerPrintDevices: Array<string> = [
  'TwoPrintFutronic',
  'TenPrintFutronic',
  'Secugen',
  'DigitalPersona',
  'TwoPrintWatsonMini',
  'TenPrintWatsonMini',
  'Kojak',
  'RealScanG10',
];

/*
 * Iris supported devices
 */
export const IrisDevices: Array<string> = [
  'EMX30',
  'TD100',
  'EF45',
  'IriTechBinocular',
];

/*
 * Face supported devices
 */
export const FaceDevices: Array<string> = ['Face'];

/*
 * Multimodal supported devices
 */
export const MultimodalDevices: Array<string> = ['MultiModal'];

/*
 * FingerVein supported devices
 */
export const FingerVeinDevices: Array<string> = ['HitachiFV'];

/*
 * Fingerprint supported devices list
 */
export const BiometricDeviceList = [
  { name: 'TwoPrintFutronic', description: 'TwoPrintFutronic', engineName:'FingerPrint' },
  { name: 'TenPrintFutronic', description: 'TenPrintFutronic', engineName:'FingerPrint' },
  { name: 'Secugen', description: 'Secugen', engineName:'FingerPrint' },
  { name: 'DigitalPersona', description: 'DigitalPersona', engineName:'FingerPrint' },
  { name: 'TwoPrintWatsonMini', description: 'TwoPrintWatsonMini', engineName:'FingerPrint' },
  { name: 'TenPrintWatsonMini', description: 'TenPrintWatsonMini', engineName:'FingerPrint' },
  { name: 'Kojak', description: 'Kojak', engineName:'FingerPrint' },
  { name: 'RealScanG10', description: 'RealScanG10', engineName:'FingerPrint' },
  { name: 'EMX30', description: 'EMX30', engineName:'Iris' },
  { name: 'TD100', description: 'TD100', engineName:'Iris' },
  { name: 'EF45', description: 'EF45', engineName:'Iris' },
  { name: 'IriTechBinocular', description: 'IriTechBinocular', engineName:'Iris' },
  { name: 'Face', description: 'Face', engineName:'Face' },
  { name: 'MultiModal', description: 'MultiModal', engineName:'MultiModal' },
  { name: 'HitachiFV', description: 'HitachiFV', engineName:'FingerVein' },
  { name: 'HitachiFV', description: 'HitachiFV', engineName:'FVHT01' }
];

export const BiometricEngineList = [
  { name: 'FingerPrint', deviceName: 'TwoPrintFutronic'},
  { name: 'FingerPrint', deviceName: 'TenPrintFutronic'},
  { name: 'FingerPrint', deviceName: 'Secugen'},
  { name: 'FingerPrint', deviceName: 'DigitalPersona'},
  { name: 'FingerPrint', deviceName: 'TwoPrintWatsonMini'},
  { name: 'FingerPrint', deviceName: 'TenPrintWatsonMini'},
  { name: 'FingerPrint', deviceName: 'Kojak'},
  { name: 'FingerPrint', deviceName: 'RealScanG10'},
  { name: 'Iris', deviceName: 'EMX30' },
  { name: 'Iris', deviceName: 'TD100' },
  { name: 'Iris', deviceName: 'EF45' },
  { name: 'Iris', deviceName: 'IriTechBinocular' },
  { name: 'Face', deviceName: 'Face' },
  { name: 'MultiModal', deviceName: 'MultiModal' },
  { name: 'FingerVein', deviceName: 'HitachiFV' },
  { name: 'FVHT01', deviceName: 'HitachiFV' }
];

export const CloudVersionList = [
  { name: 'v12', description: 'Version 12'},
  { name: 'v10', description: 'Version 10'}
];

export const CaptureTypeList = [
  { name: 'SingleCapture', description: 'SingleCapture'},
  { name: 'DoubleCapture', description: 'DoubleCapture'}
];
