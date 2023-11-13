import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetails } from 'src/app/models/vendor.product.details.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  products: ProductDetails[] = [];
  displayProducts: boolean = false;

  constructor(private router: Router) {
    let product = localStorage.getItem("productsFromViewPage");
    if(product !== null) {
      this.displayProducts = true;
      let productArray = JSON.parse(product);
      this.products = productArray;
    }
  }

  onDelete(productName: string, brandName: string, index: number) {

    for(let i=0; i<this.products.length;i++){
      if(this.products[i].productName == productName && this.products[i].brandName == brandName){
        this.products.splice(i,1);
      }
    }

    if(this.products.length == 0){
      localStorage.removeItem('productsFromViewPage');
      this.displayProducts = false;
    }
    else localStorage.setItem('productsFromViewPage', JSON.stringify(this.products));
    
  }

  onProceedToCheckout() {
    let isCustomerLogin = localStorage.getItem('isLogin');
    if(isCustomerLogin == "false") this.router.navigate(["/login"]);
    else this.router.navigate(["/checkout"]);
  }

}
