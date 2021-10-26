import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../class/cartItem/cart-item';
import { Product } from '../class/Product/product';
import { User } from '../class/User/user';
import { ShoppingService } from '../services/shopping.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = new User();
  cartItem = new CartItem();
  product : any;
  product_name !: string;

  constructor(private shoppingService: ShoppingService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.product_name = this.route.snapshot.params['name'];
  }

  loginUser(){

    this.shoppingService.loginUser(this.user).subscribe(
      data => {
        this.shoppingService.sendUserAccount(this.user);
  
        localStorage.setItem("UserAccount", JSON.stringify(this.user));
        this.router.navigateByUrl('/headerPage').then(() => {
          this.router.navigate(['']);
        }); 
      }
    );

    this.addProductToUser();
    this.selectCartItems();
    
  }

  addProductToUser(){
    if(this.product_name != null && this.user != null){
      this.cartItem.user = this.user;
      this.cartItem.quantity = 1;
      this.shoppingService.getProduct(this.product_name).subscribe(
        data => {
          
          this.product =data;
          this.cartItem.product = this.product;
          this.shoppingService.addCartItem(this.cartItem).subscribe(
            data => {
              this.selectCartItems();
            }
          );
        }
      );  
    }
  }

  selectCartItems(){
    if(this.user != null){
      this.shoppingService.CountCartItems(this.user.email).subscribe(
        data => {
          this.shoppingService.sendUserCartItems(+data);
          localStorage.setItem("TotalItems", JSON.stringify(+data));
        }
      );
    }
  }
}
