import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../class/order/order';
import { User } from '../class/User/user';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [DatePipe]
})
export class CheckoutComponent implements OnInit {

  user = new User();
  userAccount : any;
  cartitems : any;
  products : any;
  totalPrice !: number;
  TempDate = new Date();
  orderDate : any;
  shippingDate : any;
  paymentMethod !: string;
  Message !: string;
  order = new Order();
  
  constructor(private shoppingService: ShoppingService, private router: Router, 
    private route: ActivatedRoute, private datePipe: DatePipe) { 
      const x = this.datePipe.transform(this.TempDate, 'yyyy-MM-dd');
      this.orderDate = x;
      this.TempDate.setDate(this.TempDate.getDate() + 10);
      this.shippingDate =this.datePipe.transform(this.TempDate, 'yyyy-MM-dd');
      console.log(this.orderDate);
    }

  ngOnInit(){

    this.user.email = this.route.snapshot.params['user'];
    this.shoppingService.getcartItem(this.user.email).subscribe(
      data => {
        this.cartitems = data;
        this.sum();
      }
    );

    this.shoppingService.getUserCartItems().subscribe(
      data => {
        this.cartitems = data;
        console.log(this.cartitems);
      }
    );

    this.shoppingService.getUser(this.user.email).subscribe(
      data => {
        this.userAccount = data;
      }
    );

    this.user = JSON.parse(localStorage.getItem("UserAccount") || '{}');
    //this.cartitems = JSON.parse(localStorage.getItem("TotalItems") || '{}');

  }

  counter(i: number) {
    return new Array(i);
  }

  sum(){
    this.totalPrice = 0;
    for(let i=0; i<this.cartitems.length; i++){
      this.totalPrice += (this.cartitems[i].quantity * this.cartitems[i].product.price);
    }

  }

  editAddress(){
    this.router.navigate(['userInfo/checkout',this.userAccount.email]);
  }

  checkOut(){
    
    if(this.paymentMethod == null){
      this.Message = " Please Fill all data"
    }else{

      this.Message ='';
      console.log(this.paymentMethod);
      this.order.order_date = this.orderDate;
      console.log(this.order.order_date);
      this.order.shipped_date = this.shippingDate;
      this.order.payment_type = this.paymentMethod;
      console.log(this.cartitems[0].user);
      this.order.user = this.cartitems[0].user;
      this.order.cartItems = this.cartitems;

      // console.log("cartitems");
      // console.log(this.order.cartItems);

      // console.log(this.order);
      this.shoppingService.addOrder(this.order).subscribe(

        data => {
          console.log("confirmed");
          confirm("Your order is confirmed 👍");

          for(let i=0;i<this.cartitems.length;i++){
            this.shoppingService.deleteCartItem(this.cartitems[i].id).subscribe(
              data => {

              }
            ); 
          }
          this.shoppingService.sendUserCartItems(0);
          localStorage.setItem("TotalItems", JSON.stringify(0));
          this.router.navigate(['']);
        },
        error => {
          console.log("error in confirmed ");
        }
      )
      
    }
  }

}
