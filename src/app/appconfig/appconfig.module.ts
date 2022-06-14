import { NgModule } from '@angular/core';
import { CommonModule,HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/guard';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]   }
]
// const routes: Routes = [
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard]   }
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
//       }
//     ],
//   },
// ];



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class AppconfigModule { }
