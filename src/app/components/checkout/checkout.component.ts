import { Component } from '@angular/core';
import { ProductDetails } from 'src/app/models/vendor.product.details.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  products: ProductDetails[] = [];
  placeOrder: boolean = false;

  constructor() {
    let product = localStorage.getItem("productsFromViewPage");
    if(product !== null) {
      let productArray = JSON.parse(product);
      this.products = productArray;
    }
  }

  onConfirmation() {
    this.placeOrder = true;
    localStorage.removeItem('productsFromViewPage');
  }

}
