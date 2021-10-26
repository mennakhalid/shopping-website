import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/class/admin/admin';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.css']
})
export class AdminSignInComponent implements OnInit {

  admin = new Admin();
  constructor(private shoppingService: ShoppingService, private router: Router) { }

  ngOnInit(): void {
  }

  loginAdmin(){

    console.log(this.admin);
    this.shoppingService.loginAdmin(this.admin).subscribe(
      data => {
        
        this.shoppingService.sendAdminAccount(this.admin);
        localStorage.setItem("AdminAccount", JSON.stringify(this.admin));
        this.router.navigateByUrl('/headerPage').then(() => {
          this.router.navigate(['adminPage']);
        });
      },
      error => {
        console.log("Exception occured");
      },
    );
  }
}
