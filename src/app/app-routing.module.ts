import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'appconfig', loadChildren: () => import('./appconfig/appconfig.module').then(m => m.AppconfigModule) },
  { path: 'biocloud/v12', loadChildren: () => import('./biocloud12/biocloud12.module').then(m => m.Biocloud12Module) },
  { path: 'biocloud/v10', loadChildren: () => import('./biocloud10/biocloud10.module').then(m => m.Biocloud10Module) }
];
// const routes: Routes = [
//   { path: '', 
//     children: [
//       { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
//       { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
//       { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
//       { path: 'appconfig', loadChildren: () => import('./appconfig/appconfig.module').then(m => m.AppconfigModule) },
//       { path: 'biocloud/v12', loadChildren: () => import('./biocloud12/biocloud12.module').then(m => m.Biocloud12Module) }
//     ]
//   }
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
