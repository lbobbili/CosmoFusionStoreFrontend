import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetails } from 'src/app/models/vendor.product.details.model';
import { RetriveProductStatusService } from 'src/app/service/retriveProductStatus/retrive-product-status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails: ProductDetails[]=[];
  productBrands: string[] = [];
  filteredProducts : ProductDetails[] = [];  
  selectedCategory: string = 'All';

  constructor(private router: Router, private retrieveProductStatus : RetriveProductStatusService) {
    let isCustomerLoggedIn = localStorage.getItem('isLogin');
    if(isCustomerLoggedIn == null) localStorage.setItem('isLogin', JSON.stringify(false));
  }

  ngOnInit(): void {

    this.retrieveProductStatus.retriveProductStatus("ADD_TO_CUSTOMER_VIEW").subscribe(response => {
      this.productDetails = response;
      console.log(this.productDetails);
      let brands = new Set<any>();
      for(let i=0;i<this.productDetails.length;i++){
        brands.add(this.productDetails[i].brandName);
       let brandNameFromApi =  this.productDetails[i].brandName.charAt(0).toUpperCase() + this.productDetails[i].brandName.slice(1).toLowerCase();
       let productCategoryFromApi = this.productDetails[i].productCategory.toLowerCase();
       let productImageFromApi = this.productDetails[i].productImage;
       this.productDetails[i].productImage = "../../assets/"+brandNameFromApi+"/"+productCategoryFromApi+"/"+productImageFromApi;
       console.log(this.productDetails[i].productImage);
      }
      this.productBrands = [...brands];



    })
    
  }

  onClick(product: ProductDetails) {
    localStorage.setItem('homeSelectedProduct', JSON.stringify(product));
    this.router.navigate(["/view-product"]);
  }

  onCategoryClick(category : string){

    this.selectedCategory = category;

    if(category!=null){
      let filteredProducts = this.productDetails.filter((product) => product.brandName == category);
      this.filteredProducts = filteredProducts;
    
    }
  }

  onAllCategoryClick(){
    this.selectedCategory = 'All';
    this.retrieveProductStatus.retriveProductStatus("ADD_TO_CUSTOMER_VIEW").subscribe(response => {
      this.productDetails = response;
      this.filteredProducts = [];
    });
  }

}
