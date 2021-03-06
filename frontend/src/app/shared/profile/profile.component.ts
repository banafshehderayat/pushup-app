  import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { AuthService } from '../services/authService';
import {Router} from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: 'app/shared/profile/profile.component.html',
  styleUrls: ['app/shared/profile/profile.component.css'],
  providers: [AuthService]
})
export class ProfileComponent implements OnInit {
  router: Router;
  authService: AuthService;
  displayTest : Boolean;
  displayWorkoutButton : Boolean;
  displayDoneWorkout : Boolean;
  displayRepeatWorkout: Boolean;
  test = {
    'testResult': 0
  };
  userStatus : number[];
  workoutSets : number[];
  nextStatus:  number[];

  constructor (_router: Router, _authService: AuthService) {
    this.router = _router;
    this.authService = _authService;
  }



  testNeeded = (status: number[]) => {
    let statusString = status.toString();
    if (statusString === "0,0,0") {
      return true;
    } else if (statusString === "2,3,3" || statusString === "2,3,2" || statusString === "2,3,1") {
      return true;
    } else if (statusString === "4,3,3" || statusString === "4,3,2" || statusString === "4,3,1") {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.authService.profile()
    .subscribe((res, err) => {
      if (err){
        console.log(err);
      } else {
        if (res.success){
          this.userStatus = res.user.status;
          this.displayTest = this.testNeeded(this.userStatus);
          this.displayWorkoutButton = !this.displayTest;
          this.displayRepeatWorkout = false;
          this.displayDoneWorkout = false;
        } else {
          console.log(res.msg);
        }
      }
    });

  }

  onSubmit() {
    this.authService.update(this.userStatus, this.test.testResult)
    .subscribe((res, err) => {
      if (err){
        console.log(err);
      } else {
        if (res.success){
          this.displayTest = false;
          this.displayWorkoutButton = true;
        } else {
          console.log(res.msg);
        }
      }
    });
  }

  getWorkout() {
    this.authService.profile()
    .subscribe((res, err) => {
      if (err){
        console.log(err);
      } else {
        if (res.success){
          this.displayWorkoutButton = false;
          this.displayRepeatWorkout = true;
          this.displayDoneWorkout = true;
          this.authService.workout(res.user.status, res.user.test)
          .subscribe((res, err) => {
            if (err){
              console.log(res.user.status, res.user.test);
              console.log(err);
            } else {
              if (res.success){
                this.workoutSets = res.msg.sets;
                this.nextStatus = res.status;
                console.log(this.nextStatus);
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

  doneWorkout(){
    this.authService.profile()
    .subscribe((res, err) => {
      if (err){
        console.log(err);
      } else {
        if (res.success){
          this.authService.update(this.nextStatus, res.user.test)
          .subscribe((res, err) => {
            if (err){
              console.log(err);
            } else {
              if (res.success){
                console.log('done');
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

  repeatWorkout(){
    this.authService.profile()
    .subscribe((res, err) => {
      if (err){
        console.log(err);
      } else {
        if (res.success){
          this.authService.update(this.userStatus, res.user.test)
          .subscribe((res, err) => {
            if (err){
              console.log(err);
            } else {
              if (res.success){
                console.log('done');
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
