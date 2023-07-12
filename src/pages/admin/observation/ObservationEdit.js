import React, {PureComponent} from "react";
import Template from "../../../template/admin/Template";
import Config from "../../../configs/Config";
import {toast} from "react-toastify";
import LocationPicker from "react-leaflet-location-picker";

class ObservationEdit extends PureComponent {
    constructor(props) {
        super(props);
        this.initialState = {
            name: "",
            date: "",
            location: "",
            latitude: 0,
            longitude: 0,
            description: "",
            image: ""
        };
        this.state = {
            ...this.initialState,
            isLoading: false,
            zoom: 10
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        Config.AxiosAdmin.get(`observation/get/detail/${this.props.params.id}`).then(response => {
            if (response) {
                response.data.data.latitude = parseFloat(response.data.data.latitude);
                response.data.data.longitude = parseFloat(response.data.data.longitude);
                Object.keys(response.data.data).forEach(value => {
                    this.setState({
                        [value]: response.data.data[value]
                    });
                });
            }
        });
    }

    setValue(field, value) {
        this.setState({
            [field]: value
        });
    }

    submit() {
        if (!this.state.isLoading) {
            this.setState({
                isLoading: true
            }, () => {
                const formData = new FormData();
                Object.keys(this.state).forEach(value => {
                    formData.append(value, this.state[value]);
                });
                Config.AxiosAdmin.post("observation/edit", formData).then(response => {
                    if (response) {
                        toast.success("Successfully updated!");
                        this.props.navigate(Config.Links.Admin.Index);
                    }
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    });
                });
            });
        }
    }

    render() {
        return (
            <Template>
                <div className="container">
                    <div className="shadow rounded p-3">
                        <h3 className="m-0 text-center">Edit Observation</h3>
                        <div className="row mt-3">
                            <div className="col-12 col-md-6">
                                <div className="">
                                    <label htmlFor="name" className="form-label">Species Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="species name"
                                        value={this.state.name}
                                        onChange={event => this.setValue("name", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="date" className="form-label">Observation Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        placeholder="observation date"
                                        value={this.state.date}
                                        onChange={event => this.setValue("date", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="location" className="form-label">Observation Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        placeholder="observation location"
                                        value={this.state.location}
                                        onChange={event => this.setValue("location", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="latitude" className="form-label">Latitude</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="latitude"
                                        placeholder="latitude"
                                        value={this.state.latitude}
                                        onChange={event => this.setValue("latitude", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="longitude" className="form-label">Longitude</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="longitude"
                                        placeholder="longitude"
                                        value={this.state.longitude}
                                        onChange={event => this.setValue("longitude", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="description"
                                        value={this.state.description}
                                        onChange={event => this.setValue("description", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        placeholder="image"
                                        onChange={event => this.setValue("image", event.target.files[0])}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3 mt-md-0">
                                <LocationPicker
                                    pointMode={{
                                        banner: true,
                                        control: {
                                            values: [
                                                [this.state.latitude, this.state.longitude]
                                            ],
                                            onClick: point => {
                                                this.setValue("latitude", point[0]);
                                                this.setValue("longitude", point[1]);
                                            }
                                        }
                                    }}
                                    showInputs={false}
                                    showControls={false}
                                />
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <button className="btn btn-primary" onClick={event => this.submit()}>Submit</button>
                        </div>
                    </div>
                </div>
            </Template>
        );
    }
}

export default ObservationEdit;