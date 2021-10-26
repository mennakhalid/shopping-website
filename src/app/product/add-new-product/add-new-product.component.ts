import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/class/admin/admin';
import { Category } from 'src/app/class/Category/category';
import { Product } from 'src/app/class/Product/product';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  validMessage = '';
  product = new Product();
  categoryName !: string;
  admin = new Admin();
  constructor(private shoppingService: ShoppingService, private router: Router) { 

    this.admin = JSON.parse(localStorage.getItem("AdminAccount") || '{}');
    if(this.admin.email == null){
      this.router.navigate(['adminPage/login']);
    }
  }

  ngOnInit(): void {
  }

  addNewProduct(){
    this.product.category = new Category();
    this.product.category.name = this.categoryName;
    this.shoppingService.addProduct(this.product).subscribe(

      data => {
        this.validMessage='';
        confirm("Product added Successfully👍");
        this.router.navigate(['adminPage']);
      },

      error => {
        this.validMessage = "Some Field have Wrong Value or Empty";
      }
    );
  }
}
