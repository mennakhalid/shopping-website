import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../class/admin/admin';
import { User } from '../class/User/user';
import { ShoppingService } from '../services/shopping.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userSend = new User();
  adminUser = new Admin();
  cartitems !: any;
  userCheck = false;
  adminCheck = false;
  search_text !: string;
  
  constructor(private shoppingService: ShoppingService, private router: Router, private activatedRoute: ActivatedRoute ) {
  }

  ngOnInit(){
    this.userLogin();
    this.adminLogin();
    this.apper();
  }

  apper(){
    const loc = location.pathname.split('/');
    if(loc[1] == 'adminPage'){
      this.userCheck = false;
      this.adminCheck = true;
    }else{
      this.userCheck = true;
      this.adminCheck = false;
    }

  }

  userLogin(){

    this.shoppingService.getUserAccount().subscribe(
      data => {
        this.userSend = data;
      }
    );

    this.shoppingService.getUserCartItems().subscribe(
      data => {
        this.cartitems = data;
      },
      error => {
        console.log("can't get cart items ");
      }
    );
    console.log("cart items : " + this.cartitems);
    this.userSend = JSON.parse(localStorage.getItem("UserAccount") || '{}');
    this.cartitems = JSON.parse(localStorage.getItem("TotalItems") || '{}');
  }

  adminLogin(){
    
    this.shoppingService.getAdminAccount().subscribe(
      data => {
        this.adminUser = data;
      }
    );

    this.shoppingService.getUserCartItems().subscribe(
      data => {
        this.cartitems = data;
      },
      error => {
        console.log("can't get cart items ");
      }
    );
    
    this.adminUser = JSON.parse(localStorage.getItem("AdminAccount") || '{}');
    this.cartitems = JSON.parse(localStorage.getItem("TotalItems") || '{}');
    console.log(this.adminUser);
  }

  adminLogout(){
    localStorage.removeItem('AdminAccount');
    localStorage.removeItem('TotalItems');
    this.adminUser = new Admin();
    this.cartitems = 0;
  }

  userLogout(){
    localStorage.removeItem('UserAccount');
    localStorage.removeItem('TotalItems');
    this.shoppingService.sendUserCartItems(0);
    this.cartitems = 0;
    this.userSend = new User();
    this.router.navigate(['']);
  }

  search(){
    this.shoppingService.searchForProducts(this.search_text).subscribe(
      data => {
        this.shoppingService.sendSearchProducts(data);
        console.log(data);
        localStorage.setItem("SearchProducts", JSON.stringify(data));
        this.router.navigate(['category'])
      }

    );
  }

}
