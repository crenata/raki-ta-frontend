import React from "react";

const Context = React.createContext({
    admin_token: localStorage.getItem("admin_token"),
    user_token: localStorage.getItem("user_token"),
    loading: true
});

export default Context;