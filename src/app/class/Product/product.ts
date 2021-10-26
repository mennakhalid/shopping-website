import { Category } from "../Category/category";

export class Product{
    id !: number;
    name !: string;
    image !: string;
    price !: number;
    quantity !: number;
    description !: string;
    category !: Category;
    constructor(){
    }

}
