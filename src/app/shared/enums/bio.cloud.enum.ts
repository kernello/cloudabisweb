/*Face Image Format. Default value is JPEG.
 *
 */
export enum EnumOperationName {
  None = 0,
  IsRegistered = 1,
  Register = 2,
  Identify = 3,
  Verify = 4,
  Update = 5,
  ChangeID = 6,
  DeleteID = 7
}

export enum EnumOperationStatus {
  NONE = 0,
  /// <summary>
  /// If operation success
  /// </summary>
  SUCCESS = 1,
  /// <summary>
  /// Opeartion failed
  /// </summary>
  FAILED = 2,
  /// <summary>
  /// Invalid access. It could be client not found
  /// </summary>
  INVALID_ACCESS = 3,
  /// <summary>
  /// License error
  /// </summary>
  LICENSE_ERROR = 4,
  /// <summary>
  /// Engine exception
  /// </summary>
  ENGINE_EXCEPTION = 5,
  /// <summary>
  /// Bad request. It could be some required data not found/mitch match
  /// </summary>
  BAD_REQUEST = 6,
  /// <summary>
  /// Internal error
  /// </summary>
  INTERNAL_ERROR = 7,
  /// <summary>
  /// Biometric extraction failed
  /// </summary>
  EXTRACTION_FAILED = 8,
  /// <summary>
  /// Internal API error
  /// </summary>
  API_ERROR = 9,
  /// <summary>
  /// Server busy
  /// </summary>
  SERVER_BUSY = 10,
  /// <summary>
  /// Server busy with different reason like 502,503
  /// </summary>
  SERVER_BUSY_UCS500 = 11,
  /// <summary>
  /// Server busy with different reason except 502,503
  /// </summary>
  SERVER_BUSY_UCS5000 = 12,
  /// <summary>
  /// Biometric licnese exceed
  /// </summary>
  LICENSE_EXCEED = 13,
}

export enum EnumOperationalResponseStatus {
  None = -1,
  Failed = 0,
  Success = 1,

  DuplicateFound,
  MatchFound,
  NoMatchFound,

  IDExist,
  IDNotExist,

  ChangeSuccess,
  ChangeFailed,

  DeleteSuccess,
  DeleteFailed,

  InsertSuccess,
  InsertFailed,

  UpdateSuccess,
  UpdateFailed,

  Registered,
  NotRegistered,
  RegistrationSuccess,
  RegistrationFailed,

  ExtractionSuccess,
  ExtractionFailed,

  VerifySuccess,
  VerifyFailed,
}


export enum ResponseOperationName {
  None = 'None',
  IsRegistered = 'IsRegistered',
  Register = 'Register',
  Identify = 'Identify',
  Verify = 'Verify',
  Update = 'Update',
  ChangeID = 'ChangeID',
  DeleteID = 'DeleteID',
}

export enum ResponseOperationStatus {
  NONE = 'NONE',
  /// <summary>
  /// If operation success
  /// </summary>
  SUCCESS = 'SUCCESS',
  /// <summary>
  /// Opeartion failed
  /// </summary>
  FAILED = 'FAILED',
  /// <summary>
  /// Invalid access. It could be client not found
  /// </summary>
  INVALID_ACCESS = 'INVALID_ACCESS',
  /// <summary>
  /// License error
  /// </summary>
  LICENSE_ERROR = 'LICENSE_ERROR',
  /// <summary>
  /// Engine exception
  /// </summary>
  ENGINE_EXCEPTION = 'ENGINE_EXCEPTION',
  /// <summary>
  /// Bad request. It could be some required data not found/mitch match
  /// </summary>
  BAD_REQUEST = 'BAD_REQUEST',
  /// <summary>
  /// Internal error
  /// </summary>
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  /// <summary>
  /// Biometric extraction failed
  /// </summary>
  EXTRACTION_FAILED = 'EXTRACTION_FAILED',
  /// <summary>
  /// Internal API error
  /// </summary>
  API_ERROR = 'API_ERROR',
  /// <summary>
  /// Server busy
  /// </summary>
  SERVER_BUSY = 'SERVER_BUSY',
  /// <summary>
  /// Server busy with different reason like 502,503
  /// </summary>
  SERVER_BUSY_UCS500 = 'SERVER_BUSY_UCS500',
  /// <summary>
  /// Server busy with different reason except 502,503
  /// </summary>
  SERVER_BUSY_UCS5000 = 'SERVER_BUSY_UCS5000',
  /// <summary>
  /// Biometric licnese exceed
  /// </summary>
  LICENSE_EXCEED = 'LICENSE_EXCEED',

  
}


export enum AlertType {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error',
  Info ='Info'
}

export enum ScopeType {
  AppConfig = 'AppConfig'
}

export enum VersionType{
  V12 ='V12',
  V10 = 'V10'
}