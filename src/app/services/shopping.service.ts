import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../class/admin/admin';
import { CartItem } from '../class/cartItem/cart-item';
import { Category } from '../class/Category/category';
import { Order } from '../class/order/order';
import { Product } from '../class/Product/product';
import { User } from '../class/User/user';

const httpOption = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  
  @Output() userAccount: EventEmitter<User> = new EventEmitter<User>(); 
  @Output() adminAccount: EventEmitter<Admin> = new EventEmitter<Admin>();
  @Output() CartItems: EventEmitter<number> = new EventEmitter<number>();
  @Output() searchProducts: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { 
  }

  sendUserAccount(user: User){
    this.userAccount.emit(user);  
  }

  getUserAccount(){
    return this.userAccount;
  }

  sendAdminAccount(admin: Admin){
    this.adminAccount.emit(admin);  
  }

  getAdminAccount(){
    return this.adminAccount;
  }

  sendUserCartItems(items: number){
    this.CartItems.emit(items);  
  }

  getUserCartItems(){
    return this.CartItems;
  }

  sendSearchProducts(products: any){
    this.searchProducts.emit(products);  
  }

  getSearchProducts(){
    return this.searchProducts;
  }

  createUserRegistration(user: User){
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:8086/shopping/signup', body, httpOption);
  }

  public loginUser(user: User):Observable<any>{
    return this.http.post("http://localhost:8086/shopping/login",user);
  }

  public getUser(email: string){
    return this.http.get('http://localhost:8086/shopping/user/' + email);
  }

  public editUser(user: User){
    return this.http.post("http://localhost:8086/shopping/updateUser",user);
  }

  public addCategory(category: Category){
    return this.http.post("http://localhost:8086/admin/addCategory",category);
  }

  public addProduct(product: Product){
    return this.http.post("http://localhost:8086/admin/addProduct",product);
  }

  public getCategory(category_name: string){
    return this.http.get('http://localhost:8086/admin/editCategory/' + category_name);
  }

  public editCategory(category: Category){
    return this.http.post("http://localhost:8086/admin/editCategory",category);
  }

  public getProduct(product_name: string){
    return this.http.get('http://localhost:8086/admin/editProduct/' + product_name);
  }

  public getRandomProduct(){
    return this.http.get('http://localhost:8086/shopping/randomproduct');
  }

  public editProduct(Product: Product){
    return this.http.post("http://localhost:8086/admin/editProduct",Product);
  }

  public deleteProduct(Product_name: string){
    return this.http.post("http://localhost:8086/admin/deleteProduct",Product_name);
  }

  public deleteCategory(category_name: string){
    return this.http.post("http://localhost:8086/admin/deleteCategory",category_name);
  }

  public getcartItem(email: string){
    return this.http.get("http://localhost:8086/shopping/cart/get/" + email);
  }

  public updateCartItem(cartItem: CartItem){
    return this.http.post("http://localhost:8086/shopping/cart/update", cartItem);
  }

  public addCartItem(cartItem: CartItem){
    return this.http.post("http://localhost:8086/shopping/cart/add", cartItem);
  }

  public CountCartItems(email: string){
    return this.http.get('http://localhost:8086/shopping/cart/counter/' + email);
  }

  public deleteCartItem(cartItemId: number){
    return this.http.get("http://localhost:8086/shopping/cart/delete/" + cartItemId);
  }

  public getCategories(){
    return this.http.get('http://localhost:8086/shopping/categories');
  }

  public getCategoryProduct(categoryname: number){
    return this.http.get('http://localhost:8086/shopping/getCategoryProducts/' + categoryname);
  }

  public loginAdmin(adminUser: Admin){
    return this.http.post("http://localhost:8086/admin/login",adminUser);

  }

  public searchForProducts(text: string){
    return this.http.get('http://localhost:8086/shopping/search/' + text);
  }

  public addOrder(order: Order){
    return this.http.post("http://localhost:8086/shopping/confirmOrder", order);
  }

  
}