import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignUpCredencials {
  username: string;
  password: string;
  passwordConfirmation: string
}

interface SignUpResponse {
  username: string;
}

interface SignInResponse {
  authenticated: boolean;
  username: string;
}

export interface SignInCredencials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootURL= 'https://api.angular-email.com';

  sideIn$ = new BehaviorSubject<null | boolean>(null);

  constructor(private http: HttpClient) {}

  userNameAvailable(username: String) {
    return this.http.post<UsernameAvailableResponse>(this.rootURL + '/auth/username',
    {
      username
    })
  }

  signUp(credentials: SignUpCredencials) {
    return this.http.post<SignUpResponse>(this.rootURL + '/auth/signup', credentials).pipe(
      tap(() => {
        this.sideIn$.next(true);
      })
    )
  }

  checkAuth() {
    return this.http.get<SignInResponse>(this.rootURL + '/auth/signedin').pipe(
      tap(({authenticated}) => {
        if(authenticated){
          this.sideIn$.next(true);
        }
      })
    )
  }

  signOut() {
    return this.http.post(this.rootURL + '/auth/signout', {}).pipe(
      tap(() => {
        this.sideIn$.next(false);
      })
    )
  }

  signIn(credentials: SignInCredencials) {
    return this.http.post<any>(this.rootURL + '/auth/signin', credentials).pipe(
      tap(() => {
        this.sideIn$.next(true);
      })
    )
  }
}
