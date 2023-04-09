import React from "react";
import {Navbar} from "../component/navbar/Navbar";
import {Outlet} from "react-router-dom";
import {Footer} from "../component/footer/Footer";

export const AuthLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}