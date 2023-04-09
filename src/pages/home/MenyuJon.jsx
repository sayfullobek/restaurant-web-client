import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Loader} from "../../component/loader/Loader";
import {embeddedGet} from "../../api/service/Service";
import data from "bootstrap/js/src/dom/data";

export const MenyuJon = ({filter, search}) => {
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [productByCategory, setProductByCategory] = useState([])
    let [all, setAll] = useState(true)
    const storage = localStorage;

    const getCategorys = async () => {
        try {
            await embeddedGet("category", setCategory, "embedded")
            setLoading(true)
        } catch (err) {
        }
    }
    const getProducts = async () => {
        try {
            await embeddedGet("product", setProduct, "data")
            setLoading(true)
        } catch (err) {
        }
    }

    const getProductByCategory = async (id, st) => {
        try {
            if (id === undefined) {
                setAll(true)
            } else {
                await embeddedGet("product/getByCategory/" + id, setProductByCategory, "data")
                setAll(false)
            }
        } catch (err) {
        }
    }

    useEffect(() => {
        getCategorys().then(r => getCategorys())
        getProducts().then(r => getProducts())
    }, [])

    return (
        <>
            {loading ? (
                <div className="col-12 d-flex align-items-center justify-content-center flex-column">
                    <div className="boxs col-10" style={{margin:'20px 0'}}>
                        {
                            category.length === 0 ? <h1 className="text-center">kategoriyalar mavjud emas</h1> :
                                <button className="cards col-4 col-md-2 col-sm-3"
                                        onClick={() => getProductByCategory(undefined, "all")}>
                                    <h5 className="text-light">hamma taomlar</h5>
                                </button>
                        }
                        {category.map(item => (
                            <button className="cards col-4 col-md-2 col-sm-3"
                                    onClick={() => getProductByCategory(item.id, "st")}>
                                <h5 className="text-light">{item.nameUz}</h5>
                            </button>
                        ))}
                    </div>
                    <div className="col-10 row">
                        {all === true ?
                            search.length === 0 ? (
                                getProductAll(product)
                            ) : (
                                getProductAll(filter)
                            )
                            :
                            <></>
                        }
                        {all === false && productByCategory.length > 0 ? (
                            getProductAll(productByCategory)
                        ) : (
                            <h1>{all === false ? "malumot mavjud emas" : ""}</h1>
                        )}
                    </div>
                </div>
            ) : (
                <Loader/>
            )}
        </>
    )
}

const getProductAll = (data) => {
    const role = localStorage.getItem("role")
    return (
        data.map(item1 => (
            <div style={{zIndex: '10', padding:'1rem'}} className="card1 col-12 col-md-4 col-sm-6 col-lg-3 col-xl-3 col-xxl-3">
                <img
                    src={item1.img}
                    className="card-img-top" alt={item1.id}/>
                <div className="card-body">
                    <h5 className="card-title">{item1.nameUz}</h5>
                    <p className="card-text">{item1.description}</p>
                    <p className="card-text">{item1.price}</p>
                    <Link to={role==="Admin"?'/admin':`/z/${item1.id}`} className="btn btn-success">{item1.category.nameUz}</Link>
                </div>
            </div>
        ))
    )
}