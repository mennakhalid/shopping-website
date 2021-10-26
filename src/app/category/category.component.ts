import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../class/cartItem/cart-item';
import { Product } from '../class/Product/product';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products : any;
  user : any;
  cartItem = new CartItem();
  categoryname !: number;
  show = false;
  
  constructor(private shoppingService:ShoppingService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(){

    this.categoryname = this.route.snapshot.params['name'];
    if(this.categoryname != null){

      this.shoppingService.getCategoryProduct(this.categoryname).subscribe(
      data => {
        this.products = data;
        if(this.products.length > 0){
          this.show = true;
        }
        
      });

      }else{
          this.shoppingService.getSearchProducts().subscribe(
            data => {
              this.products = data;
              //console.log(this.products);
              this.show = true;
            }
          );
          this.products = JSON.parse(localStorage.getItem("SearchProducts") || '{}');
          //console.log(this.products);
          localStorage.removeItem('SearchProducts');
        }
    
  }

  addToUser(index: number){
    this.user = this.shoppingService.getUserAccount();
    this.user = JSON.parse(localStorage.getItem("UserAccount") || '{}');

    if(this.user.email == null){
      this.router.navigate(['loginPage',this.products[index].name]);
    }else{
      this.cartItem.quantity = 1;
      this.cartItem.user = this.user;
      this.cartItem.product = this.products[index];

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

  openDetailsPage(product: Product){
    this.router.navigate(['productDetails',product])
  }
}
