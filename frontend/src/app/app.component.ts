import { Component } from '@angular/core';
import {SignupFormComponent} from './shared/signup-form/signup-form.component';
//import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [SignupFormComponent]
})
export class AppComponent {
  title = 'app works!';
}
