import Axios from "axios";
import {ORDER_URL} from "../common/constants/api";

export const all = () => {
    return Axios.get(`${ORDER_URL}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
};

export const create = (product, receiver, address, ward_id, repository_id, money_taking = 0) => {
    return Axios.post(`${ORDER_URL}`, {
        product, receiver, address, ward_id, repository_id, money_taking
    }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
};

export const one = (id) => {
    return Axios.get(`${ORDER_URL}/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
};

export const update = (id, product, receiver, address, ward_id, repository_id, money_taking = 0) => {
    return Axios.put(`${ORDER_URL}/${id}`, {
        product, receiver, address, ward_id, repository_id, money_taking
    }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
};

export const destroy = (id) => {
    return Axios.delete(`${ORDER_URL}/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
};