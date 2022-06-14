import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from '@app/shared/alert';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'  },
  { path: 'auth/login', component: LoginComponent }
]
// const routes: Routes = [
//   { path: 'auth/login', component: LoginComponent }
// ]
// const routes: Routes = [
//   {
//     path: '',
    
//     children: [
//       {
//         path: '',
//         redirectTo: 'auth/login',
//       },
//       {
//         path: 'auth/login',
//         component: LoginComponent
//       }
//     ],
//   },
// ];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    RouterModule.forChild(routes)

  ]
})
export class AuthModule { }
