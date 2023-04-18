import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Context from "../../contexts/Context";
import Loading from "../../helpers/loadings/Loading";
import Navbar from "./Navbar";
import "../Template.css";
import Config from "../../configs/Config";
import IsEmpty from "../../helpers/IsEmpty";
import {Navigate} from "react-router-dom";

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
                                <div className="py-5">
                                    <div className="py-3">
                                        <div className="py-3">
                                            {this.props.children}
                                        </div>
                                    </div>
                                </div>
                            </>}
                        </CSSTransition>
                    </TransitionGroup>
                )}
            </Context.Consumer>
        );
        if (
            window.location.pathname.includes(Config.Links.Login) ||
            window.location.pathname.includes(Config.Links.Register) ||
            window.location.pathname.includes(Config.Links.Home)
        ) {
            return component;
        } else {
            if (IsEmpty(Config.UserToken)) return (
                <Navigate to={Config.Links.Login} />
            ); else return component;
        }
    }
}

Template.propTypes = {
    className: PropTypes.string
};

export default Template;