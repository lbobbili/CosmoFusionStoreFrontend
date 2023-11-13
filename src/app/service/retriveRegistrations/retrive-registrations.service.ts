import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorDetails } from 'src/app/models/vendor.details.model';

@Injectable({
  providedIn: 'root'
})
export class RetriveRegistrationsService {

  constructor(private http: HttpClient) { }

  retriveByStatus(statusRequest : any){

    return this.http.get<VendorDetails>("http://localhost:8080/vendor/registrations/"+statusRequest);

  }
}
