import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'src/app/models/common-response.model';

@Injectable({
  providedIn: 'root'
})
export class SubmitProductsService {

  constructor(private http:HttpClient) { 

  }
  postProducts(productForm : any){
    console.log(productForm);

    return this.http.post<CommonResponse>("http://localhost:8080/products/upload", productForm);

  }
}
