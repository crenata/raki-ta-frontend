import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import Config from "../../configs/Config";
import logo from "../../images/logo.png";
import IsEmpty from "../../helpers/IsEmpty";
import {toast} from "react-toastify";

class Navbar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            page: 1,
            isLastPage: false,
            isLoading: false
        };
    }

    componentDidMount() {
        if (!IsEmpty(Config.UserToken)) this.getData();
    }

    getData() {
        if (!this.state.isLoading && !this.state.isLastPage) {
            this.setState({
                isLoading: true
            }, () => {
                Config.AxiosUser.get(`notification/get?page=${this.state.page}`).then(response => {
                    if (response) {
                        const lastPage = response.data.data.last_page;
                        const isLastPage = lastPage === this.state.page;
                        this.setState({
                            notifications: [...this.state.notifications, ...response.data.data.data],
                            page: isLastPage ? this.state.page : this.state.page + 1,
                            isLastPage: isLastPage
                        });
                    }
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    });
                });
            });
        }
    }

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
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid d-block d-md-flex">
                    <Link to={Config.Links.Home} className="navbar-brand d-block d-md-flex align-items-center">
                        <div className="text-center">
                            <img
                                src={logo}
                                alt="Brand"
                                className="navbar-logo"
                            />
                        </div>&nbsp;&nbsp;
                        <h3 className="m-0 text-center text-md-start navbar-title">Freshwater Fish of Indonesia</h3>
                    </Link>
                    <button
                        className="navbar-toggler mt-3 mt-md-0"
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
                            {IsEmpty(Config.UserToken) ? <>
                                <li className="nav-item">
                                    <Link to={Config.Links.Register} className="nav-link text-body">
                                        <h3 className="m-0">Register</h3>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={Config.Links.Login} className="nav-link text-body">
                                        <h3 className="m-0">Login</h3>
                                    </Link>
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <Link to={Config.Links.ObservationAdd} className="nav-link text-body">
                                        <h3 className="m-0">Submit Observation</h3>
                                    </Link>
                                </li>
                            </>}
                            <li className="nav-item">
                                <Link to={Config.Links.Help} className="nav-link text-body">
                                    <h3 className="m-0">Help</h3>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={Config.Links.About} className="nav-link text-body">
                                    <h3 className="m-0">About Us</h3>
                                </Link>
                            </li>
                            {!IsEmpty(Config.UserToken) && <>
                                <li className="nav-item">
                                    <a href="javascript:void(0)" className="nav-link text-body position-relative notification-badge">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            fill="#000"
                                            className="bi bi-bell-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
                                            />
                                        </svg>
                                        <div className="notification-list shadow bg-white">
                                            {this.state.notifications.map((value, index) => (
                                                <div className="border-top p-2" key={value.id}>
                                                    <p className="m-0">{value.title}</p>
                                                    <p className="mt-2 mb-0 small">{value.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </a>
                                </li>
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