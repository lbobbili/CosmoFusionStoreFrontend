import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'src/app/models/common-response.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateRegistrationStatusService {

  constructor(private http: HttpClient) { }

  updateStatus(updateRequest : any){
    return this.http.put<CommonResponse>("http://localhost:8080/vendor/registration/status", updateRequest);
  }

  updateProductStatus(updateRequest : any){
    return this.http.put<CommonResponse>("http://localhost:8080/products/status", updateRequest);
  }
}
