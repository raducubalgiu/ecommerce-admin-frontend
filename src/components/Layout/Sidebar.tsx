import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faChartArea, faTshirt, faBoxes, faShoppingCart, faLaughWink, faStore, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { NavLink, Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <FontAwesomeIcon icon={faLaughWink} className="fas fa-laugh-wink fa-2x" />
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </NavLink>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item">
                <NavLink exact className="nav-link" to="/">
                    <FontAwesomeIcon icon={faTachometerAlt} className="fas fa-fw fa-tachometer-alt"/>
                    <span> Dashboard</span></NavLink>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Ecommerce
            </div>

            <li className="nav-item">
                <NavLink className="nav-link" to="/supercategories">
                    <FontAwesomeIcon icon={faBoxes}/>
                    <span> Supercategories</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                    <FontAwesomeIcon icon={faBoxes}/>
                    <span> Categories</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/subcategories">
                    <FontAwesomeIcon icon={faChartArea}/>
                    <span> Subcategories</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                    <FontAwesomeIcon icon={faStore}/>
                    <span> Brands</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                    <FontAwesomeIcon icon={faTshirt}/>
                    <span>  Products</span>
                </NavLink>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Users
            </div>

            <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                    <FontAwesomeIcon icon={faUserFriends}/>
                    <span>  Users</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/orders">
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    <span>  Orders</span>
                </NavLink>
            </li>
        </ul>
    );
}

export default Sidebar;