import axios from "../axios/axios";


export const addProductApi = (data) => {
    return axios.post("/add-product", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getProductsApi = () => {
    return axios.get("/get-products")
}