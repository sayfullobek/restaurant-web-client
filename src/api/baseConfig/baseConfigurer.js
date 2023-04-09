import axios from "axios";
import {baseUrl} from "../baseUrl/BaseUrl";
import data from "bootstrap/js/src/dom/data";

export const baseConfigurer = {
    doPost: (url, data) => axios.post(
        baseUrl + "/" + url, data
    ),
    doGet: (url) => axios.get(
        baseUrl + "/" + url
    ),
    doPut: (id, url, data) => axios.put(
        baseUrl + "/" + url + "/" + id, data
    ),
    doDelete: (id, url) => axios.delete(
        baseUrl + "/" + url + "/" + id
    ),
    doGetOne: (id, url) => axios.get(
        baseUrl + "/" + url + id
    )
}