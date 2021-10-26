import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { User } from '../class/User/user';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  signUpForm !: FormGroup;
  validMessage = '';
  user !: any;

  constructor(private shoppingService: ShoppingService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      birthday: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      gender: new FormControl()
    });
  }

  submitRegistration(){

    if(this.signUpForm.valid){
      this.validMessage = "Your registration has been submitted. Thank you!"
      this.shoppingService.createUserRegistration(this.signUpForm.value).subscribe(
        data => {
          this.user = data;
          this.signUpForm.reset();
          this.shoppingService.sendUserAccount(this.user);
          localStorage.setItem("UserAccount", JSON.stringify(this.user));
          this.router.navigateByUrl('/headerPage').then(() => {
            this.router.navigate(['']);
          }); 
        },
        error => {
          console.error(error);
          return throwError(error);
        }
      )
    } else{
      this.validMessage = "Please fill out the form before submitting";
    }
  }

}



        
        