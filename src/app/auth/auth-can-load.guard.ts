import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, filter, map, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './validators/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCanLoadGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.sideIn$.pipe(
      skipWhile(val => val === null),
      take(1),
      map(authenticated => {
        if (!authenticated) {
          this.router.navigateByUrl('/');
          return false; 
        } else {
          return true;
        }
      })
    )
  }
}
