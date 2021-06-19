import {UserRole} from "src/app/enums/user-role";
import {Order} from "../order/order";
import {Name} from "./name";


export interface User {
  id: number;
  name: Name;
  phone: string;
  avatar: string;
  email: string;
  orders: Order[];
  role: UserRole;

};
