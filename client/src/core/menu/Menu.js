import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../../auth"
import {itemTotal} from "../cartHelpers";
import Cookies from 'universal-cookie';
import './Menu.css'
import cartImage from './cartImage.png'
const cookies = new Cookies();

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#ff9900"};
    } else {
        return {color: "#ffffff"};
    }
};

const Menu = ({history}) => (
    <div className='navbar-container'>
        <div className='navbar-header-top'>
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-items">
                        <Link   to="/signin">
                            Sign In
                        </Link>
                    </li>
                    <span>|</span>
                    <li className="nav-items">
                        <Link   to="/signup">
                            Register
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-items">
                    <span
                        
                        style={{
                        cursor: "pointer",
                        color: "#ffffff"
                    }}
                        onClick={() => {
                            signout()
                    }}>
                        Signout
                    </span>
                </li>
            )}
            <button>
                <Link to="/cart">
                    <img src={cartImage} alt='cart'/>
                    <p>Cart{" "}</p>
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </button>
        </div>
        <div className='navbar-header-bottom'>
                <div className='left-box'>
                    <li className="nav-logo-header">
                        <Link  to="/">
                            Bookland
                        </Link>
                    </li>
                </div>
                <div className='middle-box'>
                    <li className="nav-items">
                        <Link  to="/">
                            Home
                        </Link>
                    </li>

                    <li className="nav-items">
                        <Link  to="/shop">
                            Shop
                        </Link>
                    </li>

                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-items">
                            <Link
                                
                                style={isActive(history, "/user/dashboard")}
                                to="/user/dashboard">
                                Dashboard
                            </Link>
                        </li>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className="nav-items">
                            <Link
                                
                                to="/admin/dashboard">
                                Dashboard
                            </Link>
                        </li>
                )}</div>
        </div>

    </div>
);

export default withRouter(Menu);
