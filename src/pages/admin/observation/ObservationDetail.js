import React, {PureComponent} from "react";
import Template from "../../../template/user/Template";
import Config from "../../../configs/Config";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

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
                images: [],
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        document.getElementById("map")?.remove();
        let mapElement = document.createElement("div");
        mapElement.id = "map";
        mapElement.style.height = "24rem";
        document.getElementById("map-container").appendChild(mapElement);
        if (this.state.observation.latitude && this.state.observation.longitude) {
            const map = new window.L.map("map").setView([this.state.observation.latitude, this.state.observation.longitude], 10);
            window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            window.L.marker([this.state.observation.latitude, this.state.observation.longitude], {
                icon: window.L.icon({
                    iconUrl: "/marker.png",
                    iconSize: [60, 60],
                    iconAnchor: [35, 70],
                    popupAnchor: [-5, -60]
                })
            }).addTo(map);
        }
    }

    getData() {
        Config.AxiosAdmin.get(`observation/get/detail/${this.props.params.id}`).then(response => {
            if (response) {
                response.data.data.latitude = parseFloat(response.data.data.latitude);
                response.data.data.longitude = parseFloat(response.data.data.longitude);
                this.setState({
                    observation: response.data.data
                });
            }
        });
    }

    approve() {
        Config.AxiosAdmin.get(`observation/approve/${this.props.params.id}`).then(response => {
            if (response) {
                toast.success("Successfully approved!");
                this.props.navigate(Config.Links.Admin.Index);
            }
        });
    }

    reject() {
        Config.AxiosAdmin.get(`observation/reject/${this.props.params.id}`).then(response => {
            if (response) {
                toast.success("Successfully rejected!");
                this.props.navigate(Config.Links.Admin.Index);
            }
        });
    }

    delete() {
        Config.AxiosAdmin.delete(`observation/delete/${this.props.params.id}`).then(response => {
            if (response) {
                toast.success("Successfully deleted!");
                this.props.navigate(Config.Links.Admin.Index);
            }
        });
    }

    deleteComment(id) {
        Config.AxiosAdmin.delete(`observation/comment/${id}`).then(response => {
            if (response) {
                toast.success("Successfully deleted!");
                this.getData();
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
                            <p className="m-0">Observer : {this.state.observation.user?.name}</p>
                            <div id="carousel-images" className="carousel slide mt-3">
                                <div className="carousel-indicators">
                                    {this.state.observation.images.map((value, index) => (
                                        <button
                                            data-bs-target="#carousel-images"
                                            data-bs-slide-to={index}
                                            className={index === 0 ? "active" : ""}
                                            aria-label={`Slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                <div className="carousel-inner">
                                    {this.state.observation.images.map((value, index) => (
                                        <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                            <img src={value.image} className="d-block w-100 carousel-img" alt="Image"/>
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button"
                                        data-bs-target="#carousel-images" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button"
                                        data-bs-target="#carousel-images" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div id="map-container" className="mt-3"/>
                        </div>
                        <div className="col-12 col-md-6 mt-3 mt-md-0">
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
                            <div className="mt-5">
                                <h4 className="mt-3 mb-0">Comment</h4>
                                <div className="mt-3">
                                    {this.state.observation.comments?.map((value, index) => (
                                        <div className={index > 0 && "mt-3"} key={value.id}>
                                            <div className="d-flex align-items-center">
                                                <p className="m-0">{value.user.name}</p>
                                                <button className="btn btn-sm btn-danger ms-3" onClick={event => this.deleteComment(value.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                         className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path
                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                        <path
                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="m-0">{value.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.observation?.latest_history?.status === 1 &&
                    <div className="d-flex align-items-center justify-content-center mt-3">
                        <button className="btn btn-danger" onClick={event => this.reject()}>Reject</button>
                        <button className="btn btn-primary ms-3" onClick={event => this.approve()}>Approve</button>
                    </div>}
                    {this.state.observation?.latest_history?.status === 3 &&
                    <div className="d-flex align-items-center justify-content-center mt-3">
                        <button className="btn btn-danger" onClick={event => this.delete()}>Delete</button>
                        <Link to={Config.Links.Admin.ObservationEdit.replace(":id", this.state.observation.id)}
                              className="btn btn-primary ms-3">Edit</Link>
                    </div>}
                </div>
            </Template>
        );
    }
}

export default ObservationDetail;
