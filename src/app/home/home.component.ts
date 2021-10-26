import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { CartItem } from '../class/cartItem/cart-item';
import { Product } from '../class/Product/product';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories : any;
  products !: any;
  user : any;
  cartItem = new CartItem();

  // photos = [
  //   "https://www.perma-horti.com/wp-content/uploads/2019/02/image-2.jpg",
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtAJjS3dkKrU2ppo0ZnveZ78hh3OnPepMbpdtq1ZI77DCrO-KvDeL1K3JFI0ssTOJqmbc&usqp=CAU",
  //   "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"
  // ];

  // categoryNames = [
  //   "Fruits",
  //   "Vegitables",
  //   "Sweets"
  // ];
  
  constructor(private shoppingService: ShoppingService, private router:Router) {
    // console.log('home page');
   }

  ngOnInit(){
    this.shoppingService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    );

    this.shoppingService.getRandomProduct().subscribe(
      data => {
        this.products = data;
        console.log("get products successfully");
      }
    )
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
