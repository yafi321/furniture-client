import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { addOrder } from "../api/orderService";
import LoginUser from "./LoginUser";

const CheckOut = () => {
    const [address, setAddress] = useState("");
    const [openLogin, setOpenLogin] = useState(false);
    const cartItems = useSelector(state => state.cart.arr);
    const user = useSelector(state => state.user.currentUser);

    const newOrderProducts = () => {
        return cartItems.map(item => ({
            cnt: item.qty,
            prodPrice: item.price,
            prodName: item.name
        }));
    };

    const handleAddOrder = (e) => {
        e.preventDefault();

        if (!user) {
            setOpenLogin(true);
            return;
        }

        const orderData = {
            address,
            custId: user.id,
            products: newOrderProducts()
        };

        addOrder(orderData)
            .then(() => {
                alert("ההזמנה נקלטה בהצלחה");
            })
            .catch(() => {
                alert("ההזמנה לא נשמרה");
            });
    };

    return (
        <>
            <h2>סיום הזמנה</h2>
            <form onSubmit={handleAddOrder}>
                <TextField 
                    fullWidth 
                    label="כתובת להזמנה" 
                    variant="outlined" 
                    margin="normal"
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    שלח הזמנה
                </Button>
            </form>

            {/* חלונית התחברות שתופיע אם המשתמש לא מחובר */}
            <LoginUser open={openLogin} handleClose={() => setOpenLogin(false)} />
        </>
    );
};

export default CheckOut;
