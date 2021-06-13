import Layout from "../components/Layout/Layout";
import {User} from "../models/userModel";
import {SyntheticEvent, useRef, useState} from "react";
import {useHttpUser} from "../api/use-http";

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    // Argument for custom hook - getting the use and update de state
    const getUser = (data: any) => {
        setUser(data);
    }

    // Custom Hook for getting the user
    useHttpUser(getUser);

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
            try {
                const res = await fetch('http://localhost:8000/api/admin/users/info', {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        first_name: firstNameRef.current?.value,
                        last_name: lastNameRef.current?.value,
                        image: imageRef.current?.value
                    })
                });
                const data = await res.json();
                setUser(data);

            } catch (e) {
                // Error
            }
        setLoading(false);
    }

    return (
        <Layout>
            <div className="card">
                <div className="card-header">
                    <div className="d-flex align-items-center">
                        <div className="avatar">
                            <img src="assets/images/user.png" alt="Something" className="img-fluid rounded-circle" width={80}/>
                        </div>

                        <div className="user-information ml-3">
                            <h3>{user?.last_name} {user?.first_name}</h3>
                            <span className="badge badge-pill badge-warning">Admin</span>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" name="first_name" id="first_name" className="form-control" ref={firstNameRef} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" name="last_name" id="last_name" className="form-control" ref={lastNameRef}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Upload avatar</label>
                            <input type="file" className="form-control form-control-file" id="image" ref={imageRef}/>
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

export default Profile;