import React, {PureComponent} from "react";
import Template from "../../template/Template";
import Config from "../../configs/Config";

class Login extends PureComponent {
    componentDidMount() {
        Config.Axios.get("misc/industry").then(res => {
            console.log("res", res.data);
        });
    }

    render() {
        return (
            <Template>Login</Template>
        );
    }
}

export default Login;