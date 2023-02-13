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
import { Templates } from './cloudscanr.v12.responses';
export class AuthRequestV12Model {
  //baseApiUrl: string;
  clientAPIKey: string;
  clientKey: string;

  constructor() {}
}



export class IsRegRequestV12Model {
  ClientKey: string;

  RegistrationId: string;
  SequenceNo?: string;

  constructor(ClientKey: string, RegistrationId: string, SequenceNo?: string) {
    this.ClientKey = ClientKey;
    this.RegistrationId = RegistrationId;
    this.SequenceNo = SequenceNo ? SequenceNo : null;
  }
}

export class ChangeIdRequestV12Model {
  ClientKey: string;
  RegistrationId: string;
  NewRegistrationId: string;

  constructor(ClientKey: string, RegistrationId: string, NewRegistrationId: string) {
    this.ClientKey = ClientKey;
    this.RegistrationId = RegistrationId;
    this.NewRegistrationId = NewRegistrationId;
  }
}

export class DeleteRequestV12Model {
  ClientKey: string;
  RegistrationId: string;

  constructor(ClientKey: string, RegistrationId: string) {
    this.ClientKey = ClientKey;
    this.RegistrationId = RegistrationId;
  }
}

export class ImgQualityRequestV12Model {
  ClientKey: string;
  Images: BiometricImages;

  constructor(reqModel?: any){
    this.ClientKey = reqModel.ClientKey;
    this.Images = reqModel.Images;
  }
}



export class BioServiceRequest {
  ClientKey: string;
  SequenceNo?: string;
  RegistrationId?: string;
  Images: BiometricImages;
  Templates: Templates;

  constructor(reqModel?: any){
    this.ClientKey = reqModel.ClientKey;
    this.SequenceNo = reqModel.SequenceNo?reqModel.SequenceNo: null;
    this.RegistrationId = reqModel.RegistrationId?reqModel.RegistrationId: null;
    this.Images = reqModel.Images;
    this.Templates = reqModel?.Templates;
  }
}

export class BiometricImages {
  Fingerprint?: FingerImage[] | null;
  Iris?: IrisImage[] | null;
  Face?: FaceImage[] | null;
  //?: Fingervein[] | EnumTypeOfTemplate.NONE;
  constructor() {}
}

export class FingerImage {
  Position: number;
  Base64Image: string;
  constructor() {}
}

export class IrisImage {
  Position: number;
  Base64Image: string;
  constructor() {}
}

export class FaceImage {
  Position: number;
  Base64Image: string;
  constructor() {}
}

// export class Fingervein {
//   TypeOfTemplate?: string | EnumTypeOfTemplate.NONE;
//   constructor() {}
// }
