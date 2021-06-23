import {OrderItemModel} from "./orderItemModel";

export class Order {
    filter(arg0: (order: any) => boolean) {
        throw new Error('Method not implemented.');
    }
    id!:number;
    first_name!:string;
    last_name!:string;
    email!:string;
    subscriber_sales!:number;
    order_items!: OrderItemModel[];
    orderItem!: any;
}