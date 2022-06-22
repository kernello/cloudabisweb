<!-- # cloudabis-angular-sample

Using CloudScanr and CloudABIS to do biometric businees.


# Building Out the Dockerfile (DOcker Intro or proceedure)

We will build docker image in multi build fashion  -->


# CloudABIS Matching Service Demo Application (Angular 13)

[![Angular CLI version](https://img.shields.io/npm/v/angular-cli.svg)](https://www.npmjs.com/package/@angular/cli/v/13.3.5)
[![Node](https://img.shields.io/npm/v/node.svg)](https://nodejs.org/de/blog/release/v14.16.0/)
[![Package Manager](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/npm)
[![Angular](https://img.shields.io/npm/v/angular.svg)](https://www.npmjs.com/package/@angular/core/v/13.3.8)

CloudABIS Mathcing Service Demo application intended to give the practical approach to the end user of how our Cloud based biometric soilution works, which initially starts from:

- Firstly, biometric data (FingerPrint, Face, Iris, or combination of any 2 or all 3 among these modalities, and single isolated modality, which is FingerVein) capturing procedure with the 
  help of our CloudScanr™ capture tool [x64](https://kernello-scanr.s3.amazonaws.com/4.1.12/CloudScanrClient-Installer-4.1.12(x64).exe) or [x86](https://kernello-scanr.s3.amazonaws.com/4.1.12/CloudScanrClient-Installer-4.1.12(x64).exe) or customer's own capture tool if they have already used at their side. Checkout our CloudScanr™ [docs](https://bioplugin.cloudabis.com/v12/api/docs/Ultimate-document-of-CloudScanr-4.3.27.pdf) for more information. Also visit our Matching Service solution [portal](https://identity.cloudabis.com/) 
- Secondly, Consume the CloudABIS Matching service APIs, which consists of several Bio/Non-bio api verbs or methods (IsRegister, Register, Identify, Verify, Update, ChangeID, and DeleteID or  
  RemoveID). In one click, biometric capture tool would be prompted in front of user (of course if our own capture tool: CloudScanr or customer capture device already installed and device settings
  already done), then it will instructs and capture user biometric data and will send to the respective service (Register, Identify, Verify, Update, ChangeID) and will come back with respective service wise response. Logically, For IsRegister, ChangedID, and DeleteID or RemoveID services will not be required to have biometric capture and data, since these are tohgether called non-biometric operations in our cloud-based solution. 


Features:

- CloudScanr (Capture tool) API service. 
- CloudABIS Matching Service Version *v12* (FingerPrint, Face, Iris) and **v10** (FingerVein) engine supported Services.
- Configuration( **appconfiguration**) for separate *v12* and *v10* biometric and non-biometric operations.

## Table of contents

- [Install](#install)
- [How to use it](#how-to-use-it)
- [Dockrising (Containerising ) Application on NGINX Server](#dockerising-app-on-nginx)
- [Other](#events)
- [License](#license)

## Install

- ### Clone the application from github 
([link](https://github.com/kernello/cloudabisweb.git))

- ### With npm

```sh
npm install --save
```

## How to use it

- ### Run

```sh
npm run dev:build
npm run dev
```

- ### Login with any credential 
(for example username: admin, password: admin)

- ### V10 APP Configuration
Go to App Configuration page where configuration switch button is switched to V10. If you want to create the configuration for v10 biometric operations, then put the necessary values into the page fields. For example, see below.

```html
API Url: https://demo-fv.cloudabis.com/v1
APP Key: c98138a3cf0d4cb7979646318e2c4b5d
Customer Key: C50E503404FC4698BC8C827688E88B4A
Secret Key: Qi8OWeaWfZpkXMDrEq5wyppWyug=
```
or

- ### V12 APP Configuration
If you want to create the configuration for v12 biometric operations, then put the necessary values into the page fields. For example, see below.

```html
API Base URL: https://dev-bioplugin.cloudabis.com/v12
Client API Key: b9a3d9ba5c774cfc92182d2743ef70ab
Client Key: C7875FBEBE2C4A1AA8F64192F71D160F
```

- ### APP Configuration Explanation
Once App Configuration is done, then yor are good to go to use respective version-wise operations. If you want to configure both versions but set the default configuration (either v12 or v10) then based on the default-set configuration, you will be able to use that configuration related operations. For example, if you configure App Configurationn for v10 and v12 both but set the configuration for v12 lastly. then you will be able to use v12 biomertic operations. For using v10 operations, you have switch from the v12 configuration to v10 configuration.

- ### Setting CloudScanr™ Capture tool configuration
Both v10 and v12 menus have 7 user interfaces each. Among them, for the biometric operations such as Register, Identify, Verify, and Update there are 4 UIs exist. These operations needs to have the biometric data to test our Cloud-based Mathcing Service. Apart from them, there are 3 non-biometric UIs are dedicated for the DeleteID, ChangeID, and IsRegister. In case of capturing biometric data, If you want to use our relaible and flawless capture tool CloudScanr™ then click on [x64](https://kernello-scanr.s3.amazonaws.com/4.1.12/CloudScanrClient-Installer-4.1.12(x64).exe) or [x86](https://kernello-scanr.s3.amazonaws.com/4.1.12/CloudScanrClient-Installer-4.1.12(x64).exe) bit installer. To configure, please have a look at the CloudScanr™ [documentation](https://bioplugin.cloudabis.com/v12/api/docs/Ultimate-document-of-CloudScanr-4.3.27.pdf).<br>

Once installation and device settings are finished(After installation done, if you run CloudScanr™, you will find the details settings and API documentation of CloudScanr™ in the system tray), you have to click and run the API Documentation. The API swagger docuemntation page will be opened in your browser. Now you are fine to continue the process of capturing and testing the biometric operations through the demo application. So, go back to the demo application.<br>

- ### V12 & V10 Operations
We assume that you have finished settings up the APP Configuration page and CloudScanr™ tool settings. <br>
<!-- Markup : 1. Now if you want to check the enrolled id or regsitration id exist then check via `isregister` page.
         2. If you want to delete the existing registration id or enrolled id then you can check `deleteid` page.
         3. In case of changing the existing registration id or enrolled id, then visit `changeid` page.
         4. For face, Iris, FingerPrint, or all modalities identification together, try `identify` page. First input the essential field if it requires. According to the device settings in CloudScanr™ and corresponding device connected to the main operating device (ex. laptop, desktop), Hitting the capture button, which will then initiate and prompt capture window. For face, iris, fingerprint, or all, respective device will be prompted. After successful capture, you can click the identify button to check the capture(biometric) data for cloud-based matching service. If previous data is found comparing the data you just sent via button click, then there will be successful message will be shown. Otherwise logical message will be shown.
         5. In `register` page, input the necessary field to get the biometric registration done. Here also you will need to capture and register the biometric data. Process is similar to identify.
         6. Process is same for the `verify` page as well, But the biometric data verification process logic is applied here, so that any misuse of biometric data can be avoided.
         7. `update` page is necessary when it is time to update biometric data. Successful captured data will override the previous biometric data upon update button click. -->

  - Now if you want to check the enrolled id or regsitration id exist then check via `isregister` page.

  - If you want to delete the existing registration id or enrolled id then you can check `deleteid` page.

  - In case of changing the existing registration id or enrolled id, then visit `changeid` page.

  - For face, Iris, FingerPrint, or all modalities identification together, try `identify` page. First input the essential field if it requires. According to the device settings in      
    CloudScanr™ and corresponding device connected to the main operating device (ex. laptop, desktop), Hitting the capture button, which will then initiate and prompt capture window. For face, iris, fingerprint, or all, respective device will be prompted. After successful capture, you can click the identify button to check the capture(biometric) data for cloud-based matching service. If previous data is found comparing the data you just sent via button click, then there will be successful message will be shown. Otherwise logical message will be shown.

  - In `register` page, input the necessary field to get the biometric registration done. Here also you will need to capture and register the biometric data. Process is similar to 
    identify.

  - Process is same for the `verify` page as well, But the biometric data verification process logic is applied here, so that any misuse of biometric data can be avoided.
  
  - `update` page is necessary when it is time to update biometric data. Successful captured data will override the previous biometric data upon update button click.


## Dockrising (Containerising ) Application on NGINX Server

This applciation can be dockerized. It depends on the user needs.

## Other 

### Userful commands and packages 
Run `npm install -g @angular/cli`\
Run `ng new cloudabisangwebapp`\
Run `cd cloudabisangwebapp`\
Run `npm run build`\
Run `npm run start`\
Run `ng g c --skipTests=true login`\
Run `ng g c --skipTests=true home`\
Run `ng g m business --routing`\
Run `ng g component  --skipTests=true business/matchingservice`\
Run `ng g s /folder-name/service-name`\

### Packages dependencies along with the node_modules

Run `npm i @ng-bootstrap/ng-bootstrap`\
Run `npm i ngx-cookie-service`\

### Docker command
Run `touch docker-compose.yml`\

## License

[MIT](#)