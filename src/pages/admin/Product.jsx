import React, {useEffect, useState} from "react";
import {Loader} from "../../component/loader/Loader";
import {Outlet} from "react-router-dom";
import {PageTitle} from "../../component/pageTitle/PageTitle";
import {Pagination} from "../../component/pagenation/Pageination";
import {embeddedGet, productService} from "../../api/service/Service";
import {deleteModal} from "../../api/modal/deleteModal";

export const Product = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(10)
    const [search, setSearch] = useState('')

    const getAll = async () => {
        try {
            await embeddedGet("product", setData, "data")
            setLoading(true)
        } catch (err) {
        }
    }

    const getCategory = async () => {
        try {
            await embeddedGet("category", setCategory, "embedded")
        } catch (err) {
        }
    }

    useEffect(() => {
        getAll()
        getCategory()
    }, [])

    const indexOfLastData = currentPage * prePage;
    const indexOfFirstData = indexOfLastData - prePage;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filter = data.filter(item => item.nameUz.toLowerCase().includes(search.toLowerCase()));

    const deleteProduct = async (e, id) => {
        await deleteModal(id, "product")
        getAll()
    }

    return (
        <>
            {loading ? (
                <div>
                    <Outlet/>

                    <div className="card">
                        <div className="card-header pb-0">
                            <div className='d-flex align-items-center justify-content-between'>
                                <PageTitle
                                    title="product"/>
                                <button className='btn btn-success' data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                    <i className='fas fa-plus-circle m-2'/>
                                    qo'shish
                                </button>
                                <CreateProduct getAll={getAll} category={category}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <input type="text"
                                           placeholder='Qidirish...'
                                           className='form-control'
                                           value={search} onChange={e => setSearch(e.target.value)}/>
                                </div>
                                <div className="card-body">
                                    <div className="table-reponsive">
                                        {data.length > 0 ? (
                                            <>
                                                {search.length === 0 ? (
                                                    <>
                                                        <ProductList currentData={currentData}
                                                                     deleteProduct={deleteProduct}
                                                                     getAll={getAll}
                                                                     category={category}
                                                        />
                                                        <Pagination totalData={data.length} perPage={prePage}
                                                                    paginate={paginate}/>
                                                    </>
                                                ) : (
                                                    filter.length > 0 ? (
                                                        <>
                                                            <ProductList currentData={filter}
                                                                         deleteProduct={deleteProduct}
                                                                         getAll={getAll}
                                                                         category={category}
                                                            />
                                                        </>
                                                    ) : (
                                                        <div className='text-center'>
                                                            <h3 className='card-title'>
                                                                <i className='fas fa-exclamation-circle me-2'/>
                                                                Qidiruv natijasida ma'lumot topilmadi
                                                            </h3>
                                                        </div>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <div className='text-center'>
                                                <h3 className='card-title'>
                                                    <i className='fas fa-exclamation-circle me-2'/>
                                                    product mavjud emas
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader/>
            )}
        </>
    )
}


const ProductList = ({currentData, deleteProduct, getAll, category}) => {
    return (
        <table className="table text-center table-hover">
            <tbody>
            <tr className='text-primary'>
                <th>#</th>
                <th>uz</th>
                <th>en</th>
                <th>ru</th>
                <th>price</th>
                <th colSpan={2}>malumotlar</th>
            </tr>
            {currentData.map((item, i) => (
                <tr key={i} className="fw-bold">
                    <td>{i + 1}</td>
                    <td>{item.nameUz}</td>
                    <td>{item.nameEn}</td>
                    <td>{item.nameRu}</td>
                    <td>{item.price}</td>
                    <td>
                        <div className='d-flex align-items-center justify-content-center'>
                            <button className='btn btn-primary text-white me-2' data-bs-toggle="offcanvas"
                                    data-bs-target={`#offcanvasRight${item.id}`} aria-controls="offcanvasRight">
                                <i className='fas fa-pen'/>
                            </button>
                            <UpdateProduct id={item.id} product={item} getAll={getAll} category={category}/>
                            <button className='btn btn-danger text-white' onClick={e => {
                                deleteProduct(e, item.id, item.nameUz)
                            }}>
                                <i className='fas fa-trash-alt'/>
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}


const CreateProduct = ({getAll, category}) => {
    const [nameUz, setUzName] = useState('')
    const [nameEn, setEnName] = useState('')
    const [nameRu, setRuName] = useState('')
    const [price, setPrice] = useState('')
    const [categoryId, setCategoryId] = useState()
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('')

    const createProduct = async (e) => {
        e.preventDefault()
        const data = {
            nameUz,
            nameEn,
            nameRu,
            price,
            categoryId,
            description,
            img
        }
        await productService(data, undefined)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight"
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Product qo'shish
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={createProduct}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>productning O'zbekcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: shirinliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>productning Inglizcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: shirinliklar'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>productning Ruscha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: shirinliklar'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>

                        <label htmlFor="price"
                               className='card-title mb-0'>productning Ruscha nomlanishini
                        </label>
                        <input type="number" className="form-control" id="price" placeholder='masalan : 10000'
                               value={price} onChange={e => setPrice(e.target.value)}/>

                        <label htmlFor="categoryId"
                               className='card-title mb-0'>categoryni tanlang
                        </label>
                        <select name="categoryId" id="categoryId" className="form-select" value={categoryId}
                                onChange={e => setCategoryId(e.target.value)}>
                            <option value="null" selected={true}>tanlang</option>
                            {category.map(item => (
                                <option value={item.id}>{item.nameUz}</option>
                            ))}
                        </select>

                        <label htmlFor="description"
                               className='card-title mb-0'>productning Ruscha nomlanishini
                        </label>
                        <textarea className="form-control" id="description" placeholder='masalan : blabla'
                                  value={description} onChange={e => setDescription(e.target.value)}/>

                        <label htmlFor="img"
                               className='card-title mb-0'>productning Ruscha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="img" placeholder='masalan : img'
                               value={img} onChange={e => setImg(e.target.value)}/>
                    </div>
                    <button className='btn btn-success d-block'>
                        <i className='fas fa-plus-circle me-2'/>
                        Qo'shish
                    </button>
                </form>
            </div>
        </div>
    )
}


const UpdateProduct = ({id, product, getAll, category}) => {
    const [nameUz, setUzName] = useState(product.nameUz)
    const [nameEn, setEnName] = useState(product.nameEn)
    const [nameRu, setRuName] = useState(product.nameRu)
    const [price, setPrice] = useState(product.price)
    const [categoryId, setCategoryId] = useState()

    const updateProduct = async (e) => {
        e.preventDefault()
        const data = {nameUz, nameEn, nameRu, price, categoryId}
        await productService(data, undefined)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id={`offcanvasRight${id}`}
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Productni tahrirlash
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={updateProduct}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>productning O'zbekcha nomlanishi
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: Yangiliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>productning Inglizcha nomlanishi
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: news'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>productning Ruscha nomlanishi
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: Новости'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>

                        <label htmlFor="price"
                               className='card-title mb-0'>productning Ruscha nomlanishini
                        </label>
                        <input type="number" className="form-control" id="price" placeholder='masalan : 10000'
                               value={price} onChange={e => setPrice(e.target.value)}/>

                        <label htmlFor="categoryId"
                               className='card-title mb-0'>categoryni tanlang
                        </label>
                        <select name="categoryId" id="categoryId" className="form-select" value={categoryId}
                                onChange={e => setCategoryId(e.target.value)}>
                            <option value="null" disabled={true}>tanlang</option>
                            {category.map(item => (
                                <option value={item.id}>{item.nameUz}</option>
                            ))}
                        </select>
                    </div>
                    <button className='btn btn-success d-block'>
                        <i className='fas fa-save me-2'/>
                        Saqlash
                    </button>
                </form>
            </div>
        </div>
    )
}