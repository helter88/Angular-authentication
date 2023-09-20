import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email, EmailService } from '../email.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent {
  email: Email | undefined;
  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ){}

  ngOnInit(){
    this.route.params.pipe(
      switchMap(({ id }) => {
        return this.emailService.getEmail(id);
      })
    ).subscribe(email => {
      this.email = email;
    })
  }
}
