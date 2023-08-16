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
            local_name: "",
            found: "",
            substrate: "",
            images: []
        };
        this.state = {
            ...this.initialState,
            provinces: [],
            isLoading: false,
            zoom: 10
        };
    }

    componentDidMount() {
        Config.AxiosAdmin.get("observation/get/provinces").then(response => {
            if (response) {
                this.setState({
                    provinces: response.data.data
                }, () => {
                    this.getData();
                });
            }
        }).finally(() => {
            this.setState({
                isLoading: false
            });
        });
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
                    if (value !== "images") formData.append(value, this.state[value]);
                });
                Array.from(this.state.images).forEach(value => {
                    formData.append("images[]", value);
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
                                    <label htmlFor="name" className="form-label">Nama Spesies</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Nama Spesies"
                                        value={this.state.name}
                                        onChange={event => this.setValue("name", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="date" className="form-label">Tanggal Observasi</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        placeholder="Tanggal Observasi"
                                        value={this.state.date}
                                        onChange={event => this.setValue("date", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="location" className="form-label">Lokasi</label>
                                    <select
                                        className="form-select"
                                        id="location"
                                        value={this.state.location}
                                        onChange={event => this.setValue("location", event.target.value)}
                                    >
                                        <option selected>Choose</option>
                                        {this.state.provinces.map(value => (
                                            <option value={value.id}>{value.name}</option>
                                        ))}
                                    </select>
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
                                    <label htmlFor="local-name" className="form-label">Nama Lokal</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="local-name"
                                        placeholder="Nama Lokal"
                                        value={this.state.local_name}
                                        onChange={event => this.setValue("local_name", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="found" className="form-label">Lokasi Observasi</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="found"
                                        placeholder="Contoh : Aliran parit sungai gambut Kabupaten Sanggau"
                                        value={this.state.found}
                                        onChange={event => this.setValue("found", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="substrate" className="form-label">Substrat</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="substrate"
                                        placeholder="Contoh : kerikil,pasir dan batu"
                                        value={this.state.substrate}
                                        onChange={event => this.setValue("substrate", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="description" className="form-label">Deskripsi</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="Deskripsi"
                                        value={this.state.description}
                                        onChange={event => this.setValue("description", event.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="images" className="form-label">Foto Observasi</label>
                                    <input
                                        type="file"
                                        multiple
                                        className="form-control"
                                        id="images"
                                        placeholder="Foto Observasi"
                                        onChange={event => this.setValue("images", event.target.files)}
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
