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
  help of our CloudScanr™ capture tool [x64](https://kernello-scanr.s3.amazonaws.com/4.1.12/CloudScanrClient-Installer-4.1.12(x64).exe) [x86](https://kernello-scanr.s3.amazonaws.com/4.1.12/CloudScanrClient-Installer-4.1.12(x64).exe) or customer's own capture tool if they have already used at their side. Checkout our CloudScanr™ [docs](https://bioplugin.cloudabis.com/v12/api/docs/Ultimate-document-of-CloudScanr-4.3.27.pdf) for more information. Also visit our Matching Service solution [portal](https://identity.cloudabis.com/) 
- Secondly, Consume the CloudABIS Matching service APIs, which consists of several Bio/Non-bio api verbs or methods (IsRegister, Register, Identify, Verify, Update, ChangeID, and DeleteID or  
  RemoveID). In one click, biometric capture tool would be prompted in front of user (of course if our own capture tool: CloudScanr or customer capture device already installed and device settings
  already done), then it will instructs and capture user biometric data and will send to the respective service (Register, Identify, Verify, Update, ChangeID) and will come back with respective service wise response. Logically, For IsRegister, ChangedID, and DeleteID or RemoveID services will not be required to have biometric capture and data, since these are tohgether called non-biometric operations in our cloud-based solution. 


Features:

- XXXXXX
- XXXX XXXXX *dependencies* XXX **jQuery**
- **Can** XXX XXX XXXX XXX XXXX
- XXXXX XXXX XXXXX XX XXXX XXXXXXX

## Table of contents

- [Install](#install)
- [How to use it](#how-to-use-it)
- [Dockrising (Containerising ) Application on NGINX Server](#dockerising-app-on-nginx)
- [Methods](#methods)
- [Other](#events)
- [License](#license)

## Install

### With npm or yarn

```sh
npm install bs-breakpoints --save

// yarn
yarn add bs-breakpoints
```

### CDN

CDN | Link
------------ | -------------
jsDelivr | [`https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.js`](https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.js)
jsDelivr, minified | [`https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.min.js`](https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.min.js)

## Dockrising (Containerising ) Application on NGINX Server

Time to build out the Dockerfile! There are a lot of ways we could do this, but today we’ll use a multi-stage process or multi-build fashion:

- *Stage 1:* In Stage 1 we are copying our app code in the “app” folder and installing app dependencies from package.json file and creating production build using Node image.
- *Stage 2:* In Stage 2 we are using the Nginx server image to create the Nginx server and deploy our app on it by copying build items from `/app/docs` to Nginx server at `/usr/share/Nginx/HTML` 
   location.

## How to use it

You should wait for the document ready event and call the `init` method to detect breakpoint changes.
We expose one global variable available everywhere: `bsBreakpoints`

Vanilla JS
```js
document.addEventListener('DOMContentLoaded', function () {
  bsBreakpoints.init()
})
```

With jQuery
```js
$(document).ready(function () {
  bsBreakpoints.init()
})
```

### Use it with npm

```js
import bsBreakpoints from 'bs-breakpoints'
```

For more examples check out [this file](https://github.com/Johann-S/bs-breakpoints/blob/master/tests/index.html).

This library is UMD ready so you can use it everywhere.

## Methods

### init

Will detect the current breakpoint and emit `init.bs.breakpoint` event.

It'll add a listener on the window `resize` event and emit `new.bs.breakpoint` event.

### detectBreakpoint

Detect the current breakpoint and return it.

### getCurrentBreakpoint

Return the current breakpoint.

## Other 

### Create Project, Create Component, Module with Routing, component under module without Test (Sample)

<!-- Emitted just once when `bsBreakpoints.init()` is called. -->

<!-- This event contains the current breakpoint in the [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) attribute in VanillaJS and for those who use jQuery we add a `breakpoint` key in jQuery's events. -->
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