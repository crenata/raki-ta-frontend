import React, {PureComponent} from "react";
import Template from "../../template/admin/Template";
import Config from "../../configs/Config";
import {Link} from "react-router-dom";

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            observations: [],
            page: 1,
            isLastPage: false,
            isLoading: false
        };
    }

    componentDidMount() {
        this.getData();
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

    render() {
        return (
            <Template>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="border rounded p-3">
                                <p className="m-0 text-center">Observations</p>
                                <div className="mt-3">
                                    {this.state.observations.length > 0 ?
                                        <div className="observation-list">
                                            {this.state.observations.map(value => (
                                                <Link to={Config.Links.Admin.ObservationDetail.replace(":id", value.id)} className="border text-decoration-none text-body mt-3" key={value.id}>
                                                    <div className="row">
                                                        <div className="col-4 d-flex align-items-center">
                                                            <img src={value.image} alt="Observation Image" className="w-100 h-100 object-fit-cover" />
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