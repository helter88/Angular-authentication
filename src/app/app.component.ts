import { Component } from '@angular/core';
import { AuthService } from './auth/validators/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSignIn: boolean | null = false;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit() {
    this.authService.sideIn$.subscribe(signin => {
      this.isSignIn = signin;
    })

    this.authService.checkAuth().subscribe(() => {});
  }
}
