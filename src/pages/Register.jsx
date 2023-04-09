import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer} from 'react-toastify';
import {register} from "../api/service/AuthService";

export const Register = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [prePassword, setPrePassword] = useState('')

    const registerHandler = async (e) => {
        e.preventDefault()

        const params = {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            prePassword
        }
        await register(params, navigate)
    }
    return (
        <div style={{height:'120vh', top: '0', padding:'80px 0 0 0', backgroundImage:'url("https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000")', backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat'}}
             className='position-relative d-flex align-items-center justify-content-center'
             id='login-container'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-12">
                        <form onSubmit={registerHandler} className="card border-top border-5 border-success">
                            <div className="card-header text-center">
                                <h1 className='fw-bold text-dark'>restaran register</h1>
                            </div>
                            <div className="card-body">
                                <div className='mb-3'>
                                    <label htmlFor="firstName" className='mb-2 fw-bold'>firstName</label>
                                    <input type="text" className='form-control' id='firstName'
                                           placeholder='firstName' autoComplete='off' value={firstName}
                                           onChange={e => setFirstName(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="lastName" className='mb-2 fw-bold'>lastName</label>
                                    <input type="text" className='form-control' id='lastName'
                                           placeholder='lastName' autoComplete='off' value={lastName}
                                           onChange={e => setLastName(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="phoneNumber" className='mb-2 fw-bold'>PhoneNumber</label>
                                    <input type="text" className='form-control' id='phoneNumber'
                                           placeholder='phoneNumber' autoComplete='off' value={phoneNumber}
                                           onChange={e => setPhoneNumber(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="email" className='mb-2 fw-bold'>email</label>
                                    <input type="text" className='form-control' id='email'
                                           placeholder='email' autoComplete='off' value={email}
                                           onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="password" className='mb-2 fw-bold'>Password</label>
                                    <input type="password" className='form-control' id='password' placeholder='password'
                                           autoComplete='off' value={password}
                                           onChange={e => setPassword(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="prePassword" className='mb-2 fw-bold'>prePassword</label>
                                    <input type="prePassword" className='form-control' id='prePassword'
                                           placeholder='prePassword'
                                           autoComplete='off' value={prePassword}
                                           onChange={e => setPrePassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="card-footer col-12 d-flex align-items-center justify-content-between">
                                <div>
                                    <Link className="btn btn-success" style={{margin: '0 10px'}}
                                          to={"/auth/login"}>login</Link>
                                    <Link className="btn btn-success" to={"/"}>asosiy menyuga qaytish</Link>
                                </div>
                                <button className='btn btn-success btn-block'>
                                    Kirish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}