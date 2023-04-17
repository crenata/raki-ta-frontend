import React, {PureComponent} from "react";
import AppRoutes from "./AppRoutes";
import Context from "./contexts/Context";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.initialState = {
            loading: true
        };
        this.state = {
            ...this.initialState
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
            </Context.Provider>
        );
    }
}

export default App;
