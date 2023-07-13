import React, {PureComponent} from "react";
import Template from "../template/user/Template";
import Config from "../configs/Config";
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
                Config.AxiosUser.get(`observation/get?page=${this.state.page}`).then(response => {
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
                    <h3 className="m-0 text-center">Observations</h3>
                    <div className="">
                        {this.state.observations.length > 0 ?
                            <div id="observation-list">
                                <div className="row">
                                    {this.state.observations.map(value => (
                                        <div className="col-12 col-md-4 mt-3" key={value.id}>
                                            <div className="card">
                                                <img src={value.images[0]?.image} alt="Observation Image"
                                                     className="card-img-top object-fit-cover" style={{height: "16rem"}}/>
                                                <div className="card-body">
                                                    <h5 className="card-title">{value.name}</h5>
                                                    <p className="card-text">{value.location}</p>
                                                    <Link to={Config.Links.ObservationDetail.replace(":id", value.id)}
                                                          className="btn btn-primary">
                                                        See Detail
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> :
                            <p className="mt-3 text-center">Empty</p>}
                    </div>
                </div>
            </Template>
        );
    }
}

export default Home;
