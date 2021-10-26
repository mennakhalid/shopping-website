import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { AddNewCategoryComponent } from './category/add-new-category/add-new-category.component';
import { CategoryComponent } from './category/category.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddNewProductComponent } from './product/add-new-product/add-new-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "headerPage", component: HeaderComponent},
  {path: "loginPage", component: SigninComponent},
  {path: "loginPage/:name", component: SigninComponent},
  {path: "signup", component: SignupComponent},
  {path: "userInfo/:email", component: UserInfoComponent},
  {path: "userInfo/checkout/:email", component: UserInfoComponent},
  {path: "cart/:user/checkout", component: CheckoutComponent},
  {path:"cart/:email", component:CartComponent},
  {path:"category", component:CategoryComponent},
  {path:"category/:name", component:CategoryComponent},
  {path:"productDetails/:name", component:ProductDetailsComponent},
  

  {path: "adminPage", component: AdminComponent},
  {path: "adminPage/login", component: AdminSignInComponent},
  {path: "adminPage/addNewCategory", component: AddNewCategoryComponent},
  {path:"adminPage/editCategory", component:EditCategoryComponent},
  {path:"adminPage/deleteCategory", component:DeleteCategoryComponent},
  {path:"adminPage/deleteProduct", component:DeleteProductComponent},
  {path:"adminPage/addNewProduct", component:AddNewProductComponent},
  {path:"adminPage/editProduct", component:EditProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
