import React, { useState } from "react";
import {
    TextField, Button, Paper, Box, Typography, Dialog, DialogTitle,
    DialogContent, DialogActions, Snackbar
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addOrder } from "../api/orderService";
import LoginUser from "./LoginUser";
import { clearCart } from "../featurs/cartSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CheckOut = ({ open, handleClose }) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false); // State for success Snackbar
    const cartItems = useSelector(state => state.cart.arr);
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const newOrderProducts = () => {
        return cartItems.map(item => ({
            cnt: item.qty,
            prodPrice: item.price,
            prodName: item.name
        }));
    };

    const onSubmit = (data) => {
        if (!user) {
            setOpenLogin(true);
            return;
        }

        const orderData = {
            address: data.address,
            custId: user._id,
            products: newOrderProducts()
        };

        addOrder(orderData)
            .then(() => {
                setOpenSuccess(true); // Show success Snackbar
                dispatch(clearCart());
                handleClose();
            })
            .catch(() => {
                alert("ההזמנה לא נשמרה");
            });
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontFamily: "'Heebo', sans-serif", textAlign: "center" }}>סיום הזמנה</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" textAlign="right">
                        .הזמנתך כמעט מוכנה! לאחר השלמת התשלום, אנו נתחיל בעיבוד ההזמנה שלך
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="right" sx={{ mt: 1 }}>
                        .המשלוח יגיע אליך תוך 3-5 ימי עסקים
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" textAlign="right">
                        ניתן לעקוב אחר ההזמנה שלך דרך האזור האישי באתר.
                    </Typography> */}
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={2}>
                        <TextField 
                            fullWidth 
                            label="כתובת להזמנה" 
                            variant="outlined" 
                            margin="normal"
                            {...register("address", { required: "נא להזין כתובת", minLength: { value: 2, message: "על הכתובת להכיל לפחות 2 תווים" } })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
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

            {/* Snackbar for success message */}
            <Snackbar
                open={openSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSuccess}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Box
                    sx={{
                        backgroundColor: "#28a745",
                        color: "white",
                        borderRadius: "8px",
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        direction: "rtl"
                    }}
                >
                    <CheckCircleIcon sx={{ fontSize: 40 }}  />
                    <Typography variant="h6">ההזמנה נקלטה בהצלחה!</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                        ההזמנה בדרך אליך, 3-5 ימי עסקים.
                        <br />
                        תקבל עדכון לטלפון כשזה יגיע.
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "center", marginTop: 1 }}>
                        תודה על קנייתך!
                    </Typography>
                </Box>
            </Snackbar>
        </>
    );
};

export default CheckOut;
