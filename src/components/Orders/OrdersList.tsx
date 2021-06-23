import React, {useState} from 'react';
import {Order} from "../../models/orderModel";
import { Link } from 'react-router-dom';

const OrdersList = (props: {orders: Order[]}) => {

    return (
        <>
            {props.orders.map(order => (
                <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.first_name}</td>
                    <td>{order.last_name}</td>
                    <td>{order.email}</td>
                    <td>${order.subscriber_sales.toFixed(2)}</td>
                    <td><Link to={`/orders/${order.id}/order`} className="btn btn-info btn-sm">View</Link></td>
                </tr>
            ))}
        </>
    );
};

export default OrdersList;