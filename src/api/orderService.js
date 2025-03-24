import axios from "axios"
let baseUrl = "https://node-project-q37j.onrender.com/api/order";



export const addOrder = (order)=>{
    return axios.post(baseUrl,order);
}



// export const loginUser =(user)=>{
//     return axios.post(baseUrl+"/login",user)
// }