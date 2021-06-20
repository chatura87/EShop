
import { OrderProduct } from "./order/order-product";
import { User } from "./user/user";


export interface Cart {
    id: number;
    user: User;
    products: OrderProduct[];
}