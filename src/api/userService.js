import axios from "axios"

let baseUrl = "https://node-project-q37j.onrender.com/api/user";

// export const getAllfurniture = (page) =>{
//     return axios.get(baseUrl+"?limit=16&page="+page);
// }

// export const getTotalPage = ()=>{
//     return axios.get(baseUrl+"/totalPages?limit=16");
// }

export const addUser = (user)=>{
    return axios.post(baseUrl+"/register",user);
}

export const loginUser =(userName, password)=>{
    return axios.post(baseUrl+"/login",{userName,password})
}