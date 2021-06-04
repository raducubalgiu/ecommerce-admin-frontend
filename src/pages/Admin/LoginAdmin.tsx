import classes from './LoginRegisterAdmin.module.css';

const LoginAdmin = () => {
    return (
        <form className={classes['form-signin']}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                    <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="password" placeholder="Password" />
                    <label htmlFor="password">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
}

export default LoginAdmin;