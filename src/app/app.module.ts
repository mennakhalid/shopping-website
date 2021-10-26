import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { AdminComponent } from './admin/admin.component';
import { AddNewCategoryComponent } from './category/add-new-category/add-new-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { AddNewProductComponent } from './product/add-new-product/add-new-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ShoppingService } from './services/shopping.service';
import { CartComponent } from './cart/cart.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    CategoryComponent,
    AdminComponent,
    AddNewCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    DeleteProductComponent,
    AddNewProductComponent,
    EditProductComponent,
    CartComponent,
    UserInfoComponent,
    AdminSignInComponent,
    ProductDetailsComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
