import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../shared/guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from '@app/shared/alert';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { IsRegisterComponent } from './isregister/isregister.component';
import { RegisterComponent } from './register/register.component';
import { IdentifyComponent } from './identify/identify.component';
import { VerifyComponent } from './verify/verify.component';
import { UpdateComponent } from './update/update.component';
import { ChangeidComponent } from './changeid/changeid.component';
import { DeleteidComponent } from './deleteid/deleteid.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'isregister', component: IsRegisterComponent, canActivate: [AuthGuard]  },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]  },
  { path: 'identify', component: IdentifyComponent, canActivate: [AuthGuard]  },
  { path: 'verify', component: VerifyComponent, canActivate: [AuthGuard]  },
  { path: 'update', component: UpdateComponent, canActivate: [AuthGuard]  },
  { path: 'changeid', component: ChangeidComponent, canActivate: [AuthGuard]  },
  { path: 'deleteid', component: DeleteidComponent, canActivate: [AuthGuard]  }
]

// const routes: Routes = [
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
//   { path: 'isregister', component: IsRegisterComponent, canActivate: [AuthGuard]  },
//   { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]  },
//   { path: 'identify', component: IdentifyComponent, canActivate: [AuthGuard]  },
//   { path: 'verify', component: VerifyComponent, canActivate: [AuthGuard]  },
//   { path: 'update', component: UpdateComponent, canActivate: [AuthGuard]  },
//   { path: 'changeid', component: ChangeidComponent, canActivate: [AuthGuard]  },
//   { path: 'deleteid', component: DeleteidComponent, canActivate: [AuthGuard]  }
// ]

// const routes: Routes = [
//   {
//     path: '',
    
//     children: [
//       {
//         path: '',
//         redirectTo: 'home',
//       },
//       {
//         path: 'home',
//         component: HomeComponent, 
//         canActivate: [AuthGuard]
//       },
//       { path: 'isregister', component: IsRegisterComponent, canActivate: [AuthGuard]  },
//       { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]  },
//       { path: 'identify', component: IdentifyComponent, canActivate: [AuthGuard]  },
//       { path: 'verify', component: VerifyComponent, canActivate: [AuthGuard]  },
//       { path: 'update', component: UpdateComponent, canActivate: [AuthGuard]  },
//       { path: 'changeid', component: ChangeidComponent, canActivate: [AuthGuard]  },
//       { path: 'deleteid', component: DeleteidComponent, canActivate: [AuthGuard]  }
//     ],
//   },
// ];

@NgModule({
  declarations: [HomeComponent,IsRegisterComponent,RegisterComponent,IdentifyComponent,VerifyComponent,UpdateComponent,ChangeidComponent,DeleteidComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class Biocloud12Module { }