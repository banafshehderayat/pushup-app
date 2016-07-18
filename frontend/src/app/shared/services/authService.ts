import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AuthService {
  constructor (private http: Http) {}

  public extractData(dataRes: Response) {
    let body = dataRes.json();
    return body || {};
  }

  public extractError(errorRes: Response) {
    console.log(errorRes);
    let body = errorRes.json();
    let errorMessage = body.message;
    let errorCode = body.errorCode;
    return Observable.throw(errorMessage);
  }

  /**
  * Signs the user up.
  *
  * @returns A promise for that user.
  */
  public signup(email: string, password: string): any {
   let body = JSON.stringify({
     name: email,
     password: password
   });

   let headers = new Headers({ 'Content-Type': 'application/json'});
   let options = new RequestOptions({ headers: headers });

   return this.http
    .post('http://localhost:8080/api/signup', body, options)
    .map(this.extractData)
    .catch(this.extractError);
  }
}
