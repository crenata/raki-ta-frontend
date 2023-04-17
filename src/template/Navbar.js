import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import Config from "../configs/Config";
import Context from "../contexts/Context";
import logo from "../images/logo.svg";
import IsEmpty from "../helpers/IsEmpty";
import "./Navbar.css";

class Navbar extends PureComponent {
    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <nav className="navbar navbar-expand-lg bgc-1F1E30">
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
                                    {IsEmpty(context.user_token) ? <>
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
                                            <Link to={Config.Links.SubmitObservation} className="nav-link text-white">
                                                <p className="m-0">Submit Observation</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={Config.Links.Login} className="nav-link text-white">
                                                <p className="m-0">Logout</p>
                                            </Link>
                                        </li>
                                    </>}
                                </ul>
                            </div>
                        </div>
                    </nav>
                )}
            </Context.Consumer>
        );
    }
}

export default Navbar;