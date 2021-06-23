import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import Pagination from "../components/UI/Pagination";
import {useHttpGet} from "../api/use-http";
import {User} from "../models/userModel";
import UsersList from "../components/Users/UsersList";
import Spinner from "../components/UI/Spinner";
import SearchSort from "../components/UI/SearchSort";

const Users = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [filters, setFilters] = useState({
       s: '',
       sort: true
    });

    const applyUsers = (data: User[]) => {
        setAllUsers(data);
        setFilteredUsers(data);
    }

    const { error, loading } = useHttpGet('subscribers', applyUsers);

    useEffect(() => {
        let users = allUsers.filter(user => user.first_name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
             user.last_name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
        )

        if(filters.sort === true) {
            users.sort((a, b) => {
                if(a.id > b.id) {
                    return -1;
                }
                if(a.id < b.id) {
                    return 1;
                }

                return 0;
            })
        } else if(filters.sort === false) {
            users.sort((a, b) => {
                if(a.id > b.id) {
                    return 1;
                }
                if(a.id < b.id) {
                    return -1;
                }

                return 0;

            })
        }

        setFilteredUsers(users);
    }, [filters]);

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Users</h1>
            <div className="card shadow p-4">
                {/* Display users */}
                {!loading && <div className="card-content">
                    <div className="row">
                        <SearchSort
                            items={filteredUsers}
                            filters={filters}
                            setFilters={setFilters}
                            placeholder="Search user..."
                        />

                        <p className="mb-3 mt-3">Results: <strong>{filteredUsers.length}</strong></p>
                        <div className="table table-responsive">
                            <table className="table" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th><strong>#</strong></th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Created_at</th>
                                        <th>Total Orders</th>
                                    </tr>
                                </thead>

                                <tfoot>
                                    <tr>
                                        <th><strong>#</strong></th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Created_at</th>
                                        <th>Total Orders</th>
                                    </tr>
                                </tfoot>

                                <tbody>
                                    <UsersList
                                        users={filteredUsers}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Pagination />
                    </div>
                </div>}
                {loading && <Spinner />}
                {!loading && error && <p>{error}</p>}
            </div>
        </Layout>
    );
};

export default Users;