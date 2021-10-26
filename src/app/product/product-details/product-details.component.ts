import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/class/cartItem/cart-item';
import { User } from 'src/app/class/User/user';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product : any;
  user : any;
  cartItem = new CartItem();
  constructor(private shoppingService: ShoppingService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    console.log('i am in product details page ');
    const product_name = this.route.snapshot.params['name'];
    this.shoppingService.getProduct(product_name).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToUser(){

    this.user = this.shoppingService.getUserAccount();
    this.user = JSON.parse(localStorage.getItem("UserAccount") || '{}');

    if(this.user.email == null){
      this.router.navigate(['loginPage',this.product.name]); 
    }else{
      this.cartItem.quantity = 1;
      this.cartItem.user = this.user;
      this.cartItem.product = this.product;

      this.shoppingService.addCartItem(this.cartItem).subscribe(
        data => {
          this.shoppingService.CountCartItems(this.user.email).subscribe(
            data => {
              this.shoppingService.sendUserCartItems(+data);
              localStorage.setItem("TotalItems", JSON.stringify(+data));
            }
          );
        }
      )
    }
  }

}
