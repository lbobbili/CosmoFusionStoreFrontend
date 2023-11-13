import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarReloadService } from 'src/app/service/navbarReload/navbar-reload.service';
import { SignupService } from 'src/app/service/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  

  constructor(private signup : SignupService, private router: Router, private navbarReload: NavbarReloadService){
    
  }

  submit(signupForm: any) {
    let signupFormDetails = signupForm.value;
    if(signupFormDetails !== null) {
      signupFormDetails['status'] = 'PENDING';
    }
    this.signup.postSignupDetails(signupFormDetails).subscribe(response => {

      console.log(response)
      if(response.firstName != null && response.email != null){
        localStorage.setItem('isLogin', 'true');
        this.navbarReload.triggerReloadNavbar();
        this.router.navigate(["/"]);
        
      }
    });
    
  }
}
