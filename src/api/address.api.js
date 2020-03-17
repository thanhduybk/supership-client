import Axios from "axios";
import {DISTRICT_URL, PROVINCE_URL, WARD_URL} from "../common/constants/api";

export const allProvinces = () => {
    return Axios.get(`${PROVINCE_URL}`);
};

export const allDistricts = (province) => {
    return Axios.get(`${DISTRICT_URL}`, {
        params: {
            province
        }
    })
};

export const allWards = (province, district) => {
    return Axios.get(`${WARD_URL}`, {
        params: {
            province, district
        }
    })
};