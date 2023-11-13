import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorDetails } from 'src/app/models/vendor.details.model';
import { NavbarReloadService } from 'src/app/service/navbarReload/navbar-reload.service';
import { VendorLoginService } from 'src/app/service/vendorLogin/vendor-login.service';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.css']
})
export class VendorLoginComponent {

  isLoginSuccess : boolean = false;
  vendorResponse: VendorDetails = {
    brandName: "",
    email: "",
    password: "",
    phoneNumber: "",
    status: "",
    vendorCompany: "",
    vendorDetails: "",
    vendorName: "",
    vendorId: 0
  };

  isAccountPending : boolean = false;
  isAccountRejected : boolean = false;

  onLogin(loginForm:any) {
   this.vendorLogin.vendorlogin(loginForm.value).subscribe(response => {
    if(response.vendorId!=null){
      this.isLoginSuccess = true;
      if(response.status == 'PENDING'){
        this.isAccountPending = true;
      }else if(response.status == 'REJECTED'){
        this.isAccountRejected = true
      }else{
        localStorage.setItem('isLogin', 'true');
        this.navbarReload.triggerReloadNavbar();
         this.router.navigate(["/vendor-dashboard"]);
        
      }
      

    } 
    this.vendorResponse = response;
    localStorage.setItem("vendor-details", JSON.stringify(this.vendorResponse));
    });
  }

  constructor(private vendorLogin: VendorLoginService, private router: Router, private navbarReload: NavbarReloadService){

  }

}

