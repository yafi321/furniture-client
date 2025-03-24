import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useSelector } from "react-redux";
import { addOrder } from "../api/orderService";
import LoginUser from "./LoginUser";

const CheckOut = ({ open, handleClose }) => {
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
            custId: user._id,
            products: newOrderProducts()
        };
        console.log(orderData);

        addOrder(orderData)
            .then(() => {
                alert("ההזמנה נקלטה בהצלחה");
                handleClose();
            })
            .catch(() => {
                alert("ההזמנה לא נשמרה");
            });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontFamily: "'Heebo', sans-serif", textAlign: "center" }}>סיום הזמנה</DialogTitle>
            <DialogContent>
                <Typography variant="body1" textAlign="right">
                    הזמנתך כמעט מוכנה! לאחר השלמת התשלום, אנו נתחיל בעיבוד ההזמנה שלך.
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="right" sx={{ mt: 1 }}>
                    המשלוח יגיע אליך תוך 3-5 ימי עסקים.
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="right">
                    ניתן לעקוב אחר ההזמנה שלך דרך האזור האישי באתר.
                </Typography>
                <Box component="form" onSubmit={handleAddOrder} mt={2}>
                    <TextField 
                        fullWidth 
                        label="כתובת להזמנה" 
                        variant="outlined" 
                        margin="normal"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        fullWidth 
                        sx={{ marginTop: 2 }}
                    >
                        אשר הזמנה
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">ביטול</Button>
            </DialogActions>
            <LoginUser open={openLogin} handleClose={() => setOpenLogin(false)} />
        </Dialog>
    );
};

export default CheckOut;
