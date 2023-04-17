import React, {PureComponent} from "react";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Config from "./configs/Config";
import RouteElement from "./helpers/RouteElement";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import {default as UserLogin} from "./pages/user/auth/Login";
import {default as UserRegister} from "./pages/user/auth/Register";
import {default as UserHome} from "./pages/Home";
import {default as AdminHome} from "./pages/admin/Home";
import {default as AdminLogin} from "./pages/admin/auth/Login";
import ObservationAdd from "./pages/user/observation/ObservationAdd";

class AppRoutes extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={Config.Routers.About} element={<RouteElement component={About} />} />
                    <Route path={Config.Routers.Login} element={<RouteElement component={UserLogin} />} />
                    <Route path={Config.Routers.Register} element={<RouteElement component={UserRegister} />} />
                    <Route path={Config.Routers.Home} element={<RouteElement component={UserHome} />} />
                    <Route path={Config.Routers.SubmitObservation} element={<RouteElement component={ObservationAdd} />} />
                    <Route path={Config.Routers.Admin.Index} element={<Outlet />}>
                        <Route index element={<RouteElement component={AdminHome} />} />
                        <Route path={Config.Routers.Admin.Login} element={<RouteElement component={AdminLogin} />} />
                    </Route>
                    <Route path={Config.Routers.NotFound} element={<RouteElement component={NotFound} />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default AppRoutes;