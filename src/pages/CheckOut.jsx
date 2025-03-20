import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../api/orderService";

const CheckOut = () => {

    // let disp=useDispatch();
    let navigate=useNavigate();
    let user = useSelector(state=> state.user.currentUser)

    if(!user)
        navigate("/login")
    let arr = useSelector(state => state.cart.arr);
    let [address, setAddress] = useState();

    function newOrderProducts(){
        let newArr= [];
        let newObj ={};
        arr.forEach(item => {
            newObj.cnt = item.qty;
            newObj.prodPrice = item.price;
            newObj.prodName = item.name;
            console.log(newObj)
            newArr.push(newObj)
        });
        return newArr;
    }
    


    return ( <>
    <h2>סיום הזמנה</h2>
    <form onSubmit={(e)=>{
        e.preventDefault();
        let newArr = newOrderProducts();
        console.log(address);
        console.log(user.id);
        console.log(newArr);
        
        addOrder({
            address: address,
            custId: user.id,
            products: newArr
        })
        .then(res=>{
            console.log(res)
            alert("ההזמנה נקלטה בהצלחה")
        })
        .catch(err=>{
            console.log(err)
            alert("ההזמנה לא נשמרה")
        })
    }}>

        <TextField id="outlined-basic" label="כתובת להזמנה" variant="outlined" onChange={(e)=>{
            setAddress(e.target.value)
        }}/>
        <input type="submit" />

    </form></> );
}
 
export default CheckOut;