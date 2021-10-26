import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../class/admin/admin';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminUser =new Admin();

  constructor(private shoppingService: ShoppingService, private router:Router) {
    
    this.adminUser = JSON.parse(localStorage.getItem("AdminAccount") || '{}');
    if(this.adminUser.email == null){
      this.router.navigate(['adminPage/login']);
    }
   }

  ngOnInit(): void {
    
  }

}
