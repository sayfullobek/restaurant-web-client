import React, {useEffect, useState} from "react";
import {Loader} from "../../component/loader/Loader";
import {Outlet} from "react-router-dom";
import {PageTitle} from "../../component/pageTitle/PageTitle";
import {Pagination} from "../../component/pagenation/Pageination";
import {categoryService, embeddedGet} from "../../api/service/Service";
import {deleteModal} from "../../api/modal/deleteModal";

export const Category = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(10)
    const [search, setSearch] = useState('')

    const getAll = async () => {
        try {
            await embeddedGet("category", setData, "embedded")
            setLoading(true)
        } catch (err) {
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    const indexOfLastData = currentPage * prePage;
    const indexOfFirstData = indexOfLastData - prePage;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filter = data.filter(item => item.nameUz.toLowerCase().includes(search.toLowerCase()));

    const deleteCategory = async (e, id) => {
        await deleteModal(id, "category")
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
                                    title="category"/>
                                <button className='btn btn-success' data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                    <i className='fas fa-plus-circle m-2'/>
                                    qo'shish
                                </button>
                                <CreateCategory getAll={getAll}/>
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
                                                        <CategoryList currentData={currentData}
                                                                      deleteCategory={deleteCategory}
                                                                      getAll={getAll}
                                                        />
                                                        <Pagination totalData={data.length} perPage={prePage}
                                                                    paginate={paginate}/>
                                                    </>
                                                ) : (
                                                    filter.length > 0 ? (
                                                        <>
                                                            <CategoryList currentData={filter}
                                                                          deleteCategory={deleteCategory}
                                                                          getAll={getAll}
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
                                                    category mavjud emas
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


const CategoryList = ({currentData, deleteCategory, getAll}) => {
    return (
        <table className="table text-center table-hover">
            <tbody>
            <tr className='text-primary'>
                <th>#</th>
                <th>uz</th>
                <th>en</th>
                <th>ru</th>
                <th colSpan={2}>malumotlar</th>
            </tr>
            {currentData.map((item, i) => (
                <tr key={i} className="fw-bold">
                    <td>{i + 1}</td>
                    <td>{item.nameUz}</td>
                    <td>{item.nameEn}</td>
                    <td>{item.nameRu}</td>
                    <td>
                        <div className='d-flex align-items-center justify-content-center'>
                            <button className='btn btn-primary text-white me-2' data-bs-toggle="offcanvas"
                                    data-bs-target={`#offcanvasRight${item.id}`} aria-controls="offcanvasRight">
                                <i className='fas fa-pen'/>
                            </button>
                            <UpdateCategory id={item.id} category={item} getAll={getAll}/>
                            <button className='btn btn-danger text-white' onClick={e => {
                                deleteCategory(e, item.id, item.nameUz)
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


const CreateCategory = ({getAll}) => {
    const [nameUz, setUzName] = useState('')
    const [nameEn, setEnName] = useState('')
    const [nameRu, setRuName] = useState('')

    const createCategory = async (e) => {
        e.preventDefault()
        const data = {
            nameUz,
            nameEn,
            nameRu
        }

        await categoryService(data)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight"
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Kurs qo'shish
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={createCategory}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>categoryning O'zbekcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: shirinliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>categoryning Inglizcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: shirinliklar'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>categoryning Ruscha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: shirinliklar'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>
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


const UpdateCategory = ({id, category, getAll}) => {
    const [nameUz, setUzName] = useState(category.nameUz)
    const [nameEn, setEnName] = useState(category.nameEn)
    const [nameRu, setRuName] = useState(category.nameRu)

    const updateCategory = async (e) => {
        e.preventDefault()
        const data = {nameUz, nameEn, nameRu}
        await categoryService(data, id)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id={`offcanvasRight${id}`}
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Kursni tahrirlash
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={updateCategory}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>categoryning O'zbekcha nomlanishi
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: Yangiliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>categoryning Inglizcha nomlanishi
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: news'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>categoryning Ruscha nomlanishi
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: Новости'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>
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