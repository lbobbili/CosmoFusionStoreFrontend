import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { VendorDetails } from 'src/app/models/vendor.details.model';
import { ProductDetails } from 'src/app/models/vendor.product.details.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  vendorDetails: VendorDetails[] = [];
  vendorProductDetails: ProductDetails[] = [];
  showProductsToCustomer: ProductDetails[] = [];

  hasPendingSignupRequests: boolean = false;
  hasPendingProductRequests: boolean = false;
  hasApprovedProducts: boolean = false;

  ngOnInit(): void {
    let vendorDetailsString = localStorage.getItem('vendorDetails');
    if(vendorDetailsString != null) {
      let vendorDetailsParse = JSON.parse(vendorDetailsString);
      for(let i = 0; i < vendorDetailsParse.length; i++) {
        let vendor = vendorDetailsParse[i];
        if(vendor.status === "PENDING") {
          this.vendorDetails.push(vendor);
          this.hasPendingSignupRequests = true;
        }
      }
    }


    let vendorProductsString = localStorage.getItem('vendorSubmittedProduct');
    if(vendorProductsString != null) {
      let vendorProductsParse = JSON.parse(vendorProductsString);
      for(let i = 0; i < vendorProductsParse.length; i++) {
        let product = vendorProductsParse[i];
        if(product.status === "PENDING") {
          this.vendorProductDetails.push(product);
          this.hasPendingProductRequests = true;
        }
      }
    }

    let approvedProductsString = localStorage.getItem('vendorApprovedProducts');
    if(approvedProductsString != null) {
      let approvedProductsParse = JSON.parse(approvedProductsString);
      for(let i = 0; i < approvedProductsParse.length; i++) {
        let product = approvedProductsParse[i];
        if(product.status === "APPROVED") {
          this.showProductsToCustomer.push(product);
          this.hasApprovedProducts = true;
        }
      }
    }

  }

  onSignupReject(vendorName: string, index: number) {
    for(let i = 0; i < this.vendorDetails.length; i++) {
      let vendor = this.vendorDetails[i];
      if(vendor.vendorName === vendorName) {
        vendor.status = "REJECTED";
      }
    }
    localStorage.setItem('vendorDetails', JSON.stringify(this.vendorDetails));
    this.vendorDetails.splice(index, 1);
    let pendingStatuses = this.vendorDetails.filter((vendorDetails) => vendorDetails.status === "PENDING");
    if(pendingStatuses.length === 0) {
      this.hasPendingSignupRequests = false;
    }
  }


  onSignupApprove(vendorName: string, index: number) {
    for(let i = 0; i < this.vendorDetails.length; i++) {
      let vendor = this.vendorDetails[i];
      if(vendor.vendorName === vendorName) {
        vendor.status = "APPROVED";
      }
    }
    localStorage.setItem('vendorDetails', JSON.stringify(this.vendorDetails));
    this.vendorDetails.splice(index, 1);
    let pendingStatuses = this.vendorDetails.filter((vendorDetails) => vendorDetails.status === "PENDING");
    if(pendingStatuses.length === 0) {
      this.hasPendingSignupRequests = false;
    }
  }


  onProductReject(vendorName: string, productName: string, index: number) {
    for(let i = 0; i < this.vendorProductDetails.length; i++) {
      let product = this.vendorProductDetails[i];
      if(product.vendorName === vendorName && product.productName === productName) {
        product.status = "REJECTED";
        let vendorRejectedProductString = localStorage.getItem('vendorRejectedProducts');
        let rejectedProducts: ProductDetails[] = [];
        if(vendorRejectedProductString == null) {
          rejectedProducts = [product];
        } else {
          rejectedProducts = JSON.parse(vendorRejectedProductString);
          rejectedProducts.push(product);
        }
        localStorage.setItem('vendorRejectedProducts', JSON.stringify(rejectedProducts));
      }
    }
    this.vendorDetails.splice(index, 1);
    let pendingStatuses = this.vendorProductDetails.filter((productDetails) => productDetails.status === "PENDING");
    if(pendingStatuses.length === 0) {
      this.hasPendingProductRequests = false;
    }
  }


  onProductApprove(vendorName: string, productName: string, index: number) {
    for(let i = 0; i < this.vendorProductDetails.length; i++) {
      let product = this.vendorProductDetails[i];
      if(product.vendorName === vendorName && product.productName === productName) {
        product.status = "APPROVED";
        let vendorApprovedProductString = localStorage.getItem('vendorApprovedProducts');
        let approvedProducts: ProductDetails[] = [];
        if(vendorApprovedProductString == null) {
          approvedProducts = [product];
        } else {
          approvedProducts = JSON.parse(vendorApprovedProductString);
          approvedProducts.push(product);
        }
        localStorage.setItem('vendorApprovedProducts', JSON.stringify(approvedProducts));
      }
    }
    localStorage.setItem('vendorSubmittedProduct', JSON.stringify(this.vendorProductDetails));
    this.vendorProductDetails.splice(index, 1);
    let pendingStatuses = this.vendorProductDetails.filter((productDetails) => productDetails.status === "PENDING");
    if(pendingStatuses.length === 0) {
      this.hasPendingProductRequests = false;
    }
  }

  onProductShow(vendorName: string, productName: string, index: number) {
    for(let i = 0; i < this.showProductsToCustomer.length; i++) {
      let product = this.showProductsToCustomer[i];
      if(product.vendorName === vendorName && product.productName === productName && product.status === "APPROVED") {
        product.status = "SHOW_CUSTOMER";
      }
      let showProductsToCustomerString = localStorage.getItem('showProductsToCustomer');
      let showProductsToCustomer: ProductDetails[] = [];
      if(showProductsToCustomerString == null) {
        showProductsToCustomer = [product];
      } else {
        let showProductsToCustomerParse = JSON.parse(showProductsToCustomerString);
        showProductsToCustomerParse.push(product);
        showProductsToCustomer = showProductsToCustomerParse;
      }
      localStorage.setItem('showProductsToCustomer', JSON.stringify(showProductsToCustomer));
    }
    localStorage.setItem('vendorApprovedProducts', JSON.stringify(this.showProductsToCustomer));
    this.showProductsToCustomer.splice(index, 1);
    let approvedStatuses = this.showProductsToCustomer.filter((productDetails) => productDetails.status === "APPROVED");
    if(approvedStatuses.length === 0) {
      this.hasApprovedProducts = false;
    }
  }


}
