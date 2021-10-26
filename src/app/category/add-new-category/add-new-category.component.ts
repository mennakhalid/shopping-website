import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Admin } from 'src/app/class/admin/admin';
import { Category } from 'src/app/class/Category/category';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.css']
})
export class AddNewCategoryComponent implements OnInit {

  category = new Category();
  addNewCategoryForm !: FormGroup;
  temp !: string ;
  admin = new Admin();

  constructor(private shoppingService: ShoppingService, private router:Router) {

    this.admin = JSON.parse(localStorage.getItem("AdminAccount") || '{}');
    if(this.admin.email == null){
      this.router.navigate(['adminPage/login']);
    }
   }

  ngOnInit(){

  }

  addNewCategory(){
    this.temp = this.category.description.toString();
    this.category.description = this.temp;
    this.category.admin = this.admin;
    this.category.admin.email = this.admin.email;
    this.category.admin.password = this.admin.password;
    
    this.shoppingService.addCategory(this.category).subscribe(
      data => {
        console.log("response recieved");
      },
      error => {
        console.log("Exception occured");
      },
    );
  }

  goBack(){
    this.addNewCategory();
    confirm("Category added Successfully👍");
    this.router.navigate(['adminPage']);
  }


}
