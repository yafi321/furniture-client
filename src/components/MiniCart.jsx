import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, IconButton, Badge, List, ListItem, ListItemText, Button, Box, Typography, Divider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart, reduceProduct,deleteFromCart } from "../featurs/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const MiniCart = () => {
    const cartItems = useSelector((state) => state.cart.arr);
    const totalPrice = useSelector((state) => state.cart.totalSum);
    const dispatch = useDispatch();
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        if (cartItems.length > 0) {
            setOpenDrawer(true);
            const timer = setTimeout(() => setOpenDrawer(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [cartItems]);

    return (
        <>
            {/* אייקון עגלה עם מספר פריטים */}
            <IconButton
                onMouseEnter={() => setOpenDrawer(true)}
                sx={{ position: "fixed", top: 20, right: 20, backgroundColor: "#fff" }}
            >
                <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartIcon fontSize="large" />
                </Badge>
            </IconButton>

            {/* סל קניות מוקטן */}
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onMouseLeave={() => setOpenDrawer(false)}
                // sx={{zIndex:100}}
            >
                <Box sx={{ width: 300, p: 2 }}>
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
                                            <img src={`images/${item.url}`} alt={item.name} width={40} height={40} />
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
