import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarReloadService } from 'src/app/service/navbarReload/navbar-reload.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private reloadSubscription: Subscription | undefined;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private navbarReload: NavbarReloadService) {
    this.reloadSubscription = this.navbarReload.reloadNavbarComponent$.subscribe(() => {
      let isCustomerLogin = localStorage.getItem('isLogin');
      if (isCustomerLogin == "true") this.isLoggedIn = true;
    });
  }

  onLogout() {
    localStorage.removeItem('isLogin');
    this.isLoggedIn = false;
    this.router.navigate(["/login"]);
  }

}
