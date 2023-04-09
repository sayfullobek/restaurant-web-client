import React from "react";
import {deleteService} from "../service/Service";

export const deleteModal = async (id, status) => {
    try {
        let confirm = window.confirm("O'chirasizmi")
        if (confirm) {
            await deleteService(id, status)
        }
    } catch (err) {
    }
}