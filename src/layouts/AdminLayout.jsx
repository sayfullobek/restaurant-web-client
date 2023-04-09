import React, {useEffect, useState} from "react";
import {Admin} from "../pages/admin/Admin";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Sidebar} from "../component/sidebar/Sidebar";
import {Header} from "../component/header/Header";
import {ToastContainer} from "react-toastify";
import {isAuthenticated} from "../handlers/auth";
import {NotFound} from "../pages/NotFound";

export const AdminLayout = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)
    const role = localStorage.getItem("role")

    const location = useLocation()

    if ((location.pathname === '/admin' ||
        location.pathname === '/admin/category' ||
        location.pathname === '/admin/product' ||
        location.pathname === '/admin/aware') && role === 'User' || role === "undefined") {
        navigate('/user')
    }

    useEffect(() => {
        const redirectAdminPanel = () => {
            const token = localStorage.getItem('token');
            const isAuth = isAuthenticated(token)
            if (!isAuth) return navigate('/')
            setLoading(true)
        }
        redirectAdminPanel()
    })

    const clickToggle = () => {
        setToggle(!toggle)
    }

    return (
        <>
            {role === "Admin" ? (
                <>
                    <Header clickToggle={clickToggle}/>
                    <Sidebar clickToggle={clickToggle} toggle={toggle}/>
                    <main id='main' className={'main'} style={{marginLeft: toggle && '0'}}>
                        {loading ? (
                            <>
                                <Outlet/>
                                <ToastContainer/>
                            </>
                        ) : (
                            <div id="loader-container" className='d-flex align-items-center justify-content-center'>
                                <div className="spinner-border">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </main>
                </>
            ) : (
                <>
                    <NotFound/>
                </>
            )}
        </>
    )
}