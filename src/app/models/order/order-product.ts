import { Product } from "../product";


export interface OrderProduct {
    product: Product;
    quantity: number;
}