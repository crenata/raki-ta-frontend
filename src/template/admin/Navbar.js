import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import Config from "../../configs/Config";
import logo from "../../images/logo.png";
import IsEmpty from "../../helpers/IsEmpty";
import {toast} from "react-toastify";

class Navbar extends PureComponent {
    logout() {
        Config.AxiosAdmin.get("auth/logout").then(response => {
            if (response) {
                toast.success("Logged Out...");
                localStorage.removeItem(Config.AdminTokenKey);
                setTimeout(() => {
                    window.location.href = Config.Links.Admin.Index;
                }, 1000);
            }
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top bgc-1F1E30">
                <div className="container-fluid">
                    <Link to={Config.Links.Admin.Index} className="navbar-brand d-flex align-items-center">
                        <img
                            src={logo}
                            alt="Brand"
                            width="100"
                            className="logo"
                        />&nbsp;&nbsp;
                        <h3 className="m-0">Admin Freshwater Fish of Indonesia</h3>
                    </Link>
                    <button
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#user-navbar-content"
                        aria-controls="user-navbar-content"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="user-navbar-content">
                        <ul className="navbar-nav me-auto me-lg-0 ms-lg-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={Config.Links.About} className="nav-link text-body">
                                    <h3 className="m-0">About Us</h3>
                                </Link>
                            </li>
                            {IsEmpty(Config.AdminToken) ? <>
                                <li className="nav-item">
                                    <Link to={Config.Links.Login} className="nav-link text-body">
                                        <h3 className="m-0">Login</h3>
                                    </Link>
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <a href="javascript:void(0)" onClick={event => this.logout()} className="nav-link text-body">
                                        <h3 className="m-0">Logout</h3>
                                    </a>
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;