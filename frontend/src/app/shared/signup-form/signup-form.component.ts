import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { AuthService } from '../services/authService';
@Component({
  selector: 'signup-form',
  templateUrl: 'app/shared/signup-form/signup-form.component.html',
  styleUrls: ['app/shared/signup-form/signup-form.component.css'],
  providers: [AuthService]
})
export class SignupFormComponent {
  constructor (private authService: AuthService) {}
  submitted = false;
  model = {'name' : '',
           'password': ''};

  onSubmit() {
    this.authService.signup(this.model.name, this.model.password)
    .subscribe(() => {console.log(this.model)});
  }
}
