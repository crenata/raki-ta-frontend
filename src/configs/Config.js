import axios from "axios";
import {loadProgressBar} from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import {toast} from "react-toastify";

const adminTokenKey = "admin_token";
const userTokenKey = "user_token";
const adminToken = localStorage.getItem(adminTokenKey);
const userToken = localStorage.getItem(userTokenKey);

const interceptorsError = (error, tokenKey) => {
    if (error.response.data) {
        if (error.response.data.status === 401) {
            toast.error(error.response.data.message);
            setTimeout(() => {
                window.location.href = tokenKey === adminTokenKey ? "/admin/login" : "/login";
            }, 1000);
        } else if (error.response.data.status === 500) {
            toast.error(error.response.data.message);
        } else {
            toast.warn(error.response.data.message);
        }
    } else {
        toast.error("Whoops, something went wrong!");
    }
};
const instanceAdmin = () => {
    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_BASE_URL}/admin`,
        headers: {
            authorization: `Bearer ${adminToken}`
        }
    });
    instance.interceptors.response.use(response => response, error => interceptorsError(error, adminTokenKey));
    loadProgressBar(null, instance);
    return instance;
};
const instanceUser = () => {
    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_BASE_URL}/user`,
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });
    instance.interceptors.response.use(response => response, error => interceptorsError(error, userTokenKey));
    loadProgressBar(null, instance);
    return instance;
};

const Config = {
    Routers: {
        NotFound: "*",
        Home: "//*",
        Login: "login",
        Register: "register",
        About: "about",
        ObservationAdd: "submit-observation",
        ObservationDetail: "observation/:id",
        Admin: {
            Index: "admin",
            Login: "login",
            ObservationDetail: "observation/:id"
        }
    },
    Links: {
        Home: "/",
        Login: "/login",
        Register: "/register",
        About: "/about",
        ObservationAdd: "/submit-observation",
        ObservationDetail: "/observation/:id",
        Admin: {
            Index: "/admin",
            Login: "/admin/login",
            ObservationDetail: "/admin/observation/:id"
        }
    },
    AdminTokenKey: adminTokenKey,
    UserTokenKey: userTokenKey,
    AdminToken: adminToken,
    UserToken: userToken,
    AxiosAdmin: instanceAdmin(),
    AxiosUser: instanceUser()
};

export default Config;