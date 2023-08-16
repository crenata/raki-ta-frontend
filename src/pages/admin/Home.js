import React, {PureComponent} from "react";
import Template from "../../template/admin/Template";
import Config from "../../configs/Config";
import {Link} from "react-router-dom";

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            observations: [],
            approved_observations: [],
            page: 1,
            isLastPage: false,
            isLoading: false,
            isLastPageApproved: false,
            isLoadingApproved: false
        };
    }

    componentDidMount() {
        this.getData();
        this.getApproved();

        setTimeout(() => {
            const self = this;
            if (this.state.observations.length > 0) {
                document.getElementsByClassName("observation-list")[0].onscroll = function (e) {
                    if (this.scrollTop > (this.scrollHeight - this.offsetHeight - 50)) self.getData();
                };
            }
            if (this.state.approved_observations.length > 0) {
                document.getElementsByClassName("approved-observation-list")[0].onscroll = function (e) {
                    if (this.scrollTop > (this.scrollHeight - this.offsetHeight - 50)) self.getApproved();
                };
            }
        }, 1000);
    }

    getData() {
        if (!this.state.isLoading && !this.state.isLastPage) {
            this.setState({
                isLoading: true
            }, () => {
                Config.AxiosAdmin.get(`observation/get?page=${this.state.page}`).then(response => {
                    if (response) {
                        const lastPage = response.data.data.last_page;
                        const isLastPage = lastPage === this.state.page;
                        this.setState({
                            observations: [...this.state.observations, ...response.data.data.data],
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

    getApproved() {
        if (!this.state.isLoadingApproved && !this.state.isLastPageApproved) {
            this.setState({
                isLoadingApproved: true
            }, () => {
                Config.AxiosAdmin.get(`observation/get/approved?page=${this.state.page}`).then(response => {
                    if (response) {
                        const lastPage = response.data.data.last_page;
                        const isLastPageApproved = lastPage === this.state.page;
                        this.setState({
                            approved_observations: [...this.state.approved_observations, ...response.data.data.data],
                            page: isLastPageApproved ? this.state.page : this.state.page + 1,
                            isLastPageApproved: isLastPageApproved
                        });
                    }
                }).finally(() => {
                    this.setState({
                        isLoadingApproved: false
                    });
                });
            });
        }
    }

    render() {
        return (
            <Template>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="border-black rounded p-3">
                                <p className="m-0 text-center">Menunggu Persetujuan</p>
                                <div className="mt-3">
                                    {this.state.observations.length > 0 ?
                                        <div className="observation-list">
                                            {this.state.observations.map(value => (
                                                <Link to={Config.Links.Admin.ObservationDetail.replace(":id", value.id)} className="text-decoration-none text-body mt-3" key={value.id}>
                                                    <div className="row">
                                                        <div className="col-4 d-flex align-items-center">
                                                            <img src={value.images[0]?.image} alt="Observation Image" className="w-100 object-fit-cover" style={{height: "6rem"}} />
                                                        </div>
                                                        <div className="col-8 d-flex align-items-center">
                                                            <div className="">
                                                                <p className="m-0">{value.name}</p>
                                                                <p className="m-0 small">{value.location}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div> :
                                        <p className="m-0 text-center">Empty</p>}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="border-black rounded p-3">
                                <p className="m-0 text-center">Observasi yang Telah disetujui</p>
                                <div className="mt-3">
                                    {this.state.approved_observations.length > 0 ?
                                        <div className="approved-observation-list">
                                            {this.state.approved_observations.map(value => (
                                                <Link to={Config.Links.Admin.ObservationDetail.replace(":id", value.id)} className="text-decoration-none text-body mt-3" key={value.id}>
                                                    <div className="row">
                                                        <div className="col-4 d-flex align-items-center">
                                                            <img src={value.images[0]?.image} alt="Observation Image" className="w-100 object-fit-cover" style={{height: "6rem"}} />
                                                        </div>
                                                        <div className="col-8 d-flex align-items-center">
                                                            <div className="">
                                                                <p className="m-0">{value.name}</p>
                                                                <p className="m-0 small">{value.location}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div> :
                                        <p className="m-0 text-center">Empty</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Template>
        );
    }
}

export default Home;
