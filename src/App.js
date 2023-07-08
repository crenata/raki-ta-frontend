import React, {PureComponent} from "react";
import AppRoutes from "./AppRoutes";
import Context from "./contexts/Context";
import Config from "./configs/Config";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "react-toastify/dist/ReactToastify.min.css";
import {ToastContainer} from "react-toastify";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            admin_token: Config.AdminToken,
            user_token: Config.UserToken,
            loading: true
        };
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                <AppRoutes />
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </Context.Provider>
        );
    }
}

export default App;
