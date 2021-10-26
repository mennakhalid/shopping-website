import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/class/admin/admin';
import { Category } from 'src/app/class/Category/category';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  apper = false;
  editCategory !: FormGroup;
  category : any;
  category_name !: string;
  Message = '';

  admin = new Admin();

  constructor(private shoppingService: ShoppingService, private router:Router) {
    this.admin = JSON.parse(localStorage.getItem("AdminAccount") || '{}');
    if(this.admin.email == null){
      this.router.navigate(['adminPage/login']);
    }
   }

  ngOnInit(){
  }

  checkAvailable(){

    this.category = this.shoppingService.getCategory(this.category_name).subscribe(

      data => {
        this.category = data;
        this.apper = true;
        this.Message = '';
        console.log(this.category.name);
        console.log(this.category.description);
        console.log(this.category.id);
      },
      error => {
        this.Message = "This Category not Found!"
      }

    )
  }

  EditCategory(){

    const cat = new Category();
    cat.id = this.category.id;
    cat.name = this.category.name;
    cat.description = this.category.description;
    cat.image = this.category.image;
    this.shoppingService.editCategory(cat).subscribe(
      data => {

        confirm("Category edited Successfully👍");
        this.router.navigate(['adminPage']);

      },
      error => {
        this.Message = " Updating Failed!!"
      }

    );
  }

}
