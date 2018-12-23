import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user-routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(UserRoutes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
