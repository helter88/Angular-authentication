import { Component } from '@angular/core';
import { AuthService } from '../validators/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent {

  constructor(
    private auth: AuthService
  ){}

  ngOnInit() {
    this.auth.signOut().subscribe(() =>{})
  }

}
