import { Admin } from "../admin/admin";

export class Category {
    id !: number;
    image !: string;
    name !: string;
    description !: string;
    admin !: Admin;
    constructor(){

    }
}
