import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import Config from "../../configs/Config";
import logo from "../../images/logo.svg";
import IsEmpty from "../../helpers/IsEmpty";
import {toast} from "react-toastify";

class Navbar extends PureComponent {
    logout() {
        Config.AxiosUser.get("auth/logout").then(response => {
            if (response) {
                toast.success("Logged Out...");
                localStorage.removeItem(Config.UserTokenKey);
                setTimeout(() => {
                    window.location.href = Config.Links.Home;
                }, 1000);
            }
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top bgc-1F1E30">
                <div className="container-fluid bgc-1F1E30">
                    <Link to={Config.Links.Home} className="navbar-brand text-white d-flex align-items-center">
                        <img
                            src={logo}
                            alt="Brand"
                            width="36"
                            height="36"
                            className="logo"
                        />&nbsp;&nbsp;
                        <p className="m-0 text-white">Raki TA</p>
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
                                <Link to={Config.Links.About} className="nav-link text-white">
                                    <p className="m-0">About Us</p>
                                </Link>
                            </li>
                            {IsEmpty(Config.UserToken) ? <>
                                <li className="nav-item">
                                    <Link to={Config.Links.Register} className="nav-link text-white">
                                        <p className="m-0">Register</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={Config.Links.Login} className="nav-link text-white">
                                        <p className="m-0">Login</p>
                                    </Link>
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <Link to={Config.Links.ObservationAdd} className="nav-link text-white">
                                        <p className="m-0">Submit Observation</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:void(0)" onClick={event => this.logout()} className="nav-link text-white">
                                        <p className="m-0">Logout</p>
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