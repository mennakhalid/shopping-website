import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../class/User/user';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartUserItems : any;
  user = new User();
  totalPrice = 0;
  totalItems = 0;

  constructor(private shoppingService: ShoppingService, private route: ActivatedRoute,
    private router: Router) {

   }
    

  ngOnInit(){

    this.user.email = this.route.snapshot.params['email'];
    this.shoppingService.getcartItem(this.user.email).subscribe(

      data => {
        this.cartUserItems = data;
        this.sum();
        this.shoppingService.CountCartItems(this.user.email).subscribe(
          data => {
            this.shoppingService.sendUserCartItems(+data);
            localStorage.setItem("TotalItems", JSON.stringify(+data));
          }
        );
      }
    );
  }

  deleteProduct(id: number){

    this.cartUserItems.splice(id-1, 1);
    this.shoppingService.deleteCartItem(id).subscribe(
      data => {
        this.ngOnInit();
      }
    );
    
  }

  sum(){
    this.totalItems = 0;
    this.totalPrice = 0;
    for(let i=0; i<this.cartUserItems.length; i++){
      this.totalPrice += (this.cartUserItems[i].quantity * this.cartUserItems[i].product.price);
      this.totalItems += this.cartUserItems[i].quantity * 1;
    }

    this.shoppingService.sendUserCartItems(this.totalItems);
    localStorage.setItem("TotalItems", JSON.stringify(this.totalItems));
  }

  onChange(event: any,id: number){
    this.cartUserItems[id].quantity = event.target.value;
    this.shoppingService.updateCartItem(this.cartUserItems[id]).subscribe(
      data => {
        this.sum();
      }
    );
    
  }

  counter(i: number) {
    return new Array(i);
  }

checkOut(){
  this.router.navigate(['cart',this.user.email,'checkout']);
}

}

