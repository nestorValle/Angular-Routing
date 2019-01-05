import {  Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuardGuard } from './user/auth-guard.guard';

export const AppRoutes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'products',
    loadChildren: './products/product.module#ProductModule',
    /*canLoad prevent to download the bundle files of products module by lazyloading */
    //canLoad: [AuthGuardGuard]
    /*when using canActivate, you can set preloadingStrategy:PreloadAllModules in order to download de bundles files*/
    canActivate: [AuthGuardGuard]
  },
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];
