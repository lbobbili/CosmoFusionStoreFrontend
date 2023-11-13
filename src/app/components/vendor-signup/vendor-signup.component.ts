import { Component } from '@angular/core';
import { VendorDetails } from 'src/app/models/vendor.details.model';
import { VendorSignupService } from 'src/app/service/vendorSignup/vendor-signup.service';

@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.css']
})
export class VendorSignupComponent {

  isSuccessful: boolean = false;

  constructor(private vendorSignup : VendorSignupService){
    
  }

  submit(signupForm: any) {
    let signupFormDetails = signupForm.value;
    if(signupFormDetails !== null) {
      signupFormDetails['status'] = 'PENDING';
    }
    this.vendorSignup.postSignupDetails(signupFormDetails).subscribe(response => {

      if(response.status != null && response.status == "sucess"){
        this.isSuccessful = true;
      }
    });
    
    
    // let vendorArray: VendorDetails[];

    // let vendorDetailsString = localStorage.getItem('vendorDetails');
    // if(vendorDetailsString !== null) {
    //   let vendorDetailsFromLocalStorage = JSON.parse(vendorDetailsString);
    //   vendorDetailsFromLocalStorage.push(signupFormDetails);
    //   localStorage.setItem('vendorDetails', JSON.stringify(vendorDetailsFromLocalStorage));
    // } else {
    //   vendorArray = [signupFormDetails];
    //   localStorage.setItem('vendorDetails', JSON.stringify(vendorArray));
    // }
    
  }

}
