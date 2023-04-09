import React from "react";
import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="text-center">
            <h1>404 not found</h1>
            <Link className="btn btn-link" to={"/"}>asosiy menyuga qaytish</Link>
        </div>
    )
}