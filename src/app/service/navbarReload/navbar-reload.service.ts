import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarReloadService {

  private reloadNavbarComponentSubject = new BehaviorSubject<void>(undefined);
  reloadNavbarComponent$ = this.reloadNavbarComponentSubject.asObservable();

  triggerReloadNavbar() {
    this.reloadNavbarComponentSubject.next();
  }

  constructor() { }
}
