import {useState, useEffect, Dispatch} from 'react';
import { Redirect } from 'react-router-dom';
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Navbar from './Navbar';
import {User} from "../../models/userModel";
import {connect} from "react-redux";
import {setUser} from "../../store/actions/setUserAction";

const Layout = (props: any) => {
    const [redirect, setRedirect] = useState(false);
    const [sidebar, setSidebar] = useState(true);
    const toggleSidebarHandler = () => {
        setSidebar((prevState) => !prevState);
    }

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await fetch('http://localhost:8000/api/admin/user', {credentials: 'include'});
                    if(!res.ok) {
                        throw new Error('Something went wrong!');
                    }
                    const data = await res.json();
                    props.setUser(data);

                } catch (e) {
                    setRedirect(true);
                }
            }
        )();
    }, []);

    if(redirect) {
        return <Redirect to={"/login"} />
    }

    return (
        <div id="wrapper">
            {sidebar && <Sidebar />}

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar onClick={toggleSidebarHandler}/>

                    <div className="container-fluid">
                        {props.children}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

const mapStateToProps = (state: {user: User}) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);