import React from "react";
import {toast} from "react-toastify";
import {baseConfigurer} from "../baseConfig/baseConfigurer";
import {baseUrl} from "../baseUrl/BaseUrl";

export const login = async (data) => {
    const check = {
        phoneNumber: data.phoneNumber.trim().length === 0,
        password: data.password.trim().length === 0
    }
    if (check.phoneNumber || check.password) {
        toast.warning("malumot kirgizing")
        return
    }

    try {
        const res = await baseConfigurer.doPost("auth/login", data)
        if (res.status === 200) {
            const roles = res.data.user.roles.length>1?"Admin":"User"
            localStorage.setItem('token', res.data.resToken.body)
            localStorage.setItem('tokenType', res.data.resToken.tokenType)
            localStorage.setItem('firstName', res.data.user.firstName)
            localStorage.setItem('lastName', res.data.user.lastName)
            localStorage.setItem('role', roles)
            localStorage.setItem('id', res.data.user.id)
            toast.success("kuting...")
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        console.log(await baseConfigurer.doPost("auth/login", data))
        if (err.response === undefined) {
            return toast.error("internetga ulaning oka")
        }else if (err.response.status === 401){
            return toast.error("sizga kirish mumkin emas")
        }
    }
}

export const register = async (data, navigate) => {
    const check = {
        firstName: data.firstName.trim().length === 0,
        lastName: data.lastName.trim().length === 0,
        phoneNumber: data.phoneNumber.trim().length === 0,
        email: data.email.trim().length === 0,
        password: data.password.trim().length === 0,
        prePassword: data.prePassword.trim().length === 0
    }
    if (check.firstName || check.lastName || check.phoneNumber || check.email || check.password || check.prePassword) {
        return toast.warning("malumot kirgizing")
    }

    try {
        await baseConfigurer.doPost("auth/register", data)
        toast.success("registered...")
        navigate('/auth/login')
    } catch (err) {
        toast.error("xatolik")
    }
}