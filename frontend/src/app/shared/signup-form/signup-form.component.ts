import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { AuthService } from '../services/authService';
import {Router} from '@angular/router';

@Component({
  selector: 'signup-form',
  templateUrl: 'app/shared/signup-form/signup-form.component.html',
  styleUrls: ['app/shared/signup-form/signup-form.component.css'],
  providers: [AuthService]
})
export class SignupFormComponent {
  router: Router;
  authService: AuthService;
  submitted = false;
  model = {'name' : '',
           'password': ''};
  constructor (_router: Router, _authService: AuthService) {
    this.router = _router;
    this.authService = _authService;
  }

  onSubmit() {
    this.authService.signup(this.model.name, this.model.password)
    .subscribe((res, err) => {
      if (err){
        console.log(err);
      } else {
        if (res.success){
          this.authService.login(this.model.name, this.model.password)
          .subscribe((res, err) => {
            if (err){
              console.log(err);
            } else {
              if (res.success){
                localStorage.setItem('id_token', res.token);
                this.router.navigateByUrl('/profile');
              } else {
                console.log(res.msg);
              }
            }
          });
        } else {
          console.log(res.msg);
        }
      }
    });

  }
}
