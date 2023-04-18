import React, {PureComponent} from "react";
import Template from "../../../template/user/Template";
import Config from "../../../configs/Config";
import MapPicker from "react-google-map-picker";
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
                image: "",
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

    getComment() {
        if (!this.state.isLoading && !this.state.isLastPage) {
            this.setState({
                isLoading: true
            }, () => {
                Config.AxiosUser.get(`comment/get/${this.props.params.id}?page=${this.state.page}`).then(response => {
                    if (response) {
                        const lastPage = response.data.data.last_page;
                        const isLastPage = lastPage === this.state.page;
                        this.setState({
                            comments: [...this.state.comments, ...response.data.data.data],
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
                            comment: ""
                        }, () => {
                            this.getComment();
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

                    <div className="mt-3">
                        <label htmlFor="comment" className="m-0">Comment</label>
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
            </Template>
        );
    }
}

export default ObservationDetail;