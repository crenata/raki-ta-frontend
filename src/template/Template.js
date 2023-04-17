import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Context from "../contexts/Context";
import Loading from "../helpers/loadings/Loading";
import Navbar from "./Navbar";
import "./Template.css";

class Template extends PureComponent {
    render() {
        return (
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
    }
}

Template.propTypes = {
    className: PropTypes.string
};

export default Template;