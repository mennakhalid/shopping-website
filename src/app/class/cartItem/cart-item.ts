import { Product } from "../Product/product";
import { User } from "../User/user";

export class CartItem {

    id !: number;
    quantity !: number;
    product !: Product;
    user !: User;

    constructor(){
        
    }
}
