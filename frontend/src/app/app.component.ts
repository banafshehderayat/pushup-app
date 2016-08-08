import { Component } from '@angular/core';
import { provideRouter, RouterConfig } from '@angular/router';
import {SignupFormComponent} from './shared/signup-form/signup-form.component';
import {LoginFormComponent} from './shared/login-form/login-form.component';
import {ProfileComponent} from './shared/profile/profile.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
//import 'rxjs/Rx';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ ROUTER_DIRECTIVES]
})

export class AppComponent {
  title = 'app works!';
}


const routes: RouterConfig = [
      {
        path: '',
        redirectTo: 'signup'
    },
    {
        path: 'signup',
        component: SignupFormComponent
    },
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

export const appRouterProviders = [
  provideRouter(routes)
];
