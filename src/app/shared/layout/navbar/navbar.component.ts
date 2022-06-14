import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { window } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthRoutesConstants,
  HomeRoutesConstants,
  CloudABISMatchingRoutesConstants,
  CloudABISMatchingMenuTextConstants,
  CloudScanrAPIURLsConstants,
  CloudABISV12APIURLsConstants,
  CloudABISV10APIURLsConstants,
  CookiesConstants,
  DataTypeConstants,
  APIConstants,
  OptionalParamConstants,
  LocalStorageConstants,
  
} from '@app/shared/constants';
import {
  ApiService,
  CloudabisV10Service,
  CloudabisV12Service,
  CloudscanrService,
  CookieStorageService,
  RouteService,
  ScriptService,
  LocalStorageService,
  AuthService,
} from '@app/shared/services';
//import { ScriptService } from '../../../shared/services/script.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private titleService: Title,private formBuilder: FormBuilder, private router: Router, private scriptService: ScriptService, private authService: AuthService) { 
    //this.scriptService.loadScripts();
  }

  ngOnInit(): void {
  }

  logout(){
    // localStorage.removeItem('isSignedIn');
    // this.router.navigateByUrl('auth/login');
    // this.scriptService.disableLayout();
    this.authService.logout();
  }

}
