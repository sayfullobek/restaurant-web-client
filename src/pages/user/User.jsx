import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../handlers/auth";
import {embeddedGet} from "../../api/service/Service";
import {Footer} from "../../component/footer/Footer";

export const User = () => {
    const navigate = useNavigate()
    const name = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const id = localStorage.getItem("id")
    const [data, setData] = useState([])
    const [userId, setUserId] = useState('')


    const getZakaz = async () => {
        try {
            await embeddedGet("zakaz", setData, "data")
        } catch (err) {
        }
    }

    useEffect(() => {
        getZakaz().then(r => getZakaz())
        data.map(item => (setUserId(item.user.id)))
    }, [])

    return (
        <>
            <div>
                <nav className="d-flex align-items-center justify-content-between"
                     style={{height: '80px', boxShadow: '0 0 10px .05px black'}}>
                    <h3 className="text-success">{name} {lastName}</h3>
                    <div className="col-2 d-flex align-items-center justify-content-evenly">
                        <Link className="text-success" to="/">menyu</Link>
                        <button className="btn btn-success" onClick={() => logout(navigate)}>logout</button>
                    </div>
                </nav>
                <div className="col-12 row d-flex align-items-center justify-content-center mt-4">
                    {data.map(item => (
                        <>
                            {item.user.id === id ?
                                <>
                                    <div style={{zIndex: '10'}}
                                         className="card col-12 col-md-4 col-sm-6 col-lg-3 col-xl-3 col-xxl-3">
                                        <div className="card-body">
                                            <img
                                                style={{width:'100%'}}
                                                src={item.product.img}
                                                className="card-img-top" alt={item.id}/>
                                            <h6 className="card-title">mahsulotning nomi : {item.product.nameUz}</h6>
                                            <h6 className="card-title">sotib olingan sana :
                                                <br/>{item.createdAt.substring(0, 10)}</h6>
                                            <h6 className="card-title">sotib olingan vaqt :
                                                {parseInt(item.createdAt.substring(11, 13))+3+item.createdAt.substring(13, 19)}</h6>
                                            <h6 className="card-title">mahsulot haqidagi ma'lumot
                                                : {item.product.description}</h6>
                                            <h6 className="card-title">umumiy xisob-kitob : {item.price}</h6>
                                        </div>
                                    </div>
                                </>
                                :
                                <>

                                </>
                            }
                        </>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    )
}