import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faUser, faCogs, faSignOutAlt, faBell, faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {User} from "../../models/userModel";
import {connect} from "react-redux";

const Navbar = (props: {onClick: () => void; user: User | null}) => {
    const [show, setShow] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const [showMess, setShowMess] = useState(false);
    const history = useHistory();

    const toggleNavHandler = () => {
        setShow((prevState) => !prevState);
    }
    const toggleNotificationHandler = () => {
        setShowNotif((prevNotif) => !prevNotif);
    }
    const toggleMessages = () => {
        setShowMess(prevMess => !prevMess);
    }
    const logoutHandler = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/admin/logout', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            await res.json();
            history.push('/login');
        } catch (e) {
            // Set Error
        }
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button onClick={props.onClick} id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <FontAwesomeIcon icon={faBars} className="fa fa-bars" />
            </button>

            <form
                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                           aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <FontAwesomeIcon icon={faSearch} className="fas fa-search fa-sm" />
                            </button>
                        </div>
                </div>
            </form>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>

                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                         aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                       placeholder="Search for..." aria-label="Search"
                                       aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </div>
                            </div>
                        </form>
                    </div>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <button onClick={toggleNotificationHandler} className="nav-link dropdown-toggle bg-transparent border-0">
                        <FontAwesomeIcon icon={faBell} className="fas fa-bell fa-fw" />
                        <span className="badge badge-danger badge-counter">3+</span>
                    </button>

                    {showNotif && <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="alertsDropdown">
                        <h6 className="dropdown-header">
                            Alerts Center
                        </h6>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="mr-3">
                                <div className="icon-circle bg-primary">
                                    <FontAwesomeIcon icon={faFileAlt} className="fas fa-file-alt text-white" />
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 12, 2019</div>
                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                        </Link>
                        <Link className="dropdown-item text-center small text-gray-500" to="#">Show All Alerts</Link>
                    </div>}
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <button onClick={toggleMessages} className="nav-link dropdown-toggle bg-transparent border-0">
                        <FontAwesomeIcon icon={faEnvelope} className="fas fa-envelope fa-fw"/>

                        <span className="badge badge-danger badge-counter">7</span>
                    </button>

                    {showMess && <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">
                            Message Center
                        </h6>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="#"
                                     alt="..." />
                                    <div className="status-indicator bg-success" />
                            </div>
                            <div className="font-weight-bold">
                                <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                    problem I've been having.
                                </div>
                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                        </Link>

                        <Link className="dropdown-item text-center small text-gray-500" to="#">Read More Messages</Link>
                    </div>}
                </li>

                <div className="topbar-divider d-none d-sm-block" />

                <li className="nav-item dropdown no-arrow">
                    <button onClick={toggleNavHandler} className="nav-link dropdown-toggle bg-transparent border-0">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{props.user?.last_name} {props.user?.first_name}</span>
                        <img className="img-profile rounded-circle"
                             src="/assets/images/user.png" alt="#" />
                    </button>

                    {show && <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in">
                        <Link className="dropdown-item" to="/profile">
                            <FontAwesomeIcon icon={faUser} className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"/>
                            Profile
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <FontAwesomeIcon icon={faCogs} className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                            Settings
                        </Link>
                        <div className="dropdown-divider" />

                        <button onClick={logoutHandler} className="dropdown-item bg-transparent border-0">
                            <FontAwesomeIcon icon={faSignOutAlt} className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                            Logout
                        </button>
                    </div>}
                </li>
            </ul>
        </nav>
    );
}

export default connect((state: {user: User}) => ({
    user: state.user
}))(Navbar);