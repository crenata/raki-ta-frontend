import React, {PureComponent} from "react";
import Template from "../../../template/user/Template";
import Config from "../../../configs/Config";
import {toast} from "react-toastify";
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
            zoom: 10,
            comments: [],
            page: 1,
            isLastPage: false,
            isLoading: false,
            comment: ""
        };
    }

    componentDidMount() {
        this.getData();
        this.getComment();

        setTimeout(() => {
            const element = document.getElementById("comment-section");
            element.onscroll = () => {
                if (
                    !this.state.isLoading &&
                    (element.scrollHeight - element.offsetHeight - element.scrollTop < 1)
                ) this.getComment();
            }
        }, 1000);
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
                    popupAnchor:  [-5, -60]
                })
            }).addTo(map);
        }
    }

    getData() {
        Config.AxiosUser.get(`observation/get/detail/${this.props.params.id}`).then(response => {
            if (response) {
                response.data.data.latitude = parseFloat(response.data.data.latitude);
                response.data.data.longitude = parseFloat(response.data.data.longitude);
                this.setState({
                    observation: response.data.data
                });
            }
        });
    }

    getComment(isReload = false) {
        if (!this.state.isLoading && !this.state.isLastPage) {
            this.setState({
                isLoading: true
            }, () => {
                Config.AxiosUser.get(`comment/get/${this.props.params.id}?page=${this.state.page}`).then(response => {
                    if (response) {
                        const lastPage = response.data.data.last_page;
                        const isLastPage = lastPage === this.state.page;
                        if (isReload) {
                            this.setState({
                                comments: []
                            }, () => {
                                this.setState({
                                    comments: [...this.state.comments, ...response.data.data.data],
                                    page: isLastPage ? this.state.page : this.state.page + 1,
                                    isLastPage: isLastPage
                                });
                            });
                        } else {
                            this.setState({
                                comments: [...this.state.comments, ...response.data.data.data],
                                page: isLastPage ? this.state.page : this.state.page + 1,
                                isLastPage: isLastPage
                            });
                        }
                    }
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    });
                });
            });
        }
    }

    submit() {
        if (!this.state.isLoading) {
            this.setState({
                isLoading: true
            }, () => {
                Config.AxiosUser.post("comment/add", {
                    id: this.props.params.id,
                    comment: this.state.comment
                }).then(response => {
                    if (response) {
                        toast.success("Successfully submitted!");
                        this.setState({
                            comment: "",
                            isLastPage: false,
                            page: 1
                        }, () => {
                            this.getComment(true);
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
                            <p className="m-0 fw-bold">Observer : {this.state.observation.user?.name}</p>
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
                                <p className="m-0 fw-bold">Species Name</p>
                                <p className="m-0 fst-italic">{this.state.observation.name}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0 fw-bold">Observation Date</p>
                                <p className="m-0">{this.state.observation.date}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0 fw-bold">Observation Location</p>
                                <p className="m-0">{this.state.observation.location}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0 fw-bold">Latitude</p>
                                <p className="m-0">{this.state.observation.latitude}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0 fw-bold">Longitude</p>
                                <p className="m-0">{this.state.observation.longitude}</p>
                            </div>
                            <div className="mt-3">
                                <p className="m-0 fw-bold">Description</p>
                                <p className="m-0">{this.state.observation.description}</p>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="comment" className="mt-3 mb-0">Comment</label>
                                <textarea
                                    id="comment"
                                    className="form-control"
                                    placeholder="Comment here..."
                                    rows="4"
                                    value={this.state.comment}
                                    onChange={event => this.setValue("comment", event.target.value)}
                                />
                                <div className="text-end mt-3">
                                    <button className="btn btn-primary" onClick={event => this.submit()}>Submit</button>
                                </div>
                                <div id="comment-section" className="mt-3">
                                    {this.state.comments.map((value, index) => (
                                        <div className={index > 0 && "mt-3"} key={value.id}>
                                            <p className="m-0">{value.user.name}</p>
                                            <p className="m-0">{value.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Template>
        );
    }
}

export default ObservationDetail;
