import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface UsernameAvailableResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  userNameAvailable(username: String) {
    return this.http.post<UsernameAvailableResponse>('https://api.angular-email.com/auth/username',
    {
      username
    })
  }
}
