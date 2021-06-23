import {SyntheticEvent, useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useHttpPost} from "../api/use-http";

const Register = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const applyData = (data: any) => {
        history.push('/');
    }

    const { sendData, error, loading } = useHttpPost('register', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirm: passwordConfirm
    }, applyData);

    const submitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        sendData();
    }

    return (
        <div className="register-page">
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <form onSubmit={submitHandler} className="user">
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                                       placeholder="First Name" onChange={(e => setFirstName(e.target.value))} />
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control form-control-user" id="exampleLastName"
                                                       placeholder="Last Name" onChange={(e => setLastName(e.target.value))} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                                   placeholder="Email Address" onChange={(e => setEmail(e.target.value))} />
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password" className="form-control form-control-user"
                                                       id="exampleInputPassword" placeholder="Password" onChange={(e => setPassword(e.target.value))} />
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="password" className="form-control form-control-user"
                                                       id="exampleRepeatPassword" placeholder="Repeat Password" onChange={(e => setPasswordConfirm(e.target.value))} />
                                            </div>
                                        </div>
                                        {!loading &&
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Register
                                        </button>}

                                        {loading && <button className="btn btn-primary btn-user btn-block" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true" />
                                            <span className="sr-only">Loading...</span>
                                        </button>}
                                    </form>

                                    <hr />
                                    <div className="text-center">
                                        <Link className="small" to="/">Forgot Password?</Link>
                                    </div>
                                    <div className="text-center">
                                        <Link className="small" to="/login">Already have an account? Login!</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;