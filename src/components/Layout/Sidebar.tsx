import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faChartArea, faTshirt, faBoxes, faShoppingCart, faLaughWink, faStore } from '@fortawesome/free-solid-svg-icons'
import { NavLink, Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <FontAwesomeIcon icon={faLaughWink} className="fas fa-laugh-wink fa-2x" />
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </Link>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
                <NavLink className="nav-link" activeClassName="active" to="/">
                    <FontAwesomeIcon icon={faTachometerAlt} className="fas fa-fw fa-tachometer-alt"/>
                    <span> Dashboard</span></NavLink>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Ecommerce
            </div>

            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/categories">
                    <FontAwesomeIcon icon={faBoxes}/>
                    <span> Categories</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/subcategories">
                    <FontAwesomeIcon icon={faChartArea}/>
                    <span> Subcategories</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/brands">
                    <FontAwesomeIcon icon={faStore}/>
                    <span> Brands</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/products">
                    <FontAwesomeIcon icon={faTshirt}/>
                    <span>  Products</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/orders">
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    <span>  Orders</span>
                </NavLink>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Addons
            </div>
        </ul>
    );
}

export default Sidebar;