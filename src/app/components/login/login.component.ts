import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/service/login/login.service';
import { NavbarReloadService } from 'src/app/service/navbarReload/navbar-reload.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  isLoginSuccess : boolean = false;
  isAdminLogin :boolean = false;
  loginResponse: Login = {
   firstName : "",
   lastName : "",
   email:"",
   status:"",
   admin:false
  };

  isAccountPending : boolean = false;
  isAccountRejected : boolean = false;

  onLogin(loginForm:any) {
   this.login.login(loginForm.value).subscribe(response => {
    if(response.firstName!=null && !response.admin){
      this.isLoginSuccess = true;
      this.router.navigate(["/"]);
       localStorage.setItem("isLogin", "true");
       this.navbarReload.triggerReloadNavbar();
      
    } else{
      this.isLoginSuccess = false;
      this.router.navigate(["/admin-dashboard"]);
      localStorage.setItem("isLogin", "true");
      this.navbarReload.triggerReloadNavbar();
    }
    });
  }

  onAdminLogin(){
    this.isAdminLogin = true;
    this.router.navigate(["/login"]);

  }



   constructor(private login: LoginService, private router: Router, private navbarReload: NavbarReloadService){

  }

  // constructor(private router: Router, private navbarReload: NavbarReloadService) {
    
  // }

  // onLogin() {
  //   let isLogin = localStorage.getItem('isLogin');
  //   if(isLogin == null || isLogin === "false") {
  //     localStorage.setItem('isLogin', JSON.stringify(true));
  //     this.navbarReload.triggerReloadNavbar();
  //     this.router.navigate(["/"]);
  //   } else {
  //     this.navbarReload.triggerReloadNavbar();
  //     this.router.navigate(["/checkout"]);
  //   }
  // }

}
