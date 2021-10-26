import { CartItem } from "../cartItem/cart-item";
import { Product } from "../Product/product";
import { User } from "../User/user";

export class Order {

    id !: number;
    order_date !: string;
    shipped_date !: string;
    payment_type !: string;
    user !: User;
    cartItems !: CartItem[];

    constructor(){}
}
