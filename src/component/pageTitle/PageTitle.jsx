import React from 'react'
import {Link} from 'react-router-dom'

export const PageTitle = ({title}) => {
    return (
        <div className="pagetitle">
            <h1>{title}</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link
                        to="/admin">dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">{title}</li>
                </ol>
            </nav>
        </div>
    )
}