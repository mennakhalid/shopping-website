import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/class/admin/admin';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  message = '';
  delProduct !: FormGroup;
  product_name !: string;
  admin = new Admin();
  
  constructor(private shoppingService: ShoppingService, private router: Router) { 

    this.admin = JSON.parse(localStorage.getItem("AdminAccount") || '{}');
    if(this.admin.email == null){
      this.router.navigate(['adminPage/login']);
    }
  }

  ngOnInit(): void {
  }

  deletProduct(){
    this.shoppingService.deleteProduct(this.product_name).subscribe(
      data => {
        this.message = '';
        // console.log("deleted successfully");
        confirm("Product deleted Successfully👍");
        this.router.navigate(['adminPage']);
      },

      error => {
        this.message = "Product doesn't found";
      }

    )
  }

}
