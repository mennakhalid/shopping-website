import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/class/admin/admin';
import { Product } from 'src/app/class/Product/product';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  Message = '';
  product : any;
  product_name !: string;
  apper = false;
  admin = new Admin();
  
  constructor(private shoppingService: ShoppingService, private router: Router) { 

    this.admin = JSON.parse(localStorage.getItem("AdminAccount") || '{}');
    if(this.admin.email == null){
      this.router.navigate(['adminPage/login']);
    }
  }

  ngOnInit(): void {
  }

  checkAvailable(){

    console.log(this.product_name);
    this.product = this.shoppingService.getProduct(this.product_name).subscribe(
  
      data => {
        this.product = data;
        this.apper = true;
        this.Message = '';
      },
      error => {
        this.Message = "This Product not Found!"
        console.log(this.product);
      }

    )
  }

  EditProduct(){

    this.shoppingService.editProduct(this.product).subscribe(
      data => {
        confirm("Product edited Successfully👍");
        this.router.navigate(['adminPage']);

      },
      error => {
        this.Message = " Updating Failed!!"
      }

    );
  }

}
