import {SyntheticEvent, useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const submitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/admin/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    first_name: firstNameRef.current!.value,
                    last_name: lastNameRef.current!.value,
                    email: emailRef.current!.value,
                    password: passwordRef.current!.value,
                    password_confirm: confirmPasswordRef.current!.value
                })
            });

            if(!response.ok) {
                throw new Error('Something went wrong!');
            }

            await response.json();
            history.push('/');
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
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
                                                       placeholder="First Name" ref={firstNameRef} />
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control form-control-user" id="exampleLastName"
                                                       placeholder="Last Name" ref={lastNameRef}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                                   placeholder="Email Address" ref={emailRef} />
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password" className="form-control form-control-user"
                                                       id="exampleInputPassword" placeholder="Password" ref={passwordRef} />
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="password" className="form-control form-control-user"
                                                       id="exampleRepeatPassword" placeholder="Repeat Password" ref={confirmPasswordRef}/>
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