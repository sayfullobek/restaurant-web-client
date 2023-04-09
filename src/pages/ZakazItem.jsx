import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {embeddedGet, zakazQil} from "../api/service/Service";
import {Loader} from "../component/loader/Loader";
import {Register} from "./Register";
import {Navbar} from "../component/navbar/Navbar";
import {Footer} from "../component/footer/Footer";
import {Admin} from "./admin/Admin";

export const ZakazItem = () => {
    const useId = useParams().id
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const userId = localStorage.getItem("id")
    const path = useNavigate()


    const getOneProduct = async () => {
        try {
            await embeddedGet("product/" + useId, setProduct, "data")
            setLoading(true)
        } catch (err) {
        }
    }

    useEffect(() => {
        getOneProduct().then(r => getOneProduct())
    }, [])

    return (
        <>
            {loading ? (
                <>
                    {
                        localStorage.length !== 0 ? (
                            <div style={{height: '100vh'}}
                                 className="bg-success col-12 d-flex align-items-center justify-content-center">
                                <ZakazProduct product={product} userId={userId} path={path}/>
                            </div>
                        ) : (
                            <>
                                <Navbar/>
                                <Register/>
                                <Footer/>
                            </>
                        )
                    }
                </>
            ) : (
                <Loader/>
            )}
        </>
    )
}

const ZakazProduct = ({product, userId, path}) => {
    const [nechtaProduct, setNechtaProduct] = useState('')

    const zakaz = async (e) => {
        e.preventDefault()
        const productId = product.id
        const data = {
            productId,
            nechtaProduct,
            userId
        }
        await zakazQil(data, path)
    }
    return (
        <div className="col-8"
             style={{
                 backgroundColor: 'green',
                 padding: '1rem 3rem 3rem 3rem',
                 height: '50%',
                 boxShadow: '0 0 20px .1px black',
                 borderRadius: '20px'
             }}>
            <h1 className="text-center text-light">{product.nameUz}</h1>
            <br/>
            <div className="col-12 d-flex">
                <div className="col-6">
                    <img style={{width: '50%'}}
                         src={product.img}
                         className="card-img-top" alt={""}/>
                </div>
                <form autoComplete='off' onSubmit={zakaz}>
                    <input type="number" className="col-6 form-control" placeholder={"nechta product sotib olasiz"}
                           value={nechtaProduct} onChange={e => setNechtaProduct(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <button className="btn btn-success">sotib olish</button>
                    <Link to={"/"} className="btn btn-success m-2">asosiy sahifaga qaytish</Link>
                </form>
            </div>
        </div>
    )
}