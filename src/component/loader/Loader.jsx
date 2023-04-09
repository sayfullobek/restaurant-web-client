import React from "react";

export const Loader = () => {
    return (
        <div id='loader-container' className='d-flex align-items-center justify-content-center'>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}