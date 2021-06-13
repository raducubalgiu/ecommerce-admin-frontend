import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Navbar from './Navbar';
import {User} from "../../models/userModel";

const Layout = (props: any) => {
    const [redirect, setRedirect] = useState(false);
    const [sidebar, setSidebar] = useState(true);
    const [user, setUser] = useState<User | null>(null);
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
                    setUser(data);

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
                    <Navbar user={user} onClick={toggleSidebarHandler}/>

                    <div className="container-fluid">
                        {props.children}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;