import React, {PureComponent} from "react";
import Template from "../../../template/user/Template";
import Config from "../../../configs/Config";
import MapPicker from "react-google-map-picker";

class ObservationDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            observation: {
                id: 0,
                user_id: 0,
                name: "",
                date: "",
                latitude: 0,
                longitude: 0,
                location: "",
                description: "",
                image: "",
                created_at: "",
                updated_at: "",
                deleted_at: null
            },
            zoom: 10
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        Config.AxiosUser.get(`observation/get/detail/${this.props.params.id}`).then(response => {
            if (response) {
                response.data.data.latitude = parseInt(response.data.data.latitude);
                response.data.data.longitude = parseInt(response.data.data.longitude);
                this.setState({
                    observation: response.data.data
                });
            }
        });
    }

    setValue(field, value) {
        this.setState({
            [field]: value
        });
    }

    render() {
        return (
            <Template>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <MapPicker
                                defaultLocation={{lat: this.state.observation.latitude, lng: this.state.observation.longitude}}
                                zoom={this.state.zoom}
                                mapTypeId="roadmap"
                                className="w-100"
                                onChangeZoom={zoom => this.setValue("zoom", zoom)}
                                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="">
                                <p className="m-0">Species Name</p>
                                <p className="m-0">{this.state.observation.name}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0">Observation Date</p>
                                <p className="m-0">{this.state.observation.date}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0">Observation Location</p>
                                <p className="m-0">{this.state.observation.location}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0">Latitude</p>
                                <p className="m-0">{this.state.observation.latitude}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0">Longitude</p>
                                <p className="m-0">{this.state.observation.longitude}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0">Description</p>
                                <p className="m-0">{this.state.observation.description}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0">Image</p>
                                <img src={this.state.observation.image} alt="Observation Image" className="w-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </Template>
        );
    }
}

export default ObservationDetail;