import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarReloadService } from 'src/app/service/navbarReload/navbar-reload.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private navbarReload: NavbarReloadService) {
    
  }

  onLogin() {
    let isLogin = localStorage.getItem('isLogin');
    if(isLogin == null || isLogin === "false") {
      localStorage.setItem('isLogin', JSON.stringify(true));
      this.navbarReload.triggerReloadNavbar();
      this.router.navigate(["/"]);
    } else {
      this.navbarReload.triggerReloadNavbar();
      this.router.navigate(["/checkout"]);
    }
  }

}
