import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorSignupResponse } from 'src/app/models/vendorSignup.model';

@Injectable({
  providedIn: 'root'
})
export class VendorSignupService {

  constructor(private http:HttpClient) {

   }

   postSignupDetails(signupRequest : any){

    return this.http.post<VendorSignupResponse>("http://localhost:8080/vendor/registration", signupRequest);
   }
}
