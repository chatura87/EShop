import { OrderProduct } from "./order-product";


export interface Order {
    id: number;
    products: OrderProduct[];
}