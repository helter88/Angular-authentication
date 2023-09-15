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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootURL= 'https://api.angular-email.com';

  sideIn$ = new BehaviorSubject(false);

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
    return this.http.get(this.rootURL + '/auth/signedin').pipe(
      tap(res => {
        console.log(res);
      })
    )
  }
}
