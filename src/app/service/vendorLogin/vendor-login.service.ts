import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorDetails } from 'src/app/models/vendor.details.model';

@Injectable({
  providedIn: 'root'
})
export class VendorLoginService {

  constructor(private http:HttpClient) { }

  vendorlogin(loginForm:any){
    return this.http.post<VendorDetails>("http://localhost:8080/vendor/authenticate", loginForm);

  }
}
