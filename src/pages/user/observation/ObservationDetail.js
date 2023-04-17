import React, {PureComponent} from "react";
import Template from "../../../template/user/Template";
import Config from "../../../configs/Config";

class ObservationDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            observation: null
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        Config.AxiosUser.get("observation/get/detail/1").then(response => {
            if (response) {
                this.setState({
                    observation: response.data.data
                });
            }
        });
    }

    render() {
        return (
            <Template>
                <div className="container">
                    <div className="row"></div>
                </div>
            </Template>
        );
    }
}

export default ObservationDetail;