import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(loginForm:any){
    return this.http.post<Login>("http://localhost:8080/user/authenticate", loginForm);

  }
}
