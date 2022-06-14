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

  export class AuthReqV10Params {
    grant_type?: string;
    username: string;
    password: string;
  
    constructor(username: string, password: string, grant_type?: string) {
        this.grant_type = grant_type? grant_type : 'password';
        this.username = username? username : null;
        this.password = password? password : null;

    }
  }

  export class IsRegReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    RegistrationId: string;
  
    constructor(CustomerKey: string, RegistrationId: string, EngineName?: string) {
      this.CustomerKey = CustomerKey? CustomerKey: null;
      this.EngineName = EngineName? EngineName: 'FVHT01';
      this.RegistrationId = RegistrationId ? RegistrationId : null;
    }
  }

  export class RegReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    RegistrationId: string;
    Format?: string;
    BiometricXml: string;
  
    constructor(CustomerKey: string, RegistrationId: string, BiometricXml: string, Format?: string, EngineName?: string) {
      this.CustomerKey = CustomerKey? CustomerKey: null;
      this.EngineName = EngineName? EngineName: 'FVHT01';
      this.RegistrationId = RegistrationId ? RegistrationId : null;
      this.Format = Format ? Format : 'ISO';
      this.BiometricXml = BiometricXml ? BiometricXml : null;
    }
  }

  export class IdentifyReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    Format?: string;
    BiometricXml: string;
  
    constructor(CustomerKey: string, RegistrationId: string, BiometricXml: string, Format?: string, EngineName?: string) {
      this.CustomerKey = CustomerKey? CustomerKey: null;
      this.EngineName = EngineName? EngineName: 'FVHT01';
      this.Format = Format ? Format : 'ISO';
      this.BiometricXml = BiometricXml ? BiometricXml : null;
    }
  }

  export class VerifyReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    RegistrationId: string;
    Format?: string;
    BiometricXml: string;
  
    constructor(CustomerKey: string, RegistrationId: string, BiometricXml: string, Format?: string, EngineName?: string) {
      this.CustomerKey = CustomerKey? CustomerKey: null;
      this.EngineName = EngineName? EngineName: 'FVHT01';
      this.RegistrationId = RegistrationId ? RegistrationId : null;
      this.Format = Format ? Format : 'ISO';
      this.BiometricXml = BiometricXml ? BiometricXml : null;
    }
  }

  export class UpdateReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    RegistrationId: string;
    Format?: string;
    BiometricXml: string;
  
    constructor(CustomerKey: string, RegistrationId: string, BiometricXml: string, Format?: string, EngineName?: string) {
      this.CustomerKey = CustomerKey? CustomerKey: null;
      this.EngineName = EngineName? EngineName: 'FVHT01';
      this.RegistrationId = RegistrationId ? RegistrationId : null;
      this.Format = Format ? Format : 'ISO';
      this.BiometricXml = BiometricXml ? BiometricXml : null;
    }
  }

  export class ChangeIdReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    RegistrationId: string;
    NewRegistrationId: string;
  
    constructor(CustomerKey: string, RegistrationId: string, NewRegistrationId: string, EngineName?: string) {
      this.CustomerKey = CustomerKey? CustomerKey: null;
      this.EngineName = EngineName? EngineName: 'FVHT01';
      this.RegistrationId = RegistrationId ? RegistrationId : null;
      this.NewRegistrationId = NewRegistrationId? NewRegistrationId: null;
    }
  }

  export class RemoveIdReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    RegistrationId: string;
  
    constructor(CustomerKey: string, RegistrationId: string, EngineName?: string) {
      this.CustomerKey = CustomerKey? CustomerKey: null;
      this.EngineName = EngineName? EngineName: 'FVHT01';
      this.RegistrationId = RegistrationId ? RegistrationId : null;
    }
  }

  // Is Register, and RemoveID models
  export class CommonNonBioReqV10Model{
    CustomerKey: string;
    EngineName?: string;
    RegistrationId: string;
  
    constructor(CustomerKey: string, RegistrationId: string, EngineName?: string) {
      this.CustomerKey = CustomerKey? CustomerKey: null;
      this.EngineName = EngineName? EngineName: 'FVHT01';
      this.RegistrationId = RegistrationId ? RegistrationId : null;
    }
  }

  // ChangeID model
  export class UniqueNonBioReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    RegistrationId: string;
    NewRegistrationId: string;
  
    constructor(CustomerKey: string, RegistrationId: string, NewRegistrationId: string, EngineName?: string) {
      this.CustomerKey = CustomerKey? CustomerKey: null;
      this.EngineName = EngineName? EngineName: 'FVHT01';
      this.RegistrationId = RegistrationId ? RegistrationId : null;
      this.NewRegistrationId = NewRegistrationId? NewRegistrationId: null;
    }
  }

  // Register, Verify, and Update models
  export class CommonBioReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    RegistrationId: string;
    Format?: string;
    BiometricXml: string;
  
    // constructor(CustomerKey: string, RegistrationId: string, BiometricXml: string, Format?: string, EngineName?: string) {
    //   this.CustomerKey = CustomerKey? CustomerKey: null;
    //   this.EngineName = EngineName? EngineName: 'FVHT01';
    //   this.RegistrationId = RegistrationId ? RegistrationId : null;
    //   this.Format = Format ? Format : 'ISO';
    //   this.BiometricXml = BiometricXml ? BiometricXml : null;
    // }
    constructor(reqModel?: any) {
      this.CustomerKey = reqModel.CustomerKey? reqModel.CustomerKey: null;
      this.EngineName = reqModel.EngineName? reqModel.EngineName: 'FVHT01';
      this.RegistrationId = reqModel.RegistrationId ? reqModel.RegistrationId : null;
      this.Format = reqModel.Format ? reqModel.Format : 'ISO';
      this.BiometricXml = reqModel.BiometricXml ? reqModel.BiometricXml : null;
    }
  }

  // Identify model
  export class UniqueBioReqV10Model {
    CustomerKey: string;
    EngineName?: string;
    Format?: string;
    BiometricXml: string;
  
    // constructor(CustomerKey: string, BiometricXml: string, Format?: string, EngineName?: string) {
    //   this.CustomerKey = CustomerKey? CustomerKey: null;
    //   this.EngineName = EngineName? EngineName: 'FVHT01';
    //   this.Format = Format ? Format : 'ISO';
    //   this.BiometricXml = BiometricXml ? BiometricXml : null;
    // }
    constructor(reqModel?: any) {
      this.CustomerKey = reqModel.CustomerKey? reqModel.CustomerKey: null;
      this.EngineName = reqModel.EngineName? reqModel.EngineName: 'FVHT01';
      this.Format = reqModel.Format ? reqModel.Format : 'ISO';
      this.BiometricXml = reqModel.BiometricXml ? reqModel.BiometricXml : null;
    }
  }





