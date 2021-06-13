import { useState, useRef, SyntheticEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const history = useHistory();

    // Login Handler
    const loginHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/admin/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    email: emailRef.current!.value,
                    password: passwordRef.current!.value
                }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            await response.json();
            history.push('/');

        } catch (e) {
            // Error
            setError(e.message);
        }
        setLoading(false);
    }

    return (
        <div className="register-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form onSubmit={loginHandler} className="user">
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user"
                                                           id="exampleInputEmail" aria-describedby="emailHelp"
                                                           placeholder="Enter Email Address..." ref={emailRef} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                           id="exampleInputPassword" placeholder="Password" ref={passwordRef} />
                                                </div>

                                                {!loading &&
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>}

                                                {loading && <button className="btn btn-primary btn-user btn-block" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true" />
                                                    <span className="sr-only">Loading...</span>
                                                </button>}
                                            </form>

                                            <hr />
                                            <div className="text-center">
                                                <Link className="small" to="/">Forgot
                                                    Password?</Link>
                                            </div>
                                            <div className="text-center">
                                                <Link className="small" to="/register">Create an Account!</Link>
                                            </div>
                                        </div>
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

export default Login;