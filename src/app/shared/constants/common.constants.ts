import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CommonConstants {}

export const AuthRoutesConstants = {
  LOGIN_USER_URL: 'auth/login',
};

export const LoginApiConstants = {
  LOGIN_USER_API_URL: '/users.json',
};

export const HomeRoutesConstants = {
  DEFAULT_URL: '/',
  HOME_URL: '/home',
  HOME_DASHBOARD_URL: '/home/dashboard'
};
export const APPConfigRoutesConstants = {
  APP_CONFIG_URL: 'appconfig/home',
};

export const CloudABISMatchingRoutesConstants = {
  BIOCLOUD_V12_HOME_ROUTE: '/biocloud/v12/home',
  BIOCLOUD_V12_IS_REG_ROUTE: '/biocloud/v12/isregister',
  BIOCLOUD_V12_REGISTER_ROUTE: '/biocloud/v12/register',
  BIOCLOUD_V12_IDENTIFY_ROUTE: '/biocloud/v12/identify',
  BIOCLOUD_V12_VERIFY_ROUTE: '/biocloud/v12/verify',
  BIOCLOUD_V12_UPDATE_ROUTE: '/biocloud/v12/register',
  BIOCLOUD_V12_CHANGEID_ROUTE: '/biocloud/v12/changedid',
  BIOCLOUD_V12_DELETEID_ROUTE: '/biocloud/v12/deleteid',

  BIOCLOUD_V10_HOME_ROUTE: '/biocloud/v10/home',
  BIOCLOUD_V10_IS_REG_ROUTE: '/biocloud/v10/isregister',
  BIOCLOUD_V10_REGISTER_ROUTE: '/biocloud/v10/register',
  BIOCLOUD_V10_IDENTIFY_ROUTE: '/biocloud/v10/identify',
  BIOCLOUD_V10_VERIFY_ROUTE: '/biocloud/v10/verify',
  BIOCLOUD_V10_UPDATE_ROUTE: '/biocloud/v10/register',
  BIOCLOUD_V10_CHANGEID_ROUTE: '/biocloud/v10/changedid',
  BIOCLOUD_V10_DELETEID_ROUTE: '/biocloud/v10/deleteid',
};

export const CloudABISMatchingMenuTextConstants = {
  BIOCLOUD_V12_HOME_TEXT: 'V12 Home',
  BIOCLOUD_V12_IS_REGISTER_TEXT: 'Is Register',
  BIOCLOUD_V12_REGISTER_TEXT: 'Register',
  BIOCLOUD_V12_IDENTIFY_TEXT: 'Identify',
  BIOCLOUD_V12_VERIFY_TEXT: 'Verify',
  BIOCLOUD_V12_UPDATE_TEXT: 'Update',
  BIOCLOUD_V12_CHANGEID_TEXT: 'Change ID',
  BIOCLOUD_V12_DELETEID_TEXT: 'Delete ID',

  BIOCLOUD_V10_HOME_TEXT: 'V10 Home',
  BIOCLOUD_V10_IS_REGISTER_TEXT: 'Is Register',
  BIOCLOUD_V10_REGISTER_TEXT: 'Register',
  BIOCLOUD_V10_IDENTIFY_TEXT: 'Identify',
  BIOCLOUD_V10_VERIFY_TEXT: 'Verify',
  BIOCLOUD_V10_UPDATE_TEXT: 'Update',
  BIOCLOUD_V10_CHANGEID_TEXT: 'Change ID',
  BIOCLOUD_V10_DELETEID_TEXT: 'Delete ID',
};

/*
 * CloudScanr APIs path
 */
export const CloudScanrAPIURLsConstants = {
  CLOUDABISSCANR_BASE_API_URL: 'http://localhost:15896',
  CLOUDABISSCANR_FP_CAPTURE_API_PATH: '/api/CloudABISV12Captures/Fingerprint',
  CLOUDABISSCANR_IRIS_CAPTURE_API_PATH: '/api/CloudABISV12Captures/Iris',
  CLOUDABISSCANR_FACE_CAPTURE_API_PATH: '/api/CloudABISV12Captures/Face',
  CLOUDABISSCANR_MULTI_MODEL_CAPTURE_API_PATH:
    '/api/CloudABISV12Captures/MultiModel',
  CLOUDABISSCANR_STATUS_API_PATH: '/api/CloudScanr/ClientInfo',
  CLOUDABISSCANR_MULTI_MODAL_MATCHING_API_PATH:
    '/api/CloudScanrMultiModals/Matching',
    CLOUDABISSCANR_FV_CAPTURE_API_PATH: '/api/CloudABISV10Captures/Fingervein'
};

/*
 * CloudABIS Matching Service V12 APIs path
 */
export const CloudABISV12APIURLsConstants = {
  CloudABIS_V12_AUTH_TOKEN_API_URL: '/api/Authorizations/Token',
  CloudABIS_V12_IS_REGISTER_API_URL: '/api/Biometrics/IsRegistered',
  CloudABIS_V12_CHANGEID_API_URL: '/api/Biometrics/ChangeID',
  CloudABIS_V12_DELETEID_API_URL: '/api/Biometrics/DeleteID',
  CloudABIS_V12_REGISTER_API_URL: '/api/Biometrics/Register',
  CloudABIS_V12_IDENTITY_API_URL: '/api/Biometrics/Identify',
  CloudABIS_V12_VERIFY_API_URL: '/api/Biometrics/Verify',
  CloudABIS_V12_UPDATE_API_URL: '/api/Biometrics/Update',
  CloudABIS_V12_IMAGEQUALITY_API_URL: '/api/Biometrics/ImageQuality',
};

/*
 * CloudABIS Matching Service V10 APIs path
 */
export const CloudABISV10APIURLsConstants = {
  CloudABIS_V10_AUTH_TOKEN_API_URL: '/token',
  CloudABIS_V10_IS_REGISTER_API_URL: '/api/Biometric/IsRegistered',
  CloudABIS_V10_CHANGEID_API_URL: '/api/Biometric/ChangeID',
  CloudABIS_V10_DELETEID_API_URL: '/api/Biometric/RemoveId',
  CloudABIS_V10_REGISTER_API_URL: '/api/Biometric/Register',
  CloudABIS_V10_IDENTITY_API_URL: '/api/Biometric/Identify',
  CloudABIS_V10_VERIFY_API_URL: '/api/Biometric/Verify',
  CloudABIS_V10_UPDATE_API_URL: '/api/Biometric/Update',
};

/*
 * Cookie Constants
 */

export const CookiesConstants = {
  TRACK_DEFAULT_VERSION: 'defaultversion',
  CLOUD_VERSION: 'CloudVersion', //CloudABIS Version
  CABDeviceName: 'CABDeviceName', //V12 Cookie Device List Name
  CABEngineName: 'CABEngineName', //V12 Cookie Engine Name
  CABBaseURL: 'CABBaseURL', //V12 Matching API URL
  CABClientAPIKey: 'CABClientAPIKey', //V12 Client API Key
  CABClientKey: 'CABClientKey', //V12 Client Key
  CABSecretKey: 'CABSecretKey', //V12 Secret Key , which is not necessary but it is kept for coding purpose not for business
  FVDeviceName: 'FVDeviceName', //V10 Cookie Device List Name
  FVEngineName: 'FVEngineName', //V10 Cookie Engine Name
  FVBaseURL: 'FVBaseURL', //V10 API URL
  FVAppKey: 'FVAppKey', //V10 APP Key
  FVCustomerKey: 'FVCustomerKey', //V10 Customer Key
  FVSecretKey: 'FVSecretKey', //V10 Secret Key
  ExpiryDays: 7,
  V12_COOKIE_NAMES: [
    'CloudVersion',
    'CABDeviceName',
    'CABEngineName',
    'CABBaseURL',
    'CABClientAPIKey',
    'CABClientKey',
  ],
  V10_COOKIE_NAMES: [
    'CloudVersion',
    'FVDeviceName',
    'FVEngineName',
    'FVBaseURL',
    'FVAppKey',
    'FVCustomerKey',
    'FVSecretKey',
  ],
};

/*
 * DataType Constants
 */

export const DataTypeConstants = {
  Date: 'Date',
  String: 'String',
  Number: 'Number',
  Boolean: 'Boolean',
};

/*
 * API Constants
 */
export const APIConstants = {
  APPLICATION_JSON: 'application/json',
  ORIGIN_XREQ_CONTENT_TYPE_ACCEPT:
    'Origin, X-Requested-With, Content-Type, Accept',
  ACCEPT: 'Accept',
  CONTENT_TYPE: 'Content-Type',
  ACCESS_CONTROL_ALLOW_HEADERS: 'Access-Control-Allow-Headers',
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer',
  TOKEN: 'access_token',
  V12_AUTH_DATA: 'v12_data',
  V10_AUTH_DATA: 'v10_data',
};

export const OptionalParamConstants = {
  EXCLUDE_TOKEN: true,
};

/*
 * Local Storage Constants
 */

export const LocalStorageConstants = {
  CURRENT_USER: 'currentUser',
  IS_LOGGEDIN: 'isLoggedin',
  USERS: 'Users',
};

export const Common = {
  CONTROL_USER_NAME: 'username',
  CONTROL_PASSWORD: 'password',
  RETURN_URL: 'returnUrl',
  LOGIN_TITLE: 'CloudABIS:Login',
  HOME_TITLE: 'CloudABIS:Home',
  HOME_TEXT: 'Home',
  DASHBOARD_TITLE: 'CloudABIS:Home',
  APPCONFIG_TITLE: 'CloudABIS:APP Config',
  APPCONFIG_TEXT: 'App Configuration',
  BIOCLOUD_V12_HOME_TITLE: 'V12:Home',
  BIOCLOUD_V12_IS_REG_TITLE: 'V12:IsRegister',
  BIOCLOUD_V12_CHANGE_ID_TITLE: 'V12:ChangeID',
  BIOCLOUD_V12_DELETE_ID_TITLE: 'V12:DeleteID',
  BIOCLOUD_V12_REG_TITLE: 'V12:Register',
  BIOCLOUD_V12_IDENTIFY_TITLE: 'V12:Identify',
  BIOCLOUD_V12_VERIFY_TITLE: 'V12:Verify',
  BIOCLOUD_V12_UPDATE_TITLE: 'V12:Update',
  BIOCLOUD_V12_IMAGE_QUALITY_TITLE: 'V12:ImageQuality',

  BIOCLOUD_V10_IS_REG_TITLE: 'V10:IsRegister',
  BIOCLOUD_V10_CHANGE_ID_TITLE: 'V10:ChangeID',
  BIOCLOUD_V10_DELETE_ID_TITLE: 'V10:DeleteID',
  BIOCLOUD_V10_REG_TITLE: 'V10:Register',
  BIOCLOUD_V10_IDENTIFY_TITLE: 'V10:Identify',
  BIOCLOUD_V10_VERIFY_TITLE: 'V10:Verify',
  BIOCLOUD_V10_UPDATE_TITLE: 'V10:Update',
  BIOCLOUD_V10_IMAGE_QUALITY_TITLE: 'V10:ImageQuality',

  V12_DEFAULT_DEVICE_NAME: 'TwoPrintFutronic',
  V12_DEFAULT_ENGINE_NAME: 'FingerPrint',
  V10_DEFAULT_DEVICE_NAME: 'HitachiFV',
  V10_DEFAULT_ENGINE_NAME_0: 'FingerVein',
  V10_DEFAULT_ENGINE_NAME_1: 'FVHT01',
  MATCHING_API_URL: 'Matching API Url',
  API_URL: 'API Url',
  CLIENT_API_KEY: 'Client API Key',
  APP_KEY: 'APP Key',
  CLIENT_KEY: 'Client Key',
  CUSTOMER_KEY: 'Customer Key',
  SECRET_KEY: 'Secret Key',
  FINGER_VEIN: 'FingerVein',
  FINGER_VEIN_FVHT01: 'FVHT01',
  V12: 'V12',
  V10: 'V10',
  DISPLAY_STYLE_BLOCK: 'block',
  DISPLAY_STYLE_NONE: 'none',
  GRANT_TYPE: 'password',
  ISO_FORMAT: 'ISO'
};

export const MessageConstants = {
  GENERAL_SUCCESS_TITLE: 'Success',
  GENERAL_SUCCESS_MSG: 'Success!!',
  GENERAL_WARNING_TITLE: 'Warning',
  GENERAL_WARNING_MSG: 'Warning!!',
  GENERAL_ERROR_TITLE: 'Error',
  GENERAL_ERROR_MSG: 'Error!!',
  GENERAL_DATA_PREPARATION_FAILED: ' ::Data preparation failed! Try again.',
  COMMON_FORM_DATA_ERROR_MSG:
    'There is a problem in form data. Check and try again',
  COMMON_FORM_DATA_ERROR_TITLE: '::Data::',

  APP_CONFIG_FORM_DATA_ERROR_MSG:
    'There is a problem in form data. Check and try again',
  APP_CONFIG_FORM_DATA_ERROR_TITLE: 'App Configuration::Form Data',
  APP_CONFIG_SUBMIT_ERROR_TITLE: 'App Configuration::Error',
  APP_CONFIG_SAVE_SUCCESS_MSG: 'Configuration saved successfully!',
  APP_CONFIG_SAVE_SUCCESS_TITLE: 'App Configuration::Success',
  APP_CONFIG_SAVE_FAILED_MSG: 'Save failed!',
  APP_CONFIG_SAVE_FAILED_TITLE: 'App Configuration::Failed',
  APP_CONFIG_FIELD_NOT_SET_TITLE: 'App Configuration::Empty',
  APP_CONFIG_FIELD_NOT_SET_MSG: 'Configuration is empty. Put all the valid values!',

  BIOCLOUD_AUTH_FAILED_MSG: 'Authorization failed! Please try again',
  BIOCLOUD_V10_BUT_ROUTE_12_ERROR_MSG:
    'App config was set to V10. You cannot land here!',
  BIOCLOUD_V12_BUT_ROUTE_10_ERROR_MSG:
    'App config was set to V12. You cannot land here!',
  BIOCLOUD_WRONG_PAGE_MSG_TITLE: 'Wrong Page',

  DEVICE_NOT_FOUND_ERROR_MSG: 'There is no device mentioned',
  CUST_KEY_ENGINE_NOT_FOUND_ERROR_MSG: 'There is no saved customer key or Engine found',

  BIOCLOUD_V12_CAPTURE_ERROR_TITLE: 'V12 Capture::Error',
  BIOCLOUD_V10_CAPTURE_ERROR_TITLE: 'V10 Capture::Error',

  BIOCLOUD_V12_IS_REG_ERROR_TITLE: 'V12 IsRegister::Error',
  BIOCLOUD_V10_IS_REG_ERROR_TITLE: 'V10 IsRegister::Error',
  BIOCLOUD_V12_REG_ERROR_TITLE: 'V12 Register::Error',
  BIOCLOUD_V10_REG_ERROR_TITLE: 'V10 Register::Error',
  BIOCLOUD_V12_IDENTIFY_ERROR_TITLE: 'V12 Identify::Error',
  BIOCLOUD_V10_IDENTIFY_ERROR_TITLE: 'V10 Identify::Error',
  BIOCLOUD_V12_VERIFY_ERROR_TITLE: 'V12 Verify::Error',
  BIOCLOUD_V10_VERIFY_ERROR_TITLE: 'V10 Verify::Error',
  BIOCLOUD_V12_UPDATE_ERROR_TITLE: 'V12 Update::Error',
  BIOCLOUD_V10_UPDATE_ERROR_TITLE: 'V10 Update::Error',
  BIOCLOUD_V12_CHANGEID_ERROR_TITLE: 'V12 Change ID::Error',
  BIOCLOUD_V10_CHANGEID_ERROR_TITLE: 'V10 Change ID::Error',
  BIOCLOUD_V12_DELETEID_ERROR_TITLE: 'V12 Delete ID::Error',
  BIOCLOUD_V10_DELETEID_ERROR_TITLE: 'V10 Delete ID::Error',

};

export const AnimatedLoaderConstants = {
  SMALL_ROUND_LOADER:
    'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==',
};

export const ModelInterfaceConstants = {
  Success: 'Success',
  Failed: 'Failed',
};

export const ErrorCode = {
  CS0200: 'CS0200',
  CS0200_MESSAGE: "Token information doesn't exist in the local session",

  /// <summary>
  /// CS0201: Biometric Id is required
  /// </summary>
  CS0201: 'CS0201',
  CS0201_MESSAGE: 'Biometric Id is required',

  //IsRegister
  /// <summary>
  /// CS0202: There is biometric data enrolled with the requested ID
  /// </summary>
  CS0202: 'CS0202',
  CS0202_MESSAGE: 'There is biometric data enrolled with the requested ID.',
  /// <summary>
  /// CS0203: There is not any biometric data enrolled with the requested ID.
  /// </summary>
  CS0203: 'CS0203',
  CS0203_MESSAGE:
    'There is not any biometric data enrolled with the requested ID.',

  //Register
  /// <summary>
  /// CS0204: The submitted biometric data matched that of an enrolled member.
  /// </summary>
  CS0204: 'CS0204',
  CS0204_MESSAGE:
    'The submitted biometric data matched that of an enrolled member.',
  /// <summary>
  /// CS0205: The Member ID and associated biometric data added to system.
  /// </summary>
  CS0205: 'CS0205',
  CS0205_MESSAGE:
    'The Member ID and associated biometric data added to system.',
  /// <summary>
  /// CS0206: Enrollment failed.
  /// </summary>
  CS0206: 'CS0206',
  CS0206_MESSAGE: 'Enrollment failed.',
  /// <summary>
  /// CS0207: There is biometric data enrolled with the requested Member ID.
  /// </summary>
  CS0207: 'CS0207',
  CS0207_MESSAGE:
    'There is biometric data enrolled with the requested Member ID.',
  /// <summary>
  /// CS0208: RegistrationID exists in database but doesn't exist in cache.
  /// </summary>
  CS0208: 'CS0208',
  CS0208_MESSAGE:
    "RegistrationID exists in database but doesn't exist in cache.",

  //Identify
  /// <summary>
  /// CS0209: The submitted biometric data matched that of an enrolled member.
  /// </summary>
  CS0209: 'CS0209',
  CS0209_MESSAGE:
    'The submitted biometric data matched that of an enrolled member. MemberId: ',
  /// <summary>
  /// CS0210: No enrolled members matched against the submitted biometric data.
  /// </summary>
  CS0210: 'CS0210',
  CS0210_MESSAGE:
    'No enrolled members matched against the submitted biometric data.',

  //Verify
  /// <summary>
  /// CS0211: Verification successful. The submitted biometric data matched the requested member's enrolled biometric data.
  /// </summary>
  CS0211: 'CS0211',
  CS0211_MESSAGE:
    "Verification successful. The submitted biometric data matched the requested member's enrolled biometric data.",
  /// <summary>
  /// CS0212: Verification failed. The submitted biometric data did not match the requested member's enrolled biometric data.
  /// </summary>
  CS0212: 'CS0212',
  CS0212_MESSAGE:
    "Verification failed. The submitted biometric data did not match the requested member's enrolled biometric data.",
  /// <summary>
  /// CS0213: The Member ID doesn't exist in the system.
  /// </summary>
  CS0213: 'CS0213',
  CS0213_MESSAGE: "The Member ID doesn't exist in the system.",

  //Update
  /// <summary>
  /// CS0214: Update successful. The biometric data associated with the requested Member ID was updated in the system.
  /// </summary>
  CS0214: 'CS0214',
  CS0214_MESSAGE:
    'Update successful. The biometric data associated with the requested Member ID was updated in the system.',
  /// <summary>
  /// CS0215: Update Failed.
  /// </summary>
  CS0215: 'CS0215',
  CS0215_MESSAGE: 'Update Failed.',
  /// <summary>
  /// CS0216: The Member ID doesn't exist in the system.
  /// </summary>
  CS0216: 'CS0216',
  CS0216_MESSAGE: "The Member ID doesn't exist in the system.",

  //ChangeId
  /// <summary>
  /// CS0217: Change of ID successful. The Member ID was changed to the specified new ID.
  /// </summary>
  CS0217: 'CS0217',
  CS0217_MESSAGE:
    'Change of ID successful. The Member ID was changed to the specified new ID.',
  /// <summary>
  /// CS0218: Change of ID failed.
  /// </summary>
  CS0218: 'CS0218',
  CS0218_MESSAGE: 'Change of ID failed.',
  /// <summary>
  /// CS0219: The Member ID intent for change doesn't exist in the system.
  /// </summary>
  CS0219: 'CS0219',
  CS0219_MESSAGE:
    "The Member ID intent for change doesn't exist in the system.",

  //DeleteId
  /// <summary>
  /// CS0220: Deletion successful. The Member ID and associated biometric data removed from system.
  /// </summary>
  CS0220: 'CS0220',
  CS0220_MESSAGE:
    'Deletion successful. The Member ID and associated biometric data removed from system.',
  /// <summary>
  /// CS0221: Deletion failed.
  /// </summary>
  CS0221: 'CS0221',
  CS0221_MESSAGE: 'Deletion failed.',
  /// <summary>
  /// CS0222: The Member ID doesn't exist in the system.
  /// </summary>
  CS0222: 'CS0222',
  CS0222_MESSAGE: "The Member ID doesn't exist in the system.",

  //Extraction
  /// <summary>
  /// CS0223: Biometric images extraction success.
  /// </summary>
  CS0223: 'CS0223',
  CS0223_MESSAGE: 'Biometric images extraction success.',
  /// <summary>
  /// CS0224: Biometric images extraction failed, please provide good quality images and try again.
  /// </summary>
  CS0224: 'CS0224',
  CS0224_MESSAGE:
    'Biometric images extraction failed, please provide good quality images and try again.',

  //Others
  /// <summary>
  /// CS0225: The submitted biometric data was not valid.
  /// </summary>
  CS0225: 'CS0225',
  CS0225_MESSAGE: 'The submitted biometric data was not valid.',
  /// <summary>
  /// CS0226: The specified clientKey was not found in the system. Please contat your vendor for assistance.
  /// </summary>
  CS0226: 'CS0226',
  CS0226_MESSAGE:
    'The specified clientKey was not found in the system. Please contat your vendor for assistance.',
  /// <summary>
  /// CS0227: An unexpected system error was encountered. Please contact your vendor for assistance.
  /// </summary>
  CS0227: 'CS0227',
  CS0227_MESSAGE:
    'An unexpected system error was encountered. Please contact your vendor for assistance.',
  /// <summary>
  /// CS0228: The submitted request was not correctly formatted.
  /// </summary>
  CS0228: 'CS0228',
  CS0228_MESSAGE: 'The submitted request was not correctly formatted.',
  /// <summary>
  /// CS0229: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.
  /// </summary>
  CS0229: 'CS0229',
  CS0229_MESSAGE:
    'A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.',
  /// <summary>
  /// CS0230: The submitted BiometricXml was not correctly formatted.
  /// </summary>
  CS0230: 'CS0230',
  CS0230_MESSAGE: 'The submitted BiometricXml was not correctly formatted.',
  CSC400: 'CSC400',
  CSC400_MESSAGE: 'The user name or password is incorrect.',
  CSC401: '401',
  CSC401_MESSAGE: 'Unauthorized',
  CSC500: '500',
  CSC500_MESSAGE: 'Internal error',
  CSC502: '502',
  CSC502_MESSAGE: 'Bad gateway',
  CSC503: '503',
  CSC503_MESSAGE: 'Service unavailable',
  
};

export const AbisConstant = {
  SUCCESS: 'Success',
  FAILED: 'Failed',
  SUCCESS_CAPITAL: 'SUCCESS',
  UCSResponseMessageIsRegisterSuccess:
    'There is biometric data enrolled with the requested ID.',
  UCSResponseMessageIsRegisterFailed:
    'There is not any biometric data enrolled with the requested ID.',

  UCSResponseMessageRegisterMatchFound:
    'The submitted biometric data matched that of an enrolled member.',
  UCSResponseMessageRegisterSuccess:
    'The Member ID and associated biometric data added to system.',
  UCSResponseMessageRegisterFailed: 'Enrollment failed.',
  UCSResponseMessageRegisterIdExist:
    'There is biometric data enrolled with the requested Member ID.',
  UCSResponseMessageRegisterIdNotExistInCache:
    "RegistrationID exists in database but doesn't exist in cache.",

  UCSResponseMessageIdentifyMatchFound:
    'The submitted biometric data matched that of an enrolled member.',
  UCSResponseMessageIdentifyNoMatchFound:
    'No enrolled members matched against the submitted biometric data.',

  UCSResponseMessageVerifySuccess:
    "Verification successful. The submitted biometric data matched the requested member's enrolled biometric data.",
  UCSResponseMessageVerifyFailed:
    "Verification failed. The submitted biometric data did not match the requested member's enrolled biometric data.",
  UCSResponseMessageVerifyIdNotExist:
    "The Member ID doesn't exist in the system.",

  UCSResponseMessageUpdateSuccess:
    ' Update successful. The biometric data associated with the requested Member ID was updated in the system.',
  UCSResponseMessageUpdateFailed: 'Update Failed.',
  UCSResponseMessageUpdateIdNotExist:
    "The Member ID doesn't exist in the system.",

  UCSResponseMessageChangeIDSuccess:
    'Change of ID successful. The Member ID was changed to the specified new ID.',
  UCSResponseMessageChangeIDFailed: 'Change of ID failed.',
  UCSResponseMessageChangeIDIdNotExist:
    "The Member ID intent for change doesn't exist in the system.",

  UCSResponseMessageDeleteSuccess:
    'Deletion successful. The Member ID and associated biometric data removed from system.',
  UCSResponseMessageDeleteFailed: 'Deletion failed.',
  UCSResponseMessageDeleteIdNotExist:
    "The Member ID doesn't exist in the system.",

  UCSResponseMessageExtractionSuccess: 'Biometric images extraction success.',
  UCSResponseMessageExtractionFailed:
    'Biometric images extraction failed, please provide good quality images and try again...',

  UCSResponseMessageBadTemplate: 'The submitted biometric data was not valid.',
  UCSResponseMessageClientNotFound:
    'The specified clientKey was not found in the system. Please contat your vendor for assistance.',
  UCSResponseMessageServerException:
    'An unexpected system error was encountered. Please contact your vendor for assistance.',

  UCSResponseMessageInvalidRequest:
    'The submitted request was not correctly formatted.',
  UCSResponseMessageLicenseError:
    'A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.',
  UCSResponseMessageInternalError:
    'An unexpected system error was encountered. Please contact your vendor for assistance.',
  UCSResponseMessageInvalidTemplate:
    'The submitted BiometricXml was not correctly formatted.',

  //Register result
  /// <summary>
  /// Register/Update success
  /// </summary>
  RegisterOrUpdateSuccess: 'SUCCESS',
  //Register result
  /// <summary>
  /// Register/Update failed
  /// </summary>
  RegisterOrUpdateFailed: 'FAILED',

  // IsRegister result
  /// <summary>
  /// Id exist in the system
  /// </summary>
  IsRegisterSuccess: 'YES',
  /// <summary>
  /// Id not exist in the system
  /// </summary>
  IsRegisterFailed: 'NO',

  //Delete result
  /// <summary>
  /// Delete success
  /// </summary>
  DeleteSuccess: 'DS',
  /// <summary>
  /// Delete failed
  /// </summary>
  DeleteFailed: 'DF',

  //Verify result
  /// <summary>
  /// Verify success
  /// </summary>
  VerifySuccess: 'VS',
  /// <summary>
  /// Verify failed
  /// </summary>
  VerifyFailed: 'VF',

  //ChangeID result
  /// <summary>
  /// Change id success
  /// </summary>
  ChangeIDSuccess: 'CS',
  /// <summary>
  /// Change id failed
  /// </summary>
  ChangeIDFailed: 'CF',
  /// <summary>
  /// License error
  /// </summary>
  LicenseError: 'LICENSE_ERROR',
  /// <summary>
  /// Internal error
  /// </summary>
  InternalError: 'INTERNAL_ERROR',
  /// <summary>
  /// Internal error
  /// </summary>
  InvalidRequest: 'INVALID_REQUEST',
  /// <summary>
  /// Server exception
  /// </summary>
  ServerException: 'SERVER_EXCEPTION',
  /// <summary>
  /// Request format error
  /// </summary>
  RequestFormatError: 'REQUEST_FORMAT_ERROR',
  /// <summary>
  /// Poor image quality
  /// </summary>
  PoorImageQuality: 'POOR_IMAGE_QUALITY',
  /// <summary>
  /// Id exist
  /// </summary>
  IdExist: 'ID_EXIST',
  /// <summary>
  /// Id not exist
  /// </summary>
  IdNotExist: 'ID_NOT_EXIST',

  /// <summary>
  /// Client not found
  /// </summary>
  ClientNotFound: 'CLIENT_NOT_FOUND',
  /// <summary>
  /// Client not set yet in the system
  /// </summary>
  ClientNotSetYet: 'CLIENT_NOT_SET_YET',
  /// <summary>
  /// Client exist
  /// </summary>
  ClientExist: 'CLIENT_EXIST',
  /// <summary>
  /// Invalid parameter
  /// </summary>
  InvalidParameter: 'INVALID_PARAMETER',

  /// <summary>
  /// Match found
  /// </summary>
  MatchFound: 'MATCH_FOUND',
  /// <summary>
  /// Match not found
  /// </summary>
  NoMatchFound: 'NO_MATCH_FOUND',

  /// <summary>
  /// Bad request
  /// </summary>
  BadRequest: 'BAD_REQUEST',
  /// <summary>
  /// Bad template
  /// </summary>
  BadTemplate: 'BAD_TEMPLATE',
  /// <summary>
  /// Api error
  /// </summary>
  ApiError: 'API_ERROR',

  /// <summary>
  ///
  /// </summary>
  ExtractionFailed: 'EXTRACTION_FAILED',

  UCSUnAuthorize: 'CloudABIS Server UnAuthorized.',
  UCSUnreachable: 'CloudABIS Server Unreachable.',
  UCSBadGateWay: 'CloudABIS Server Bad Gateway',
  Invalid_Grant: 'invalid_grant',
  Unsupported_Grant_Type: 'unsupported_grant_type'
};

export const Advertisements: any[] =[
  {
    ID: 1,
    AD_BACKGROUND_IMG_CLASS: 'card card-ad-01-img',
    AD_IMG_SRC: '../../assets/images/flag-japan.png', 
    AD_IMG_ALT: 'flag-japan',
    AD_TITLE_PART_1: 'Blood Plasma for',
    AD_TITLE_PART_2: 'Cancer Therapy!',
    AD_DESCRIPTION: 'For the last 13 years, we have helped Takeda to streamline the blood plasma collection process for nearly 1 million donors in 200 geographically distributed locations, saving them millions of dollars.',
    AD_COMPANY_MSG: 'Enjoy the advantage of premium.',
    AD_LOGO_IMG_SRC: '../../assets/images/takeda-logo.png',
    AD_LOGO_ALT: 'takeda-logo',
    AD_LINK: 'https://www.m2sys.com/blog/case-study-on-takeda-biometric-blood-donor-identification/',
    AD_BUTTON_TEXT: 'Download Case Study'
  },
  {
    ID: 2,
    AD_BACKGROUND_IMG_CLASS: 'card card-ad-02-img',
    AD_IMG_SRC: '../../assets/images/flag-turkish.png', 
    AD_IMG_ALT: 'flag-turkish',
    AD_TITLE_PART_1: 'Turkish',
    AD_TITLE_PART_2: 'National ID!',
    AD_DESCRIPTION: '80 million Turkish citizens received a new digital ID cards. To prevent identity fraud, M2SYS built a massive identity de-duplication system, which runs on 2 clusters of 40 massive parallel servers with Oracle & EMC as the data stack.',
    AD_COMPANY_MSG: 'Enjoy the advantage of premium.',
    AD_LOGO_IMG_SRC: '../../assets/images/id-card-icon.png',
    AD_LOGO_ALT: 'id-card-icon',
    AD_LINK: 'https://www.m2sys.com/blog/download-turkish-national-id-project/',
    AD_BUTTON_TEXT: 'Download Case Study'
  },
  {
    ID: 3,
    AD_BACKGROUND_IMG_CLASS: 'card card-img',
    AD_IMG_SRC: '../../assets/images/CloudABIS_logo_m2sys.png', 
    AD_IMG_ALT: 'identity-cloudabis',
    AD_TITLE_PART_1: 'CloudABIS™',
    AD_TITLE_PART_2: 'Cloud-Based ABIS System',
    AD_DESCRIPTION: 'Built with nearly 20 years of experience in large-scale biometric technology projects, CloudABIS™ is a superscalar, biometrics-as-a-service (BaaS) matching system that removes the burden & cost associated with building and maintaining a reliable biometric identification system.',
    AD_COMPANY_MSG: 'Enjoy the advantage of our cloud-based biometric service.',
    AD_LOGO_IMG_SRC: '../../assets/images/m2sys-logo.png',
    AD_LOGO_ALT: 'identity-m2sys-icon',
    AD_LINK: 'https://identity.cloudabis.com/',
    AD_BUTTON_TEXT: 'Signup For Biometric Matching Service'
  }
]
