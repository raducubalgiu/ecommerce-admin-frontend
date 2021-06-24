import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import {Order} from "../models/orderModel";
import {useHttpGet} from "../api/use-http";
import OrdersList from "../components/Orders/OrdersList";
import Spinner from "../components/UI/Spinner";
import SearchSort from "../components/UI/SearchSort";
import {Link} from "react-router-dom";
import { setupMaster } from 'cluster';

const Orders = () => {
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [filters, setFilters] = useState({
        s: '',
        sort: true
    });

    const applyOrders = (data: any) => {
        setAllOrders(data);
        setFilteredOrders(data);
    }

    const { loading, error } = useHttpGet('orders', applyOrders);

    useEffect(() => {
        let orders = allOrders.filter(order => order.first_name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
            order.last_name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
        );

        if(filters.sort === true) {
            orders.sort((a, b) => {
                if(a.id > b.id) {
                    return -1;
                }
                if(a.id < b.id) {
                    return 1;
                }

                return 0;
            })
        } else if(filters.sort === false) {
            orders.sort((a, b) => {
                if(a.id > b.id) {
                    return 1;
                }
                if(a.id < b.id) {
                    return -1;
                }

                return 0;
            })
        }

        setFilteredOrders(orders);

    }, [filters]);

    let total_revenue = 0;
    allOrders.map(order => (
        total_revenue += order.subscriber_sales
    ));

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Orders</h1>
            <div className="card shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <SearchSort
                        items={filteredOrders}
                        filters={filters}
                        setFilters={setFilters}
                        placeholder="Search order..."
                    />

                    <div className="overview">
                        <p className="mb-3">Total Orders: <strong>{allOrders.length}</strong></p>
                        <p className="mb-3">Orders Revenue: <strong>${new Intl.NumberFormat().format(total_revenue)}</strong></p>
                    </div>
                </div>

                {!loading &&
                <div className="row">
                    <p className="mb-3">Results: <strong>{filteredOrders.length}</strong></p>
                    <div className="table table-responsive">
                        <table className="table" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th><strong>#</strong></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Total Amount</th>
                                <th>View</th>
                            </tr>
                            </thead>

                            <tfoot>
                            <tr>
                                <th><strong>#</strong></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Total Amount</th>
                                <th>View</th>
                            </tr>
                            </tfoot>

                            <tbody>
                                <OrdersList
                                    orders={filteredOrders}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>}
                {loading && <Spinner />}
            </div>
        </Layout>
    );
};

export default Orders;