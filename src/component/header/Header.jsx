import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from "../../handlers/auth";

export const Header = ({clickToggle}) => {
    const navigate = useNavigate()

    return (
        <header id="header"
                className="header fixed-top d-flex align-items-center">
            <div className="col-12 d-flex align-items-center justify-content-around">
                <div className="col-1 col-md-1 d-flex align-items-center justify-content-center">
                    <i className="fas fa-bars toggle-sidebar-btn text-success" style={{fontSize: '25px'}}
                       onClick={clickToggle}/>
                </div>
                <div className="col-9 col-md-10 d-flex align-items-center justify-content-center">
                    <Link to="/admin" className="logo">
                    <span className="text-uppercase">
                        <h1 className="back">Dashboard</h1>
                    </span>
                    </Link>
                </div>
                <div className="col-2 col-md-1 d-flex align-items-center justify-content-center">
                    <a className="dropdown-item d-flex align-items-center" style={{cursor: 'pointer'}}
                       onClick={() => {
                           logout(navigate)
                       }}>
                        <i className="fas fa-arrow-left text-success m-1"/>
                        <span className="text-success">Chiqish</span>
                    </a>
                </div>
            </div>
        </header>
    )
}