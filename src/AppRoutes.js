import React, {PureComponent} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Config from "./configs/Config";
import RouteElement from "./helpers/RouteElement";
import NotFound from "./pages/NotFound";
import {default as UserLogin} from "./pages/user/Login";
import About from "./pages/About";
import Home from "./pages/Home";

class AppRoutes extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={Config.Routers.Login} element={<RouteElement component={UserLogin} />} />
                    <Route path={Config.Routers.About} element={<RouteElement component={About} />} />
                    <Route path={Config.Routers.Home} element={<RouteElement component={Home} />} />
                    <Route path={Config.Routers.NotFound} element={<RouteElement component={NotFound} />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default AppRoutes;