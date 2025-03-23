import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, IconButton, Badge, List, ListItem, ListItemText, Box, Typography, Divider, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart, reduceProduct, deleteFromCart } from "../featurs/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const MiniCart = ({ setOpenedByAdd, openedByAdd }) => {
    const cartItems = useSelector((state) => state.cart.arr);
    const totalPrice = useSelector((state) => state.cart.totalSum);
    const dispatch = useDispatch();

    let [openDrawer, setOpenDrawer] = useState(false);
    let [iconPosition, setIconPosition] = useState(10);
    let navig = useNavigate();

    // כאשר משתנה מספר הפריטים בעגלה → נפתח ל-3 שניות אם הוסיפו מוצר
    useEffect(() => {
        if (cartItems.length > 0 && openedByAdd) {
            setOpenDrawer(true);
            setIconPosition(335); // האייקון זז עם העגלה
            const timer = setTimeout(() => {
                setOpenDrawer(false);
                setIconPosition(10); // האייקון חוזר למקום כשהעגלה נסגרת
                setOpenedByAdd(false); // מנקים את הדגל
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [cartItems, openedByAdd]);

    return (
        <>
            {/* אייקון עגלה עם מספר פריטים */}
            <IconButton
                sx={{
                    width: 50,
                    // height:"auto",
                    position: "fixed",
                    top: 20,
                    left: iconPosition,
                    // backgroundColor: "#fff",
                    transition: "left 0.3s ease-in-out",
                    zIndex: 1500, // מציב את האייקון מעל הכל
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // מוסיף עומק
                    borderRadius: "0px", // הופך את הכפתור לריבועי
                    padding: "10px", // התאמת גודל הפנים של הכפתור
                    backgroundColor: "#201F1F", // צבע רקע כהה
                    color: "#fff", // צבע האייקון לבן
                }}
                onMouseEnter={() => {
                    setOpenDrawer(true);
                    setIconPosition(335); // הזזת האייקון
                }}
            >
                <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartIcon fontSize="large" />
                </Badge>
            </IconButton>

            {/* סל קניות מוקטן */}
            <Drawer anchor="left" open={openDrawer} >
                <Box
                    sx={{ width: 300, height: "100vh", p: 2 }}
                    onMouseLeave={() => {
                        setOpenDrawer(false);
                        setIconPosition(10); // החזרת האייקון
                    }}
                >
                    <Typography variant="h6" textAlign="right" gutterBottom>
                        העגלה שלי
                    </Typography>

                    {cartItems.length > 0 ? (
                        <>
                            <List>
                                {cartItems.map((item) => (
                                    <ListItem key={item._id} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                        {/* תמונה, שם ומחיר */}
                                        <Box display="flex" alignItems="center" width="100%">
                                            <img src={`images/${item.url}`} alt={item.name} width={60} height={60} />
                                            <ListItemText
                                                primary={item.name}
                                                secondary={`₪${item.price.toFixed(2)}`}
                                                sx={{ ml: 1, textAlign: "right" }}
                                            />
                                        </Box>

                                        {/* כמות ועדכון מוצרים */}
                                        <Box display="flex" alignItems="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => dispatch(deleteFromCart(item))}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>

                                            <Box display="flex" alignItems="center">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        if (item.qty > 1) {
                                                            dispatch(reduceProduct(item));
                                                        }
                                                    }}
                                                    disabled={item.qty === 1}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>

                                                <Typography>{item.qty}</Typography>

                                                <IconButton size="small" onClick={() => dispatch(addToCart(item))}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>

                                        {/* סכום ביניים */}
                                        <Typography variant="body2" color="textSecondary" textAlign="right">
                                            סכום ביניים: ₪{(item.price * item.qty).toFixed(2)}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>

                            <Divider sx={{ my: 2 }} />

                            {/* סכום כולל */}
                            <Typography variant="h6" textAlign="right">
                                סה"כ: ₪{totalPrice.toFixed(2)}
                            </Typography>


                            {/* כפתורים בסוף */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    sx={{ ml: 1 }}
                                    onClick={() => {
                                        // כאן ניתן להוסיף את הקוד לסיום הזמנה
                                       navig("/checkout")
                                    }}
                                >
                                    סיום הזמנה
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mr: 1 }}
                                    onClick={() => {
                                        // כאן ניתן להוסיף את הקוד למעבר לסל קניות הגדול
                                        navig("/cart")
                                    }}
                                >
                                    לעבור לסל קניות
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography textAlign="center">העגלה ריקה</Typography>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default MiniCart;
