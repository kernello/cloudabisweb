import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/guard';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]   }
]
// const routes: Routes = [
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]   }
// ]
// const routes: Routes = [
//   {
//     path: '',
    
//     children: [
//       {
//         path: '',
//         redirectTo: 'dashboard',
//       },
//       {
//         path: 'dashboard',
//         component: DashboardComponent, 
//         canActivate: [AuthGuard]
//       }
//     ],
//   },
// ];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
