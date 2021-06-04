import {useState, useRef, SyntheticEvent} from 'react';
import { Redirect } from "react-router-dom"
import classes from './LoginRegisterAdmin.module.css';
import Spinner from "../../components/UI/Spinner";

const RegisterAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    const registerAdminHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        setError(null);
        setLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:8000/api/admin/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    first_name: firstNameRef.current!.value,
                    last_name: lastNameRef.current!.value,
                    email: emailRef.current!.value,
                    password: passwordRef.current!.value,
                    password_confirm: passwordConfirmRef.current!.value
                })
            });

            if(!res.ok) {
                throw new Error('Somethind went wrong!');
            }
            await res.json();
            <Redirect to={'/admin'} />

        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    }

    return (
        <section>
            {!loading && <form onSubmit={registerAdminHandler} className={classes['form-signin']}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <div className="form-floating">
                    <input ref={firstNameRef} type="text" className="form-control" id="first_name" placeholder="First Name" />
                    <label htmlFor="first_name">First Name</label>
                </div>

                <div className="form-floating">
                    <input ref={lastNameRef} type="text" className="form-control" id="last_name" placeholder="Last Name" />
                    <label htmlFor="last_name">Last Name</label>
                </div>

                <div className="form-floating">
                    <input ref={emailRef} type="email" className="form-control" id="email" placeholder="Email" />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input ref={passwordRef} type="password" className="form-control" id="password" placeholder="Password" />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating">
                    <input ref={passwordConfirmRef} type="password_confirm" className="form-control" id="password_confirm" placeholder="Password Confirm" />
                    <label htmlFor="password_confirm">Password Confirm</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>}
            {loading && <Spinner />}
            {!loading && error && <p>{error}</p>}
        </section>
    );
}

export default RegisterAdmin;