import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Context from "../../contexts/Context";
import Loading from "../../helpers/loadings/Loading";
import Navbar from "./Navbar";
import "../Template.css";
import IsEmpty from "../../helpers/IsEmpty";
import Config from "../../configs/Config";

class Template extends PureComponent {
    render() {
        const component = (
            <Context.Consumer>
                {(context) => (
                    <TransitionGroup className={`app position-relative ${this.props.className}`}>
                        <CSSTransition
                            key={context.loading}
                            timeout={1000}
                            classNames="fade-out"
                        >
                            {context.loading ? <Loading /> : <>
                                <Navbar />
                                <div className="py-3">
                                    {this.props.children}
                                </div>
                            </>}
                        </CSSTransition>
                    </TransitionGroup>
                )}
            </Context.Consumer>
        );
        if (window.location.pathname.includes(Config.Links.Admin.Login)) {
            return component;
        } else {
            if (IsEmpty(Config.AdminToken)) return (
                <Navigate to={Config.Links.Admin.Login} />
            ); else return component;
        }
    }
}

Template.propTypes = {
    className: PropTypes.string
};

export default Template;