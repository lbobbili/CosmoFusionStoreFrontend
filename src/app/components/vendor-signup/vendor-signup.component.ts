import { Component } from '@angular/core';
import { VendorDetails } from 'src/app/models/vendor.details.model';

@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.css']
})
export class VendorSignupComponent {

  isSuccessful: boolean = false;

  submit(signupForm: any) {
    let signupFormDetails = signupForm.value;
    if(signupFormDetails !== null) {
      signupFormDetails['status'] = 'PENDING';
    }
    let vendorArray: VendorDetails[];

    let vendorDetailsString = localStorage.getItem('vendorDetails');
    if(vendorDetailsString !== null) {
      let vendorDetailsFromLocalStorage = JSON.parse(vendorDetailsString);
      vendorDetailsFromLocalStorage.push(signupFormDetails);
      localStorage.setItem('vendorDetails', JSON.stringify(vendorDetailsFromLocalStorage));
    } else {
      vendorArray = [signupFormDetails];
      localStorage.setItem('vendorDetails', JSON.stringify(vendorArray));
    }
    this.isSuccessful = true;
  }

}
