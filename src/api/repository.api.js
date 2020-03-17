import Axios from "axios";
import {REPO_URL} from "../common/constants/api";

export const create = (
    name, phone, contact, address, ward, district, province, main_repo = false
) => {
    return Axios.post(`${REPO_URL}`, {
        name,
        phone,
        contact,
        address,
        ward,
        district,
        province,
        main_repo
    }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });
};

export const all = () => {
    return Axios.get(`${REPO_URL}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });
};

export const one = (id) => {
    return Axios.get(`${REPO_URL}/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });
};

export const update = (
    id,
    name,
    phone,
    contact,
    address,
    ward,
    district,
    province,
    main_repo
) => {
    return Axios.put(
        `${REPO_URL}/${id}`,
        {
            name, phone, contact, address, ward, district, province, main_repo
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
};

export const destroy = (id) => {
    return Axios.delete(`${REPO_URL}/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });
};