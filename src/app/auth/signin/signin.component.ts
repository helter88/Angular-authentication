import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, SignInCredencials } from '../validators/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  })

  constructor(
    private auth: AuthService
  ){}

  onSubmit(){
    if (this.authForm.invalid){
      return;
    }
    this.auth.signIn(this.authForm.value as SignInCredencials).subscribe({
      next: () => {},
      error: ({error}) => {
        if (error.username || error.password){
          this.authForm.setErrors({credentials: true})
        }
      }
    });
  }
}
