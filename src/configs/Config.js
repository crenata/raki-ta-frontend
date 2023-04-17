import axios from "axios";
import {loadProgressBar} from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});
loadProgressBar(null, instance);

const Config = {
    Routers: {
        NotFound: "*",
        Home: "//*",
        Login: "login",
        Register: "register",
        About: "about",
        SubmitObservation: "submit-observation"
    },
    Links: {
        Home: "/",
        Login: "/login",
        Register: "/register",
        About: "/about",
        SubmitObservation: "/submit-observation"
    },
    Axios: instance
};

export default Config;