import axios from "axios"

let baseUrl = "https://node-project-q37j.onrender.com/api/furniture";

export const getAllfurniture = (page) =>{
    return axios.get(baseUrl+"?limit=12&page="+page);
}

export const getTotalPage = ()=>{
    return axios.get(baseUrl+"/totalPages?limit=12");
}

export const addFurniture = (furniture,token)=>{
    console.log("furnition data:"+furniture)
    console.log("token:"+token)
    return axios.post(baseUrl,furniture,{
        headers: {
            authorization: token,
            'Content-Type': 'multipart/form-data'
        }
});
}

export const deleteFurniture = (furniture,token)=>{

    return axios.delete(baseUrl+"/"+furniture._id,{
        headers: {
            authorization: token
        }
})
}

export const updateFurniture = (furniture,token)=>{
    console.log(furniture)
    return axios.put(baseUrl+"/"+furniture._id, furniture,{
        headers: {
            authorization: token,
             'Content-Type': 'multipart/form-data'

        }
})
}
