import Layout from "../components/Layout/Layout";
import {User} from "../models/userModel";
import React, {Dispatch, SyntheticEvent, useEffect, useRef, useState} from "react";
import {useHttpPut} from "../api/use-http";
import {connect} from "react-redux";
import {setUser} from "../store/actions/setUserAction";

const Profile = (props: { user: User; setUser: (data: any) => void }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');

    // The last argument from custom hook function (httpPut) - dispatching an action for redux to update the user and UI
    const applyData = (data: any) => {
        props.setUser(data);
    }

    // Custom Hook function httpPut
    const { updateData, error, loading } = useHttpPut('users/info', {
        first_name: firstName,
        last_name: lastName,
        image: image
    }, applyData);

    // Update the user
    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        // Fire updateData function from custom hook
        updateData();
    }

    // Get user data from Redux for displaying as values
    useEffect(() => {
        setFirstName(props.user.first_name);
        setLastName(props.user.last_name);
        setImage(props.user.image);
        setEmail(props.user.email);
    }, [props.user]);

    return (
        <Layout>
            <div className="card">
                <div className="card-header">
                    <div className="d-flex align-items-center">
                        <div className="avatar">
                            <img src="assets/images/user.png" alt="Something" className="img-fluid rounded-circle" width={80}/>
                        </div>

                        <div className="user-information ml-3">
                            <h3>{props.user.last_name} {props.user.first_name}</h3>
                            <span className="badge badge-pill badge-warning">Admin</span>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" value={firstName} name="first_name" id="first_name" className="form-control" onChange={(e => setFirstName(e.target.value))} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" value={lastName} name="last_name" id="last_name" className="form-control" onChange={(e => setLastName(e.target.value))} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} name="email" id="email" className="form-control" onChange={(e => setEmail(e.target.value))} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Upload avatar</label>
                            <input type="file" className="form-control form-control-file" id="image" onChange={(e => setImage(e.target.value))} />
                        </div>

                        {!loading && <button type="submit" className="btn btn-primary mt-2">Update Profile</button>}
                        {loading &&
                            <button className="btn btn-primary btn-user" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                <span className="sr-only">Loading...</span>
                            </button>
                        }
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default connect(
(state: {user: User}) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Profile);