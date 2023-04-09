import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import '../../styles/css/admin.css'
import '../../styles/js/admin'
import {embeddedGet} from "../../api/service/Service";
import {Table} from "reactstrap";

export const Admin = () => {
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [aware, setAware] = useState([])
    const [user, setUser] = useState([])
    const [zakaz, setZakaz] = useState([])
    let allPrise = 0;

    for (let zakazElement of zakaz) {
        let a = zakazElement.price
        allPrise = allPrise + a
    }

    const getAll = async () => {
        try {
            embeddedGet("category", setCategory, "embedded")
            embeddedGet("product", setProduct, "data")
            embeddedGet("aware", setAware, "data")
            embeddedGet("auth", setUser, "data")
            embeddedGet("zakaz", setZakaz, "data")
        } catch (err) {
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <div className="row">
            <Cards title={"category"} size={category.length} about={"kategoriya bu mahsulotlarning bo'limi"}
                   link={"/admin/category"} linkName={"category"}/>
            <Cards title={"product"} size={product.length} about={"product bu mahsulot"} link={"/admin/product"}
                   linkName={"product"}/>
            <Cards title={"aware"} size={aware.length} about={"aware bu yo'llar"} link={"/admin/aware"}
                   linkName={"aware"}/>
            <Cards title={"user"} size={user.length}
                   about={"user bu foydalanuvchilar siz userlardan " + allPrise + "so'm foyda ko'rgansiz"} link={"null"}
                   linkName={"user"}/>
            <div className="col-12">
                {zakaz.length === 0 ? (
                    <>
                        <h1>malumot yoq</h1>
                    </>
                ) : (
                    <>
                        <Table className="col-10 text-center">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>ismi</th>
                                <th>familiyasi</th>
                                <th>telefon raqami</th>
                                <th>product nomi</th>
                                <th>product size</th>
                                <th>product price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {zakaz.map((item, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{item.user.firstName}</td>
                                    <td>{item.user.lastName}</td>
                                    <td>{item.user.phoneNumber}</td>
                                    <td>{item.product.nameUz}</td>
                                    <td>{item.nechtaProduct}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </div>
        </div>
    )
}

export const Cards = ({title, size, about, link, linkName}) => {
    return (
        <div className="card col-12 col-md-5 col-sm-5 m-5 mt-2">
            <h5 className="card-header">{title}</h5>
            <div className="card-body">
                <h1 className="card-title" style={{fontSize: '50px'}}>{size}</h1>
                <p className="card-text">{about}</p>
                {link !== "null" ?
                    <Link to={link} className="btn btn-success">{linkName}</Link>
                    :
                    <Link to={"/admin"} className="btn btn-success">{linkName}</Link>
                }
            </div>
        </div>
    )
}