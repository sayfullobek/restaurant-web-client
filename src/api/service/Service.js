import {baseConfigurer} from "../baseConfig/baseConfigurer";
import {toast} from "react-toastify";

export const categoryService = async (data, id) => {
    if (data !== undefined) {
        const check = {
            nameUz: data.nameUz.trim().length === 0,
            nameEn: data.nameEn.trim().length === 0,
            nameRu: data.nameRu.trim().length === 0
        }
        if (check.nameUz || check.nameEn || check.nameRu) {
            toast.error("malumotlar bo'sh bo'lmasligi kerak")
            return
        }
    }
    try {
        if (id === "" || id === null || id === undefined || id === "undefined") {
            await baseConfigurer.doPost("category", data)
            toast.success("category saqlandi")
        } else {
            await baseConfigurer.doPut(id, "category", data)
            toast.success("category tahrirlandi")
        }
        if (data) {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        if (err.response.status === 409) {
            toast.error("bunday malumot mavjud")
        } else {
            toast.error("xatolik")
        }
    }
}


export const productService = async (data, id) => {
    if (data !== undefined) {
        const check = {
            nameUz: data.nameUz.trim().length === 0,
            nameEn: data.nameEn.trim().length === 0,
            nameRu: data.nameRu.trim().length === 0,
            price: data.price === 0
        }
        if (check.nameUz || check.nameEn || check.nameRu || check.price) {
            toast.error("malumotlar bo'sh bo'lmasligi kerak")
            return
        }
    }
    try {
        if (id === "" || id === null || id === undefined || id === "undefined") {
            await baseConfigurer.doPost("product", data)
            toast.success("product saqlandi")
        } else {
            await baseConfigurer.doPut(id, "product", data)
            toast.success("product tahrirlandi")
        }
        if (data) {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        if (err.response.status === 409) {
            toast.error("bunday malumot mavjud")
        } else {
            toast.error("xatolik")
        }
    }
}


export const awareService = async (data, id) => {
    if (data !== undefined) {
        const check = {
            nameUz: data.nameUz.trim().length === 0,
            nameEn: data.nameEn.trim().length === 0,
            nameRu: data.nameRu.trim().length === 0,
            link: data.link.trim().length === 0
        }
        if (check.nameUz || check.nameEn || check.nameRu || check.data) {
            toast.error("malumotlar bo'sh bo'lmasligi kerak")
            return
        }
    }

    if (data.awareStatus === "null" || data.awareStatus === null || data.awareStatus === undefined || data.awareStatus === "undefined") {
        return toast.error("statusni tanlash shart")
    }

    try {
        if (id === "" || id === null || id === undefined || id === "undefined") {
            await baseConfigurer.doPost("aware", data)
            toast.success("aware saqlandi")
        } else {
            await baseConfigurer.doPut(id, "aware", data)
            toast.success("aware tahrirlandi")
        }
        if (data) {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        if (err.response.status === 409) {
            toast.error("bunday malumot mavjud")
        } else {
            toast.error("xatolik")
        }
    }
}

export const zakazQil = async (data, path) => {
    if (data.nechtaProduct.length === 0) {
        return null
    }
    try {
        const res = await baseConfigurer.doPost("zakaz", data)
        if (res.status === 200) {
            return path('/admin')
        }
    } catch (err) {
    }
}

export const embeddedGet = async (url, setData, status) => {
    try {
        if (status === "data") {
            const res = await baseConfigurer.doGet(url)
            setData(res.data)
        } else if (status === "embedded") {
            const res = await baseConfigurer.doGet(url)
            setData(res.data._embedded.list)
        }
    } catch (err) {
    }
}

export const deleteService = async (id, status) => {
    try {
        await baseConfigurer.doDelete(id, status)
        toast.success("malumot o'chirlidi")
    } catch (err) {
        toast.error("xatolik")
    }
}
