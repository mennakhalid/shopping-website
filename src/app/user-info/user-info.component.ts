import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../class/User/user';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  editForm !: FormGroup;
  user !: any;
  email !: string;
  
  constructor(private shoppingService: ShoppingService, 
    private router: Router, private route: ActivatedRoute) {
   }

  
  ngOnInit(){
    this.email = this.route.snapshot.params['email'];
    this.shoppingService.getUser(this.email).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      }
    );
  }

  edit(){
    this.shoppingService.editUser(this.user).subscribe(
      data => {
        const loc = location.pathname.split('/');
        if(loc[2] == "checkout") {
          this.router.navigate(['cart',this.email,'checkout']);
        }else{
          this.router.navigate(['']);
        }
        
      }
    )
  }

}
