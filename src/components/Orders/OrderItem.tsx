import React, {useState} from 'react';
import Layout from "../Layout/Layout";
import {useHttpGet} from "../../api/use-http";
import {useParams} from "react-router-dom";
import {Order} from "../../models/orderModel";
import Spinner from "../UI/Spinner";
import BackButton from "../UI/BackButton";

const OrderItem = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const { id } = useParams<{id:string}>();

    const applyOrder = (orders: any) => setOrders(orders);

    const { loading, error } = useHttpGet(`orders`, applyOrder);

    const orderItem = orders.filter((order) => order.id.toString() === id);

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Order: #{id}</h1>
            <div className="card shadow p-4 mb-4">
                {!loading && <div className="row">
                    <p>Order Summary:</p>
                    <div className="table table-responsive">
                        <table className="table" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th><strong>#</strong></th>
                                <th>Product Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            </thead>

                            <tfoot>
                            <tr>
                                <th><strong>#</strong></th>
                                <th>Product Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            </tfoot>

                            <tbody>
                            {orderItem.map(order => order.order_items.map(orderItem => (
                                <tr key={orderItem.id}>
                                    <td>{orderItem.id}</td>
                                    <td>{orderItem.product_title}</td>
                                    <td>{orderItem.quantity}</td>
                                    <td>${orderItem.price}</td>
                                </tr>
                            )))}
                            </tbody>
                        </table>
                    </div>
                </div>}
                {loading && <Spinner />}
            </div>

            <BackButton />
        </Layout>
    );
};

export default OrderItem;