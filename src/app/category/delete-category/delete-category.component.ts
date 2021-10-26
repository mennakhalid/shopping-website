import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/class/admin/admin';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  message = '';
  delCategory !: FormGroup;
  Category : any;
  category_name !: string;
  admin = new Admin();
  
  constructor(private shoppingService: ShoppingService, private router:Router) {

    this.admin = JSON.parse(localStorage.getItem("AdminAccount") || '{}');
    if(this.admin.email == null){
      this.router.navigate(['adminPage/login']);
    }
   }

  ngOnInit(): void {
  }

  deleteCategory(){
    this.shoppingService.deleteCategory(this.category_name).subscribe(
      data => {
        confirm("Category deleted Successfully👍");
        this.router.navigate(['adminPage']);
      },
      error => {
        this.message = "Category doesn't exist";
      }
    )
  }
}
