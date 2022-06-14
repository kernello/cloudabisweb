import { Version } from '@angular/compiler';
import {
    AlertType,
    ScopeType,
    VersionType
  } from '@app/shared/enums';
export class CurrentNotification {
    isOk: boolean = true;
    message: string = '';
    title: string = '';
    alertType: string = AlertType.Success;
    scopeType: string = ScopeType.AppConfig;
    version: string = VersionType.V12;
}
