import React, {useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom'
import {Home} from '../pages/home/Home'
import '../styles/css/home.css'
import {Navbar} from "../component/navbar/Navbar";
import {embeddedGet} from "../api/service/Service";
import {MenyuJon} from "../pages/home/MenyuJon";
import {Footer} from "../component/footer/Footer";

export const HomeLayout = ({t, changeLanguage}) => {
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState('')


    const getProduct = async () => {
        try {
            await embeddedGet("product", setProduct, "data")
        } catch (err) {
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const filter = product.filter(item => item.nameUz.toLowerCase().includes(search.toLowerCase()));
    return (
        <>
            <Navbar/>

            <Home search={search} setSearch={setSearch}
            />
            <MenyuJon search={search} filter={filter}/>
            <Outlet/>
            <Footer/>
        </>
    )
}
