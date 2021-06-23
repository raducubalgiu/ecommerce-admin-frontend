import React from 'react';
import {User} from "../../models/userModel";

const UsersList = (props: { users: User[] }) => {
    return (
        <>
            { props.users.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td></td>
                </tr>
            )) }
        </>
    );
};

export default UsersList;