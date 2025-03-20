import axios from "axios"
let baseUrl = "https://node-project-q37j.onrender.com/api/furniture";

export const getAllfurniture = (page) =>{
    return axios.get(baseUrl+"?limit=12&page="+page);
}

export const getTotalPage = ()=>{
    return axios.get(baseUrl+"/totalPages?limit=12");
}

export const addFurniture = (furniture)=>{
    return axios.post(baseUrl,furniture);
}

export const deleteFurniture = (furniture)=>{
    return axios.delete(baseUrl+"/"+furniture._id)
}

export const updateFurniture = (furniture)=>{
    return axios.put(baseUrl+"/"+furniture._id, furniture)
}
