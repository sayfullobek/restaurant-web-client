import React from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {User} from "../pages/user/User";
import {NotFound} from "../pages/NotFound";

export const UserLayout = () => {
    const location = useLocation()
    const storage = localStorage
    const role = localStorage.getItem("role")
    const navigate = useNavigate()

    if (storage.length === 0) {
        if ((location.pathname === "/user")) {
            navigate("/")
        }
    }
    return (
        <div>
            {role === "Admin" || role === undefined ? (
                <NotFound/>
            ) : (
                <>
                    <User/>
                    <Outlet/>
                </>
            )
            }
        </div>
    )
}