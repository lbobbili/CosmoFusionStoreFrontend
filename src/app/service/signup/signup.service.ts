import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupResponse } from 'src/app/models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) {

  }

  postSignupDetails(signupRequest : any){

   return this.http.post<SignupResponse>("http://localhost:8080/user/registration", signupRequest);
  }
}
