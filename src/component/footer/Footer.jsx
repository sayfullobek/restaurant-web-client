import React, {useEffect, useState} from "react";
import {embeddedGet} from "../../api/service/Service";
import {Link} from "react-router-dom";

export const Footer = () => {
    const [aware, setAware] = useState([])

    const getAware = async () => {
        try {
            await embeddedGet("aware", setAware, "data")
        } catch (err) {
        }
    }
    useEffect(() => {
        getAware().then(r => getAware())
    }, [])

    return (
        <div className="col-12"
             style={{backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-healthy-food-health-product-promotion-banner-image_166660.jpg")'}}>
            <div className="d-flex align-items-center justify-content-between" style={{
                backgroundColor: 'rgba(0, 0, 0, .7)', height: '100%', width: '100%', padding: '4rem'
            }}>
                <div className="col-12 col-md-4 col-sm-12 d-flex align-items-center justify-content-center flex-column"
                     style={{height: '100%', borderRight: '2px solid white'}}>
                    <h3 className="text-light">yo'llar</h3>
                    <Links aware={aware} status={"ABOUT"}/>
                </div>
                <div className="col-12 col-md-4 col-sm-12 d-flex align-items-center justify-content-center flex-column"
                     style={{height: '100%', borderRight: '2px solid white'}}>
                    <h3 className="text-light">Link</h3>
                    <Links aware={aware} status={"LINKS"}/>
                </div>
                <div className="col-12 col-md-4 col-sm-12 d-flex align-items-center justify-content-center flex-column"
                     style={{height: '100%'}}>
                    <h3 className="text-light">Tarmoqlar</h3>
                    <Links aware={aware} status={"TARMOQLAR"}/>
                </div>
            </div>
        </div>
    )
}

export const Links = ({aware, status}) => {
    return (
        aware.map(item => (
            item.awareStatus === status ? (
                status === "ABOUT" ?
                    <Link to={item.link} className="btn text-light">{item.nameUz}</Link>
                    :
                    status === "TARMOQLAR" ?
                        <a href={item.link} className="text-light">{item.nameUz}</a>
                        :
                        status === "LINKS" ?
                            <Link to={item.link} className="text-light">{item.nameUz}</Link>
                            : ""
            ) : (
                ""
            )
        ))
    )
}