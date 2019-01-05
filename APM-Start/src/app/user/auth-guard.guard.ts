import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedIn(state.url);
  }
  canLoad(route: Route): boolean {
    return this.isLoggedIn(route.path)
  }
  isLoggedIn(redirectedUrl: string) {
    this.authService.redirectURL = redirectedUrl;
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login']);
  }
}
